"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "EVENTS",
    href: "/events",
  },
  {
    name: "BOOK TABLE",
    href: "/book-table",
  },
  {
    name: "CONTACT US",
    href: "/contact-us",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  const navRefs = useRef([]);

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

  const moveIndicator = (index) => {
    const element = navRefs.current[index];

    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  };

  return (
    <header className="w-full bg-black border-t border-pink-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 h-[95px] flex items-center justify-between relative">
        {/* Logo */}
        <div>
          <h1 className="text-white font-extrabold text-4xl tracking-[4px]">
            NIGHT<span className="text-pink-500">CLUB</span>
          </h1>

          <p className="text-white/70 text-[10px] tracking-[6px] mt-2 uppercase">Have a good time</p>
        </div>

        {/* Navigation */}
        <nav className="relative">
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
                  className="group relative overflow-hidden h-[28px] flex items-start"
                >
                  <div className="relative h-[28px] overflow-hidden">
                    <span className={`block transition-transform duration-300 ease-out group-hover:-translate-y-[28px] ${isActive ? "-translate-y-[28px]" : ""}`}>
                      {/* White text */}
                      <span className="block h-[28px] text-white font-semibold tracking-[2px] text-sm leading-[28px]">{item.name}</span>

                      {/* Pink text */}
                      <span className="block h-[28px] text-pink-500 font-semibold tracking-[2px] text-sm leading-[28px]">{item.name}</span>
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Moving underline */}
            <span
              className="absolute -bottom-3 h-[2px] bg-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
