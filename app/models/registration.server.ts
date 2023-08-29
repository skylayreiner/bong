import type { Match, Registration, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function verifyRegistration(
  matchId: Match["id"],
  userId: User["id"]
) {
  const res = await prisma.registration.findMany({
    where: {
      matchId,
      registrantId: userId
    },
    include: {
      registrant: {}
    }
  });
  if (res.length === 0) return false;
  return true;
}

export async function getRegistrationById(id: Registration["id"]) {
  return prisma.registration.findUnique({ where: { id } });
}

export async function deleteRegistrationById(id: Registration["id"]) {
  return prisma.registration.delete({ where: { id } });
}
