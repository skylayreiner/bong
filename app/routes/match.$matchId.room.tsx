import { Link, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { getMatchById } from "~/models/match.server";
import { requireUser } from "~/session.server";

/**
 * TODOS:
 * - Implement rulebook routing logic
 */

// const fakeData = {
//   seats: {
//     top: {
//       direction: "N",
//       username: "gon_frecces"
//     },
//     left: {
//       direction: "E",
//       username: "x_killua_x"
//     },
//     right: {
//       direction: "W",
//       username: "hisoka"
//     },
//     bot: {
//       direction: "S",
//       username: "leorio"
//     }
//   }
// };

export default function RoomRoute() {
  return (
    <div className="max-w-6xl bg-primary-green-6 sm:px-6 lg:px-8">
      <div className="absolute right-2 top-2 flex flex-col space-y-1">
        <Link
          className="lg:text-md h-10 w-10 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
          to="settings"
        >
          S
        </Link>
        <Link to="rulebook">R</Link>
      </div>
      <div className="absolute left-0 top-3">
        <Link
          to="./scoreboard"
          className="flex h-10 w-36 items-center justify-start rounded-r-full
    bg-secondary-gray-6 pl-3.5 pt-0.5 text-primary-black text-opacity-80
    shadow-primary"
        >
          SCOREBOARD
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
// type SeatBarProps = {
//   seatData: any;
// };
// function TopSeatBar(seatData: any) {
//   return (
//     <div className="justify-left flex h-8 w-full items-center rounded-full bg-primary-green-8">
//       <div className="outline-3 absolute -left-1 flex h-10 w-10 transform items-center justify-center rounded-full bg-accent-teal outline outline-primary-black">
//         <p className=" text-center text-2xl">{position}</p>
//       </div>
//       <p className="ml-12 flex transform truncate text-2xl font-thin text-white ">
//         {occupant.displayName}
//       </p>
//     </div>
//   );
// }

// function LeftSeatBar(seatData: any) {
//   return (
//     <>
//       <p className="mt-16 flex w-fit rotate-90 transform truncate text-2xl font-thin text-primary-white ">
//         {occupant.displayName}
//       </p>
//       <div className="outline-3 absolute -bottom-1 flex h-10 w-10 rotate-90 transform items-center justify-center rounded-full  bg-accent-goldenrod outline outline-primary-black">
//         <p className=" -mb-0.5 text-center text-2xl">{position}</p>
//       </div>
//     </>
//   );
// }

// function RightSeatBar(seatData: any) {
//   return (
//     <>
//       <p className="mt-16 flex w-fit -rotate-90 transform truncate text-2xl font-thin text-white ">
//         {occupant.displayName}
//       </p>
//       <div className="outline-3 absolute -top-1 flex h-10 w-10 -rotate-90 transform items-center justify-center rounded-full bg-accent-navy outline outline-primary-black">
//         `<p className="text-center text-2xl ">`{position}</p>
//       </div>
//     </>
//   );
// }

// function BotSeatBar(seatData: any) {
//   return (
//     <div className="flex h-8 w-full items-center justify-end rounded-full bg-primary-green-8">
//       <p className="mr-12 truncate pb-0.5 text-center text-2xl font-thin text-white">
//         {occupant.displayName}
//       </p>
//       <div className="outline-3 absolute -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-red-6 outline outline-primary-black">
//         <p className="mb-[0.075rem] text-center text-2xl">{position}</p>
//       </div>
//     </div>
//   );
// }
