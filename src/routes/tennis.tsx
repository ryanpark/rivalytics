import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "../const/api";
import { useState } from "react";

export const Route = createFileRoute("/tennis")({
  component: Tennis,
});

interface TennisPlayer {
  PlayerID: number;
  FirstName: string;
  LastName: string;
}

const MAX_PLAYERS_TO_SHOW = 8;

function Tennis() {
  const [search, setSearch] = useState("");

  const {
    isPending,
    error,
    data: players,
    isFetching,
  } = useQuery({
    queryKey: ["tennisPlayers"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.tennis.players);
      return await response.json();
    },
  });

  const filteredPlayers = players?.filter(
    (player: TennisPlayer) =>
      player.FirstName?.toLowerCase().includes(search.toLowerCase()) ||
      player.LastName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Tennis Players</h1>
      <div className="mb-4 flex gap-4">
        <input
          placeholder="Search by first or last name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <button>Clear Search</button>
      </div>
      {isPending ? (
        <div>Loading players...</div>
      ) : error ? (
        <div className="text-red-500">{error.message}</div>
      ) : isFetching ? (
        <div>Updating players...</div>
      ) : filteredPlayers?.length === 0 ? (
        <div>No players found.</div>
      ) : (
        <ul className="border-t">
          {filteredPlayers
            ?.slice(0, MAX_PLAYERS_TO_SHOW)
            ?.map((player: TennisPlayer) => (
              <li key={player.PlayerID} className="py-1 border-b">
                {player.FirstName} {player.LastName}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
