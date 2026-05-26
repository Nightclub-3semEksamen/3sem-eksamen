import { getComments, getEvents, getImageUrl } from "@/lib/api";

import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  const events = await getEvents();

  const event = events.find((event: any) => event.slug === slug);

  if (!event) {
    notFound();
  }

  const comments = await getComments(event.id.toString());

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[450px] md:h-[600px]">
        {event.heroAsset?.url && <Image src={getImageUrl(event.heroAsset.url)} alt={event.title} fill className="object-cover" />}

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="uppercase tracking-[6px] text-pink-500 text-sm font-bold mb-6">Event</p>

            <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight">{event.title}</h1>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-white/80">
              <span>{event.date}</span>

              <span>{event.doorsOpen || event.startTime}</span>

              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ec489955,transparent_40%)] pointer-events-none" />

        <div className="relative z-10">
          {/* EVENT CARD */}
          <div className="border border-pink-500/60 p-6 md:p-10 bg-black/70 backdrop-blur-sm">
            {/* IMAGE */}
            {event.heroAsset?.url && (
              <div className="relative w-full h-[250px] md:h-[500px] overflow-hidden mb-10">
                <Image src={getImageUrl(event.heroAsset.url)} alt={event.title} fill className="object-cover" />
              </div>
            )}

            {/* INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <InfoCard title="DATE" value={event.date} />

              <InfoCard title="START" value={event.startTime || "22:00"} />

              <InfoCard title="END" value={event.endTime || "04:00"} />

              <InfoCard title="LOCATION" value={event.location} />

              <InfoCard title="AGE LIMIT" value={event.ageLimit || "18+"} />

              <InfoCard title="PRICE" value={`${event.price || "€15"}`} />
            </div>

            {/* ABOUT */}
            <div className="border border-white/10 p-6">
              <h2 className="text-pink-500 uppercase font-bold tracking-[3px] text-sm mb-5">About The Event</h2>

              <p className="text-white/70 leading-8">{event.description}</p>

              <button className="mt-8 border border-pink-500 text-pink-500 px-8 py-3 uppercase text-sm tracking-[3px] font-bold hover:bg-pink-500 hover:text-black transition-all duration-300">Book Table</button>
            </div>
          </div>

          {/* COMMENTS */}
          <div className="mt-20 max-w-5xl">
            <h2 className="text-3xl font-black uppercase mb-12">{comments.length} Comments</h2>

            <div className="space-y-12">
              {comments.map((comment: any) => (
                <div key={comment.id}>
                  <h3 className="font-bold text-sm mb-4">
                    {comment.name} <span className="text-white/50">-</span>{" "}
                    <span className="text-pink-500 text-xs">
                      Posted{" "}
                      {new Date(comment.date).toLocaleDateString("da-DK", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </h3>

                  <p className="text-white/70 leading-6 text-sm max-w-4xl">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COMMENT FORM */}
          <div className="mt-20 max-w-5xl">
            <h2 className="text-3xl font-black uppercase mb-10">Leave A Comment</h2>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input type="text" placeholder="Your Name" className="bg-transparent border border-white/40 h-14 px-5 text-sm outline-none focus:border-pink-500" />

                <input type="email" placeholder="Your Email" className="bg-transparent border border-white/40 h-14 px-5 text-sm outline-none focus:border-pink-500" />
              </div>

              <textarea placeholder="Your Comment" rows={9} className="w-full bg-transparent border border-white/40 p-5 text-sm outline-none focus:border-pink-500 resize-none" />

              <div className="flex justify-end">
                <button type="submit" className="border-y border-white/60 px-10 py-3 text-xs uppercase font-bold tracking-[1px] hover:text-pink-500 hover:border-pink-500 transition">
                  Submit
                </button>
              </div>
            </form>
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
    <div className="border border-white/10 p-5 bg-black/60">
      <p className="text-pink-500 text-xs tracking-[3px] uppercase font-bold mb-3">{title}</p>

      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}
