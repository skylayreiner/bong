import { type LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { requireRegisteredMatch } from "~/matchmaking.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  return await requireRegisteredMatch(request, params.matchId);
};

// This is (to be removed) placeholder data 4 static development
// const dummyParticipantsList = [
//   {
//     username: "gon_frecces",
//     isHost: true
//   },
//   {
//     username: "hisoka<3",
//     isHost: false
//   },
//   {
//     username: "x_killua_x",
//     isHost: false
//   }
// ];

export default function Lobby() {
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const [data, setData] = useState(loaderData);

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.load(".");
    }, 1000);
    return () => clearInterval(interval);
  }, [fetcher]);

  function handleLeave() {
    const form = new FormData();
    form.set("event-type", "leave");
    fetcher.submit(form, { action: "..", method: "post" });
  }

  function handleStart() {
    const form = new FormData();
    form.set("event-type", "start");
    fetcher.submit(form, { action: "..", method: "post" });
  }

  return (
    <main className="relative min-h-screen bg-primary-green-6 text-primary-white sm:flex sm:items-center sm:justify-center">
      <div className="max-w-7xl bg-primary-green-6 sm:px-6 lg:px-8">
        <div className="grid-rows-4 absolute inset-x-[20vw] inset-y-[15vh] grid grid-cols-5">
          <div className="row-span-1 col-span-5 flex flex-col">
            <h1 className="mx-auto mb-2 mt-auto text-center text-4xl font-semibold uppercase">
              Match lobby
            </h1>
            <CopyBar payload={data.id} />
          </div>
          <div className="row-span-5 col-span-1 col-start-1 my-2 flex flex-col">
            <div className="mx-1.5 mb-2 mt-1.5 flex flex-col items-stretch justify-start space-y-3">
              <div className="h-fit pb-2 pl-2 tracking-wide">
                <p className="pb-1.5 text-left text-lg font-medium underline">
                  Game Settings
                </p>
                <ul className="ml-2 flex list-disc flex-col space-y-3 pl-3 text-sm">
                  <li>{`Rounds: ${data.rounds}`}</li>
                  <li>{`Max Seats: ${data.seats}`}</li>
                  <li>{`Mode: Casual`}</li>
                  <li>{`Turn Length: 8 sec`}</li>
                </ul>
              </div>
              <button
                disabled={false}
                className="text-md bg-secondary-gray-6 py-2 font-medium text-secondary-gray-9 shadow-primary"
              >
                Add bot
              </button>
              <button className="text-md bg-secondary-gray-6 py-2 font-medium text-secondary-gray-9  shadow-primary disabled:text-secondary-gray-8 disabled:shadow-transparent">
                Invite Key
              </button>
            </div>
          </div>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={`plyr-${idx}`}
              className="row-span-4 mt-1.58 relative col-span-1"
            >
              <div className="absolute inset-x-1 inset-y-2 bg-primary-green-8">
                {data.signups[idx] && (
                  <PlayerCard
                    name={data.signups[idx].registrant.username}
                    isHost={data.signups[idx].isHost}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="text-md row-start-6 col-span-4 col-start-2 mx-8 flex justify-center space-x-2 font-medium">
            <button
              onClick={handleStart}
              className="h-10 w-1/3 bg-secondary-gray-6 text-primary-black shadow-primary brightness-95 disabled:bg-secondary-gray-8 disabled:text-secondary-gray-7 disabled:shadow-transparent"
              disabled={data.signups.length >= 2 ? false : true}
            >
              Start
            </button>
            <button
              onClick={handleLeave}
              className="h-10 w-1/3 bg-primary-red-6 text-secondary-gray-1 shadow-primary active:bg-primary-red-8 active:text-primary-red-10 active:shadow-transparent"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

type PlayerCardProps = {
  name: string;
  isHost: boolean;
};

function PlayerCard({ name, isHost }: PlayerCardProps) {
  return (
    <div className="flex h-full min-w-fit flex-col items-center border-4 border-primary-green-8 bg-secondary-gray-6 pt-[33%]">
      {isHost && (
        <div className="absolute left-0 top-3 flex h-8 w-[72%] items-center bg-accent-teal pl-1.5 text-left text-xs">
          MATCH HOST
        </div>
      )}
      <div className="mt-[3.5%] space-y-1.5">
        <span className="mx-auto cursor-none pb-1 text-center text-sm font-thin  text-primary-black">
          {name}
        </span>
        <div className="mx-auto h-24 w-24 rounded-full bg-primary-white"></div>
      </div>
    </div>
  );
}

function CopyBar({ payload }: { payload: string }) {
  function handleCopy() {
    navigator.clipboard.writeText(payload);
  }
  return (
    <span className="container relative mx-auto flex cursor-none rounded-none bg-primary-white text-primary-black">
      <div
        className="flex-grow px-3 py-1"
        id="join-key"
        typeof="source"
        contentEditable={false}
      >
        {payload}
      </div>
      <button
        className="w-[15%] cursor-pointer select-none bg-secondary-gray-9 text-primary-white"
        onClick={handleCopy}
      >
        Copy
      </button>
    </span>
  );
}
