import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import { requireMatchRegistration } from '~/session.server';


export const loader = async ({ request, params }: LoaderArgs) => {
  return await requireMatchRegistration(request);
}

export default function Lobby() {
  const loaderData = useLoaderData();
  return (
    <div>{`Lobby ${loaderData.id}`}</div>
  )
}
