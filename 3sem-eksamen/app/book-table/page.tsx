import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import BookTable from "@/components/BookTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EventItem = {
  id: number;
  title: string;
  date: string;
  doorsOpen?: string;
};

async function getEvents(): Promise<EventItem[]> {
  if (!API_URL) return [];

  try {
    const response = await fetch(`${API_URL}/events`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    return response.json();
  } catch {
    return [];
  }
}

export default async function BookTablePage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Suspense fallback={null}>
        <BookTable events={events} />
      </Suspense>
    </main>
  );
}