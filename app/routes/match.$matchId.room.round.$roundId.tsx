import { Outlet, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { getMatchRound } from "~/models/match.server";
import { useState } from "react";
import { useGame } from "~/utils";
// export async function loader({ request, params }: LoaderArgs) {
//   const { matchId, roundId } = params;
//   if (!matchId || !roundId)
//     throw new Error(
//       "Error occurred since request url did not include either matchId or roundId"
//     );
//   console.log(Number(roundId) - 1);
//   const round = await getMatchRound(matchId, Number(roundId) - 1);
//   if (!round)
//     throw new Error(
//       "Error occured @ match round since round data for round with specified idx was found found"
//     );
//   return {
//     round: round
//   };
// }
export default function RoundRoute() {
  const game = useGame();
  console.log(game);
  return (
    <div className="max-w-6xl bg-primary-green-6 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
}
