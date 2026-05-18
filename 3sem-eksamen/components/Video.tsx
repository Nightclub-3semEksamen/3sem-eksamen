export default function Video() {
  return (
    <section className="bg-[oklch(0.04_0_0)] px-8 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:text-2xl md:font-medium">
          Latest Video
        </h2>

        <img
          src="/images/sline.webp"
          alt=""
          className="mx-auto mt-4 h-auto w-[150px] md:w-[120px]"
        />

        <div className="mx-auto mt-12 max-w-[1050px]">
          <div className="relative h-[260px] overflow-hidden bg-black md:h-[420px]">
            <img
              src="/images/booth.webp"
              alt="DJ booth"
              className="h-full w-full object-cover"
            />

            <div className="absolute left-0 top-0 h-0 w-0 border-r-[56px] border-t-[56px] border-r-transparent border-t-[oklch(0.65_0.25_8)] md:border-r-[70px] md:border-t-[70px]" />

            <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[56px] border-l-[56px] border-b-[oklch(0.65_0.25_8)] border-l-transparent md:border-b-[70px] md:border-l-[70px]" />
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <button
              type="button"
              aria-label="Previous video"
              className="flex h-9 w-9 items-center justify-center border-2 border-white transition hover:border-[oklch(0.65_0.25_8)]"
            >
              <span className="h-0 w-0 border-y-[8px] border-r-[11px] border-y-transparent border-r-white" />
            </button>

            <button
              type="button"
              aria-label="Next video"
              className="flex h-9 w-9 items-center justify-center border-2 border-white transition hover:border-[oklch(0.65_0.25_8)]"
            >
              <span className="h-0 w-0 border-y-[8px] border-l-[11px] border-y-transparent border-l-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}