import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useGame } from "~/utils";
import { useNavigate } from "@remix-run/react";

export default function RoundStart() {
  let [isOpen, setIsOpen] = useState(true);
  let [count, setCount] = useState(6);
  const { seats, roundsCount, roundIdx, rounds } = useGame();
  const { left, top, right, bot } = seats;
  const navigate = useNavigate();

  // const loaderData = {
  //   seats: [
  //     {
  //       position: "top",
  //       username: "x_killua_x",
  //       totalScore: 0
  //     },
  //     {
  //       position: "left",
  //       username: "x_killua_x",
  //       totalScore: 0
  //     }
  //   ]
  // };

  function handleClose() {
    setIsOpen(false);
    navigate("..");
  }

  useEffect(() => {
    function handleCountdownTick() {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
    if (count > 0) return handleCountdownTick();

    setIsOpen(false);
    navigate("..");
    return () => handleCountdownTick();
  }, [count, navigate]);

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 mx-0 flex items-center justify-center p-2 backdrop-brightness-50">
        <Dialog.Panel className="flex w-full flex-col justify-center bg-primary-white p-2 text-sm lg:max-w-2xl lg:text-lg">
          <Dialog.Title className="pt-4 text-center text-4xl font-semibold">
            {`ROUND ${roundIdx + 1}/${roundsCount}`}
          </Dialog.Title>
          <div className="flex flex-col space-y-1 px-10 py-4">
            <div className="m-2 grid h-full grid-cols-3 grid-rows-3 bg-primary-green-8 text-2xl font-thin ring-4 ring-inset ring-primary-black">
              {left && (
                <div className="col-span-1 row-start-2">
                  <div className="relative flex h-full w-full flex-col bg-primary-white text-primary-white ring-4 ring-inset ring-primary-black">
                    <div className="absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-navy text-center ring-4 ring-inset ring-primary-black">
                      {seats.left.position}
                    </div>
                    <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
                      <p className="mx-auto py-2 text-center text-3xl text-primary-black">
                        {seats.left.nametag}
                      </p>
                      <p className="mx-auto mb-3 text-center text-2xl text-primary-black">
                        {seats.left.totalScore}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {top && (
                <div className="col-start-2">
                  <div className="relative flex h-full w-full flex-col justify-center bg-primary-white text-primary-white ring-4 ring-inset ring-primary-black">
                    <div className="absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-teal text-center ring-4 ring-inset ring-primary-black">
                      {seats.top.position}
                    </div>
                    <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
                      <p className="mx-auto py-2 text-center text-3xl text-primary-black">
                        {seats.top.nametag}
                      </p>
                      <p className="mx-auto mb-3 text-center text-2xl text-primary-black">
                        {seats.top.totalScore}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-start-2 row-start-[3]">
                <div className="relative flex h-full w-full flex-col bg-primary-white text-primary-white ring-4 ring-inset ring-black">
                  <div className="absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-ruby text-center ring-4 ring-inset ring-black">
                    {bot.position}
                  </div>
                  <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
                    <p className="mx-auto py-2 text-center text-3xl text-primary-black">
                      {bot.nametag}
                    </p>

                    <p className="mx-auto mb-3 text-center text-2xl text-primary-black">
                      {bot.totalScore}
                    </p>
                  </div>
                </div>
              </div>
              {right && (
                <div className="col-start-3 row-start-2">
                  <div className="relative flex h-full w-full flex-col bg-primary-white text-primary-white ring-4 ring-inset ring-black">
                    <div className="absolute -top-5 left-0 right-0 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-goldenrod text-center  ring-4 ring-inset ring-black">
                      {seats.right.position}
                    </div>
                    <div className="my-2 flex flex-col items-center justify-center pt-3 leading-tight">
                      <p className="mx-auto py-2 text-center text-3xl text-primary-black">
                        {seats.right.nametag}
                      </p>

                      <p className="mx-auto mb-3 text-center text-2xl text-primary-black">
                        {seats.right.totalScore}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="container flex justify-center pb-2 text-center text-xl">
              {`${rounds[rounds.length - 1].startingPos} seat plays first`}
            </div>
            <button
              onClick={handleClose}
              className="gray shadow-base mx-auto w-3/4 bg-secondary-gray-6 py-1.5 text-xl font-medium text-primary-black outline-none"
            >
              {`Accept (Automatically closing in ${count}...)`}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
