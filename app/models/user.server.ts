import type { Match, Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import { generateGuestUsername } from "~/utils";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    where: { id },
    include: { registrations: {} }
  });
}

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

export async function getUserRegistrationListItemsForMatch(
  userId: User["id"],
  matchId: Match["id"]
) {
  return await prisma.registration.findMany({
    where: {
      matchId,
      registrantId: userId
    },
    include: {
      registrant: {}
    }
  });
}
