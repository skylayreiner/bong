import { redirect, type LoaderArgs } from "@remix-run/node";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  if (!user) return redirect("/signin");

  return redirect("/home");
};

export default function Index() {}
