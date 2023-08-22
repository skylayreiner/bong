import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import { requireMatchRegistration } from '~/session.server';


export const loader = async ({ request, params }: LoaderArgs) => {
  return await requireMatchRegistration(request);
}

export async function action({ request, params }: ActionArgs) {

}

const baseUrl = "http://localhost:3000/"

export default function Lobby() {
  const loaderData = useLoaderData()
  const url = `${baseUrl}lobby/${loaderData.id}`;

  function handleCopyClick() {
    navigator.clipboard.writeText(url)
  }

  return (
    <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto max-w-7xl bg-primary-green-6 sm:px-6 lg:px-8">
        <div className="absolute z-20 top-0 inset-0 flex flex-col items-center justify-center overflow-hidden">
          <div className="h-[75vh] absolute max-w-3xl inset-x-2 mx-auto items-stretch justify-center flex flex-col">
            <div className="pb-6 grid grid-cols-5 grid-rows-4">
              <div className="col-span-5 row-span-1">
                <h1 className="text-center font-semibold text-4xl mb-2 flex-grow mx-auto">
                  Match Lobby
                </h1>
                <div className="container flex">
                  <span className="container flex mx-0 text-primary-black flex-grow bg-primary-white rounded-xs">
                    <p className="flex-grow px-3 py-1">{url}</p>
                    <button
                      className="bg-primary-black w-[15%] text-primary-white"
                      onClick={handleCopyClick}
                    >
                      Copy
                    </button>
                  </span>
                </div>
              </div>
              {/* <div className="col-start-1 col-span-1 row-span-5 flex flex-col mb-4">
              <div className="flex-grow flex flex-col text-primary-white items-stretch justify-start mb-2 mt-2.5 mr-2 space-y-3">
                <div className="h-fit bg-theme-green-8 tracking-wide pl-2 pb-2">
                  <p className="text-left font-semibold text-lg pb-1.5 underline">
                    Game Settings
                  </p>
                  <ul className="text-sm ml-2 list-disc flex flex-col space-y-3 pl-3">
                    <li>Casual Mode</li>
                    <li>Casual Mode</li>
                  </ul>
                </div>
                <button
                  disabled={false}
                  className="h-10 text-primary-black bg-primary-gray shadow-base rounded-xs disabled:text-theme-dark-gray disabled:shadow-none text-md font-medium "
                >
                  Add bot
                </button>
                <button className="h-10 text-md text-primary-black font-medium bg-primary-gray shadow-base rounded-xs">
                  Invite Key
                </button>
              </div>
            </div>
            <div className="mt-1.5 relative col-span-1 row-span-4">
              <div className="absolute inset-x-1.5 inset-y-1 bg-theme-dark-green ">
                <PlayerCard
                  name={data?.players[0]}
                  isHost={data?.players[0] === data?.owner ? true : false}
                />
              </div>
            </div>
            <div className="mt-1.5 relative col-span-1 row-span-4">
              <div className="absolute inset-x-1.5 inset-y-1 bg-theme-dark-green">
                {data?.players[1] && (
                  <PlayerCard name={data.players[1]} isHost={false} />
                )}
              </div>
            </div>
            <div className="mt-1.5 relative col-span-1 row-span-4">
              <div className="absolute inset-x-1.5 inset-y-1 bg-theme-dark-green">
                {data?.players[2] && (
                  <PlayerCard name={data.players[2]} isHost={false} />
                )}
              </div>
            </div>
            <div className="mt-1.5 relative col-span-1 row-span-4">
              <div className="absolute inset-x-1.5 inset-y-1 bg-theme-dark-green brightness-95">
                {data?.players[3] && (
                  <PlayerCard name={data.players[3]} isHost={false} />
                )}
              </div>
            </div>

            <div className="text-md font-medium row-start-6 col-start-2 col-span-4 flex justify-center mt-2 mx-8 space-x-2">
              <button
                onClick={handleStartClick}
                className="disabled:shadow-none w-1/3 h-10 text-primary-black bg-primary-gray shadow-base rounded-xs disabled:text-theme-dark-gray"
                disabled={
                  data?.settings.seatCount === data.players.length &&
                    data?.userId === data?.owner
                    ? false
                    : true
                }
              >
                Start
              </button>
              <button
                onClick={handleLeaveClick}
                className="w-1/3 h-10 text-primary-white bg-theme-light-red shadow-base rounded-xs active:bg-theme-dark-red active:text-theme-dark-gray active:shadow-none"
              >
                Leave
              </button>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div></main>
  )
}

// type PlayerCardProps = {
//   name: string
//   isHost: boolean
// }
// function PlayerCard({ name, isHost }: PlayerCardProps) {
//   return (
//     <div className="pt-[33%] h-full min-w-fit flex flex-col items-center bg-primary-gray border-4 border-theme-green-8">
//       {isHost && (
//         <div className="absolute top-3 left-0 w-[72%] h-8 bg-theme-bright-blue flex items-center text-left text-xs pl-1">
//           MATCH HOST
//         </div>
//       )}
//       <div className="mt-[15%]">
//         <p className="mx-auto text-center pb-1 text-sm font-thin tracking-wide text-primary-black">
//           {name}
//         </p>
//         <div className=" h-24 w-24 rounded-full bg-white"></div>
//       </div>
//     </div>
//   )
// }
