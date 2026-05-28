const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://night-club-api-2026-main.onrender.com";

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Kunne ikke hente events");
  }

  return response.json();
}

export async function getEventById(id: string) {
  const response = await fetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("Kunne ikke hente event");
  }

  return response.json();
}

export async function getComments(eventId: string) {
  const response = await fetch(`${API_URL}/comments?eventId=${eventId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Kunne ikke hente kommentarer");
  }

  return response.json();
}

export function getImageUrl(path: string) {
  return `${API_URL}${path}`;
}
