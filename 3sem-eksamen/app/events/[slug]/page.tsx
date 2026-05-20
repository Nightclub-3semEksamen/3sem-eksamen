import { getEvents, getImageUrl } from "@/lib/api";
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

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      {event.heroAsset?.url && <Image src={getImageUrl(event.heroAsset.url)} alt={event.title} width={1400} height={700} className="w-full h-[500px] object-cover" />}

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold uppercase">{event.title}</h1>

        <p className="text-pink-600 text-sm font-bold mt-4">
          {event.date} | {event.doorsOpen || event.startTime} | {event.location}
        </p>

        <p className="text-neutral-300 leading-8 mt-8">{event.description}</p>
      </section>
    </main>
  );
}
