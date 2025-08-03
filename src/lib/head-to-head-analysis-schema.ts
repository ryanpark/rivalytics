import { z } from "zod";

export const MatchSchema = z.object({
  date: z.string().describe("Date of the match in YYYY-MM-DD format"),
  winner: z.string().describe("Name of the winner"),
  loser: z.string().describe("Name of the loser"),
  score: z.string().describe("Score of the match, e.g., '6-4, 7-6'"),
  tournament: z.string().optional().describe("Name of the tournament"),
});

export const PlayerStatsSchema = z.object({
  acesPerMatch: z.number().optional().describe("Average aces per match"),
  firstServePercentage: z
    .number()
    .optional()
    .describe("First serve percentage (0-100)"),
  breakPointsConvertedPercentage: z
    .number()
    .optional()
    .describe("Break points converted percentage (0-100)"),
});

export const HeadToHeadAnalysisSchema = z
  .object({
    player1Name: z.string().describe("The name of the first player"),
    player2Name: z.string().describe("The name of the second player"),
    headToHeadRecord: z
      .object({
        player1Wins: z
          .number()
          .describe("Number of matches player1 has won against player2"),
        player2Wins: z
          .number()
          .describe("Number of matches player2 has won against player1"),
        totalMatches: z
          .number()
          .describe("Total number of matches played between them"),
      })
      .describe("Overall head-to-head record"),
    recentForm: z
      .object({
        player1: z
          .object({
            winsLast10: z
              .number()
              .describe(
                "Number of wins for player1 in their last 10 overall matches"
              ),
            lossesLast10: z
              .number()
              .describe(
                "Number of losses for player1 in their last 10 overall matches"
              ),
            winStreak: z.number().describe("Current win streak for player1"),
          })
          .describe("Recent form for player1"),
        player2: z
          .object({
            winsLast10: z
              .number()
              .describe(
                "Number of wins for player2 in their last 10 overall matches"
              ),
            lossesLast10: z
              .number()
              .describe(
                "Number of losses for player2 in their last 10 overall matches"
              ),
            winStreak: z.number().describe("Current win streak for player2"),
          })
          .describe("Recent form for player2"),
      })
      .describe("Recent form of both players"),
    lastMeeting: MatchSchema.optional().describe(
      "Details of the last match played between them"
    ),
    recentMatches: z
      .array(MatchSchema)
      .max(5)
      .optional()
      .describe(
        "Up to 5 most recent matches played between player1 and player2"
      ),
    performanceTimeline: z
      .array(
        z.object({
          year: z.number().describe("Year"),
          player1Wins: z
            .number()
            .describe(
              "Number of wins for player1 against player2 in this year"
            ),
          player2Wins: z
            .number()
            .describe(
              "Number of wins for player2 against player1 in this year"
            ),
        })
      )
      .max(5)
      .optional()
      .describe("Yearly head-to-head performance over the last few years"),
    keyStatistics: z
      .object({
        player1: PlayerStatsSchema.optional().describe(
          "Key statistics for player1"
        ),
        player2: PlayerStatsSchema.optional().describe(
          "Key statistics for player2"
        ),
      })
      .optional()
      .describe("Key statistical averages for both players"),
    aiInsights: z
      .array(z.string())
      .max(3)
      .describe(
        "Concise AI-generated insights about the match-up, up to 3 points."
      ),
  })
  .describe("Comprehensive head-to-head analysis between two tennis players.");

export type HeadToHeadAnalysis = z.infer<typeof HeadToHeadAnalysisSchema>;
