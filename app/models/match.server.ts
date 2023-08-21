import type { Match, User } from "@prisma/client";
import { prisma } from "~/db.server";



export async function createMatch(seats:Match['seats'], rounds:Match['rounds'], userId: User["id"]) {
  const res = await prisma.match.create({
    data: {
      rounds: rounds,
      seats: seats,
      signups: {
        create: [{
          registrant: {
            connect: {
              id: userId
            }
          }
        }],
      }
    }, include: {
      signups: {
      }
    }
  });
  if (!res) return null;
  return res;
};


export async function getMatchById(id: Match["id"]) {
  return await prisma.match.findUnique({
    where: { id }, include: { signups: {} }
  })
}




export async function verifyMatchParticipant(id: Match["id"], particpantId: User["id"]) {
  const match = await prisma.match.findUnique({
    where: { id }, include: {
    signups: {}
    }
  });
  if (match && match.signups) {
    for (const signup of match.signups) {
      if (signup.registrantId === particpantId) return true;
    } 
  }
  return false;
}
