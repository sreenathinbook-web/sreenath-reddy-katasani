
import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, Match } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchLFCNews = async (): Promise<{ articles: NewsArticle[], sources: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are the latest 5 Liverpool FC news headlines, transfer rumors, and match reports today? Provide summaries and approximate publication dates.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            articles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  url: { type: Type.STRING },
                  publishedAt: { type: Type.STRING },
                  source: { type: Type.STRING },
                },
                required: ["title", "summary", "url", "publishedAt", "source"]
              }
            }
          }
        }
      },
    });

    const parsed = JSON.parse(response.text);
    return {
      articles: parsed.articles,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [], sources: [] };
  }
};

export const fetchMatchDetails = async (): Promise<Match[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Find Liverpool FC's most recent match result and their next 3 upcoming fixtures including dates, opponents, and competitions.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              opponent: { type: Type.STRING },
              date: { type: Type.STRING },
              competition: { type: Type.STRING },
              venue: { type: Type.STRING },
              isHome: { type: Type.BOOLEAN },
              status: { type: Type.STRING, enum: ["upcoming", "live", "finished"] },
              score: {
                type: Type.OBJECT,
                properties: {
                  lfc: { type: Type.NUMBER },
                  opp: { type: Type.NUMBER }
                }
              }
            },
            required: ["id", "opponent", "date", "competition", "status"]
          }
        }
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};

export const chatWithKopAssistant = async (message: string, history: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the 'Kop Assistant', an expert on Liverpool Football Club. You know everything about the history, players, tactics, and current season. Answer fan questions with passion and accuracy. Mention 'You'll Never Walk Alone' where appropriate.",
      tools: [{ googleSearch: {} }]
    }
  });

  return await chat.sendMessage({ message });
};
