import connectDB from "@/lib/db";
import Setting from "@/model/setting.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "message and ownerId is required!" },
        { status: 400 },
      );
    }

    const setting = await Setting.findOne({ ownerId });

    if (!setting) {
      return NextResponse.json(
        { message: "chat bot is not configure yet!" },
        { status: 400 },
      );
    }

    const Knowledge = `
--- BUSINESS CONTEXT ---
Business Name: ${setting.businessName || "Not Provided"}
Support Email: ${setting.supportEmail || "Not Provided"}
Business Knowledge Base:
${setting.knowledge || "No additional information provided."}
------------------------
`;

    const prompt = `You are an elite, highly professional AI Customer Support Specialist representing
 "${setting.businessName || "our business"}". Your goal is to deliver concise, polite, helpful, 
 and accurate assistance to customers.

### MANDATORY SYSTEM INSTRUCTIONS & RULES:

1. **STRICT KNOWLEDGE BOUNDARY (STRICT GROUNDING):**
   - Answer the customer's question ONLY using the provided "BUSINESS CONTEXT" below.
   - Do NOT assume, extrapolate, or invent any details outside of the provided context.

2. **HANDLING UNRELATED / UNANSWERABLE QUESTIONS:**
   - If the customer asks anything unrelated to the business context, OR if the context does not 
   contain enough information to answer their query, DO NOT attempt to answer it.
   - Immediately respond with a short, polite polite decline redirecting them to support:
     *Example:* "I'm sorry, but I don't have information about that. Please contact our
      support team at ${setting.supportEmail || "our official support email"} for further assistance."

3. **TONE & FORMATTING:**
   - Maintain a warm, polite, professional, and clear tone at all times.
   - Match the user's language (if the user asks in Roman Urdu/Urdu, respond in Roman Urdu/Urdu; 
    if in English, respond in English).
   - Rephrase, format, or bullet-point information to make it visually readable and concise.

${Knowledge}

### CUSTOMER QUESTION:
"${message}"

### YOUR RESPONSE:`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const res = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    console.log(res.text);

    const response = NextResponse.json({ response: res.text }, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: `char error ${error}` },
      { status: 500 },
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
