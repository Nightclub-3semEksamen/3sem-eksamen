import { getEvents, getImageUrl } from "@/lib/api";
import Image from "next/image";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main>
      <h1>Events</h1>

      {events.map((event: any) => (
        <article key={event.id}>
          {event.heroAsset?.url && <Image src={getImageUrl(event.heroAsset.url)} alt={event.title} width={800} height={500} />}

          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </article>
      ))}
    </main>
  );
}
