import { Link, Outlet, useLoaderData } from "@remix-run/react";
import RulebookModal from "~/components/rulebook-modal";
import { useUser } from "~/utils";

// Plan is to load user acc info/settings in loader here eventually

import { json, type LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getMatchesOfUser } from "~/models/match.server";
export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  return json({ matches: await getMatchesOfUser(userId) });
}
export default function HomeRoute() {
  const user = useUser();
  const { matches } = useLoaderData<typeof loader>();

  return (
    <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
      <Outlet />
      <div className="max-w-7xl sm:px-6 lg:px-8">
        <div className="absolute left-2 top-2">
          <text>{`${user.username}`}</text>
        </div>
        <div className="absolute right-2 top-2 z-20 flex items-center justify-center">
          <form action="/logout" method="post">
            <button
              type="submit"
              className="lg:text-md bg-secondary-gray-6 p-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
            >
              Logout
            </button>
          </form>
        </div>
        <div className="absolute inset-0 top-0 flex items-center justify-center overflow-hidden p-4">
          <div className="m-10 flex h-full flex-col items-center justify-center font-sans text-primary-black">
            <div className="h-[min(80vh,_120vw)] w-[min(80vh,_120vw)] rounded-full bg-primary-white pt-1 lg:h-[65vh] lg:w-[65vh] lg:pt-5">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="flex h-full flex-col items-center justify-center">
                  <img
                    src="/img/brand/game-title.png"
                    className="ml-[6.5%] mt-2 h-auto w-[94%]"
                    alt="brand"
                  />
                  <div className="flex w-[65%] flex-col space-y-1.5 px-2 text-center">
                    <Link
                      className="lg:text-md bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
                      to="create"
                    >
                      Create match
                    </Link>
                    <Link
                      className="lg:text-md bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
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
        </div>
      </div>
    </main>
  );
}
