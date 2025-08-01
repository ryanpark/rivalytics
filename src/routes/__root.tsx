import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Button } from "antd";

export const Route = createRootRoute({
  component: () => (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <div className="navbar bg-base-100 shadow-sm">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/tennis" className="btn btn-ghost text-xl">
          🎾 Tennis
        </Link>
        <Link to="/football" className="btn btn-ghost text-xl">
          ⚽ Football
        </Link>
        <Link to="/cricket" className="btn btn-ghost text-xl">
          🏏 Cricket
        </Link>
        <Link to="/basketball" className="btn btn-ghost text-xl">
          🏀 Basketball
        </Link>
      </div>
      <Button type="primary">Button</Button>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
