import { Dialog, Tab } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PrimaryButton, CloseButton, BackButton } from "./buttons";

export default function RulebookModal() {
  let [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen() {
    setIsOpen(true);
  }

  function handleToggleClose() {
    setIsOpen(false)
  }

  return (
    <>{isOpen &&
      <Dialog open={isOpen} onClose={handleToggleClose} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-secondary-gray-3 m-2 p-2 min-w-[55vw] text-sm lg:text-lg">
            <div className="flex justify-between -m-1">
              <BackButton handleClick={handleToggleClose} />
              <CloseButton handleClick={handleToggleClose} />
            </div>
            <Dialog.Title>
              <h1 className="-mt-4 mb-1 text-center font-medium text-xl uppercase">
                How to play
              </h1>
            </Dialog.Title>
            <Tab.Group>
              <div className="grid grid-cols-12">
                <Tab.List className="col-span-2 flex flex-col z-10 space-y-1.5 mt-2">
                  {Array.from({ length: 6 }, (_, idx) => idx + 1).map((tab) => (
                    <RulebookTab key={tab} label={`Tab ${tab}`} />
                  ))}
                </Tab.List>
                <Tab.Panels className="-ml-1.5 z-0 flex col-span-10 bg-primary-white overflow-y-scroll max-h-[50vh] border-8 border-primary-black">
                  <Tab.Panel>
                    <div className="h-[100vh] bg-primary-white">
                      <h1 className="text-start text-xl -mt-1"></h1>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {' '}
                    <div className="z-20 h-[100vh] bg-primary-white">
                      <h1 className="text-start text-xl -mt-1"></h1>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {' '}
                    <div className="z-20 h-[100vh] bg-primary-white">
                      <h1 className="text-start text-xl -mt-1"></h1>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {' '}
                    <div className="z-20 h-[100vh] bg-primary-white">
                      <h1 className="text-start text-xl -mt-1"></h1>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {' '}
                    <div className="z-20 h-[100vh] bg-primary-white">
                      <h1 className="text-start text-xl -mt-1"></h1>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {' '}
                    <div className="z-20 h-[100vh] bg-primary-white">
                      <h1 className="text-start text-xl -mt-1"></h1>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </Tab.Group>
          </Dialog.Panel>
        </div >
      </Dialog>
    }
      <PrimaryButton handleClick={handleToggleOpen}>How to play</PrimaryButton>
    </>
  )
}

function RulebookTab({ label }: { label: string }) {
  return (
    <Tab as={Fragment}>
      {({ selected }) =>
        selected ? (
          <button className="text-sm text-secondary-gray-6 py-1 bg-primary-white outline-none">
            {label}
          </button>
        ) : (
          <button className="text-sm text-secondary-gray-3 py-1 bg-primary-black outline-none">
            {label}
          </button>
        )
      }
    </Tab>
  )
}
