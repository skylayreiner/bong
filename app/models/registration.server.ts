import type { Match, Registration, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createRegistration(
  userId: User["id"],
  username: Registration["registrantName"],
  matchId: Match["id"]
) {
  return await prisma.registration.create({
    data: {
      User: {
        connect: {
          id: userId
        }
      },
      registrantName: username,
      Match: {
        connect: {
          id: matchId
        }
      },
      Player: {
        create: {}
      }
    },
    include: {
      Match: {
        include: {
          Registrations: {
            orderBy: {
              createdAt: "asc"
            }
          }
        }
      }
    }
  });
}

export async function deleteRegistration(id: Registration["id"]) {
  return await prisma.registration.delete({
    where: {
      id
    },
    select: {}
  });
}
