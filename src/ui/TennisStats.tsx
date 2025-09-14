"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const TennisComparison = ({ data }) => {
  const player1 = { name: data.players.player1.name };
  const player2 = { name: data.players.player2.name };

  const player1Wins = data.head_to_head_record.player1_wins;
  const player2Wins = data.head_to_head_record.player2_wins;
  const totalMatches = data.head_to_head_record.total_matches;

  const player1WinPercentage = (player1Wins / totalMatches) * 100;
  const player2WinPercentage = (player2Wins / totalMatches) * 100;

  const headToHeadData = [
    {
      name: player1.name,
      wins: player1Wins,
      percentage: player1WinPercentage,
    },
    {
      name: player2.name,
      wins: player2Wins,
      percentage: player2WinPercentage,
    },
  ];

  const pieData = [
    { name: player1.name, value: player1Wins, color: "#3b82f6" },
    { name: player2.name, value: player2Wins, color: "#eab308" },
  ];

  const statsComparisonData = [
    {
      stat: "Age",
      [player1.name]: data?.key_statistics.player1?.age,
      [player2.name]: data?.key_statistics.player2?.age,
    },
    {
      stat: "Aces/Match",
      [player1.name]: data?.key_statistics.player1?.aces_per_match,
      [player2.name]: data?.key_statistics.player2?.aces_per_match,
    },
    {
      stat: "1st Serve %",
      [player1.name]: data?.key_statistics.player1?.first_serve_pct,
      [player2.name]: data?.key_statistics.player2?.first_serve_pct,
    },
    {
      stat: "BP Saved %",
      [player1.name]: data?.key_statistics.player1?.break_points_saved_pct,
      [player2.name]: data?.key_statistics.player2?.break_points_saved_pct,
    },
    {
      stat: "Top 10 Wins",
      [player1.name]: data?.key_statistics.player1?.top10_wins_2024,
      [player2.name]: data?.key_statistics.player2?.top10_wins_2024,
    },
  ];

  const yearlyData = Object.entries(data.yearly_performance_timeline).map(
    ([year, yearData]) => ({
      year,
      [player1.name]: Number.parseInt(yearData.player1.year_end_ranking),
      [player2.name]: Number.parseInt(yearData.player2.year_end_ranking),
    })
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Tennis Player Head-to-Head Analysis
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Head-to-Head Record Card with Chart */}
        <div className="card bg-base-100 shadow-xl lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Head-to-Head Record</h2>
            <p className="text-sm text-gray-500">
              Win distribution between {player1.name} and {player2.name}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={headToHeadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Bar dataKey="wins" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Total Matches: {totalMatches}
            </p>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">AI Insights</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {data.ai_insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics Comparison Chart */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Key Statistics Comparison</h2>
          <p className="text-sm text-gray-500">
            Side-by-side comparison of key performance metrics
          </p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statsComparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stat" />
                <YAxis />
                <Legend />
                <Bar dataKey={player1.name} fill="#3b82f6" />
                <Bar dataKey={player2.name} fill="#eab308" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Yearly Rankings Chart */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Year-End Rankings Timeline</h2>
          <p className="text-sm text-gray-500">
            ATP ranking progression over the years (lower is better)
          </p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={yearlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis reversed domain={[1, "dataMax"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={player1.name}
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey={player2.name}
                  stroke="#eab308"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Player 1 Recent Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{player1.name} - Recent Form</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Last 10 matches: {data.recent_form.player1.last_10_matches.wins}
                W - {data.recent_form.player1.last_10_matches.losses}L
              </p>
              <p className="text-sm text-gray-600">
                Current win streak:{" "}
                {data.recent_form.player1.current_win_streak}
              </p>
              <p className="text-sm mt-2">
                <strong>Notable recent win:</strong>{" "}
                {data.recent_form.player1.notable_recent_win}
              </p>
              <p className="text-sm">
                <strong>Notable recent loss:</strong>{" "}
                {data.recent_form.player1.notable_recent_loss}
              </p>
            </div>
          </div>
        </div>

        {/* Player 2 Recent Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{player2.name} - Recent Form</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Last 10 matches: {data.recent_form.player2.last_10_matches.wins}
                W - {data.recent_form.player2.last_10_matches.losses}L
              </p>
              <p className="text-sm text-gray-600">
                Current win streak:{" "}
                {data.recent_form.player2.current_win_streak}
              </p>
              <p className="text-sm mt-2">
                <strong>Notable recent win:</strong>{" "}
                {data.recent_form.player2.notable_recent_win}
              </p>
              <p className="text-sm">
                <strong>Notable recent loss:</strong>{" "}
                {data.recent_form.player2.notable_recent_loss}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Last Meeting & Recent Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Last Meeting</h2>
            <p className="text-lg font-semibold">
              {data.last_meeting.tournament}
            </p>
            <p className="text-sm text-gray-600">{data.last_meeting.round}</p>
            <p className="mt-2">
              Winner:{" "}
              <span className="font-bold">{data.last_meeting.winner}</span>
            </p>
            <p>
              Score:{" "}
              <span className="font-bold">{data.last_meeting.score}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {data.last_meeting.date} • {data.last_meeting.surface}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Matches</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Tournament</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Winner</th>
                    <th className="text-left py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_matches_between.map((match, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{match.tournament}</td>
                      <td className="py-2">{match.date}</td>
                      <td className="py-2 font-semibold">{match.winner}</td>
                      <td className="py-2">{match.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TennisComparison;
