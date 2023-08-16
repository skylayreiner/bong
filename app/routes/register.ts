import { type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { createUser, createUserAsGuest, verifyLogin } from "~/models/user.server";
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

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const formType = formData.get("registration-type")
  if (username?.length === 0 || typeof username !== "string") {
    return {data: {errorMsg: "Login Error: username is required to login"}}
  }
  if (password?.length === 0 || typeof password !== "string") {
    return {data: {errorMsg: "Login Error: password is required to login"}}
  }
  
  if (formType === "login") {
    const res = await verifyLogin(username, password);
    if (res && res.id && res.username) {
      return createUserSession({
        redirectTo: "/",
        remember: false,
        request,
        userId: res.id,
      });
    } 
  } else if (formType === "signup") {
    const res = await createUser(username, password);
    if (res && res.username && res.id) {
       return createUserSession({
        redirectTo: "/",
        remember: false,
        request,
        userId: res.id,
      });
    }
  }
  return {data: {errorMsg: `Registration Error: An error occured while attempting to ${formType}`}}
};