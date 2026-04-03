import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export const ShopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      y: -4,
      boxShadow: '0 20px 25px -5px rgba(255, 124, 50, 0.4), 0 8px 10px -6px rgba(255, 124, 50, 0.2)',
      duration: 0.2,
      ease: 'power2.out',
    });
    gsap.to(arrowRef.current, {
      x: 4,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      duration: 0.2,
      ease: 'power2.out',
    });
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="shop-btn flex items-center justify-center gap-4 bg-gradient-to-r from-[#FF7C32] to-[#FFB86C] text-white font-inter font-bold uppercase tracking-[0.04em] text-[18px] md:text-[24px] lg:text-[32px] py-4 md:py-6 px-8 md:px-16 rounded-2xl shadow-md transition-all"
    >
      Shop Now
      <ArrowRight ref={arrowRef} size={24} strokeWidth={2.5} />
    </button>
  );
};
