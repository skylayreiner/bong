import { redirect, type LoaderArgs } from "@remix-run/node";
import { getUser } from "~/session.server";

/**
 * Default "child" route for the entire application
 * consider replacing this w/ title screen type content
 */

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) return redirect("signin");
  return redirect("home");
}
