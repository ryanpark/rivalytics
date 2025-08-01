import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cricket")({
  component: Cricket,
});

function Cricket() {
  return <div>Hello "/cricket"!</div>;
}
