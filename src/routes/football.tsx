import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/football")({
  component: Football,
});

function Football() {
  return <div>Hello "/football"!</div>;
}
