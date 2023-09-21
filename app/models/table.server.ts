import type { Match, Seat, Table } from "@prisma/client";
import { prisma } from "~/db.server";
import type { User } from "./user.server";

// export async function createTableSeat(
//   matchId: Match["id"],
//   userId: User["id"],
//   position: Seat["position"]
// ) {
//   return await prisma.table.update({
//     where: { matchId },
//     data: {
//       seats: {
//         create: {
//           position: position,
//           totalScore: 0,
//           occupant: {
//             connect: {
//               id: userId
//             }
//           }
//         }
//       }
//     }
//   });
// }

// export async function addInitialDeckCards(tableId: Table["id"]) {
//   const initalDeck = [
//     {
//       value: 1,
//       cardType: "1-b"
//     }
//   ];

//   return await prisma.deckCard.createMany({
//     data: [{ connect: { tableId}, }]
//   });
// }
