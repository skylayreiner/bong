import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { Outlet, useNavigate, useRevalidator } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import CountdownOverlay from "~/components/overlays/countdown";
import { wsContext } from "~/hooks/socket-context";
import { getMatchById, startMatchById } from "~/models/match.server";
import { deleteRegistration } from "~/models/registration.server";
import { requireUser } from "~/session.server";

// const fakeData = {
//   id: "fake-test-key-id",
//   rounds: 20,
//   seats: 4,
//   signups: [
//     {
//       username: "gon_frecces",
//       isHost: true
//     },
//     {
//       username: "hisoka<3",
//       isHost: false
//     },
//     {
//       username: "x_killua_x",
//       isHost: false
//     }
//   ]
// };
export async function loader({ request, params }: ActionArgs) {
  const matchId = params?.matchId;
  const { registrations } = await requireUser(request);
  if (!matchId) throw new Error(`No valid match found w/ url`);
  const registration = registrations.find(
    (registration) => registration.matchId === matchId
  );
  if (!registration)
    throw new Error("No valid match registration was found for user");
  return json({
    registration: registration,
    match: await getMatchById(registration.matchId)
  });
}

export default function MatchRoute() {
  const revalidator = useRevalidator();
  const socket = useContext(wsContext);
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    function onJoinEvent() {
      revalidator.revalidate();
    }

    function onStartEvent() {
      setIsStarting(true);
      setTimeout(() => {
        setIsStarting(false);
      }, 10000);
      console.log("did trigger");
      revalidator.revalidate();
      navigate("./room/round/01/round_start");
    }

    if (socket) {
      socket.on("match:join", onJoinEvent);
      socket.on("match:start", onStartEvent);

      return () => {
        socket.off("match:join", onJoinEvent);
        socket.off("match:start", onStartEvent);
      };
    }
  }, [revalidator, socket, navigate]);

  return (
    <main className="max-w-screen relative min-h-screen overflow-clip bg-primary-green-6 text-primary-white">
      {isStarting && <CountdownOverlay />}

      <Outlet />
    </main>
  );
}
