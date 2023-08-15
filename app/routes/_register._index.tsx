import type { ActionArgs } from "@remix-run/node";
import { useSubmit, useNavigate } from "@remix-run/react";
import React from "react";
import { RegistrationContextProvider } from "~/hooks/registration-context";
import { createUserAsGuest } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import { useOptionalUser } from "~/utils";

export default function Register() {
  return <></>;
}
