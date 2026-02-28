"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Components (Assuming you have these updated from previous steps)
import PremiumHero from "../components/PremiumHero";
import ScrollStory from "../components/ScrollStory";
import HorizontalScroll from "../components/HorizontalScroll";
import ParallaxSection from "../components/ParallaxSection";
import ScrollProgress from "../components/ScrollProgress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalSectionRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis (Buttery Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // 2. Background Inversion (Black to White Transition)
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 30%",
          end: "top 10%",
          scrub: 1,
        },
        backgroundColor: "#ffffff",
        color: "#000000",
      });

      // 3. 3D Text Reveal (Perspective Animation)
      gsap.from(".char-reveal span", {
        y: 150,
        rotateX: -90,
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        }
      });

      // 4. Advanced Horizontal Scroll with Skew Effect
      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(".horizontal-item", "skewX", "deg");
      let clamp = gsap.utils.clamp(-20, 20);

      gsap.to(horizontalRef.current, {
        xPercent: -66.6, // Based on 3 items (100 - 33.3)
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=3000",
          onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -300);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew)
              });
            }
          }
        }
      });

      // 5. Final Section Reveal
      gsap.from(".final-heading", {
        scale: 0.5,
        opacity: 0,
        filter: "blur(20px)",
        scrollTrigger: {
          trigger: ".final-section",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] text-white transition-colors duration-1000">
      <ScrollProgress />
      
      {/* Cinematic Hero */}
      <PremiumHero />

      {/* Story Reveal */}
      <ScrollStory />

      {/* Parallax Depth */}
      <ParallaxSection />

      {/* 1. The Intersection (Light Mode Break) */}
      <section
        ref={triggerRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[30vw] font-black tracking-tighter uppercase italic">Pure</h2>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="char-reveal text-7xl md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter flex flex-wrap justify-center gap-x-8">
            {"Impact Meets Soul".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-4">
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </h2>
          <p className="para-fade max-w-xl mx-auto text-lg md:text-xl opacity-60 font-medium">
            We don't just build websites. We build 
            <span className="text-blue-600"> digital legacies </span> 
            that breathe and react.
          </p>
        </div>
      </section>

      {/* 2. The Bhayanak Horizontal Section */}
      <section ref={horizontalSectionRef} className="bg-black text-white overflow-hidden h-screen flex items-center">
        <div ref={horizontalRef} className="flex h-[70vh] gap-[10vw] px-[10vw] items-center will-change-transform">
          {[
            { id: "01", title: "CRAZY SPEED", color: "text-blue-500", desc: "Optimized beyond limits." },
            { id: "02", title: "PIXEL PERFECT", color: "text-purple-500", desc: "Design that commands respect." },
            { id: "03", title: "MOTION ART", color: "text-emerald-500", desc: "Fluidity in every interaction." },
          ].map((item, i) => (
            <div key={i} className="horizontal-item w-[80vw] md:w-[45vw] flex-shrink-0 group">
              <h3 className={`text-[12vw] font-black ${item.color} leading-none mb-4 group-hover:italic transition-all`}>
                {item.id}.
              </h3>
              <p className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">{item.title}</p>
              <p className="text-xl opacity-40 uppercase tracking-[0.5em]">{item.desc}</p>
              <div className="w-full h-[1px] bg-white/10 mt-8 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Dark Void (Final Contact) */}
      <section className="final-section h-screen flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50" />
        <div className="absolute w-[100vw] h-[100vw] bg-blue-600/10 rounded-full blur-[150px] animate-[pulse_10s_infinite]" />

        <div className="relative z-10 text-center space-y-12">
          <h2 className="final-heading text-[12vw] font-black uppercase tracking-tighter leading-none italic select-none">
            Ready to <br /> <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Evolve?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="group relative px-16 py-6 overflow-hidden rounded-full border border-white/20 transition-all hover:border-blue-500">
              <span className="relative z-10 font-bold tracking-widest uppercase">Start a Project</span>
              <div className="absolute inset-0 bg-blue-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Footer HUD */}
        <div className="absolute bottom-10 w-full px-10 flex justify-between items-end text-[10px] tracking-[0.5em] uppercase opacity-30">
          <div>Based in Digital Space</div>
          <div>© 2024 ITZFIZZ.STUDIO</div>
        </div>
      </section>
    </main>
  );
}