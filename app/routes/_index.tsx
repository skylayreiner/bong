import type { V2_MetaFunction } from "@remix-run/node";
import { useNavigate, Outlet } from "@remix-run/react";
import { useEffect } from "react";
import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("./home");
    } else {
      navigate("./?register");
    }
  }, [navigate, user]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
