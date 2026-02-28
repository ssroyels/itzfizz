"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div
        ref={progressRef}
        className="h-full bg-white origin-left scale-x-0"
      />
    </div>
  );
}