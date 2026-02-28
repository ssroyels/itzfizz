"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ParallaxSection() {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: -200,
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section className="h-screen relative overflow-hidden">
      <img
        ref={imageRef}
        src="/pexels-photo-381228.webp"
        className="w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-6xl font-light">
        Experience The Drive
      </div>
    </section>
  );
}