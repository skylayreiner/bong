// export async function startMatch(matchId: Match["id"]) {}

import { Match } from "@prisma/client";
import { getMatchById } from "./models/match.server";
import {
  getPlayerDataByUserIdForMatchId,
  requireMatch
} from "./models/user.server";
import type { Params } from "@remix-run/react";
import { requireUser, requireUserId } from "./session.server";

export function createDeck() {
  const cards = [
    { value: 1, cardType: "1-1" },
    { value: 1, cardType: "1-2" },
    { value: 1, cardType: "1-3" },
    { value: 1, cardType: "1-4" },
    { value: 2, cardType: "2-1" },
    { value: 2, cardType: "2-2" },
    { value: 2, cardType: "2-3" },
    { value: 2, cardType: "2-4" },
    { value: 3, cardType: "3-1" },
    { value: 3, cardType: "3-2" },
    { value: 3, cardType: "3-3" },
    { value: 3, cardType: "3-4" },
    { value: 4, cardType: "4-1" },
    { value: 4, cardType: "4-2" },
    { value: 4, cardType: "4-3" },
    { value: 4, cardType: "4-4" },
    { value: 5, cardType: "5-1" },
    { value: 5, cardType: "5-2" },
    { value: 5, cardType: "5-3" },
    { value: 5, cardType: "5-4" },
    { value: 6, cardType: "6-1" },
    { value: 6, cardType: "6-2" },
    { value: 6, cardType: "6-3" },
    { value: 6, cardType: "6-4" },
    { value: 7, cardType: "7-1" },
    { value: 7, cardType: "7-2" },
    { value: 7, cardType: "7-3" },
    { value: 7, cardType: "7-4" },
    { value: 8, cardType: "8-1" },
    { value: 8, cardType: "8-2" },
    { value: 8, cardType: "8-3" },
    { value: 8, cardType: "8-4" },
    { value: 9, cardType: "9-1" },
    { value: 9, cardType: "9-2" },
    { value: 9, cardType: "9-3" },
    { value: 9, cardType: "9-4" },
    { value: 10, cardType: "10-1" },
    { value: 10, cardType: "10-2" },
    { value: 10, cardType: "10-3" },
    { value: 10, cardType: "10-4" },
    { value: 11, cardType: "11-1" },
    { value: 11, cardType: "11-2" },
    { value: 11, cardType: "11-3" },
    { value: 11, cardType: "11-4" },
    { value: 12, cardType: "12-1" },
    { value: 12, cardType: "12-2" },
    { value: 12, cardType: "12-3" },
    { value: 12, cardType: "12-4" }
  ];

  return shuffle(cards);
}

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

// export async function getOptionalPlayerData(request: Request, params: Params) {
//   const matchId = params?.matchId;
//   if (!matchId) throw new Error(`No valid match found w/ url`);
//   const userId = await requireUserId(request);
//   const playerData = await getPlayerData(userId, matchId);
//   if (!playerData) return null;
//   return playerData;
// }

// export async function requirePlayerData(request: Request, params: Params) {
//   const playerData = getOptionalPlayerData(request, params);
//   if (!playerData)
//     throw new Error(
//       `No valid player registration data was found for user in match`
//     );
//   return playerData;
// }
