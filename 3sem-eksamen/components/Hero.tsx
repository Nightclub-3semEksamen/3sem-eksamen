import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-[820px] bg-cover bg-[position:center_top] text-white md:min-h-[620px] md:bg-center lg:min-h-[720px]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url('/images/herooo.webp')",
      }}
    >
      <div className="mx-auto flex min-h-[820px] max-w-7xl flex-col items-center justify-center px-8 pt-[20px] text-center md:min-h-[620px] md:pt-0 lg:min-h-[720px]">
        <Image
          src="/images/logo2.webp"
          alt="Night Club logo"
          width={520}
          height={220}
          priority
          className="h-auto w-[490px] md:w-[430px] lg:w-[750px]"
        />

        <p className="mt-3 text-[22px] font-medium uppercase tracking-[0.55em] text-white md:mt-1 text-xl lg:text-[37px]">
          Have a good time
        </p>

        <Image
          src="/images/line.webp"
          alt=""
          width={280}
          height={20}
          className="mt-4 h-auto w-[390px] md:mt-1 md:w-[220px] lg:w-[600px]"
        />

        <div className="mt-9 flex flex-row items-center gap-4 md:mt-6">
          <Link
            href="/events"
            className="group relative inline-flex h-[56px] min-w-[172px] items-center justify-center overflow-visible border-2 border-white/55 bg-black/20 px-4 text-center text-[18px] font-bold uppercase tracking-[0.08em] text-white transition duration-300 hover:border-white/65 hover:bg-black/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-[50px] md:min-w-[138px] md:px-4 md:text-[13px]"
          >
            <span className="pointer-events-none absolute -right-[2px] -top-[2px] h-px w-7 bg-gradient-to-l from-white via-white to-transparent transition-all duration-500 group-hover:w-[calc(100%+4px)]" />
            <span className="pointer-events-none absolute -right-[2px] -top-[2px] h-7 w-px bg-gradient-to-b from-white via-white to-transparent transition-all duration-500 group-hover:h-[calc(100%+4px)]" />

            <span className="pointer-events-none absolute -bottom-[2px] -left-[2px] hidden h-px bg-gradient-to-r from-white via-white to-transparent transition-all duration-500 group-hover:block group-hover:w-[calc(100%+4px)]" />
            <span className="pointer-events-none absolute -bottom-[2px] -left-[2px] hidden w-px bg-gradient-to-t from-white via-white to-transparent transition-all duration-500 group-hover:block group-hover:h-[calc(100%+4px)]" />

            <span className="relative z-10">View Events</span>
          </Link>

          <Link
            href="/book-table"
            className="group relative inline-flex h-[56px] min-w-[172px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,oklch(0.66_0.24_10)_0%,oklch(0.52_0.27_325)_100%)] px-4 text-center text-[18px] font-bold uppercase tracking-[0.08em] text-white transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-[50px] md:min-w-[138px] md:px-4 md:text-[13px]"
          >
            <span className="pointer-events-none absolute right-0 top-0 h-px w-7 bg-gradient-to-l from-[oklch(0.9_0.12_350)] via-[oklch(0.9_0.12_350)] to-transparent transition-all duration-500 group-hover:w-full" />
            <span className="pointer-events-none absolute right-0 top-0 h-7 w-px bg-gradient-to-b from-[oklch(0.9_0.12_350)] via-[oklch(0.9_0.12_350)] to-transparent transition-all duration-500 group-hover:h-full" />

            <span className="pointer-events-none absolute bottom-0 left-0 hidden h-px bg-gradient-to-r from-[oklch(0.9_0.12_350)] via-[oklch(0.9_0.12_350)] to-transparent transition-all duration-500 group-hover:block group-hover:w-full" />
            <span className="pointer-events-none absolute bottom-0 left-0 hidden w-px bg-gradient-to-t from-[oklch(0.9_0.12_350)] via-[oklch(0.9_0.12_350)] to-transparent transition-all duration-500 group-hover:block group-hover:h-full" />

            <span className="relative z-10">Book Table</span>
          </Link>
        </div>
      </div>
    </section>
  );
}