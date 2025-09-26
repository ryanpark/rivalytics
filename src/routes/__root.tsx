import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="p-10 bg-[url(/wallb.png)] bg-no-repeat bg-[center_220px]">
      <Link to="/">
        <img src="/fav.svg" className="w-[20px]" />
      </Link>

      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
