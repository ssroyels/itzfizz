"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image Parallax + Zoom Effect
      gsap.to(imageRef.current, {
        yPercent: 20, // Downward movement to counter scroll
        scale: 1.2,   // Subtle zoom-in
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Text Parallax + Character Spacing
      gsap.to(textRef.current, {
        y: -150,      // Text moves faster than image
        letterSpacing: "0.2em", 
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 3. Dynamic Overlay Darkening
      gsap.to(overlayRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[120vh] w-full overflow-hidden bg-black"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 h-[140%] w-full">
        <img
          ref={imageRef}
          src="/pexels-photo-381228.webp" 
          alt="Luxury Car"
          className="h-full w-full object-cover will-change-transform"
        />
      </div>

      {/* Dark Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 transition-colors duration-500" 
      />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div ref={textRef} className="will-change-transform">
          <p className="mb-4 text-sm uppercase tracking-[0.5em] text-white/70">
            Next Generation
          </p>
          <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white md:text-8xl lg:text-9xl">
            Experience <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>
              The Drive
            </span>
          </h2>
        </div>
      </div>

      {/* Bottom Gradient for Smooth Section Transition */}
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}