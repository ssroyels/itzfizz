"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Thoda smooth delay premium feel deta hai
        onUpdate: (self) => {
          // Percent state update for the counter
          setPercent(Math.round(self.progress * 100));
        },
      },
    });

    tl.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
    });

    // Pulse effect jab 100% pahonche
    gsap.to(progressRef.current, {
      boxShadow: "0px 0px 20px 2px rgba(59, 130, 246, 0.8)",
      repeat: -1,
      yoyo: true,
      duration: 1,
      paused: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[6px] z-[9999] bg-white/5 backdrop-blur-sm">
      {/* The Animated Progress Bar */}
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-white origin-left scale-x-0 will-change-transform shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      />

      {/* Floating Percentage Indicator */}
      <div 
        className="absolute top-4 right-6 font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase select-none flex items-center gap-2"
      >
        <span className="w-8 h-[1px] bg-white/20 inline-block"></span>
        <span>Reading Progress</span>
        <span ref={counterRef} className="text-white font-bold min-w-[40px]">
          {percent}%
        </span>
      </div>

      {/* Aesthetic Detail: Thin line across screen */}
      <div className="absolute top-[6px] left-0 w-full h-[1px] bg-white/10" />
    </div>
  );
}