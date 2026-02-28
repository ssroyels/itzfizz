"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function UltraPremiumHero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const carRef = useRef(null);
  const glowRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Mouse Follower & Parallax
      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        xTo(clientX);
        yTo(clientY);

        // Subtle Tilt for the Car based on mouse position
        const xRotation = (clientY / window.innerHeight - 0.5) * 10;
        const yRotation = (clientX / window.innerWidth - 0.5) * 15;
        
        gsap.to(carRef.current, {
          rotateY: yRotation,
          rotateX: -xRotation,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 2. The "Entrance" Timeline
      const intro = gsap.timeline();

      intro
        .set(overlayRef.current, { scaleY: 1 })
        .to(overlayRef.current, { scaleY: 0, duration: 1.5, ease: "expo.inOut", transformOrigin: "top" })
        .from(".letter", {
          y: 200,
          rotateZ: 10,
          opacity: 0,
          stagger: 0.04,
          duration: 1.5,
          ease: "expo.out",
        }, "-=0.8")
        .from(carRef.current, {
          y: 400,
          scale: 0.8,
          opacity: 0,
          duration: 2,
          ease: "power4.out"
        }, "-=1.2")
        .from(".reveal-item", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
        }, "-=1");

      // 3. Ultra-Smooth Scroll Effects
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: true, // Pins the hero during the transition
        },
      });

      scrollTl
        .to(carRef.current, {
          scale: 3.5,
          y: -100,
          z: 500, // 3D depth push
          filter: "brightness(1.5) contrast(1.2)",
          ease: "none",
        })
        .to(".bg-mesh", {
          scale: 2,
          opacity: 0.4,
          ease: "none",
        }, 0)
        .to(headlineRef.current, {
          y: -300,
          scale: 0.5,
          opacity: 0,
          filter: "blur(20px)",
          ease: "none",
        }, 0);

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  const text = "ITZFIZZ.STUDIO";

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center text-white perspective-[1000px]"
    >
      {/* Cinematic Entrance Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-white z-[100] pointer-events-none" />

      {/* Dynamic Cursor Glow */}
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />

      {/* Background Grid with Noise */}
      <div className="bg-mesh absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-6">
        <h1 
          ref={headlineRef}
          className="text-[12vw] font-black leading-none tracking-tighter flex justify-center overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {text.split("").map((char, i) => (
            <span key={i} className="letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <div className="reveal-item flex flex-col items-center">
            <p className="text-gray-400 text-lg md:text-xl max-w-lg font-light tracking-widest uppercase">
              Beyond the <span className="text-white font-bold">Standard</span>
            </p>
            
            <div className="mt-8 flex gap-4">
               <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                  GET ACCESS
               </button>
               <button className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md">
                  REEL 2024
               </button>
            </div>
        </div>
      </div>

      {/* Floating Car - The Main Asset */}
      <div className="absolute bottom-[-5%] w-[85%] md:w-[55%] z-20 pointer-events-none select-none">
        <img
          ref={carRef}
          src="/pexels-photo-381228.webp"
          alt="Luxury Car"
          className="w-full h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        />
        {/* Ground Reflection Shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-blue-500/20 blur-[60px] rounded-full" />
      </div>

      {/* Side HUD Info */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 space-y-8 hidden lg:block reveal-item">
        <div className="rotate-90 origin-left text-[10px] tracking-[1em] opacity-30 uppercase whitespace-nowrap">
          Scroll to explore — Experience the future
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 reveal-item">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-20" />
        <span className="text-[10px] tracking-[0.5em] opacity-50 uppercase">Explore</span>
      </div>
    </section>
  );
}