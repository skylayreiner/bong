import { Dialog } from "@headlessui/react";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import type { FormEvent } from "react";
import React, { useEffect, useState } from "react";
import { SubmitButton, CancelButton } from "~/components/buttons";

export default function Login() {
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
                Login
              </Dialog.Title>
              <LoginForm />
              <div className="mx-auto flex w-5/6 space-x-2 text-center">
                <SubmitButton formId="login-form" isProcessing={true} />
                <CancelButton handleClick={handleCloseClick} />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
}

function LoginForm() {
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
    form.set("registration-type", "login")
    fetcher.submit(form, { action: "/register", method: "post" });
  }

  return (
    <Form id="login-form" className="space-y-2 mx-auto flex flex-col" onSubmit={handleSubmit}>
      <span>{error}</span>
      <span className="inline-flex">
        <label htmlFor="username-input">Username:</label>
        <input className="container bg-secondary-gray-3 focus:bg-secondary-gray-6 mx-1.5" type="text" id="username-input" name="username" required />
      </span>
      <span className="inline-flex">
        <label htmlFor="password-input">Password:</label>
        <input className="container bg-secondary-gray-3  focus:bg-secondary-gray-6 mx-1.5" type="text" id="password-input" name="password" required />
      </span>
    </Form>
  )
}