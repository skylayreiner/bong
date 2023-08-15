import { useNavigate, Outlet, Link, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { useOptionalUser } from "~/utils";

export default function Register() {
  const fetcher = useFetcher();
  const user = useOptionalUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/home?${user.username}`);
    }
  }, [user, navigate]);

  function handleRegisterAsGuest() {
    fetcher.load("/register");
  }

  return (
    <>
      <Outlet />
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
                  <div className="mb-1 flex w-[70%] flex-col space-y-1 text-center lg:space-y-1.5">
                    <button
                      type="submit"
                      name="guest-register-btn"
                      onClick={handleRegisterAsGuest}
                      className="lg:text-md flex-grow bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                    >
                      Play as guest
                    </button>
                    <div className="flex space-x-1.5">
                      <Link
                        className="lg:text-md active:shadow-none w-1/2 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6"
                        to="/signup"
                      >
                        Signup
                      </Link>
                      <Link
                        className="lg:text-md active:shadow-none w-1/2 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6"
                        to="/login"
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
      </main>
    </>
  );
}
