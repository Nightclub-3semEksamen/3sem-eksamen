import { getComments, getEvents, getImageUrl } from "@/lib/api";

import CommentForm from "@/components/CommentForm";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
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

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  const events = await getEvents();

  const event = events.find((event: any) => event.slug === slug);

  if (!event) {
    notFound();
  }

  const comments = await getComments(event.id.toString());

  return (
    <main className="min-h-screen bg-[oklch(0.08_0_0)] text-[oklch(1_0_0)] overflow-hidden">
      <Navbar />

      <section
        className="relative h-[160px] md:h-[220px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/fest.webp')",
        }}
      >
        <div className="absolute inset-0 bg-[oklch(0_0_0/0.25)]" />

        <div className="relative z-10 text-center px-6">
          <p className="uppercase tracking-[6px] text-[oklch(0.65_0.25_8)] text-sm font-bold mb-4">Event</p>

          <h1 className="text-3xl md:text-5xl font-black uppercase">{event.title}</h1>

          <div className="w-[80px] h-[2px] bg-[oklch(0.65_0.25_8)] mx-auto mt-4 mb-4" />

          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm font-semibold text-[oklch(0.85_0_0)]">
            <span>{formatDate(event.date)}</span>

            <span>{formatTime(event.doorsOpen || event.startTime)}</span>

            <span>{event.location}</span>
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="relative z-10">
          <div className="border border-[oklch(0.65_0.25_8/0.6)] p-6 md:p-10 bg-[oklch(0.1_0_0/0.7)] backdrop-blur-sm">
            {event.heroAsset?.url && (
              <div className="relative w-full h-[250px] md:h-[500px] overflow-hidden mb-10">
                <Image src={getImageUrl(event.heroAsset.url)} alt={event.title} fill className="object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <InfoCard title="DATE" value={formatDate(event.date)} />

              <InfoCard title="START" value={formatTime(event.startTime || "22:00")} />

              <InfoCard title="END" value={formatTime(event.endTime || "04:00")} />

              <InfoCard title="LOCATION" value={event.location} />

              <InfoCard title="AGE LIMIT" value={event.ageLimit || "18+"} />

              <InfoCard title="PRICE" value={`${event.price || "€15"}`} />
            </div>

            <div className="border border-[oklch(1_0_0/0.1)] p-6">
              <h2 className="text-[oklch(0.65_0.25_8)] uppercase font-bold tracking-[3px] text-sm mb-5">About The Event</h2>

              <p className="text-[oklch(0.78_0_0)] leading-8">{event.description}</p>

              <Link href="/book-table" className="inline-block mt-8 border border-[oklch(0.65_0.25_8)] text-[oklch(0.65_0.25_8)] px-8 py-3 uppercase text-sm tracking-[3px] font-bold hover:bg-[oklch(0.65_0.25_8)] hover:text-[oklch(0.08_0_0)] transition-all duration-300">
                Book Table
              </Link>
            </div>
          </div>

          <div className="mt-20 max-w-5xl">
            <h2 className="text-3xl font-black uppercase mb-12">{comments.length} Comments</h2>

            <div className="space-y-12">
              {comments.map((comment: any) => (
                <div key={comment.id}>
                  <h3 className="font-bold text-sm mb-4">
                    {comment.name} <span className="text-[oklch(0.65_0_0)]">-</span>{" "}
                    <span className="text-[oklch(0.65_0.25_8)] text-xs">
                      Posted{" "}
                      {new Date(comment.date).toLocaleDateString("da-DK", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </h3>

                  <p className="text-[oklch(0.78_0_0)] leading-6 text-sm max-w-4xl">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 max-w-5xl">
            <h2 className="text-3xl font-black uppercase mb-10">Leave A Comment</h2>

            <CommentForm eventId={event.id} />
          </div>
        </div>
      </section>
    </main>
  );
}

type InfoCardProps = {
  title: string;
  value: string;
};

function InfoCard({ title, value }: InfoCardProps) {
  return (
    <div className="border border-[oklch(1_0_0/0.1)] p-5 bg-[oklch(0.12_0_0/0.6)]">
      <p className="text-[oklch(0.65_0.25_8)] text-xs tracking-[3px] uppercase font-bold mb-3">{title}</p>

      <p className="text-[oklch(1_0_0)] font-semibold">{value}</p>
    </div>
  );
}
