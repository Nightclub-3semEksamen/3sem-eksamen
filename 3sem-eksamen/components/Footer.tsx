import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="relative min-h-[730px] bg-cover bg-center font-ubuntu text-white"
      style={{ backgroundImage: "url('/images/fest.webp')" }}
    >
      <div/>

      <div className="relative mx-auto flex min-h-[730px] max-w-7xl flex-col px-8 py-16">
        
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-20">
          
          <section className="text-center lg:text-left">
        <div className="mb-25 flex justify-center lg:mb-14 lg:justify-start">
  <Link
    href="/"
    aria-label="Go to homepage"
    className="-m-2 block w-fit rounded-sm p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
  >
    <Image
      src="/images/logo.webp"
      alt="Night Club logo"
      width={180}
      height={90}
      className="block h-auto w-[270px] lg:w-[180px]"
      priority={false}
    />
  </Link>
</div>

            <div className="mb-8">
              <h3 className="mb-3 text-3xl font-medium text-[oklch(0.65_0.25_8)] lg:mb-2 lg:text-xl">
                LOCATION
              </h3>

              <p className="text-2xl font-medium leading-10 lg:text-base lg:leading-8">
                Kompagnistræde 278
                <br />
                1265 København K
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-3xl font-medium text-[oklch(0.65_0.25_8)] lg:mb-2 lg:text-xl">
                OPENING HOURS
              </h3>

              <p className="text-2xl font-medium leading-10 lg:text-base lg:leading-8">
                WED - THU 10:30 PM TO 3 AM
                <br />
                SAT - SUN: 11 PM TO 5 AM
              </p>
            </div>
          </section>

         <section className="hidden lg:block">
  <div className="translate-x-20">
    <h3 className="mb-10 text-xl font-medium text-[oklch(0.65_0.25_8)]">
      NEWS
    </h3>

    <div className="space-y-[76px]">
      <article className="flex gap-6">
        <div className="relative h-[96px] w-[110px] shrink-0 overflow-hidden">
          <Image
            src="/images/dj.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="w-[330px]">
          <p className="text-base leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </p>

          <p className="mt-3 text-sm font-medium text-[oklch(0.65_0.25_8)]">
            April 17, 2026
          </p>
        </div>
      </article>

      <article className="flex gap-6">
        <div className="relative h-[96px] w-[110px] shrink-0 overflow-hidden">
          <Image
            src="/images/party.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="w-[330px]">
          <p className="text-base leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </p>

          <p className="mt-3 text-sm font-medium text-[oklch(0.65_0.25_8)]">
            April 17, 2026
          </p>
        </div>
      </article>
    </div>
  </div>
</section>
          

          <section className="hidden lg:block ">
            <h3 className="mb-10 text-xl font-medium text-[oklch(0.65_0.25_8)]">
              RECENT POSTS
            </h3>

            <div className="space-y-21">
              <article className="flex gap-5">
                <FaXTwitter className="mt-1 h-5 w-5 shrink-0 text-[oklch(0.65_0.25_8)]" />

                <div className="w-[300px]">
                <p className="text-base leading-7">
                It is a long established fact that a reader will be distracted by the readable...
                </p>

                  <p className="mt-2 text-sm font-medium text-[oklch(0.65_0.25_8)]">
                    5 hours ago
                  </p>
                </div>
              </article>

              <article className="flex gap-5">
                <FaXTwitter className="mt-1 h-5 w-5 shrink-0 text-[oklch(0.65_0.25_8)]" />

                <div className="w-[300px]">
                <p className="text-base leading-7">
                It is a long established fact that a reader will be distracted by the readable...
                </p>

                  <p className="mt-2 text-sm font-medium text-[oklch(0.65_0.25_8)]">
                    5 hours ago
                  </p>
                </div>
              </article>
            </div>
          </section>
        </div>

        
       <div className="mt-20 grid grid-cols-1 items-center gap-10 text-center lg:mt-auto lg:grid-cols-3 lg:items-end lg:gap-10">
  <p className="order-2 text-lg font-medium leading-10 text-[oklch(0.64_0_0)] lg:order-1 lg:text-left lg:text-sm lg:leading-normal">
    Night Club
    <br className="lg:hidden" />
    <span className="hidden lg:inline"> - </span>
    All Rights Reserved
  </p>

  <div className="order-1 text-center lg:order-2">
    <p className="mb-7 text-2xl font-medium lg:mb-5 lg:text-base">
      Stay Connected With Us
    </p>

    <div className="mb-10 flex justify-center gap-8 lg:mb-0 lg:gap-5">
      <a
        href="#"
        aria-label="Facebook"
        className="flex h-14 w-14 items-center justify-center border-2 border-white text-white transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)] lg:h-11 lg:w-11"
      >
        <FaFacebookF className="h-6 w-6 lg:h-5 lg:w-5" />
      </a>

      <a
        href="#"
        aria-label="Snapchat"
        className="flex h-14 w-14 items-center justify-center border-2 border-white text-white transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)] lg:h-11 lg:w-11"
      >
        <FaSnapchatGhost className="h-6 w-6 lg:h-5 lg:w-5" />
      </a>

      <a
        href="#"
        aria-label="Instagram"
        className="flex h-14 w-14 items-center justify-center border-2 border-white text-white transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)] lg:h-11 lg:w-11"
      >
        <FaInstagram className="h-6 w-6 lg:h-5 lg:w-5" />
      </a>
    </div>
  </div>

  <p className="order-3 text-lg font-medium text-[oklch(0.64_0_0)] lg:text-right lg:text-sm">
    Copyright © NightClub
  </p>
</div>
 </div>
    </footer>
  );
}