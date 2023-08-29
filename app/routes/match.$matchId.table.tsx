import { Link, Outlet, useNavigate } from "@remix-run/react";
import { useState } from "react";

/**
 * TODOS:
 * - Implement rulebook routing logic
 */

// export async function loader({ params, request }: LoaderArgs) {
//   return {};
// }

const fakeData = {
  seats: {
    top: {
      direction: "N",
      username: "gon_frecces"
    },
    left: {
      direction: "E",
      username: "x_killua_x"
    },
    right: {
      direction: "W",
      username: "hisoka"
    },
    bot: {
      direction: "S",
      username: "leorio"
    }
  }
};

export default function Table() {
  const navigate = useNavigate();
  // const loaderData = useLoaderData();
  const [data] = useState(fakeData);

  return (
    <main className="relative h-screen w-screen bg-primary-green-6 text-primary-white subpixel-antialiased caret-transparent sm:flex sm:items-center sm:justify-center">
      <div className="bg-primary-green-6 sm:px-6 lg:px-8">
        <Outlet />
        <div className="absolute right-2 top-2 flex flex-col space-y-1">
          <Link
            className="lg:text-md h-10 w-10 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent"
            to="settings"
          >
            S
          </Link>
        </div>
        <div className="absolute left-0 top-3">
          <button
            onClick={() => navigate("./scoreboard")}
            className="flex h-10 w-36 items-center justify-start rounded-r-full bg-secondary-gray-6 pl-3.5 pt-0.5 text-primary-black text-opacity-80 shadow-primary"
          >
            SCOREBOARD
          </button>
        </div>
        <div className="absolute inset-x-[11%] bottom-[20%] top-[18.5%] flex-col">
          <div className="relative grid h-full grid-cols-12 grid-rows-8">
            <div className="row-span-1 col-span-11">
              {data.seats.top && (
                <div className="justify-left flex h-8 w-full items-center rounded-full bg-primary-green-8">
                  <div className="outline-3 absolute -left-1 flex h-10 w-10 transform items-center justify-center rounded-full bg-accent-teal outline outline-primary-black">
                    <p className=" text-center text-2xl">
                      {data.seats.top.direction}
                    </p>
                  </div>
                  <p className="ml-12 flex transform truncate text-2xl font-thin text-white ">
                    {data.seats.top.username}
                  </p>
                </div>
              )}
            </div>

            <div className="col-start-1 row-span-7 row-start-2">
              <div className="flex h-full w-8 flex-col items-center justify-end rounded-full bg-primary-green-8">
                {data.seats.left && (
                  <div className="outline-3 absolute -bottom-1 flex h-10 w-10 rotate-90 transform items-center justify-center rounded-full  bg-accent-goldenrod outline outline-primary-black">
                    <p className=" -mb-0.5 text-center text-2xl">W</p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 col-start-12 row-span-7">
              <div className="relative ml-auto flex h-full w-8 flex-col items-center justify-start rounded-full bg-primary-green-8 py-4">
                {data.seats.right && (
                  <>
                    <p className="mt-16 flex w-fit -rotate-90 transform truncate text-2xl font-thin text-white ">
                      {data.seats.right.username}
                    </p>
                    <div className="outline-3 absolute -top-1 flex h-10 w-10 -rotate-90 transform items-center justify-center rounded-full bg-accent-navy outline outline-primary-black">
                      <p className="text-center text-2xl ">
                        {data.seats.right.direction}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row-start-9 col-span-11 col-start-2 flex flex-col justify-end">
              <div className="flex h-8 w-full items-center justify-end rounded-full bg-primary-green-8">
                <p className="mr-12 truncate pb-0.5 text-center text-2xl font-thin text-white">
                  {data.seats.bot.username}
                </p>
                <div className="outline-3 absolute -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-red-6 outline outline-primary-black">
                  <p className="mb-[0.075rem] text-center text-2xl">
                    {data.seats.bot.direction}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 col-start-[2] row-span-6 row-start-2 my-auto">
              <Deck />
            </div>
            <div className="col-span-8 col-start-[4] row-span-6 row-start-2 -m-2 bg-primary-green-8">
              <Discards />
            </div>
            <div className="absolute inset-x-0 top-[103.5%]">
              <HeroGUI />
            </div>

            <div className="absolute inset-y-0 -right-28 flex flex-col items-center justify-center">
              <RightVillianDisplay />
            </div>

            <div className="absolute inset-y-0 -left-28 flex flex-col items-center justify-center">
              <LeftVillianDisplay />
            </div>
            <div className="absolute inset-x-0 -top-28">
              <TopVillianDisplay />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Discards() {
  return (
    <div className="container mx-auto flex h-full items-center justify-center">
      <div className="z-0 flex translate-y-10 rotate-12 bg-secondary-purple-8 pb-0.5 pr-0.5 shadow-cast">
        <img className="h-28" src="/img/deck/12-1.svg" alt="test" />
      </div>
      <div className="z-0 flex -translate-x-10 rotate-90 bg-secondary-purple-8 pr-0.5 shadow-cast">
        <img className="h-28" src="/img/deck/2-4.svg" alt="test" />
      </div>
    </div>
  );
}

function Cardback() {
  return (
    <div className="h-1 w-full bg-secondary-purple-8">
      <div className="h-1/4 bg-primary-red-8"></div>
    </div>
  );
}

function Deck() {
  return (
    <div className="container -mt-[45%] flex flex-col items-center justify-center pr-5">
      <div className="h-[6.25rem] w-[4.25rem] bg-secondary-purple-8">
        <div className="flex h-full w-full items-start justify-center">
          <div className="mx-[0.06rem] h-full w-full bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
        <Cardback />
      </div>
    </div>
  );
}

function TopVillianDisplay() {
  return (
    <div className="container -ml-6 flex justify-center">
      <div className="h-[6.5rem] w-16 bg-secondary-purple-8 ">
        <div className=" flex h-full w-full items-start justify-center">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="h-[6.5rem] w-16 bg-secondary-purple-8 ">
        <div className=" flex h-full w-full items-start justify-center">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
    </div>
  );
}

function LeftVillianDisplay() {
  return (
    <>
      <div className="mx-auto h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
        <div className=" flex h-full w-full items-start justify-start">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="mx-auto h-[3.75rem] w-[6.5rem] bg-secondary-purple-8 ">
        <div className=" flex h-full w-full  items-start  justify-start">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="mx-auto h-[3.75rem] w-[6.5rem] bg-secondary-purple-8 ">
        <div className=" flex h-full w-full items-start  justify-start">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="mx-auto h-[3.75rem] w-[6.5rem] bg-secondary-purple-8 ">
        <div className=" flex h-full w-full items-start  justify-start">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="mx-auto h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
        <div className=" flex h-full w-full  items-start justify-start">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
    </>
  );
}

function RightVillianDisplay() {
  return (
    <>
      <div className="h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
        <div className=" flex h-full w-full items-start justify-end">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
        <div className=" flex h-full w-full items-start justify-end">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
        <div className=" flex h-full w-full items-start justify-end">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
        <div className=" flex h-full w-full items-start justify-end">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
        <div className=" flex h-full w-full  items-start  justify-end">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
    </>
  );
}

function HeroGUI() {
  return (
    <div className="flex items-start justify-end">
      <div className="mt-3 w-1/4"></div>
      <HeroHand />
      <div className="mt-3 w-1/4">
        <ActionPanel />
      </div>
    </div>
  );
}

function ActionPanel() {
  return (
    <div className="relative mx-0 flex flex-col space-y-1 text-secondary-gray-3">
      <button
        onClick={() => ""}
        className="bg-secondary-gray-6 py-1.5 text-xl text-primary-black shadow-primary brightness-95 disabled:bg-secondary-gray-8 disabled:text-secondary-gray-7 disabled:shadow-transparent"
        disabled={true}
      >
        Draw
      </button>
      <button
        onClick={() => ""}
        className="bg-secondary-gray-6 py-1.5 text-xl font-medium text-primary-black shadow-primary brightness-95 disabled:bg-secondary-gray-8 disabled:text-secondary-gray-7 disabled:shadow-transparent"
      >
        Discard
      </button>
      <div className="outline-3 absolute -left-[0.5rem] top-3.5 hidden h-12 w-12 rounded-full bg-secondary-gray-7 font-medium outline outline-primary-black"></div>
    </div>
  );
}

type CardSlot = {
  isSelected: boolean;
  cardId: string;
};

const testInitHand = [
  {
    isSelected: false,
    cardId: "2-1"
  },
  {
    isSelected: false,
    cardId: "5-2"
  },
  {
    isSelected: false,
    cardId: "10-1"
  },
  {
    isSelected: false,
    cardId: "2-2"
  },
  {
    isSelected: false,
    cardId: "8-1"
  }
];

function HeroHand() {
  const [cardSlots, setCardSlots] = useState<CardSlot[]>(testInitHand);

  function handleCardSlotClick(idx: number) {
    const updated = cardSlots.map((slot, slotIdx) =>
      slot && idx === slotIdx ? { ...slot, isSelected: !slot.isSelected } : slot
    );
    setCardSlots(updated);
  }

  return (
    <div className="container flex flex-grow justify-center -space-x-2">
      {cardSlots.map((slot, idx) => (
        <HeroCard
          key={slot.cardId}
          id={slot.cardId}
          handleSelectToggle={() => handleCardSlotClick(idx)}
          isSelected={slot.isSelected}
        />
      ))}
    </div>
  );
}

function HeroCard({
  isSelected,
  id,
  handleSelectToggle
}: {
  isSelected: boolean;
  id: string;
  handleSelectToggle: () => void;
}) {
  return (
    <div
      onClick={handleSelectToggle}
      onDragStart={(e) => e.preventDefault()}
      className={`${
        isSelected ? `z-40 ring-4 ring-accent-teal` : `ring-none`
      } `}
    >
      <div className="z-0 flex cursor-pointer bg-secondary-purple-8 px-0.5 pb-0.5">
        <img className="h-28" src={`/img/deck/${id}.svg`} alt="test" />
      </div>
    </div>
  );
}
