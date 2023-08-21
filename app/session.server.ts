import type { Match } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { User } from "~/models/user.server";
import { getUserById } from "~/models/user.server";
import { getMatchById, verifyMatchParticipant } from "./models/match.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";
const MATCH_SESSION_KEY = "matchId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function requireUserId(
  request: Request,
) {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect(`/`);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}


export async function getMatchId(
  request: Request
): Promise<Match["id"] | undefined> {
  const session = await getSession(request);
  const matchId = session.get(MATCH_SESSION_KEY);
  return matchId;
}

export async function requireMatchId(request: Request) {
  const matchId = await getMatchId(request);
  if (!matchId) {
    throw redirect(`/match/403`);
  }
  return matchId;
}

export async function requireMatch(request: Request) {
  const matchId = await requireMatchId(request);
  const match = await getMatchById(matchId);
  if (match) return match;
  throw redirect("/match/404")
}

export async function requireMatchRegistration(request: Request) {
  const match = await requireMatch(request);
  const user = await requireUser(request);
  const isVerified = await verifyMatchParticipant(match.id, user.id);
  if (!isVerified) throw redirect("/match/403");
  return match;
} 

export async function updateUserSessionMatchId({
  request,
  matchId,
}: {
  request: Request;
  matchId: string;
}) {
  const session = await getSession(request);
  session.set(MATCH_SESSION_KEY, matchId);
  return redirect(`/lobby/${matchId}`, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: false
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
