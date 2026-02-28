"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const totalWidth = scrollRef.current.scrollWidth;

    gsap.to(scrollRef.current, {
      x: -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalWidth}`,
        scrub: 1,
        pin: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-black text-white"
    >
      <div
        ref={scrollRef}
        className="flex h-full items-center space-x-40 px-40"
      >
        {["Speed", "Precision", "Performance", "Innovation"].map(
          (item, i) => (
            <h2 key={i} className="text-7xl font-bold whitespace-nowrap">
              {item}
            </h2>
          )
        )}
      </div>
    </section>
  );
}