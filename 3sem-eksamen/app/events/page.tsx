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

export default async function EventsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const events = await getEvents();

  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const shownEvents = events.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  return (
    <main className="bg-black text-white">
      <Navbar />
      <section className="py-20 text-center bg-neutral-950">
        <h1 className="text-3xl font-bold uppercase">Events</h1>
      </section>

      <section className="max-w-6xl mx-auto">
        {shownEvents.map((event: any, index: number) => (
          <article key={event.id} className="grid grid-cols-1 md:grid-cols-2 bg-black">
            <div className={index % 2 === 1 ? "md:order-2" : ""}>{event.heroAsset?.url && <Image src={getImageUrl(event.heroAsset.url)} alt={event.title} width={800} height={500} className="w-full h-full object-cover" />}</div>

            <div className="p-8 md:p-14 flex flex-col justify-center">
              <h2 className="text-lg font-bold uppercase">{event.title}</h2>

              <p className="text-pink-600 text-xs font-bold mt-3">
                {event.date} | {event.doorsOpen || event.startTime} | {event.location}
              </p>

              <p className="text-sm text-neutral-300 leading-7 mt-5">{event.excerpt || event.description?.slice(0, 180) + "..."}</p>

              <Link href={`/events/${event.slug}`} className="mt-8 w-fit border-y border-white px-8 py-3 text-xs uppercase hover:text-pink-600">
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
            <Link key={pageNumber} href={`/events?page=${pageNumber}`} className={pageNumber === currentPage ? "text-pink-600" : ""}>
              {pageNumber}
            </Link>
          );
        })}

        {currentPage < totalPages && <Link href={`/events?page=${currentPage + 1}`}>næste &gt;</Link>}
      </nav>
    </main>
  );
}
