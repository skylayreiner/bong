import type { Match, Password, Registration, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import { generateGuestUsername } from "~/utils";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    where: {
      id
    },
    include: {
      registrations: {}
    }
  });
}

// export async function getInProgressMatchesForUser(id: User["id"]) {
//   return prisma.user.findUnique({where: {id, registrations:{some: {Match:{inProgress: true}}}}, include: { registrations: { }}})
// }

export async function getUserByUsername(username: User["username"]) {
  return prisma.user.findUnique({ where: { username } });
}

export async function createUser(username: User["username"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      username,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });
}

// export async function seatUserAtTable(id: Table["id"], userId: User["id"]) {
//   return await prisma.seat.create({
//     data: {
//       occupant: {
//         connect: {
//           id: userId
//         }
//       },
//       table: {
//         connect: {
//           id
//         }
//       }
//     }
//   });
// }

export async function createGuest() {
  const username = generateGuestUsername();

  const res = await prisma.user.create({
    data: {
      username
    }
  });

  // TODO: fix this note --- prisma.user.create specific
  // Theoretically could perma loop
  if (!res.username) createGuest();

  return res;
}

export async function deleteUserByUsername(username: User["username"]) {
  return prisma.user.delete({ where: { username } });
}

export async function verifyLogin(
  username: User["username"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { username },
    include: {
      password: true
    }
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function createMatchRegistrationForUser(
  id: User["id"],
  matchId: Match["id"]
) {
  return await prisma.registration.create({
    data: {
      User: {
        connect: {
          id
        }
      },
      Player: {},
      Match: {
        connect: {
          id: matchId
        }
      }
    }
  });
}

export async function deleteMatchRegistrationOfUser(id: Registration["id"]) {
  return prisma.registration.delete({
    where: {
      id
    }
  });
}

// export async function updateUserAsPlayerOfMatch(
//   userId: User["id"],
//   matchId: Match["id"],
//   username: User["username"]
// ) {
//   return await prisma.player.create({
//     data: {
//       User: {
//         connect: {
//           id: userId
//         }
//       },
//       Match: {
//         connect: {
//           id: matchId
//         }
//       }
//     },
//     include: {
//       User: {
//         include: {
//           player: {
//             include: {
//               match: {}
//             }
//           }
//         }
//       }
//     }
//   });
// }

// export async function getPlayerDataByUserIdForMatchId(
//   userId: User["id"],
//   matchId: Match["id"]
// ) {
//   return await prisma.player.findFirstOrThrow({
//     where: { userId, matchId },
//     include: {
//       match: {
//         include: {
//           table: {}
//         }
//       }
//     }
//   });
// }

// export async function getPlayerDataByUserId(userId: User["id"]) {
//   return await prisma.user.findUnique({
//     where: {
//       id: userId
//     },
//     include: {
//       player: {
//         include: {
//           match: {}
//         }
//       }
//     }
//   });
// }

// export async function getPlayerData(userId: User["id"], matchId: Match["id"]) {
//   return await prisma.player.findFirst({
//     where: {
//       userId,
//       matchId
//     },
//     include: {
//       match: {
//         include: {
//           players: {}
//         }
//       }
//     }
//   });
// }
