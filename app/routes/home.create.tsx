import { Dialog } from "@headlessui/react";
import { redirect, type ActionArgs } from "@remix-run/node";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { SubmitButton, CancelButton, CloseButton } from "~/components/buttons";
import { createMatch } from "~/models/match.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const maxSeats = Number(formData.get("seat-limit"));
  const roundsInGame = Number(formData.get("rounds-count"));
  const match = await createMatch(
    maxSeats,
    roundsInGame,
    user.id,
    user.username
  );
  console.log(match, "match @ create");
  if (!match || !match.id) return { error: "Create match failure" };
  return redirect(`../../match/${match.id}/lobby`);
};

export default function CreateRoute() {
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
        <Dialog.Panel className="mb-[3%] flex w-full max-w-sm flex-col bg-primary-white pb-6 text-sm lg:max-w-md lg:text-lg">
          <span className="flex justify-end p-2">
            <CloseButton handleClick={handleClose} />
          </span>

          <Dialog.Title className="font-primary-black -mt-4 text-center text-2xl font-medium">
            Match Settings
          </Dialog.Title>
          <div className="mx-auto my-2 flex w-5/6 flex-col space-y-3 pb-2.5">
            <CreateForm />
          </div>
          <div className="mx-auto flex w-5/6 space-x-2 text-center">
            <SubmitButton formId="create-form" />
            <CancelButton handleClick={handleClose} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function CreateForm() {
  const fetcher = useFetcher();
  const [error, setError] = useState("");
  useEffect(() => {
    if (fetcher.data && fetcher.data["error"]) {
      console.log(fetcher.data);
      setError(fetcher.data.error);
    }
  }, [fetcher.data]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    fetcher.submit(form, { method: "post", action: "." });
  }

  return (
    <Form
      id="create-form"
      className="mx-2 flex flex-col space-y-2"
      onSubmit={handleSubmit}
    >
      {error}
      <div className="container">
        <label htmlFor="seat-limit">Max Seats:</label>
        <select
          defaultValue={4}
          className="mx-1 bg-secondary-gray-6"
          typeof="number"
          id="seat-limit"
          name="seat-limit"
        >
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="rounds-count"># of Rounds:</label>
        <select
          defaultValue={20}
          id="rounds-count"
          typeof="number"
          name="rounds-count"
          className="mx-1 bg-secondary-gray-6"
        >
          <option value={20}>20</option>
          <option value={19}>19</option>
          <option value={18}>18</option>
        </select>
      </div>
    </Form>
  );
}
