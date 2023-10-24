import type { Match, Registration, Round, User } from "@prisma/client";
import { setFlagsFromString } from "v8";
import { prisma } from "~/db.server";
import { createDeck, shuffle } from "~/game.server";

export async function createMatch(
  seatLimit: Match["seatLimit"],
  roundsCount: Match["roundsCount"],
  userId: User["id"],
  username: User["username"]
) {
  return await prisma.match.create({
    data: {
      seatLimit: seatLimit,
      roundsCount: roundsCount,
      Registrations: {
        create: [
          {
            registrantName: username,
            User: {
              connect: {
                id: userId
              }
            },
            Player: {
              create: {}
            }
          }
        ]
      }
    }
  });
}

export async function getMatchById(id: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id },
    include: {
      Seats: {},
      Registrations: {
        orderBy: {
          createdAt: "asc"
        },
        select: {
          id: true,
          userId: true,
          registrantName: true,
          playerId: true
        }
      },
      Rounds: {}
    }
  });
}

export async function startMatchById(id: Match["id"]) {
  return await prisma.match.update({
    where: {
      id
    },
    data: {
      startTime: new Date()
    }
  });
}

// export async function updateMatchStage(
//   id: Match["id"],
//   stageUpdate: Match["stage"]
// ) {
//   return await prisma.match.update({
//     where: { id },
//     data: {
//       stage: stageUpdate
//     },
//     include: {
//       players: {}
//     }
//   });
// }

export async function updateRoundIdxByMatchId(id: Match["id"]) {
  return await prisma.match.update({
    where: { id: id },
    data: {
      roundIdx: {
        increment: 1
      }
    }
  });
}

export async function getMatchRound(
  matchId: Match["id"],
  roundIdx: Match["roundIdx"]
) {
  const rounds = await prisma.match.findUnique({
    where: { id: matchId },
    select: {
      Rounds: {
        include: {
          turns: true
        }
      }
    }
  });
  console.log(rounds, rounds?.Rounds);
  if (rounds && rounds.Rounds) {
    return rounds.Rounds[roundIdx];
  }
  return null;
}
export async function initMatchRound(
  matchId: Match["id"],
  startPos: Round["startingPos"]
) {
  const deck = createDeck();
  return await prisma.round.create({
    data: {
      match: {
        connect: {
          id: matchId
        }
      },
      startTime: new Date(),
      startingPos: startPos,
      deck: {
        create: deck
      },
      deckCount: deck.length
    }
  });
}

export async function randomlyGenerateMatchSeating(matchId: Match["id"]) {
  const match = await getMatchById(matchId);
  if (!match)
    throw new Error(
      "Error occurred generating match seating since a match not found with matchId"
    );
  const shuffledRegistrations = shuffle(match.Registrations);
  const seats = [];
  switch (shuffledRegistrations.length) {
    case 4:
      const fourthSeat = await prisma.seat.create({
        data: {
          Match: {
            connect: {
              id: match.id
            }
          },
          position: "N",
          nametag: shuffledRegistrations[3].registrantName,
          lastScore: 0,
          totalScore: 0,
          occupant: {
            connect: {
              id: shuffledRegistrations[3].playerId
            }
          }
        }
      });
      seats.push(fourthSeat);
    case 3:
      const thirdSeat = await prisma.seat.create({
        data: {
          Match: {
            connect: {
              id: match.id
            }
          },
          position: "W",
          nametag: shuffledRegistrations[2].registrantName,

          lastScore: 0,
          totalScore: 0,
          occupant: {
            connect: {
              id: shuffledRegistrations[2].playerId
            }
          }
        }
      });
      seats.push(thirdSeat);
    case 2:
      const secondSeat = await prisma.seat.create({
        data: {
          Match: {
            connect: {
              id: match.id
            }
          },
          position: "S",
          nametag: shuffledRegistrations[1].registrantName,

          lastScore: 0,
          totalScore: 0,
          occupant: {
            connect: {
              id: shuffledRegistrations[1].playerId
            }
          }
        }
      });
      seats.push(secondSeat);
    case 1:
      const firstSeat = await prisma.seat.create({
        data: {
          Match: {
            connect: {
              id: match.id
            }
          },
          position: "E",
          nametag: shuffledRegistrations[0].registrantName,

          lastScore: 0,
          totalScore: 0,
          occupant: {
            connect: {
              id: shuffledRegistrations[0].playerId
            }
          }
        }
      });
      seats.push(firstSeat);
  }
  return seats;
}
export async function getMatchesOfUser(id: User["id"]) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      registrations: { select: { Match: { include: { Registrations: {} } } } }
    }
  });
}
// export async function setSeating(id: Match["id"], seating: Seat[]) {
//   return await prisma.match.update({
//     where: {
//       id
//     },
//     data: {
//       seats: {
//         create:
//       }
//   });
// }

// export async function updateTableOnMatchStart(id: Table["id"],matchId: Match["id"]) {
// const deck = createDeck();
// const seating = randomlyGenerateSeating(match.players);
// console.log(match, seating);

// return await prisma.match.update({
//   where: {
//     id
//   },
//   data: {
//     startTime: new Date(),
//     rounds: {
//       create: {

//           deckCount: deck.length,
//           deck: {
//             create: deck
//         }

//       },
//       seats: {
//         create: seating
//       }
//     }
//   }
// });
//   return await prisma.table.update({
//     where: {
//       id,
//       match: {id: matchId}
//     },
//     data: {

//     }

//   })
// }

export async function getMatchWithSeating(id: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id },
    include: {
      Rounds: {
        orderBy: {
          startTime: "desc"
        },
        include: {
          turns: {
            orderBy: {
              startTime: "desc"
            }
          }
        }
      },
      Seats: {
        include: {
          occupant: {}
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
