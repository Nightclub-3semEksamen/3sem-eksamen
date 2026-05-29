import FeaturedMobileCarousel from "@/components/FeaturedMobileCarousel";
import FeaturedDesktopSlider from "@/components/FeaturedDesktopSlider";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EventItem = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  date: string;
  doorsOpen?: string;
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

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
    return (
      <ErrorMessage message="API_URL mangler: NEXT_PUBLIC_API_URL bliver ikke læst." />
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/events`, {
      cache: "no-store",
    });
  } catch {
    return (
      <ErrorMessage
        message={`Fetch fejlede: kunne ikke kontakte API'et på ${API_URL}/events`}
      />
    );
  }

  if (!response.ok) {
    return (
      <ErrorMessage message={`API fetch fejlede med status ${response.status}`} />
    );
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

  const featuredEvents = events.filter(
    (event) => event.isFeatured === true || event.isFeatured === "true",
  );

  if (featuredEvents.length === 0) {
    return <ErrorMessage message="API'et returnerede ingen featured events." />;
  }

  const sortedEvents = [...featuredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const formattedEvents = sortedEvents.map((event) => {
    const timeSource = event.doorsOpen || event.date;

    return {
      id: event.id,
      slug: event.slug,
      title: event.title,
      excerpt: event.excerpt || event.description || "",
      date: formatDate(event.date),
      time: formatTime(timeSource),
      location: event.location,
      image: getImageUrl(event.asset.url),
      alt: event.asset.alt,
    };
  });

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

        <FeaturedDesktopSlider events={formattedEvents} />

        <FeaturedMobileCarousel events={formattedEvents} />
      </div>
    </section>
  );
}