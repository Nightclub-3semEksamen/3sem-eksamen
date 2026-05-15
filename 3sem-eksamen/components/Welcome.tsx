export default function Welcome() {
  return (
    <section className="bg-[oklch(0.04_0_0)] px-8 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-bold uppercase leading-tight tracking-[0.16em] md:text-2xl md:font-medium">
          Welcome In
          <br className="md:hidden" />
          <span className="md:ml-2">Nightclub</span>
        </h2>

        <img
          src="/images/sline.webp"
          alt=""
          className="mx-auto mt-4 h-auto w-[150px] md:w-[120px]"
        />

        <div className="mx-auto mt-12 grid max-w-[950px] grid-cols-1 gap-8 md:max-w-[1050px] md:grid-cols-3 md:gap-6">
          <div
            tabIndex={0}
            className="group relative h-[520px] overflow-hidden bg-black outline-none md:h-[360px]"
          >
            <img
              src="/images/resturant.webp"
              alt="Restaurant"
              className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105 group-focus:scale-105 group-active:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition duration-[1500ms] group-hover:bg-black/75 group-focus:bg-black/75 group-active:bg-black/75" />

            <span className="absolute left-1/2 top-10 h-px w-0 -translate-x-1/2 bg-white transition-all duration-[1500ms] group-hover:w-[75%] group-focus:w-[75%] group-active:w-[75%]" />
            <span className="absolute bottom-10 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-[1500ms] group-hover:w-[75%] group-focus:w-[75%] group-active:w-[75%]" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-[1500ms] group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100">
              <h3 className="text-2xl font-medium uppercase tracking-[0.2em] text-white">
                Restaurant
              </h3>
            </div>
          </div>

          <div
            tabIndex={0}
            className="group relative h-[520px] overflow-hidden bg-black outline-none md:h-[360px]"
          >
            <img
              src="/images/food.webp"
              alt="Bar"
              className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105 group-focus:scale-105 group-active:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition duration-[1500ms] group-hover:bg-black/75 group-focus:bg-black/75 group-active:bg-black/75" />

            <span className="absolute left-1/2 top-10 h-px w-0 -translate-x-1/2 bg-white transition-all duration-[1500ms] group-hover:w-[75%] group-focus:w-[75%] group-active:w-[75%]" />
            <span className="absolute bottom-10 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-[1500ms] group-hover:w-[75%] group-focus:w-[75%] group-active:w-[75%]" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-[1500ms] group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100">
              <h3 className="text-2xl font-medium uppercase tracking-[0.2em] text-white">
                Bar
              </h3>
            </div>
          </div>

          <div
            tabIndex={0}
            className="group relative h-[520px] overflow-hidden bg-black outline-none md:h-[360px]"
          >
            <img
              src="/images/bar.webp"
              alt="Night Club"
              className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105 group-focus:scale-105 group-active:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition duration-[1500ms] group-hover:bg-black/75 group-focus:bg-black/75 group-active:bg-black/75" />

            <span className="absolute left-1/2 top-10 h-px w-0 -translate-x-1/2 bg-white transition-all duration-[1500ms] group-hover:w-[75%] group-focus:w-[75%] group-active:w-[75%]" />
            <span className="absolute bottom-10 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-[1500ms] group-hover:w-[75%] group-focus:w-[75%] group-active:w-[75%]" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-[1500ms] group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100">
              <h3 className="text-2xl font-medium uppercase tracking-[0.2em] text-white">
                Night Club
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}