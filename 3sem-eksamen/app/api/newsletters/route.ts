import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://night-club-api-2026-main.onrender.com";

type NewsletterBody = {
  email?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterBody = await request.json();

    const response = await fetch(`${API_URL}/newsletters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        data || { message: "Newsletter signup failed." },
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