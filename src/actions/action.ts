// import { generateText } from "ai";
// import { createOpenAI } from "@ai-sdk/openai";
import OpenAI from "openai";

const headToHeadSchema = JSON.stringify({
  players: {
    player1: { name: "string" },
    player2: { name: "string" },
  },
  head_to_head_record: {
    total_matches: "number",
    player1_wins: "number",
    player2_wins: "number",
    surface_breakdown: {
      hard: { player1: "number", player2: "number" },
      clay: { player1: "number", player2: "number" },
      grass: { player1: "number", player2: "number" },
    },
    last_5_matches: {
      player1: "number",
      player2: "number",
    },
  },
  recent_form: {
    player1: {
      last_10_matches: { wins: "number", losses: "number" },
      current_win_streak: "number",
      notable_recent_win: "string",
      notable_recent_loss: "string",
    },
    player2: {
      last_10_matches: { wins: "number", losses: "number" },
      current_win_streak: "number",
      notable_recent_win: "string",
      notable_recent_loss: "string",
    },
  },
  last_meeting: {
    tournament: "string",
    round: "string",
    date: "string",
    surface: "string",
    score: "string",
    winner: "string",
  },
  recent_matches_between: [
    {
      tournament: "string",
      date: "string",
      round: "string",
      surface: "string",
      score: "string",
      winner: "string",
    },
  ],
  yearly_performance_timeline: {
    year: {
      player1: {
        win_loss: "string",
        titles: "number",
        best_grand_slam: "string",
        year_end_ranking: "number | string",
      },
      player2: {
        win_loss: "string",
        titles: "number",
        best_grand_slam: "string",
        year_end_ranking: "number | string",
      },
    },
  },
  key_statistics: {
    player1: {
      age: "number",
      height_cm: "number",
      playing_hand: "string",
      aces_per_match: "number",
      first_serve_pct: "number",
      break_points_saved_pct: "number",
      return_games_won_pct: "number",
      top10_wins_2024: "number",
      best_surface: "string",
    },
    player2: {
      age: "number",
      height_cm: "number",
      playing_hand: "string",
      aces_per_match: "number",
      first_serve_pct: "number",
      break_points_saved_pct: "number",
      return_games_won_pct: "number",
      top10_wins_2024: "number",
      best_surface: "string",
    },
  },
  ai_insights: ["string"],
});
/**
 * Analyzes the head-to-head match-up between two tennis players using the OpenAI API.
 * @param player1 The first tennis player.
 * @param player2 The second tennis player.
 * @returns A string containing the AI-generated analysis.
 */
export async function analyzeHeadToHead(req: {
  player1: string;
  player2: string;
}) {
  const openai = new OpenAI({
    apiKey:
      import.meta.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const { player1, player2 } = req;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `Generate a detailed head-to-head analysis between ${player1} and ${player2} as a JSON object.
          Include their head-to-head record, recent form (overall), their last meeting, up to 5 recent matches between them,
          yearly performance timeline (the most recent 3 years relative to the current year), key statistics for each player, and 3 concise AI insights.
          All numerical values should be plausible but can be fabricated as you do not have real-time data.
          Ensure all fields in the schema are populated where applicable. 
          ⚠️ Important: Do NOT use player names as keys. Instead, always use generic keys like "player1" and "player2". 
          Each player's name should only appear as the "name" value inside the players object.
          in ai_insights schema, you can use player1 or player2 as keys, but you should use the player's name as the value.
          Object should follow this format:
          ${headToHeadSchema}
          `,
        },
      ],
    });
    const result = response.choices[0].message.content || "{}";
    return JSON.parse(result);
  } catch (error) {
    console.error("Error analyzing head-to-head:", error);
    throw new Error("Failed to analyze head-to-head. Please try again.");
  }
}
