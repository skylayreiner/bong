import { redirect } from "@remix-run/node";
import { getMatch } from "./models/match.server";
import {
  deleteRegistrationById,
  verifyRegistration
} from "./models/registration.server";
import { requireUser } from "./session.server";
import { getUserRegistrationListItemsForMatch } from "./models/user.server";

export async function requireRegisteredMatch(
  request: Request,
  matchId: string | undefined
) {
  if (!matchId) return redirect("/");
  const user = await requireUser(request);
  const isRegistered = await verifyRegistration(matchId, user.id);
  if (!isRegistered) {
    // Todo: Replace w/ appropriate error handling --
    console.log("is not registered");
    return redirect("/403");
  }
  const match = await getMatch(matchId);
  if (!match) {
    // Todo: Replace w/ appropriate error handling --
    console.log(
      "Error: match data not found despite successful registration verification"
    );
    return redirect("/404");
  }
  return match;
}

export async function unregister(userId: string, matchId: string) {
  const registrations = await getUserRegistrationListItemsForMatch(
    userId,
    matchId
  );
  for (const registration of registrations) {
    try {
      await deleteRegistrationById(registration.id);
    } catch (e) {
      console.log(e, "Error occured unregistering user by id from match");
      return redirect("/404");
    }
  }
  return redirect("/");
}
