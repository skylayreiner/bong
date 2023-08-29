import type { Match, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createMatch(
  seats: Match["seats"],
  rounds: Match["rounds"],
  userId: User["id"],
  stagePhase: Match["stage"]
) {
  const res = await prisma.match.create({
    data: {
      rounds: rounds,
      seats: seats,
      stage: stagePhase,
      signups: {
        create: [
          {
            registrant: {
              connect: {
                id: userId
              }
            }
          }
        ]
      }
    },
    include: {
      signups: {}
    }
  });
  if (!res) return null;
  return res;
}

export async function getMatchById(id: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id },
    include: { signups: {} }
  });
}

// TODO: This is a placeholder
export async function getMatchByKey(key: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id: key },
    include: { signups: {} }
  });
}

export async function addRegistrant(id: Match["id"], particpantId: User["id"]) {
  try {
    const match = await prisma.match.update({
      data: {
        signups: {
          create: {
            registrant: {
              connect: {
                id: particpantId
              }
            }
          }
        }
      },
      where: { id },
      include: { signups: {} }
    });
    return match;
  } catch (e) {
    throw new Error("An error occurred registering user to match");
  }
}

export async function getMatch(id: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id },
    include: {
      signups: {
        select: {
          registrant: {
            select: {
              username: true
            }
          }
        }
      }
    }
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
    select: {
      seats: true,
      rounds: true,
      id: true,
      signups: {
        select: {
          registrant: {
            select: {
              username: true
            }
          }
        }
      },
      stage: true
    }
  });
}
