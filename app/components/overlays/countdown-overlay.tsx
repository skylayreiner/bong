import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";

export default function CountdownOverlay() {
  let [isOpen, setIsOpen] = useState(true);
  let [count, setCount] = useState(10);

  useEffect(() => {
    function handleCountdownTick() {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
    if (count > 0) return handleCountdownTick();
    setIsOpen(false);
    return () => handleCountdownTick();
  }, [count]);

  return (
    <div className="absolute inset-0 top-0 z-20 flex flex-col items-center justify-center overflow-hidden">
      <Dialog
        open={isOpen}
        className="relative z-50 text-primary-white"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 mx-0 flex items-center justify-center p-4 backdrop-brightness-[.1]">
          <Dialog.Panel className="flex w-full max-w-sm flex-col justify-center text-sm lg:max-w-md lg:text-lg">
            <h1 className="text-center text-4xl">Starting in...</h1>
            <h1 className="py-4 text-center text-6xl font-medium">{count}</h1>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
