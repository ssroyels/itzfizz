"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".scroll-item");
    
    // Horizontal Movement
    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.5, // Thoda smooth delay ke liye
        snap: 1 / (sections.length - 1), // Har slide par apne aap rukega
        start: "top top",
        end: () => `+=${scrollRef.current.offsetWidth}`,
      },
    });

    // Lajawab Entrance Effect: Har word slide hote waqt scale ho
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector("h2"),
        { opacity: 0, scale: 0.5, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween, // Ye line magic hai!
            start: "left center",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const items = ["Speed", "Precision", "Performance", "Innovation"];

  return (
    <section ref={containerRef} className="overflow-hidden bg-[#0a0a0a]">
      <div 
        ref={scrollRef} 
        className="flex h-screen w-[400vw] items-center"
      >
        {items.map((item, i) => (
          <div 
            key={i} 
            className="scroll-item relative flex h-full w-screen items-center justify-center border-r border-white/10"
          >
            {/* Background Number (Ghost Text) */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-white/[0.03] select-none">
              0{i + 1}
            </span>
            
            {/* Main Heading */}
            <h2 className="relative z-10 text-8xl font-black uppercase tracking-tighter text-white md:text-[10rem]">
              {item}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}