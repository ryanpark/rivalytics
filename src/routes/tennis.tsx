import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "../const/api";
import { useState } from "react";
import type { Key } from "react";

import { analyzeHeadToHead } from "../actions/action";
import TennisComparison from "../ui/TennisStats";
import type { TennisComparisonType } from "../ui/TennisComparisonType";
import { User, Target, Rocket } from "lucide-react";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

export const Route = createFileRoute("/tennis")({
  component: Tennis,
});

interface TennisPlayer {
  CommonName: string;
  FirstName: string;
  LastName: string;
  PlayerId: number;
  key: string;
  label: string;
}

function Tennis() {
  const [headToHeadData, setHeadToHeadData] =
    useState<TennisComparisonType | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");

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

  const startAnalyzeHeadToHead = async () => {
    if (firstPlayer && secondPlayer) {
      setIsAnalyzing(true);
      try {
        const response = await analyzeHeadToHead({
          player1: firstPlayer || "",
          player2: secondPlayer || "",
        });

        let normalizeData;
        if (typeof response === "string") {
          normalizeData = JSON.parse(response);
        } else {
          normalizeData = response;
        }
        setHeadToHeadData(normalizeData);
      } catch (error) {
        console.error("Error in head-to-head analysis:", error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const playerData = players?.map((player: TennisPlayer) => ({
    ...player,
    key: `${player.FirstName} ${player.LastName}`,
    label: `${player.FirstName} ${player.LastName}`,
  }));

  return (
    <div className="flex flex-col items-center space-y-7 font-display  pt-5">
      <div>
        <img src="/rivalLogo.svg" alt="Rival Logo" />
      </div>
      <h3 className="text-3xl font-[100]">Compare Your Favorites</h3>
      <h2 className="text-center text-white mb-20">
        Select players or teams to analyze their head-to-head performance,{" "}
        <br />
        discover patterns, and uncover competitive insights.
      </h2>
      <div className="flex text-white">
        <User className="mr-2" />
        Player vs Player
      </div>
      <div className="md:max-w-3xl w-full">
        <div className="border-1 rounded-sm w-full bg-[#A1B1FF]/20 p-5 border-[#A1B1FF] flex flex-col space-y-5">
          <div className="flex">
            <Target className="mr-2 text-primary" />
            <h4 className="text-white font-bold">Player Comparison</h4>
          </div>
          {isFetching && (
            <div className="flex">
              <span className="loading loading-spinner loading-xl mr-3"></span>
              Fetching Players...
            </div>
          )}
          {error && "Error : Failed to load players"}
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div>
              <div className="pb-3 flex">
                <User className="mr-2" />
                Player 1
              </div>
              {isPending ||
                (isFetching && (
                  <>
                    <span className="loading loading-spinner loading-xl"></span>{" "}
                    Loading Players ...
                  </>
                ))}
              {players && (
                <Autocomplete
                  defaultItems={playerData}
                  placeholder="Search a Player"
                  inputValue={firstPlayer ?? ""}
                  onInputChange={setFirstPlayer}
                  selectorIcon={false}
                  clearIcon={false}
                  onSelectionChange={(key: Key | null) => {
                    if (key === null) {
                      setFirstPlayer("");
                      return;
                    }
                    setFirstPlayer(String(key));
                  }}
                  radius="md"
                  className="input max-w-xs border-1 border-neutral bg-[#C7D2FE] text-gray-700 w-[300px]"
                >
                  {(playerData: TennisPlayer) => (
                    <AutocompleteItem
                      key={playerData.key}
                      className="bg-[#C7D2FE] text-gray-700 pl-5 pr-5 truncate"
                    >
                      {playerData.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            </div>
            <div className="flex items-center pt-5">
              <img src="/bolt.png" className="mr-2" />
              <img src="/VS.png" width="59" />
            </div>
            <div>
              <div className="pb-3 flex">
                <User className="mr-2" />
                Player 2
              </div>
              {isPending ||
                (isFetching && (
                  <>
                    <span className="loading loading-spinner loading-xl"></span>{" "}
                    Loading Players ...
                  </>
                ))}
              {players && (
                <Autocomplete
                  defaultItems={playerData}
                  placeholder="Search a Player"
                  inputValue={secondPlayer ?? ""}
                  onInputChange={setSecondPlayer}
                  selectorIcon={false}
                  clearIcon={false}
                  onSelectionChange={(key: Key | null) => {
                    if (key === null) {
                      setSecondPlayer("");
                      return;
                    }
                    setSecondPlayer(String(key));
                  }}
                  radius="md"
                  className="input border-1 border-neutral bg-[#C7D2FE] text-gray-700 w-[300px]"
                >
                  {(playerData: TennisPlayer) => (
                    <AutocompleteItem
                      key={playerData.key}
                      className="bg-[#C7D2FE] text-gray-700 pl-5 pr-5 truncate"
                    >
                      {playerData.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 mt-5">
        <div className="mb-4 flex gap-4 justify-center align-middle">
          <button
            className="btn btn-primary btn-lg"
            onClick={startAnalyzeHeadToHead}
            disabled={!firstPlayer || !secondPlayer}
          >
            {isAnalyzing ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              <Rocket className="text-gray-900" />
            )}
            Analyze Head-to-Head
          </button>
          <a
            className="link"
            onClick={() => {
              console.log(firstPlayer);
              console.log(secondPlayer);
              setFirstPlayer("");
              setSecondPlayer("");
            }}
          >
            Clear Search
          </a>
        </div>
      </div>
      {headToHeadData && <TennisComparison data={headToHeadData} />}
    </div>
  );
}
