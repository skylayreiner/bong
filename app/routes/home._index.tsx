import { type ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { PrimaryButton } from "~/components/buttons";
import CreateModal from "~/components/create-modal";
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
    <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto max-w-7xl bg-primary-green-6 sm:px-6 lg:px-8">
        {/* REPLACE THIS WITH MODAL COMPONENT
             <div className="flex justify-center items-center absolute top-2 right-2">
              <Link
                to="/home/settings"
                className="flex-grow py-1 lg:py-1.5 text-sm lg:text-md bg-theme-base-gray shadow-base rounded-xs active:bg-theme-dark-gray active:shadow-none active:text-[#CCCCCC]"
              >
                <img src="/img/icon/cogs.svg" alt="cog" />
              </Link>
            </div> */}
        <div className="flex justify-center items-center absolute top-2 right-2">
          <PrimaryButton handleClick={handleLogout}>Logout</PrimaryButton>
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
                <CreateModal />
                {/** TODO: Replace w/ modal component for join*/}
                {/* <CreateModal /> */}
                {/** TODO: Replace w/ modal component for rules*/}
                {/* <CreateModal /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
