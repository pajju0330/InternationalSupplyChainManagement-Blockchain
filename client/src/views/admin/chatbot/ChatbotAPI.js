// ChatbotAPI.js (assuming this file exists)
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDZrrD0y5uOcY5ZxpsfACVz1sn0oAWLubw"; 

const genAI = new GoogleGenerativeAI(API_KEY);

export const GetChatbotResponse = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const result = await chat.sendMessage(text);
  const response = await result.response;
  const textResponse = response.text();
  return textResponse;
};