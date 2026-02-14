"use client";

import { ReactElement, useEffect, useRef } from "react";
import gsap from "gsap";

type ChildrenType = {
  children: ReactElement;
  shouldAnimate: boolean;
};

export function CompontsWapperCard({ children, shouldAnimate }: ChildrenType) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (shouldAnimate) {
      const ctx = gsap.context(() => {
        // "Real" breathing: expanding and contracting visibly
        gsap.fromTo(
          element,
          { scale: 0.97 }, // Start contracted
          {
            scale: 1.03, // Expand significantly
            duration: 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }, containerRef);

      return () => ctx.revert();
    } else {
      gsap.to(element, {
        scale: 1, // Reset to natural size
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [shouldAnimate]);

  const handleFocus = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1, // Reset to natural size
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const handleBlur = () => {
    if (containerRef.current && shouldAnimate) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.97 },
        {
          scale: 1.03,
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          overwrite: true,
        }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      className="border-2 shadow-xl border-white
  bg-gray-surface w-full max-w-[864.98px] inline-block rounded-3xl"
    >
      {children}
    </div>
  );
}
