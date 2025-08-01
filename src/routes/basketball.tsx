import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/basketball")({
  component: Basketball,
});

function Basketball() {
  return <div>Hello "/basketball"!</div>;
}
