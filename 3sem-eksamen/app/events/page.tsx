import { getEvents, getImageUrl } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const EVENTS_PER_PAGE = 3;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EventsPage({ searchParams }: Props) {
  const { page } = await searchParams;

  const events = await getEvents();

  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const shownEvents = events.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  return (
    <main className="bg-[oklch(0.08_0_0)] text-[oklch(1_0_0)]">
      <Navbar />

      <section
        className="relative h-[160px] md:h-[220px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/fest.webp')",
        }}
      >
        <div className="absolute inset-0 bg-[oklch(0_0_0/0.25)]" />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[4px]">EVENTS</h1>

          <div className="w-[80px] h-[2px] bg-[oklch(0.65_0.25_8)] mx-auto mt-3" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        {shownEvents.map((event: any, index: number) => (
          <article key={event.id} className="grid grid-cols-1 md:grid-cols-2 bg-[oklch(0.08_0_0)]">
            <div className={index % 2 === 1 ? "md:order-2" : ""}>{event.heroAsset?.url && <Image src={getImageUrl(event.heroAsset.url)} alt={event.title} width={800} height={500} className="w-full h-full object-cover" />}</div>

            <div className="p-8 md:p-14 flex flex-col justify-center">
              <h2 className="text-lg font-bold uppercase">{event.title}</h2>

              <p className="text-[oklch(0.65_0.25_8)] text-xs font-bold mt-3">
                {formatDate(event.date)} | {formatTime(event.doorsOpen || event.startTime)} | {event.location}
              </p>

              <p className="text-sm text-[oklch(0.78_0_0)] leading-7 mt-5">{event.excerpt || event.description?.slice(0, 180) + "..."}</p>

              <Link href={`/events/${event.slug}`} className="mt-8 w-fit border-y border-[oklch(1_0_0)] px-8 py-3 text-xs uppercase hover:text-[oklch(0.65_0.25_8)] transition">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </section>

      <nav className="flex justify-center gap-4 py-16 text-sm">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <Link key={pageNumber} href={`/events?page=${pageNumber}`} className={pageNumber === currentPage ? "text-[oklch(0.65_0.25_8)]" : "text-[oklch(1_0_0)]"}>
              {pageNumber}
            </Link>
          );
        })}

        {currentPage < totalPages && (
          <Link href={`/events?page=${currentPage + 1}`} className="hover:text-[oklch(0.65_0.25_8)] transition">
            næste &gt;
          </Link>
        )}
      </nav>
    </main>
  );
}
