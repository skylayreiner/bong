import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

        <div className="p-4 absolute z-20 top-0 inset-0 flex justify-center items-center overflow-hidden bg-theme-base-green">
          <div className="h-full flex flex-col text-theme-base-black font-sans items-center justify-center m-10">
            <div className="w-[min(80vh,_120vw)] lg:w-[65vh] lg:h-[65vh] h-[min(80vh,_120vw)] bg-primary-white rounded-full lg:pt-5 pt-1">
              <div className="h-full flex flex-col items-center justify-center">
                <img
                  src="/img/brand/game-title.png"
                  className="h-auto w-full ml-[8%] mt-8"
                  alt="brand"
                />
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="flex flex-col w-[70%] space-y-1 lg:space-y-1.5 mb-1 text-center">
                    <button
                      type="submit"
                      onClick={() => console.log("guest click")}
                      className="flex-grow py-1 text-sm lg:text-md bg-secondary-gray-6 shadow-primary active:bg-secondary-gray-8 active:shadow-transparent active:text-secondary-gray-6"
                    >
                      Play as guest
                    </button>
                    <div className="flex space-x-1">

                      <Link
                        to="/join"
                        className="w-1/2 text-sm py-1 lg:text-md bg-secondary-gray-6  shadow-primary active:bg-secondary-gray-8 active:shadow-transparent active:text-secondary-gray-6"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="w-1/2 text-sm py-1 lg:text-md bg-secondary-gray-6 shadow-primary active:bg-secondary-gray-8 active:shadow-transparent active:text-secondary-gray-6"
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
    </main >
  );
}
