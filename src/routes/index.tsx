import { createFileRoute, Link } from "@tanstack/react-router";
import { ChartBar, ChartLine, User, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center space-y-7 font-display bg-[url(/wallb.png)]  bg-no-repeat  bg-[center_220px] pt-20">
      <div>
        <img src="/rivalLogo.svg" />
      </div>
      <h2 className="text-center text-2xl text-white mb-20">
        Dive deep into head-to-head match histories between your favourite{" "}
        <br />
        players and teams. Discover rivalries, track performance, and uncover{" "}
        <br />
        insights across tennis, football, and more.
      </h2>

      <div className="navbar shadow-smflex flex items-center justify-center space-x-4">
        <button className="btn btn-neutral">
          <Link to="/tennis">🎾 Tennis</Link>
        </button>
        <button className="btn btn-neutral disabled">
          <Link to="/football">⚽ Football</Link>
        </button>
        <button className="btn btn-neutral">
          <Link to="/cricket">🏏 Cricket</Link>
        </button>
        <button className="btn btn-neutral">
          <Link to="/basketball">🏀 Basketball</Link>
        </button>
      </div>
      <div className="space-y-3 mb-20">
        <h3 className="text-3xl font-[100]">
          Powerful Features for Sports Analysis
        </h3>
        <p className="text-center text-white">
          Everything you need to dive deep into sports rivalries and <br />
          uncover meaningful insights from match data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:gap-5 min-w-[16rem] sm:min-w-2xl justify-center mx-4 sm:mx-10 md:mx-40 mb-8 sm:mb-30">
        <div className="border-1 rounded-sm bg-[#A1B1FF]/20 p-5  border-[#A1B1FF] flex flex-col space-y-5">
          <ChartBar />
          <h4 className="text-xl">Advanced Analytics</h4>
          <p className="text-white">
            Deep statistical analysis with performance metrics, trends, and
            predictive insights across multiple sports.
          </p>
        </div>
        <div className="border-1 rounded-sm bg-[#A1B1FF]/20 p-5  border-[#A1B1FF] flex flex-col space-y-5">
          <ChartLine />
          <h4 className="text-xl">Performance Tracking</h4>
          <p className="text-white">
            Track player and team performance over time with detailed charts and
            historical comparisons.
          </p>
        </div>
        <div className="border-1 rounded-sm bg-[#A1B1FF]/20 p-5  border-[#A1B1FF] flex  lex flex-col space-y-5">
          <User />
          {/* <User /> */}
          <h4 className="text-xl">Head-to-Head Analysis</h4>
          <p className="text-white">
            Comprehensive rivalry analysis showing win-loss records, surface
            preferences, and match contexts.
          </p>
        </div>
        <div className="border-1 rounded-sm bg-[#A1B1FF]/20 p-5  border-[#A1B1FF] flex lex flex-col space-y-5">
          <Trophy />
          <h4 className="text-xl">Tournament Insights</h4>
          <p className="text-white">
            Analyze performance across different tournaments, surfaces, and
            competitive environments.
          </p>
        </div>
      </div>
      <button className="btn btn-neutral">Start Analyzing</button>
    </div>
  );
}
