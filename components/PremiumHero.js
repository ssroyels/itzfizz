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
      // 1. Kinetic Mouse Follower (The Glow Effect)
      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        xTo(clientX);
        yTo(clientY);

        // Subtle 3D Tilt for Car and Headline
        const xRotation = (clientY / window.innerHeight - 0.5) * 15;
        const yRotation = (clientX / window.innerWidth - 0.5) * 20;
        
        gsap.to([carRef.current, headlineRef.current], {
          rotateY: yRotation,
          rotateX: -xRotation,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 2. Cinematic Entrance Timeline
      const intro = gsap.timeline();
      intro
        .set(overlayRef.current, { scaleY: 1 })
        .to(overlayRef.current, { 
          scaleY: 0, 
          duration: 1.4, 
          ease: "expo.inOut", 
          transformOrigin: "top" 
        })
        .from(".letter", {
          y: 120,
          rotateZ: 15,
          opacity: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: "expo.out",
        }, "-=0.6")
        .from(carRef.current, {
          z: -1000,
          y: 200,
          opacity: 0,
          duration: 2,
          ease: "power4.out"
        }, "-=1.2")
        .from(".reveal-item", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out"
        }, "-=1");

      // 3. The "Tunnel Vision" Scroll Effect
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.5,
          pin: true,
        },
      });

      scrollTl
        .to(carRef.current, {
          scale: 4,
          z: 800,
          y: -150,
          filter: "brightness(1.8) contrast(1.1)",
        })
        .to(headlineRef.current, {
          y: -400,
          scale: 0.8,
          opacity: 0,
          filter: "blur(30px)",
        }, 0)
        .to(".bg-mesh", {
          scale: 1.5,
          opacity: 0.5,
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
      className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center text-white perspective-[1500px]"
    >
      {/* 1. Preloader Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-white z-[100] pointer-events-none" />

      {/* 2. Interactive Glow Background */}
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />

      {/* 3. Futuristic Grid Layer */}
      <div className="bg-mesh absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030303_100%)]" />
      </div>

      {/* 4. Hero Content */}
      <div className="relative z-10 text-center select-none">
        <h1 
          ref={headlineRef}
          className="text-[14vw] font-black leading-none tracking-tighter flex justify-center overflow-hidden italic"
          style={{ transformStyle: "preserve-3d" }}
        >
          {text.split("").map((char, i) => (
            <span key={i} className="letter inline-block drop-shadow-2xl">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <div className="reveal-item mt-4 space-y-8 flex flex-col items-center">
          <p className="text-gray-400 text-sm md:text-base font-medium tracking-[1em] uppercase">
            Evolution of <span className="text-white">Motion</span>
          </p>
          
          <div className="flex gap-6">
            <button className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-500 rounded-sm">
              Explore Model
            </button>
            <button className="px-10 py-4 border border-white/10 text-white font-black text-xs uppercase tracking-widest backdrop-blur-xl hover:bg-white/5 transition-all rounded-sm">
              Watch Film
            </button>
          </div>
        </div>
      </div>

      {/* 5. The Hero Asset (Car) */}
      <div 
        ref={carRef}
        className="absolute bottom-[-10%] w-[90%] md:w-[60%] z-20 pointer-events-none drop-shadow-[0_100px_80px_rgba(0,0,0,1)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src="/pexels-photo-381228.webp"
          alt="Luxury Performance"
          className="w-full h-auto will-change-transform"
        />
        {/* Underglow Reflection */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-blue-500/30 blur-[100px] rounded-[100%] z-[-1]" />
      </div>

      {/* 6. Side HUD Decor */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 space-y-2 hidden lg:block reveal-item text-right">
        <p className="text-[10px] font-bold tracking-widest opacity-40">CHASSIS: 0x4421</p>
        <p className="text-[10px] font-bold tracking-widest opacity-40">TOP SPEED: 340 KM/H</p>
        <div className="w-40 h-[1px] bg-white/20 ml-auto mt-4" />
      </div>

      {/* 7. Scroll Indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-4 reveal-item">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-30 animate-pulse" />
      </div>
    </section>
  );
}