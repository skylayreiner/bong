import { Dialog } from "@headlessui/react";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { SubmitButton, CancelButton, CloseButton } from "~/components/buttons";

export default function Signup() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  function handleCloseClick() {
    setIsOpen(false);
    navigate("..");
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseClick} className="relative z-50">
      <div
        className="fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50"
        aria-hidden="true"
      />
      <div className="fixed inset-4 flex items-center justify-center">
        <Dialog.Panel className="mb-[3%] flex w-full max-w-sm flex-col justify-center bg-primary-white pb-6 text-sm lg:max-w-md lg:text-lg">
          <span className="flex justify-end p-2">
            <CloseButton handleClick={handleCloseClick} />
          </span>
          <Dialog.Title className="font-primary-black -mt-4 text-center text-2xl font-medium">
            Signup
          </Dialog.Title>
          <div className="mx-auto my-2 flex w-5/6 flex-col space-y-3 pb-2.5">
            <SignupForm />
          </div>
          <div className="mx-auto flex w-5/6 space-x-2 text-center">
            <SubmitButton formId={"signup-form"} />
            <CancelButton handleClick={handleCloseClick} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function SignupForm() {
  const fetcher = useFetcher();
  const [error, setError] = useState("");

  useEffect(() => {
    if (fetcher.data) {
      const { data } = fetcher.data;
      setError(data.errorMsg ?? "");
    }
  }, [fetcher.data]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    form.set("signin-type", "signup");
    fetcher.submit(form, { method: "post", action: "/signin" });
  }

  return (
    <Form
      className="mx-auto flex flex-col space-y-2"
      id="signup-form"
      onSubmit={handleSubmit}
    >
      <span>{error}</span>
      <span className="inline-flex">
        <label htmlFor="username">Username:</label>
        <input
          className="container mx-1.5 bg-secondary-gray-6 focus:bg-secondary-gray-8"
          type="text"
          id="username"
          name="username"
          required
        />
      </span>
      <span className="inline-flex">
        <label htmlFor="password">Password:</label>
        <input
          className="container mx-1.5  bg-secondary-gray-6 focus:bg-secondary-gray-8"
          type="text"
          id="password"
          name="password"
          required
        />
      </span>
    </Form>
  );
}
