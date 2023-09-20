import { redirect, type ActionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { connect } from "socket.io-client";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import { wsContext } from "~/hooks/socket-context";
import { getMatchById, updateMatchStage } from "~/models/match.server";
import {
  getPlayerDataByUserIdForMatchId,
  removeUserAsPlayerOfMatch,
  requireMatch,
  updateUserAsPlayerOfMatch
} from "~/models/user.server";
import { requireUser, requireUserId } from "~/session.server";

// const fakeData = {
//   id: "fake-test-key-id",
//   rounds: 20,
//   seats: 4,
//   signups: [
//     {
//       username: "gon_frecces",
//       isHost: true
//     },
//     {
//       username: "hisoka<3",
//       isHost: false
//     },
//     {
//       username: "x_killua_x",
//       isHost: false
//     }
//   ]
// };
export async function loader({ request, params }: ActionArgs) {
  const matchId = params?.matchId;
  const userId = await requireUserId(request);
  if (!matchId) throw new Error(`No valid match found w/ url`);
  const playerData = await getPlayerDataByUserIdForMatchId(userId, matchId);
  return json({ registration: playerData });
}

export default function MatchRoute() {
  return (
    <main className="max-w-screen relative min-h-screen overflow-clip bg-primary-green-6 text-primary-white">
      {/* {isStarting && <CountdownOverlay />} */}
      <Outlet />
    </main>
  );
}
