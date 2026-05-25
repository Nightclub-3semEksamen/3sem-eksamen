"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  name: string;
  href: string;
};

type IndicatorStyle = {
  left: number;
  width: number;
};

const navItems: NavItem[] = [
  { name: "HOME", href: "/" },
  { name: "EVENTS", href: "/events" },
  { name: "BOOK TABLE", href: "/book-table" },
  { name: "CONTACT US", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
  });

  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)));

    const activeElement = navRefs.current[activeIndex];

    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [pathname]);

  const moveIndicator = (index: number) => {
    const element = navRefs.current[index];

    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  };

  return (
    <>
      <header className="w-full bg-black border-y border-pink-500 relative overflow-hidden">
        {/* Pink corner triangles */}
        <span className="absolute left-0 top-0 w-0 h-0 border-t-[18px] border-t-pink-500 border-r-[18px] border-r-transparent z-10" />
        <span className="absolute right-0 bottom-0 w-0 h-0 border-b-[18px] border-b-pink-500 border-l-[18px] border-l-transparent z-10" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[82px] md:h-[95px] flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="relative z-20">
            <h1 className="text-white font-extrabold text-2xl md:text-4xl tracking-[3px] md:tracking-[4px]">
              NIGHT<span className="text-pink-500">CLUB</span>
            </h1>

            <p className="text-white/70 text-[8px] md:text-[10px] tracking-[5px] md:tracking-[6px] mt-2 uppercase">Have a good time</p>
          </Link>

          {/* Desktop navigation */}
          <nav className="relative hidden md:block">
            <div className="flex items-center gap-12 relative">
              {navItems.map((item, index) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    ref={(el) => {
                      navRefs.current[index] = el;
                    }}
                    onMouseEnter={() => moveIndicator(index)}
                    onMouseLeave={() => {
                      const activeIndex = navItems.findIndex((navItem) => (navItem.href === "/" ? pathname === "/" : pathname.startsWith(navItem.href)));

                      moveIndicator(activeIndex);
                    }}
                    className="group relative overflow-hidden h-[28px] flex items-start"
                  >
                    <div className="relative h-[28px] overflow-hidden">
                      <span className={`block transition-transform duration-300 ease-out group-hover:-translate-y-[28px] ${isActive ? "-translate-y-[28px]" : ""}`}>
                        <span className="block h-[28px] text-white font-semibold tracking-[2px] text-sm leading-[28px]">{item.name}</span>

                        <span className="block h-[28px] text-pink-500 font-semibold tracking-[2px] text-sm leading-[28px]">{item.name}</span>
                      </span>
                    </div>
                  </Link>
                );
              })}

              <span
                className="absolute -bottom-3 h-[2px] bg-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            </div>
          </nav>

          {/* Mobile burger */}
          <button popoverTarget="mobile-menu" className="md:hidden relative z-20 flex flex-col gap-[6px]" aria-label="Open menu">
            <span className="w-9 h-[3px] bg-white rounded-full" />
            <span className="w-9 h-[3px] bg-white rounded-full" />
            <span className="w-9 h-[3px] bg-white rounded-full" />
          </button>
        </div>
      </header>

      {/* Mobile Popover Menu */}
      <div id="mobile-menu" popover="auto" className="backdrop:bg-black/70 bg-transparent p-0 border-0 w-full h-full max-w-none max-h-none">
        <div className="relative min-h-screen bg-black/80 flex items-center justify-center overflow-hidden">
          {/* Background image / overlay */}
          <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-black/60" />

          <button popoverTarget="mobile-menu" popoverTargetAction="hide" className="absolute top-8 right-8 z-30 text-white text-5xl font-bold" aria-label="Close menu">
            ×
          </button>

          <nav className="relative z-20 flex flex-col items-center gap-8">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link key={item.name} href={item.href} popoverTarget="mobile-menu" className={`relative text-base font-bold tracking-[1px] transition-colors hover:text-pink-500 ${isActive ? "text-pink-500" : "text-white"}`}>
                  {item.name}

                  {isActive && <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-[2px] bg-pink-500 rounded-full" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
