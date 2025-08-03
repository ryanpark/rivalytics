// import { generateText } from "ai";
// import { createOpenAI } from "@ai-sdk/openai";
import OpenAI from "openai";

/**
 * Analyzes the head-to-head match-up between two tennis players using the OpenAI API.
 * @param player1 The first tennis player.
 * @param player2 The second tennis player.
 * @returns A string containing the AI-generated analysis.
 */
export async function analyzeHeadToHead(player1: string, player2: string) {
  const openai = new OpenAI({
    apiKey:
      import.meta.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  //   if (!import.meta.env.OPENAI_API_KEY) {
  //     throw new Error(
  //       "OPENAI_API_KEY is not set in environment variables. Please ensure it's configured."
  //     );
  //   }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Analyze the head-to-head match-up between ${player1}  and ${player2} . Provide a brief analysis of their potential strengths, weaknesses, and how their playing styles might interact. Focus on general tennis knowledge, not specific match data, as I don't have that. Keep it concise, around 3-4 sentences.`,
        },
      ],
    });
    console.log(response);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing head-to-head:", error);
    throw new Error("Failed to analyze head-to-head. Please try again.");
  }
}
