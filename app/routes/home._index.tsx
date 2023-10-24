import { Link } from "@remix-run/react";
import RulebookModal from "~/components/rulebook-modal";
import { useUser } from "~/utils";

export default function HomeRoute() {
  const user = useUser();

  return (
    <main className="relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center">
      <div className="max-w-7xl sm:px-6 lg:px-8"></div>
    </main>
  );
}
