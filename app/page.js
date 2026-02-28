"use client";

import PremiumHero from "../components/PremiumHero";
import ScrollStory from "../components/ScrollStory";
import HorizontalScroll from "../components/HorizontalScroll";
import ParallaxSection from "../components/ParallaxSection";
import ScrollProgress from "../components/ScrollProgress";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const textRef = useRef(null);
  const videoSectionRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis (Buttery Smooth Scroll)
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // 2. Background Color Flip (Inversion Logic)
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 40%",
          end: "top 10%",
          scrub: 1,
        },
        backgroundColor: "#ffffff",
        color: "#000000",
      });

      // 3. Cinematic Text Reveal (Staggered & Zoom)
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: 1.5,
        },
      });

      textTl
        .fromTo(".char-reveal", 
          { y: 100, opacity: 0, rotateX: -45 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 1 }
        )
        .fromTo(".para-fade", 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8 }, 
          "-=0.5"
        );

      // 4. Horizontal Content Scroll (Jakkash Section)
      gsap.to(".horizontal-scroll", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-container",
          pin: true,
          scrub: 1,
          end: "+=2000",
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white transition-colors duration-1000 ease-in-out">
      {/* 1. Hero Section */}
     <ScrollProgress />
      <PremiumHero />
      <ScrollStory />
      <HorizontalScroll />
      <ParallaxSection />

      {/* 2. Transition Section (Light Mode) */}
      <section
        ref={triggerRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <span className="text-[30vw] font-black opacity-[0.03] select-none tracking-tighter">
            CREATIVE
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.9] flex flex-wrap justify-center gap-x-4">
            {"Driven By Innovation".split(" ").map((word, i) => (
              <span key={i} className="char-reveal inline-block overflow-hidden">
                {word}
              </span>
            ))}
          </h2>
          
          <p className="para-fade max-w-2xl mx-auto mt-12 text-xl md:text-2xl font-medium opacity-70">
            We architect digital emotions through 
            <span className="text-blue-600 font-bold"> code and soul.</span>
          </p>
        </div>
      </section>

      {/* 3. Horizontal Feature Section (The Bhayanak Part) */}
      <section className="horizontal-container bg-black text-white overflow-hidden h-screen">
        <div className="horizontal-scroll flex items-center h-full w-[200vw] px-[10vw] gap-20">
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
            <h3 className="text-8xl font-bold text-blue-500">01.</h3>
            <p className="text-4xl font-light">Unmatched Performance.</p>
          </div>
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
            <h3 className="text-8xl font-bold text-purple-500">02.</h3>
            <p className="text-4xl font-light">Immersive Storytelling.</p>
          </div>
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
            <h3 className="text-8xl font-bold text-pink-500">03.</h3>
            <p className="text-4xl font-light">Future-Proof Tech.</p>
          </div>
        </div>
      </section>

      {/* 4. Final Section: The Dark Void */}
      <section className="h-screen flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_#000_100%)]" />
        
        {/* Animated Glow Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />

        <div className="relative z-10 text-center">
          <h2 className="text-[15vw] font-thin tracking-[0.3em] opacity-20 mix-blend-overlay">
            ITZFIZZ
          </h2>
          <button className="mt-[-50px] px-12 py-4 border border-white/20 rounded-full backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-500 text-lg uppercase tracking-widest">
            Lets Talk
          </button>
        </div>

        <div className="absolute bottom-10 left-10 text-[10px] tracking-[0.5em] uppercase opacity-40">
          © 2024 ITZFIZZ STUDIO • ALL RIGHTS RESERVED
        </div>
      </section>
    </main>
  );
}