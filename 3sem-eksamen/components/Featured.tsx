import Link from "next/link";
import FeaturedMobileCarousel from "@/components/FeaturedMobileCarousel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EventItem = {
  id: number;
  slug: string;
  title: string;
  date: string;
  location: string;
  isFeatured: boolean | string;
  asset: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

function getImageUrl(path: string) {
  if (!API_URL) return "";
  if (path.startsWith("http")) return path;

  const cleanBase = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}

function formatDesktopDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  const day = date.getDate();

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${month} ${day} · ${time}`;
}

function isFeaturedEvent(event: EventItem) {
  return event.isFeatured === true || event.isFeatured === "true";
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat px-8 py-20 text-white"
      style={{
        backgroundImage: "url('/images/back.webp')",
      }}
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:text-2xl md:font-medium">
          Featured Events
        </h2>

        <img
          src="/images/sline.webp"
          alt=""
          className="mx-auto mt-4 h-auto w-[150px] md:w-[120px]"
        />

        <p className="mt-10 text-lg font-medium text-white">{message}</p>
      </div>
    </section>
  );
}

export default async function Featured() {
  if (!API_URL) {
    return <ErrorMessage message="API_URL mangler: NEXT_PUBLIC_API_URL bliver ikke læst." />;
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/events`, {
      cache: "no-store",
    });
  } catch {
    return <ErrorMessage message={`Fetch fejlede: kunne ikke kontakte API'et på ${API_URL}/events`} />;
  }

  if (!response.ok) {
    return <ErrorMessage message={`API fetch fejlede med status ${response.status}`} />;
  }

  let events: EventItem[];

  try {
    events = await response.json();
  } catch {
    return <ErrorMessage message="API svarede, men JSON kunne ikke læses." />;
  }

  if (!Array.isArray(events)) {
    return <ErrorMessage message="API-data er ikke et array." />;
  }

  if (events.length === 0) {
    return <ErrorMessage message="API'et returnerede 0 events." />;
  }

  const featuredEvents = events.filter(isFeaturedEvent).slice(0, 2);
  const desktopEvents = featuredEvents.length > 0 ? featuredEvents : events.slice(0, 2);

  const mobileEvents = events.map((event) => ({
    id: event.id,
    slug: event.slug,
    title: event.title,
    date: event.date,
    location: event.location,
    image: getImageUrl(event.asset.url),
    alt: event.asset.alt,
  }));

  return (
    <section
      className="bg-cover bg-center bg-no-repeat px-8 py-20 text-white"
      style={{
        backgroundImage: "url('/images/back.webp')",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="hidden text-center text-2xl font-medium uppercase leading-tight tracking-[0.16em] md:block">
          Featured Events
        </h2>

        <h2 className="text-center text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:hidden">
          Events Of The
          <br />
          Month
        </h2>

        <img
          src="/images/sline.webp"
          alt=""
          className="mx-auto mt-4 h-auto w-[150px] md:w-[120px]"
        />

        <div className="mx-auto mt-12 hidden max-w-[950px] grid-cols-1 gap-8 md:grid md:max-w-[1050px] md:grid-cols-2 md:gap-6">
          {desktopEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group block overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
            >
              <div className="h-[360px] overflow-hidden">
                <img
                  src={getImageUrl(event.asset.url)}
                  alt={event.asset.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex min-h-[54px] items-center justify-between gap-4 bg-[oklch(0.52_0.22_5)] px-6 text-white">
                <h3 className="text-base font-bold">{event.title}</h3>

                <p className="shrink-0 text-sm font-medium">
                  {formatDesktopDate(event.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <FeaturedMobileCarousel events={mobileEvents} />
      </div>
    </section>
  );
}