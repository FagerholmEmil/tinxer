"use server";

import { OpenAI } from "openai";

export const runAI = async (system: string, prompt: string) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
  });

  return completion.choices[0].message.content;
};
