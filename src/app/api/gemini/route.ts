import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
//   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
  const genAI = new GoogleGenerativeAI("AIzaSyDpwxgxHX6Y08eGf2AGLiXiQQp9mIw4VgU");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { image } = await req.json();
    if (!image) {
      throw new Error('No image data provided');
    }

    const result = await model.generateContent([
      "Identify this plant and provide important information about it.",
      { inlineData: { data: image, mimeType: 'image/jpeg' } },
    ]);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Detailed API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Error identifying plant: ${errorMessage}` },
      { status: 500 }
    );
  }
}