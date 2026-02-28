"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const textRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[200vh] bg-white text-black flex flex-col items-center justify-center space-y-40 py-40"
    >
      {[
        "We Design Motion.",
        "We Craft Experiences.",
        "We Build Digital Stories.",
      ].map((text, index) => (
        <h2
          key={index}
          ref={(el) => (textRef.current[index] = el)}
          className="text-5xl md:text-7xl font-light text-center"
        >
          {text}
        </h2>
      ))}
    </section>
  );
}