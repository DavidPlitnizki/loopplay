"use client";

import { useInView } from "@/hooks/useInView";

type Variant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "fade";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
}

const variants: Record<Variant, { hidden: string; visible: string }> = {
  fadeUp:    { hidden: "opacity-0 translate-y-8",  visible: "opacity-100 translate-y-0" },
  fadeDown:  { hidden: "opacity-0 -translate-y-8", visible: "opacity-100 translate-y-0" },
  fadeLeft:  { hidden: "opacity-0 translate-x-8",  visible: "opacity-100 translate-x-0" },
  fadeRight: { hidden: "opacity-0 -translate-x-8", visible: "opacity-100 translate-x-0" },
  fade:      { hidden: "opacity-0",                visible: "opacity-100" },
};

export function AnimateIn({ children, className = "", variant = "fadeUp", delay = 0 }: AnimateInProps) {
  const { ref, inView } = useInView();
  const { hidden, visible } = variants[variant];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${inView ? visible : hidden} ${className}`}
    >
      {children}
    </div>
  );
}
