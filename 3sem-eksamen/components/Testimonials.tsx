import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Testimonial = {
  id: number;
  name: string;
  content: string;
  asset: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  facebook: string;
  twitter: string;
};

function getImageUrl(path: string) {
  if (!API_URL) return "";
  if (path.startsWith("http")) return path;

  const cleanBase = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat px-8 py-20 text-white"
      style={{
        backgroundImage: "url('/images/fest.webp')",
      }}
    >
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-lg font-medium">{message}</p>
      </div>
    </section>
  );
}

export default async function Testimonials() {
  if (!API_URL) {
    return (
      <ErrorMessage message="API_URL mangler: NEXT_PUBLIC_API_URL bliver ikke læst." />
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/testimonials`, {
      cache: "no-store",
    });
  } catch {
    return (
      <ErrorMessage
        message={`Fetch fejlede: kunne ikke kontakte API'et på ${API_URL}/testimonials`}
      />
    );
  }

  if (!response.ok) {
    return (
      <ErrorMessage
        message={`Testimonials API fejlede med status ${response.status}`}
      />
    );
  }

  let testimonials: Testimonial[];

  try {
    testimonials = await response.json();
  } catch {
    return (
      <ErrorMessage message="Testimonials API svarede, men JSON kunne ikke læses." />
    );
  }

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return <ErrorMessage message="Testimonials API returnerede ingen data." />;
  }

  const preparedTestimonials = testimonials.map((testimonial) => ({
    ...testimonial,
    image: getImageUrl(testimonial.asset.url),
  }));

  return (
    <section
      className="bg-cover bg-center bg-no-repeat px-8 py-20 text-white"
      style={{
        backgroundImage: "url('/images/fest.webp')",
      }}
    >
      <TestimonialsCarousel testimonials={preparedTestimonials} />
    </section>
  );
}