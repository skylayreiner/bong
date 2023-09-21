import type { ActionArgs } from "@remix-run/node";
import { Outlet, Link, useFetcher } from "@remix-run/react";
import { verifyLogin, createUser } from "~/models/user.server";
import { createUserSession } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const formType = formData.get("signin-type");

  if (username?.length === 0 || typeof username !== "string") {
    return { data: { errorMsg: "Login Error: username is required to login" } };
  }

  if (password?.length === 0 || typeof password !== "string") {
    return { data: { errorMsg: "Login Error: password is required to login" } };
  }

  if (formType === "login") {
    const res = await verifyLogin(username, password);
    if (res && res.id && res.username) {
      return createUserSession({
        redirectTo: "/",
        remember: false,
        request,
        userId: res.id
      });
    }
  } else if (formType === "signup") {
    const res = await createUser(username, password);
    if (res && res.username && res.id) {
      return createUserSession({
        redirectTo: "/",
        remember: false,
        request,
        userId: res.id
      });
    }
  }

  return {
    data: {
      errorMsg: `Signin Error: An error occured while attempting to ${formType}`
    }
  };
};

export default function Signin() {
  const fetcher = useFetcher();

  function handleGuestRegister() {
    fetcher.load("/guest-login");
  }

  return (
    <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
      <Outlet />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-theme-base-green absolute inset-0 top-0 z-20 flex items-center justify-center overflow-hidden p-4">
          <div className="text-theme-base-black m-10 flex h-full flex-col items-center justify-center font-sans">
            <div className="h-[min(80vh,_120vw)] w-[min(80vh,_120vw)] rounded-full bg-primary-white pt-1 lg:h-[65vh] lg:w-[65vh] lg:pt-5">
              <div className="flex h-full flex-col items-center justify-center">
                <img
                  src="/img/brand/game-title.png"
                  className="ml-[8%] mt-8 h-auto w-full"
                  alt="brand"
                />
                <div className="mb-1 flex w-[70%] flex-col space-y-1 text-center lg:space-y-1.5">
                  <button
                    type="submit"
                    name="guest-register-btn"
                    onClick={handleGuestRegister}
                    className="lg:text-md flex-grow bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                  >
                    Play as guest
                  </button>
                  <div className="flex space-x-1.5">
                    <Link
                      className="lg:text-md w-1/2 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                      to="signup"
                    >
                      Sign up
                    </Link>
                    <Link
                      className="lg:text-md w-1/2 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                      to="login"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </main>
  );
}
