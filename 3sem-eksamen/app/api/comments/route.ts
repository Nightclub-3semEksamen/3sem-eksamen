import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://night-club-api-2026-main.onrender.com";

type CommentBody = {
  eventId?: number;
  name?: string;
  content?: string;
  date?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: CommentBody = await request.json();

    const response = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: body.eventId,
        name: body.name,
        content: body.content,
        date: body.date || new Date().toISOString(),
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        data || { message: "Comment could not be submitted." },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}