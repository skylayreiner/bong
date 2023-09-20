import { Dialog } from "@headlessui/react";
import { redirect, type ActionArgs } from "@remix-run/node";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import type { ChangeEvent, FormEvent } from "react";
import { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SubmitButton, CancelButton, CloseButton } from "~/components/buttons";
import { wsContext } from "~/hooks/socket-context";
import { getMatchById } from "~/models/match.server";
import { updateUserAsPlayerOfMatch } from "~/models/user.server";

import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const key = formData.get("match-key") as string;
  if (!key) {
    return { data: { error: "Error: Data entry errors @ match key input" } };
  }
  const match = await getMatchById(key);
  if (!match || !match.id) {
    return { data: { error: "Error: No match was found for input key" } };
  }
  if (match.players.length === match.seatLimit) {
    return {
      data: { error: "Error: Match w/ input key is full or in progress" }
    };
  }
  if (match.stage !== "pre") {
    throw new Error(
      "Error @ match join: The match corresponding to input key has either already started or ended & cannot be joined"
    );
  }
  await updateUserAsPlayerOfMatch(user.id, match.id, user.username);
  // emitter.emit(EVENTS.LOBBY_CHANGED, Date.now());
  return redirect(`../../match/${match.id}/lobby`);
};

export default function JoinRoute() {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

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
        <Dialog.Panel className="mb-[3%] flex w-full max-w-sm flex-col justify-center bg-primary-white pb-6 text-sm lg:max-w-md lg:text-lg">
          <span className="flex justify-end p-2">
            <CloseButton handleClick={handleClose} />
          </span>
          <Dialog.Title className="font-primary-black -mt-4 text-center text-2xl font-medium">
            Join w/ Key
          </Dialog.Title>
          <div className="mx-auto mb-1.5 flex w-3/4 flex-col space-y-3 pb-3">
            <JoinForm />
          </div>
          <div className="mx-auto flex w-5/6 space-x-2 text-center">
            <SubmitButton formId="join-form" />
            <CancelButton handleClick={handleClose} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function JoinForm() {
  const fetcher = useFetcher();

  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (fetcher.data) {
      const { data } = fetcher.data;
      setError(data?.error ?? "");
    }
  }, [fetcher.data]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    form.set("match-key", value);

    fetcher.submit(form, { method: "post", action: "." });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <Form
      method="post"
      id="join-form"
      className="mx-0 flex flex-col space-y-2"
      onSubmit={handleSubmit}
    >
      <span>{error}</span>
      <span className="inline-flex">
        <label
          className="my-1.5 min-w-fit"
          form="join-form"
          htmlFor="match-key"
        >
          Enter key:
        </label>
        <input
          className="mx-1.5 flex-grow bg-secondary-gray-3 px-2 py-1 italic text-secondary-gray-8 focus:bg-secondary-gray-6 focus:text-primary-black"
          id="match-key"
          name="match-key"
          placeholder={"match-key-to-join"}
          typeof="text"
          value={value}
          onChange={handleChange}
          required
        />
      </span>
    </Form>
  );
}
