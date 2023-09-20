import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useReducer } from "react";
import { useData } from "./util";
import type { Match, Registration } from "@prisma/client";
import { RouteMatch, useMatches } from "@remix-run/react";

// type MatchState = {
//   testMatchStateKey: "testMatchStateValue";
// };
const MatchContext = createContext<undefined | any>(undefined);
// type Action = { type: string; payload: any };

// function matchContextReducer(action: Action, state: any) {
//   switch (action.type) {
//     default:
//       return { ...state, ...action.payload };
//   }
// }

// export function MatchProvider({ children }: { children: ReactNode }) {

//   const [state, dispatch] = useReducer(matchContextReducer);
//   const value = { state, dispatch };
//   return (
//     <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
//   );
// }

// export function validateEmail(email: unknown): email is string {
//   return typeof email === "string" && email.length > 3 && email.includes("@");
// }

// export function useOptionalRegistration() {
//   const data = useMatchesData();
//   console.log();
//   if (!data || !data.registration) {
//     return undefined;
//   }
//   return data.registration;
// }

// export function useRegistration() {
//   const maybeRegistrations = useOptionalRegistration();
//   if (!maybeRegistration) {
//     throw new Error(
//       "No match registrations found in /home (user homepage) route loader, but match registration(s) are required by useRegistrations. If registrations are optional, try useOptionalRegistrations instead."
//     );
//   }
//   return maybeRegistrations;
// }

export function useMatchContext() {
  const match = useContext(MatchContext);
  if (!match)
    throw new Error(
      "Provider for useMatch hook was most likely not wrapped properly"
    );
  return match;
}
