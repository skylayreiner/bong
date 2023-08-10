import type { V2_MetaFunction, ActionArgs } from "@remix-run/node";
import { useSubmit, Link, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { createUserAsGuest } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export const action = async ({ request }: ActionArgs) => {
  const user = await createUserAsGuest();

  return createUserSession({
    redirectTo: "/",
    remember: false,
    request,
    userId: user.id,
  });
};

export default function Index() {
  const user = useOptionalUser();
  const submit = useSubmit();
  const navigate = useNavigate();
  function handleRegisterAsGuest() {
    submit(null, { method: "post", action: "/?index" });
  }

  useEffect(() => {
    if (user) {
      navigate("./home");
    }
  }, [navigate, user]);

  return (
    <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
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
                {user ? (
                  <Link
                    to="/notes"
                    className="shadow-sm flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 hover:bg-yellow-50 sm:px-8"
                  >
                    View Notes for {user.username}
                  </Link>
                ) : (
                  <div className="mb-1 flex w-[70%] flex-col space-y-1 text-center lg:space-y-1.5">
                    <button
                      type="submit"
                      name="guest-register-btn"
                      onClick={handleRegisterAsGuest}
                      className="lg:text-md flex-grow bg-secondary-gray-6 py-1 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                    >
                      Play as guest
                    </button>
                    <div className="flex space-x-1">
                      <Link
                        to="/join"
                        className="lg:text-md w-1/2 bg-secondary-gray-6 py-1 text-sm  shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="lg:text-md w-1/2 bg-secondary-gray-6 py-1 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                      >
                        Log In
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
