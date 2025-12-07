import { GoogleGenAI } from "@google/genai";
import { Property } from "../types";

// Initialize the Gemini API client exclusively with process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProperty = async (property: Property): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI Analysis unavailable: API Key not configured.";
  }

  try {
    const prompt = `
      Act as a senior real estate investment analyst for the Egyptian market.
      Analyze the following investment opportunity concisely for a retail investor.
      
      Property Details:
      - Title: ${property.title}
      - Location: ${property.location}
      - Type: ${property.type}
      - Total Price: EGP ${property.totalPrice.toLocaleString()}
      - Expected ROI: ${property.expectedRoi}%
      - Rental Yield: ${property.rentalYield}%
      - Description: ${property.description}
      
      Provide a response in the following format (Markdown):
      **Investment Verdict:** (Bullish/Neutral/Bearish)
      
      **Pros:**
      * (Point 1)
      * (Point 2)
      
      **Risks:**
      * (Point 1)
      * (Point 2)
      
      **Recommendation:** (Short summary sentence)
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while analyzing the property. Please try again later.";
  }
};

export const getMarketInsights = async (): Promise<string> => {
    if (!process.env.API_KEY) return "Market insights unavailable.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Provide a 3-sentence summary of the current real estate investment climate in Egypt (New Capital, North Coast, Sheikh Zayed) for micro-investors.",
        });
        return response.text || "No insights available.";
    } catch (e) {
        return "Failed to fetch market insights.";
    }
}