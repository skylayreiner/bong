import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { SubmitButton, CancelButton, PrimaryButton } from "./buttons";
import { Form } from "@remix-run/react";

export default function CreateModal() {
  let [isOpen, setIsOpen] = useState(false);

  function handleOpenClick() {
    setIsOpen(true);
  }

  function handleCloseClick() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50"
            aria-hidden="true"
          />
          <div className="fixed inset-4 flex items-center justify-center">
            <Dialog.Panel className="mb-[3%] flex w-full max-w-sm flex-col justify-center bg-primary-white p-6 text-sm lg:max-w-md lg:text-lg">
              <Dialog.Title className="font-primary-black text-center text-3xl font-medium underline underline-offset-2">
                Room Settings
              </Dialog.Title>

              <Form id="create-match-form" className="mx-auto flex w-5/6 flex-col space-y-3 py-2.5">
                <span>
                  <label htmlFor="seat-count-select">Seats:</label>
                  <select
                    defaultValue={4}
                    typeof="number"
                    id="seat-count-select"
                    name="seat-count-select"
                    className="mx-2 bg-secondary-gray-6 focus:bg-secondary-gray-8 focus:font-medium"
                  >
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                  </select>
                </span>
                <span>
                  <label htmlFor="round-count-select"># of Rounds:</label>
                  <select
                    id="round-count-select"
                    name="round-count-select"
                    className="mx-2 bg-secondary-gray-6 focus:bg-secondary-gray-8 focus:font-medium"
                  >
                    {Array.from({ length: 10 }, (_, idx) => 20 - idx).map(
                      (count) => (
                        <option key={`count-${count}`} value={count}>
                          {count}
                        </option>
                      )
                    )}
                  </select>
                </span>
              </Form>
              <div className="mx-auto flex w-5/6 space-x-2 text-center">
                <SubmitButton formId="create-match-form" isProcessing={true} />
                <CancelButton handleClick={handleCloseClick} />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
      <PrimaryButton handleClick={handleOpenClick}>Create match</PrimaryButton>
    </>
  );
}
