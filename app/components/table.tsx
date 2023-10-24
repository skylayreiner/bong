import type { Seat, DiscardCard, HandCard } from "@prisma/client";
import type { ReactNode } from "react";
import { useState } from "react";

type TableProps = { data: any };
export default function Table({ data }: { data: TableProps }) {
  const { seats, hand, table } = data;
  const { top, bot, left, right } = seats;

  return (
    <div className="absolute inset-x-[11%] bottom-[20.5%] top-[18.5%] flex-col">
      <div className="relative grid h-full grid-cols-12 grid-rows-8">
        <div className="row-span-1 col-span-11">
          {top && (
            <div className="justify-left flex h-8 w-full items-center rounded-full bg-primary-green-8">
              <div className="outline-3 absolute -left-1 flex h-10 w-10 transform items-center justify-center rounded-full bg-accent-teal outline outline-primary-black">
                <p className=" text-center text-2xl">{top.position}</p>
              </div>
              <p className="ml-12 flex transform truncate text-2xl font-thin text-white ">
                {top.occupant.displayName}
              </p>
            </div>
          )}
        </div>

        <div className="col-start-1 row-span-7 row-start-2">
          <div className="flex h-full w-8 flex-col items-center justify-end rounded-full bg-primary-green-8">
            {left && (
              <div className="outline-3 absolute -bottom-1 flex h-10 w-10 rotate-90 transform items-center justify-center rounded-full  bg-accent-goldenrod outline outline-primary-black">
                <p className=" -mb-0.5 text-center text-2xl">W</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 col-start-12 row-span-7">
          <div className="relative ml-auto flex h-full w-8 flex-col items-center justify-start rounded-full bg-primary-green-8 py-4">
            {right && (
              <>
                <p className="mt-16 flex w-fit -rotate-90 transform truncate text-2xl font-thin text-white ">
                  {right.occupant.displayName}
                </p>
                <div className="outline-3 absolute -top-1 flex h-10 w-10 -rotate-90 transform items-center justify-center rounded-full bg-accent-navy outline outline-primary-black">
                  `<p className="text-center text-2xl ">`{right.position}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="row-start-9 col-span-11 col-start-2 flex flex-col justify-end">
          <div className="flex h-8 w-full items-center justify-end rounded-full bg-primary-green-8">
            <p className="mr-12 truncate pb-0.5 text-center text-2xl font-thin text-white">
              {bot.occupant.displayName}
            </p>
            <div className="outline-3 absolute -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-red-6 outline outline-primary-black">
              <p className="mb-[0.075rem] text-center text-2xl">
                {bot.position}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 col-start-[2] row-span-6 row-start-2 my-auto">
          <Deck count={deckCount} />
        </div>
        <div className="col-span-8 col-start-[4] row-span-6 row-start-2 -m-2 bg-primary-green-8">
          <Discards cards={discards} />
        </div>
        <div className="absolute inset-x-0 top-[103.5%]">
          <HeroGUI Hand={<HeroHand cards={hand} />} />
        </div>

        <div className="absolute inset-y-0 -right-28 flex flex-col items-center justify-center">
          <RightVillianDisplay />
        </div>

        <div className="absolute inset-y-0 -left-28 flex flex-col items-center justify-center">
          <LeftVillianDisplay />
        </div>
        <div className="absolute inset-x-0 -top-28">
          <TopVillianDisplay handCount={top.cardCount} />
        </div>
      </div>
    </div>
  );
}

function Discards({ cards }: { cards: DiscardCard[] }) {
  return (
    <div className="container mx-auto flex h-full items-center justify-center">
      {/* <div className="z-0 flex translate-y-10 rotate-12 bg-secondary-purple-8 pb-0.5 pr-0.5 shadow-cast">
        <img className="h-28" src="/img/deck/12-1.svg" alt="test" />
      </div>
      <div className="z-0 flex -translate-x-10 rotate-90 bg-secondary-purple-8 pr-0.5 shadow-cast">
        <img className="h-28" src="/img/deck/2-4.svg" alt="test" />
      </div> */}
    </div>
  );
}

function Cardback() {
  return (
    <div className="h-0.5 w-full bg-secondary-purple-8">
      <div className="h-1/4 bg-primary-red-8"></div>
    </div>
  );
}

function Deck({ count }: { count: number }) {
  return (
    <div className="container -mt-[45%] mb-[5%] flex flex-col items-center justify-center pr-5">
      {count > 0 ? (
        <div className="z-10 h-[6.25rem] w-[4.25rem] bg-secondary-purple-8">
          <div className="flex h-full w-full items-start justify-center">
            <div className="mx-[0.06rem] h-full w-full bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
          </div>
          {Array.from({ length: count <= 6 ? count : count * 0.65 }).map(
            (_, idx) => (
              <Cardback key={`cardback-${idx}`} />
            )
          )}
          <Cardback />
        </div>
      ) : (
        <div className="z-0 h-[6.25rem] w-[4.25rem] bg-primary-green-8"></div>
      )}
    </div>
  );
}

function TopVillianDisplay({ handCount }: { handCount: number }) {
  return (
    <div className="container -ml-6 flex justify-center">
      {Array.from({ length: handCount }).map((_, idx) => (
        <div
          key={`top-cardslot-${idx}`}
          className="h-[6.5rem] w-16 bg-secondary-purple-8 "
        >
          <div className=" flex h-full w-full items-start justify-center">
            <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
          </div>
        </div>
      ))}
      {/* <div className="h-[6.5rem] w-16 bg-secondary-purple-8 ">
        <div className=" flex h-full w-full items-start justify-center">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div>
      <div className="h-[6.5rem] w-16 bg-secondary-purple-8 ">
        <div className=" flex h-full w-full items-start justify-center">
          <div className="h-[97%] w-[98%] bg-primary-red-6 bg-[url('/img/texture/card-texture.svg')] bg-repeat-round brightness-95"></div>
        </div>
      </div> */}
    </div>
  );
}

function LeftVillianDisplay() {
  return (
    <>
      {/* <div className="mx-auto h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
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
      </div> */}
    </>
  );
}

function RightVillianDisplay() {
  return (
    <>
      {/* <div className="h-[3.75rem] w-[6.5rem] bg-secondary-purple-8">
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
      </div> */}
    </>
  );
}

function HeroGUI({ Hand }: { Hand: ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="w-1/4"></div>
      {Hand}
      <div className="w-1/4 pt-1.5">
        <ActionPanel />
      </div>
    </div>
  );
}

function ActionPanel() {
  return (
    <div className="relative flex flex-col space-y-1 text-secondary-gray-3">
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

type Card = {
  id: string;
};
function HeroHand({ cards }: { cards: Card[] }) {
  const [cardSlots, setCardSlots] = useState<CardSlot[]>(
    cards.map((card) => ({ cardId: card.id, isSelected: false }))
  );

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
