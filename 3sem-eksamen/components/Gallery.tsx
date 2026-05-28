import GalleryClient from "@/components/GalleryClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GalleryPhoto = {
  id: number;
  description: string;
  asset: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
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
    <section className="bg-[oklch(0.04_0_0)] px-8 py-20 text-white">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:text-2xl md:font-medium">
          Night Club Gallery
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

export default async function Gallary() {
  if (!API_URL) {
    return (
      <ErrorMessage message="API_URL mangler: NEXT_PUBLIC_API_URL bliver ikke læst." />
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/gallery`, {
      cache: "no-store",
    });
  } catch {
    return (
      <ErrorMessage
        message={`Fetch fejlede: kunne ikke kontakte API'et på ${API_URL}/gallery`}
      />
    );
  }

  if (!response.ok) {
    return (
      <ErrorMessage
        message={`Gallery API fejlede med status ${response.status}`}
      />
    );
  }

  let photos: GalleryPhoto[];

  try {
    photos = await response.json();
  } catch {
    return (
      <ErrorMessage message="Gallery API svarede, men JSON kunne ikke læses." />
    );
  }

  if (!Array.isArray(photos) || photos.length < 7) {
    return <ErrorMessage message="Gallery API returnerede ikke nok billeder." />;
  }

  const galleryPhotos = photos.slice(0, 7).map((photo) => ({
    id: photo.id,
    description: photo.description,
    image: getImageUrl(photo.asset.url),
    alt: photo.asset.alt,
  }));

  return (
    <section className="bg-[oklch(0.04_0_0)] py-20 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="hidden text-center text-2xl font-medium uppercase leading-tight tracking-[0.16em] md:block">
          Night Club Gallery
        </h2>

        <h2 className="text-center text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:hidden">
          Night Club
          <br />
          Gallery
        </h2>

        <img
          src="/images/sline.webp"
          alt=""
          className="mx-auto mt-4 h-auto w-[150px] md:w-[120px]"
        />
      </div>

      <GalleryClient photos={galleryPhotos} />
    </section>
  );
}