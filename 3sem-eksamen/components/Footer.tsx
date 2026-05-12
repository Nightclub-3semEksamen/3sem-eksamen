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
          
          <section>
        <div className="mb-14">
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
      className="block h-auto w-[180px]"
      priority={false}
    />
  </Link>
</div>

            <div className="mb-8">
              <h3 className="mb-2 text-xl font-medium text-[oklch(0.65_0.25_8)]">
                LOCATION
              </h3>

              <p className="text-base font-medium leading-8">
                Kompagnistræde 278
                <br />
                1265 København K
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-medium text-[oklch(0.65_0.25_8)]">
                OPENING HOURS
              </h3>

              <p className="text-base font-medium leading-8">
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

        
        <div className="mt-auto grid grid-cols-1 items-end gap-8 lg:grid-cols-3">
          <p className="hidden text-sm font-medium text-[oklch(0.64_0_0)] lg:block">
            Night Club - All Rights Reserved
          </p>

          <div className="text-center">
            <p className="mb-5 text-base font-medium">Stay Connected With Us</p>

            <div className="flex justify-center gap-5">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center border-2 border-white text-sm transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
              >
               <FaFacebookF className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="Snapchat"
                className="flex h-11 w-11 items-center justify-center border-2 border-white text-sm transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
              >
                <FaSnapchatGhost className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center border-2 border-white text-sm transition hover:border-[oklch(0.65_0.25_8)] hover:text-[oklch(0.65_0.25_8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.65_0.25_8)]"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <p className="hidden text-right text-sm font-medium text-[oklch(0.64_0_0)] lg:block">
            Copyright © NightClub
          </p>
        </div>
      </div>
    </footer>
  );
}