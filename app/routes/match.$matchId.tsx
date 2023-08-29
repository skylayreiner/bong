import { redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireRegisteredMatch, unregister } from "~/matchmaking.server";
import { updateMatchStage } from "~/models/match.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  return await requireRegisteredMatch(request, params.matchId);
};

export const action = async ({ request, params }: ActionArgs) => {
  const user = await requireUser(request);

  const matchId = params.matchId;
  if (!matchId) return redirect("/");

  const formData = await request.formData();
  const type = formData.get("event-type");

  if (type === "start") {
    await updateMatchStage(matchId, "inProgress");
    return redirect("./table");
  }

  if (type === "leave") {
    return await unregister(user.id, matchId);
  }

  // Todo: Replace w/ appropriate error handling --
  return redirect("/404");
};

export default function MatchLayout() {
  return <Outlet />;
}
