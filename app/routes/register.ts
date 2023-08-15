import { type LoaderArgs } from "@remix-run/node";
import { createUserAsGuest } from "~/models/user.server";
import { createUserSession } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await createUserAsGuest();

  return createUserSession({
    redirectTo: "/",
    remember: false,
    request,
    userId: user.id,
  });
};
