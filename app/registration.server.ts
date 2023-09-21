import { getPlayerDataByUserId } from "~/models/user.server";
import { getUserId } from "./session.server";

export async function getRegisteredMatches(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return null;
  const playerData = await getPlayerDataByUserId(userId);
  if (playerData) return playerData;
  return null;
}
