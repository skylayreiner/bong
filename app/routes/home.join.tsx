import { Dialog } from "@headlessui/react";
import type { ActionArgs } from "@remix-run/node";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { SubmitButton, CancelButton, CloseButton } from "~/components/buttons";
import { getMatchForKey, registerMatchParticipant } from "~/models/match.server";
import { requireUser, updateUserSessionMatchId } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const key = formData.get("match-key") as string;
  if (!key) {
    return { data: { error: 'Error: Data entry errors @ match key input' } }
  }
  const match = await getMatchForKey(key);
  if (!match || !match.id) {
    return { data: { error: "Error: No match was found for input key" } }
  }
  if (match.signups.length === match.seats) {
    return { data: { error: "Error: Match w/ input key is full or in progress" } }
  }
  await registerMatchParticipant(match.id, user.id);
  return updateUserSessionMatchId({ request, matchId: match.id })
};

export default function Join() {
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
            Join
          </Dialog.Title>
          <div className="mx-auto flex w-5/6 flex-col space-y-3 my-2 pb-2.5">
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
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (fetcher.data) {
      const { data } = fetcher.data;
      setError(data?.error ?? '');
    }
  }, [fetcher.data])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement);
    form.set("match-key", value);
    fetcher.submit(form, { method: "post", action: "." });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return (
    <Form method="post" id="join-form" className="space-y-2 mx-auto flex flex-col" onSubmit={handleSubmit}>
      <span>{error}</span>
      <span className="inline-flex">
        <label className="my-1" form="join-form" htmlFor="match-key">Enter match key:</label>
        <input className="py-1 px-2 text-secondary-gray-8 italic focus:text-primary-black bg-secondary-gray-3 focus:bg-secondary-gray-6 mx-1.5" id="match-key" name="match-key" placeholder={'match-key-to-join'} typeof="text" value={value} onChange={handleChange} required />
      </span>
    </Form>
  )
}