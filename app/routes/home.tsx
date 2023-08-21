import { type ActionArgs } from "@remix-run/node";
import { Link, Outlet, useFetcher } from "@remix-run/react";
import { PrimaryButton } from "~/components/buttons";
import RulebookModal from "~/components/rulebook-modal";
import { logout } from "~/session.server";


export const action = async ({ request }: ActionArgs) => {
  return await logout(request);
};

export default function Home() {
  const fetcher = useFetcher();

  function handleLogout() {
    fetcher.submit(null, { method: "post" })
  }

  return (
    <>
      <Outlet />
      <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
        <div className="mx-auto max-w-7xl bg-primary-green-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center absolute top-2 right-2">
            <PrimaryButton handleClick={handleLogout}><p className="px-2">Logout</p></PrimaryButton>
          </div>
          <div className="h-[min(80vh,_120vw)] w-[min(80vh,_120vw)] rounded-full bg-primary-white pt-1 lg:h-[65vh] lg:w-[65vh] lg:pt-5">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex h-full flex-col items-center justify-center">
                <img
                  src="img/brand/game-title.png"
                  className="ml-[6.5%] mt-2 h-auto w-[94%]"
                  alt="brand"
                />
                <div className="flex w-[65%] flex-col space-y-1.5 px-2 text-center">
                  <Link
                    className="lg:text-md active:shadow-transparent bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6"
                    to="create"
                  >
                    Create match
                  </Link>
                  <Link
                    className="lg:text-md active:shadow-transparent bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6"
                    to="join"
                  >
                    Join w/ key
                  </Link>
                  <RulebookModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}