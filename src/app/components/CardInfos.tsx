import { Circle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type CardInfosProps = {
  title: string;
  subtitle: string;
};

export const CardInfos = ({ title, subtitle }: CardInfosProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate random values once on mount to ensure hydration consistency
  // However, for SSG/SSR safety in Next.js with random values, we should use useEffect to set them
  // or use a seed if possible. Here, setting them in a useMemo with empty dependency array might cause hydration mismatch if rendered on server.
  // Standard practice for random values in React causing hydration issues: use useEffect to trigger animation or set values.

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const moveCard = () => {
      // Generate new random values for each segment of the movement
      // Keeping high amplitude but ensuring it stays somewhat centered by using a range around 0
      const yNext = gsap.utils.random(-60, -10); // Floating above
      const xNext = gsap.utils.random(-30, 30);
      const rotNext = gsap.utils.random(-10, 10);
      const duration = gsap.utils.random(3, 6); // Slower, more drifting duration to feel "natural" yet expressive

      gsap.to(card, {
        y: yNext,
        x: xNext,
        rotation: rotNext,
        duration: duration,
        ease: "sine.inOut",
        onComplete: moveCard, // Recursion for infinite random path
      });
    };

    // Separate breathing loop
    gsap.to(card, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Start the movement
    moveCard();

    return () => {
      gsap.killTweensOf(card);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-3 gap-3 flex justify-start pb-5 max-w-[210px] items-baseline bg-white/30 backdrop-blur-xs relative border border-white/70 top-45 rounded-2xl will-change-transform"
    >
      <Circle size={16} className="align-text-top text-primary-orange" />
      <div>
        <h3 className="text-[16px] font-medium">{title}</h3>
        <p className="text-xs py-1  text-gray-muted-contrast">{subtitle}</p>
      </div>
    </div>
  );
};
