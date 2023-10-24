import type {
  HandCard,
  Match,
  Player,
  Registration,
  Table
} from "@prisma/client";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import type { User } from "~/models/user.server";
import type { UserGetPayload } from "./db.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export function useOptionalGame(): UserGetPayload | undefined {
  const data = useMatchesData("routes/match.$matchId.room.round");

  if (!data || !data.game) {
    return undefined;
  }
  return data.game;
}

export function useGame() {
  const maybeGame = useOptionalGame();
  if (!maybeGame)
    throw new Error(
      "Error occurred loading game data for match room route -- no game data was found @ route but required by useGameSeats"
    );
  const { seats, roundIdx, roundsCount, Rounds } = maybeGame;
  return { seats: seats, roundIdx, roundsCount, rounds: Rounds };
}

export function useOptionalRound() {
  const data = useMatchesData("routes/match.$matchId.room.round.$roundId");

  if (!data || !data.round) {
    return undefined;
  }
  return data.round;
}

export function useRound() {
  const maybeRound = useOptionalRound();
  if (!maybeRound)
    throw new Error(
      "Error occurred loading round data for match room round route @ url specified roundId"
    );
  return maybeRound;
}

type RegistrationBasicPayload = { [key: string]: any };

export function useOptionalRegistration():
  | RegistrationBasicPayload
  | undefined {
  const data = useMatchesData("routes/match.$matchId");
  if (!data || !data.registration) {
    return undefined;
  }
  return data.registration;
}

type MatchLobbyPayload = { [key: string]: any };
export function useOptionalLobby(): MatchLobbyPayload | undefined {
  const data = useMatchesData("routes/match.$matchId");
  if (!data || !data.match) {
    return undefined;
  }
  console.log("match", data.match);
  return data.match;
}

export function useLobby() {
  const maybeLobby = useOptionalLobby();
  if (!maybeLobby) {
    throw new Error("An error occurred loading lobby data");
  }
  return maybeLobby;
}

export function useRegistration() {
  const maybeRegistration = useOptionalRegistration();
  if (!maybeRegistration) {
    throw new Error(
      "No registration found in match for matchId route, but registration is required by useRegistration. If registration is optional, try useOptionalRegistration instead."
    );
  }
  console.log("mayberegis", maybeRegistration);
  return maybeRegistration;
}

// export function useOptionalPlayer() {
//   const data = useMatchesData("routes/match.$matchId");
// }
// export function useOptionalPlayer() {
//   const player = useMatchesData("routes/match.$matchId.room");

//   if (!player) {
//     return undefined;
//   }
//   return player;
// }

// export function usePlayer() {
//   const maybePlayer = useOptionalPlayer();
//   if (!maybePlayer) {
//     throw new Error(
//       "No registered player corresponding to user was found in match room loader"
//     );
//   }
//   return maybePlayer;
// }
export function useOptionalUser(): UserGetPayload | undefined {
  const data = useMatchesData("root");
  if (!data || !data.user) {
    return undefined;
  }
  return data.user;
}
export function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function generateRandomNumber(length: number) {
  const nums = Array.from({ length: length }, () =>
    Math.floor(Math.random() * 10)
  );
  return nums.join("");
}
export function generateGuestUsername(
  tail: string = generateRandomNumber(4),
  joinChar: string = "-"
) {
  return `guest${joinChar}${tail}`;
}
