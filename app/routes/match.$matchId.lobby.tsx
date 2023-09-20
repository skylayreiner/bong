import { redirect, type ActionArgs } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigate,
  useRevalidator
} from "@remix-run/react";
import type { FormEvent } from "react";
import { useContext, useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import CountdownOverlay from "~/components/overlays/countdown-overlay";

import { wsContext } from "~/hooks/socket-context";
import { startGameWithMatch } from "~/models/match.server";
import {
  getPlayerData,
  unregisterUserFromMatchByPlayerId
} from "~/models/user.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: ActionArgs) {
  const matchId = params?.matchId;
  if (!matchId) throw new Error(`No valid match found w/ url`);
  const userId = await requireUserId(request);
  const playerData = await getPlayerData(userId, matchId);
  if (!playerData?.match) {
    throw new Error("player not registered @ lobby error");
  }
  return playerData.match;
}

export async function action({ request, params }: ActionArgs) {
  const matchId = params?.matchId;
  const userId = await requireUserId(request);
  if (!matchId) throw new Error(`No valid match found w/ url`);
  const playerData = await getPlayerData(userId, matchId);
  if (!playerData?.match) {
    throw new Error("player not registered @ lobby error");
  }
  if (playerData?.match?.stage !== "pre") {
    console.log("@lobby match not in pre stage");
  }
  const formData = await request.formData();
  const type = formData.get("type");
  if (type === "start") {
    const match = await startGameWithMatch(playerData.match);

    if (!match) throw new Error("Error occured @ start");

    return match;
  }
  if (type === "leave") {
    const res = await unregisterUserFromMatchByPlayerId(playerData.id);
    if (!res) {
      throw new Error(
        "Error updating user matches @ match lobby on lobby leave"
      );
    }
    return redirect("././");
  }
}
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
export default function LobbyRoute() {
  const data = useLoaderData();
  const socket = useContext(wsContext);
  const fetcher = useFetcher();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const [isStarting, setIsStarting] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.timeout(5000).emit("match:join", data.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onJoinEvent(socket: Socket) {
      revalidator.revalidate();
    }

    function onStartEvent(socket: Socket) {
      setIsStarting(true);
      setTimeout(() => {
        navigate("../room");
      }, 10000);
    }

    if (socket) {
      socket.on("match:join", onJoinEvent);
      socket.on("match:start", onStartEvent);
      return () => {
        socket?.off("match:join", onJoinEvent);
        socket?.off("match:start", onStartEvent);
      };
    }
  }, [revalidator, navigate, socket]);

  function handleStart(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    socket?.emit("match:start", data.id);
    const submitType = e.currentTarget.value;
    const formData = new FormData();
    formData.set("type", submitType);
    fetcher.submit(e.currentTarget);
  }

  return (
    <div className="max-w-6xl bg-primary-green-6">
      {isStarting && <CountdownOverlay />}
      <div className="grid-rows-4 absolute inset-y-[18vh] grid grid-cols-5 md:inset-x-2 lg:inset-x-[20vw]">
        <div className="row-span-1 col-span-5 flex flex-col">
          {/*[Grid Layout] Header Contents*/}

          <h1 className="mx-auto mb-2 mt-auto text-center text-4xl font-semibold uppercase">
            Match lobby
          </h1>
          <CopyBar payload={data.id} />
        </div>
        <div className="row-span-5 col-span-1 col-start-1 my-2 flex flex-col">
          {/* [Grid Layout] Left Sidebar Contents*/}

          <div className="mx-1.5 mb-2 mt-1.5 flex flex-col items-stretch justify-start space-y-3">
            <div className="h-fit pb-2 pl-2 tracking-wide">
              <p className="pb-1.5 text-left text-lg font-medium underline">
                Game Settings
              </p>
              {/* Sidebar List */}
              <ul className="ml-2 flex list-disc flex-col space-y-3 pl-3 text-sm">
                <li>{`Rounds: ${data.rounds}`}</li>
                <li>{`Max Seats: ${data.seatLimit}`}</li>
                <li>{`Mode: Casual`}</li>
                <li>{`Turn Length: 8 sec`}</li>
              </ul>
            </div>

            {/* Sidebar Buttons */}
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

        {/* [Grid Layout] Main Contents --- NOTE: Has no bounding container*/}

        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={`registrant-${idx}`}
            className="row-span-4 mt-1.58 relative col-span-1"
          >
            <div className="absolute inset-x-1 inset-y-2 bg-primary-green-8">
              {data?.players[idx]?.displayName && (
                <RegistrantCard
                  username={data.players[idx].displayName}
                  isHost={idx === 0 ? true : false}
                />
              )}
            </div>
          </div>
        ))}

        {/* [Grid Layout] Footer Control Contents */}
        <Form
          className="text-md row-start-6 col-span-4 col-start-2 mx-8 flex w-full justify-center space-x-2 font-medium"
          method="post"
          name="lobby-form"
          id="lobby-form"
          action="."
        >
          <button
            type="submit"
            name="type"
            value="start"
            form="lobby-form"
            onClick={(e) => handleStart(e)}
            className="h-10 w-1/3 bg-secondary-gray-6 text-primary-black shadow-primary brightness-95 disabled:bg-secondary-gray-8 disabled:text-secondary-gray-7 disabled:shadow-transparent"
            disabled={data.players.length >= 2 ? false : true}
          >
            Start
          </button>
          <button
            name="type"
            form="lobby-form"
            type="submit"
            value="leave"
            className="h-10 w-1/3 bg-primary-red-6 text-secondary-gray-1 shadow-primary active:bg-primary-red-8 active:text-primary-red-10 active:shadow-transparent"
          >
            Leave
          </button>
        </Form>
      </div>
    </div>
  );
}

type RegistrantCardProps = {
  username: string;
  isHost?: boolean;
};

function RegistrantCard({ username, isHost }: RegistrantCardProps) {
  return (
    <section className="flex h-full min-w-fit flex-col items-center border-4 border-primary-green-8 bg-secondary-gray-6 pt-[33%]">
      {isHost && (
        <div className="absolute left-0 top-3 flex h-8 w-[72%] items-center bg-accent-teal pl-1.5 text-left text-xs">
          MATCH HOST
        </div>
      )}
      <div className="mt-[3.5%] space-y-1.5">
        <span className="mx-auto cursor-none pb-1 text-center text-sm font-thin  text-primary-black">
          {username}
        </span>
        <div className="mx-auto h-24 w-24 rounded-full bg-primary-white"></div>
      </div>
    </section>
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
