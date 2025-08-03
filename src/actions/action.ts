// // import { generateText } from "ai";
// // import { createOpenAI } from "@ai-sdk/openai";
// import OpenAI from "openai";

// /**
//  * Analyzes the head-to-head match-up between two tennis players using the OpenAI API.
//  * @param player1 The first tennis player.
//  * @param player2 The second tennis player.
//  * @returns A string containing the AI-generated analysis.
//  */
// export async function analyzeHeadToHead(player1: string, player2: string) {
//   const openai = new OpenAI({
//     apiKey:
//       import.meta.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true,
//   });

//   //   if (!import.meta.env.OPENAI_API_KEY) {
//   //     throw new Error(
//   //       "OPENAI_API_KEY is not set in environment variables. Please ensure it's configured."
//   //     );
//   //   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "user",
//           content: `Analyze the head-to-head match-up between ${player1}  and ${player2} . Provide Head-to-Head Record, Recent Form, last meeting, recent matches, Performance Timeline , key statics and ai sights`,
//         },
//       ],
//     });
//     console.log(response);
//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("Error analyzing head-to-head:", error);
//     throw new Error("Failed to analyze head-to-head. Please try again.");
//   }
// }

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { HeadToHeadAnalysisSchema } from "../lib/head-to-head-analysis-schema";

// Allow responses up to 5 minutes for potentially complex generations
export const maxDuration = 300;

export async function analyzeHeadToHead(req: {
  player1: string;
  player2: string;
}) {
  try {
    const { player1, player2 } = req;

    if (!player1 || !player2) {
      return new Response(
        JSON.stringify({ error: "Player names are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: HeadToHeadAnalysisSchema,
      prompt: `Generate a detailed head-to-head analysis between ${player1} and ${player2} as a JSON object.
          Include their head-to-head record, recent form (overall), their last meeting, up to 5 recent matches between them,
          yearly performance timeline (up to 5 years), key statistics for each player, and 3 concise AI insights.
          All numerical values should be plausible but can be fabricated as you do not have real-time data.
          Ensure all fields in the schema are populated where applicable.`,
    });

    return new Response(JSON.stringify(object), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error analyzing head-to-head:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to analyze head-to-head. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
