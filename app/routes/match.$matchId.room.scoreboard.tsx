import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";

export default function ScoreboardRoute() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  function handleClose() {
    setIsOpen(false);
    navigate("..");
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div
        className="fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50"
        aria-hidden="true"
      />
      <div className="fixed inset-4 flex items-center justify-center">
        <Dialog.Panel className="mb-[3%] flex min-w-[50vw] max-w-5xl flex-col justify-center bg-primary-white p-1 text-sm lg:max-w-md lg:text-lg">
          <div className="self-end">
            <button
              className="rounded-xs m-1 bg-secondary-gray-6 shadow-primary"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Dialog.Title>
            <h1 className="-mt-6 text-center text-3xl font-bold underline underline-offset-4">
              SCOREBOARD
            </h1>
          </Dialog.Title>
          <div className="mx-6 mb-6 mt-2 max-h-[45vh] overflow-y-scroll bg-secondary-gray-6">
            <table className="text-md table table-auto p-2 text-center">
              <thead className="sticky top-0 bg-primary-white">
                <th scope="col" className="w-14 font-medium">
                  #
                </th>
                <th scope="col" className="w-36 font-medium ">
                  Gon
                </th>
                <th scope="col" className="w-36 font-medium">
                  Killua
                </th>
                <th scope="col" className="w-36 font-medium">
                  Hisoka
                </th>
                <th scope="col" className="w-36 font-medium">
                  Leorio
                </th>
              </thead>
              <tbody className="bg-primary-green-4 p-2">
                {Array.from({ length: 20 }, (_, idx) =>
                  idx % 2 === 1 ? (
                    <tr className="bg-primary-white" key={idx}>
                      <th className="text-primary-black" scope="row">
                        {idx + 1}
                      </th>
                      <td className="bg-primary-black bg-opacity-10">9</td>
                      <td>6,219</td>
                      <td>7</td>
                      <td>7,223</td>
                    </tr>
                  ) : (
                    <tr key={idx}>
                      <th className="text-primary-white" scope="row">
                        {idx + 1}
                      </th>
                      <td className="bg-primary-black bg-opacity-10">9</td>
                      <td>6,219</td>
                      <td>7</td>
                      <td>7,223</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
