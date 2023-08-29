import { type LoaderArgs } from "@remix-run/node";
import { createGuest } from "~/models/user.server";
import { createUserSession } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await createGuest();
  return createUserSession({
    redirectTo: "/",
    remember: false,
    request,
    userId: user.id
  });
};
