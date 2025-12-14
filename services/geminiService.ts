import { GoogleGenAI } from "@google/genai";
import { USER_INFO, SKILLS, PROJECTS, EXPERIENCE } from '../constants';

const apiKey = process.env.API_KEY || '';
// Initialize the Gemini API client
// Note: In a real production app, you might want to proxy this through a backend to hide the key, 
// but for this frontend-only demo using the allowed environment, we access it directly.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `
You are an AI assistant for ${USER_INFO.name}'s portfolio website. 
Your goal is to answer visitor questions about ${USER_INFO.name} in a friendly, professional, and concise manner.

Here is the context about ${USER_INFO.name}:
Role: ${USER_INFO.role}
Bio: ${USER_INFO.bio}
Skills: ${SKILLS.map(s => s.name).join(', ')}
Projects: ${PROJECTS.map(p => `${p.title}: ${p.description}`).join('; ')}
Experience: ${EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.period})`).join('; ')}
Contact: ${JSON.stringify(USER_INFO.social)}

Rules:
1. Keep answers short (under 3 sentences unless asked for detail).
2. Be enthusiastic about Android and Web development.
3. If asked about something not in the context, politely say you don't know but suggest contacting ${USER_INFO.name} directly.
4. Format key skills or project names in bold if possible (using markdown).
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my brain (API Key) is missing. Please check the configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });
    
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};