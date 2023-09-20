import type { Match, Player, User } from "@prisma/client";
import { prisma } from "~/db.server";
import { createDeck, shuffle } from "~/game.server";

export async function createMatch(
  seats: Match["seatLimit"],
  rounds: Match["rounds"],
  userId: User["id"],
  username: Player["displayName"],
  stagePhase: Match["stage"]
) {
  return await prisma.player
    .create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        displayName: username,
        match: {
          create: {
            rounds,
            seatLimit: seats,
            stage: stagePhase
          }
        }
      }
    })
    .match();
}

export async function getMatchById(id: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id },
    include: { players: {} }
  });
}

export async function updateMatchStage(
  id: Match["id"],
  stageUpdate: Match["stage"]
) {
  return await prisma.match.update({
    where: { id },
    data: {
      stage: stageUpdate
    },
    include: {
      players: {}
    }
  });
}

function randomlyGenerateSeating(players: Player[]) {
  const shuffledPlayers = shuffle(players);
  const seats = [];
  switch (players.length) {
    case 4:
      seats.push({
        position: "N",
        occupant: {
          connect: {
            id: shuffledPlayers[3].id
          }
        }
      });
    case 3:
      seats.push({
        position: "W",
        occupant: {
          connect: {
            id: shuffledPlayers[2].id
          }
        }
      });
    case 2:
      seats.push({
        position: "S",
        occupant: {
          connect: {
            id: shuffledPlayers[1].id
          }
        }
      });
    case 1:
      seats.push({
        position: "E",
        occupant: {
          connect: {
            id: shuffledPlayers[0].id
          }
        }
      });
  }
  return seats;
}

export async function startGameWithMatch(match: Match & { players: Player[] }) {
  const deck = createDeck();
  const seating = randomlyGenerateSeating(match.players);
  console.log(match, seating);

  return await prisma.match.update({
    where: {
      id: match.id
    },
    data: {
      startTime: new Date(),
      stage: "inProgress",
      table: {
        create: {
          deckCount: deck.length,
          deck: {
            create: deck
          },
          seats: {
            create: seating
          }
        }
      }
    }
  });
}

export async function getMatchWithTable(id: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id },
    include: {
      table: {
        include: {
          seats: {
            include: {
              occupant: {
                select: {
                  displayName: true
                }
              }
            }
          }
        }
      }
    }
  });
}

// export async function createTableSeatWithPositionMatchId(
//   id: Match["id"],
//   userId: User["id"],
//   position: Seat["position"]
// ) {
//   return await prisma.table.update({
//     where: { matchId: id },
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
