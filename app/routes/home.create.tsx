import { Dialog } from "@headlessui/react";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { SubmitButton, CancelButton, CloseButton } from "~/components/buttons";

export default function Create() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  function handleClose() {
    setIsOpen(false);
    navigate("..");
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50"
        aria-hidden="true"
      />
      <div className="fixed inset-4 flex items-center justify-center">
        <Dialog.Panel className="mb-[3%] pb-6 flex w-full max-w-sm flex-col justify-center bg-primary-white text-sm lg:max-w-md lg:text-lg">
          <span className="flex justify-end p-2">
            <CloseButton handleClick={handleClose} />
          </span>

          <Dialog.Title className="-mt-4 font-primary-black text-center text-2xl font-medium">
            Create
          </Dialog.Title>
          <div className="mx-auto flex w-5/6 flex-col space-y-3 my-2 pb-2.5">
            <CreateForm />
          </div>
          <div className="mx-auto flex w-5/6 space-x-2 text-center">
            <SubmitButton formId="create-form" isProcessing={true} />
            <CancelButton handleClick={handleClose} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function CreateForm() {
  const fetcher = useFetcher();
  const [error, setError] = useState('');

  useEffect(() => {
    if (fetcher.data) {
      const { data } = fetcher.data;
      setError(data.errorMsg ?? '');
    }
  }, [fetcher.data])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement);
    form.set("registration-type", "create")
    fetcher.submit(form);
  }

  return (
    <Form id="create-form" className="space-y-2 mx-auto flex flex-col" onSubmit={handleSubmit}>
      <span>{error}</span>
      <span className="inline-flex">
        <label htmlFor="username-input">Username:</label>
        <input className="container bg-secondary-gray-6 focus:bg-secondary-gray-8 mx-1.5" type="text" id="username-input" name="username" required />
      </span>
      <span className="inline-flex">
        <label htmlFor="password-input">Password:</label>
        <input className="container bg-secondary-gray-6  focus:bg-secondary-gray-8 mx-1.5" type="text" id="password-input" name="password" required />
      </span>
    </Form>
  )
}