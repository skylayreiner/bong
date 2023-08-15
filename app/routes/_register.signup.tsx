import { Dialog } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import { SubmitButton, CancelButton } from "~/components/buttons";

export default function Signup() {
  let [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  function handleCloseClick() {
    setIsOpen(false);
    navigate("..");
  }

  return (
    <>
      {isOpen && (
        <Dialog
          open={true}
          onClose={handleCloseClick}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50"
            aria-hidden="true"
          />
          <div className="fixed inset-4 flex items-center justify-center">
            <Dialog.Panel className="mb-[3%] flex w-full max-w-sm flex-col justify-center bg-primary-white p-6 text-sm lg:max-w-md lg:text-lg">
              <Dialog.Title className="font-primary-black text-center text-3xl font-medium underline underline-offset-2">
                Signup
              </Dialog.Title>

              <div className="mx-auto flex w-5/6 flex-col space-y-3 py-2.5"></div>
              <div className="mx-auto flex w-5/6 space-x-2 text-center">
                <SubmitButton isProcessing={true} />
                <CancelButton handleClick={handleCloseClick} />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
}
