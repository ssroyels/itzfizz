"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollStory() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Har heading ke liye alag animation logic
      textRefs.current.forEach((el, i) => {
        // Text Reveal Effect: Text grayscale se bright white/black hoga
        gsap.fromTo(
          el,
          { 
            backgroundSize: "0% 100%",
            opacity: 0.2,
            y: 50,
            filter: "blur(10px)"
          },
          {
            backgroundSize: "100% 100%",
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });

      // 2. Background Color Morphing (Smooth Transition)
      gsap.to(containerRef.current, {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Text color change background ke saath
      gsap.to(textRefs.current, {
        color: "#ffffff",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const phrases = [
    "We Design Motion.",
    "We Craft Experiences.",
    "We Build Digital Stories.",
    "The Future is Kinetic."
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-[300vh] bg-[#f0f0f0] transition-colors duration-700 flex flex-col items-center py-[20vh] space-y-[40vh]"
    >
      {phrases.map((text, index) => (
        <div key={index} className="px-6 overflow-hidden">
          <h2
            ref={(el) => (textRefs.current[index] = el)}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-center leading-[0.9] select-none
                       bg-gradient-to-r from-blue-600 to-blue-600 bg-no-repeat bg-clip-text text-transparent bg-[length:0%_100%]"
            style={{ 
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(to right, currentColor 100%, currentColor 100%)",
              color: "inherit"
            }}
          >
            {text}
          </h2>
        </div>
      ))}

      {/* Aesthetic Footer Hint */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[1em] uppercase opacity-30 mix-blend-difference text-white">
        Keep Scrolling
      </div>
    </section>
  );
}