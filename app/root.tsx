import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { useState, useEffect } from "react";
import type { Socket } from "socket.io-client";
import { connect } from "socket.io-client";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import { wsContext } from "./hooks/socket-context";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
    as: "stylesheet"
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])
];

export async function loader({ request }: LoaderArgs) {
  return json({ user: await getUser(request) });
}

export default function App() {
  // TODO: update default events map types
  let [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    let connection = connect();
    setSocket(connection);
    return () => {
      connection.close();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <wsContext.Provider value={socket}>
          <Outlet />
        </wsContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
