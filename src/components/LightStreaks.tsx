import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';

// Memoized to prevent unnecessary re-renders
export const LightStreaks = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const [aspectRatio, setAspectRatio] = useState('none');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setAspectRatio('xMidYMid slice');
      } else {
        setAspectRatio('none');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initial animation in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 0.5, ease: 'power2.inOut' }
    );

    // Only animate a subset of paths for performance (every other one)
    pathsRef.current.forEach((path, i) => {
      if (!path || i % 2 !== 0) return; // Skip half the paths for perf
      gsap.to(path, {
        y: 10 + Math.random() * 15 * (i % 2 === 0 ? 1 : -1),
        x: 8 + Math.random() * 12 * (i % 3 === 0 ? 1 : -1),
        duration: 4 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    });
  }, []);

  const addToRefs = (el: SVGPathElement | null) => {
    if (el && !pathsRef.current.includes(el)) {
      pathsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={aspectRatio}
      >
        <defs>
          <linearGradient id="streak-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-2)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--color-2)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--color-2)" stopOpacity="0.7" />
            <stop offset="80%" stopColor="var(--color-2)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-2)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="streak-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-1)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--color-1)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--color-1)" stopOpacity="0.7" />
            <stop offset="80%" stopColor="var(--color-1)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-1)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-intense" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#glow)">
          {/* Base thick glows - reduced from 4 to 2 */}
          <path d="M-200,600 C200,500 400,200 800,400 C1200,600 1400,300 1600,200" stroke="url(#streak-blue)" strokeWidth="40" fill="none" opacity="0.12" />
          <path d="M-200,400 C200,600 500,700 900,400 C1300,100 1500,400 1700,500" stroke="url(#streak-orange)" strokeWidth="50" fill="none" opacity="0.12" />
        </g>

        <g filter="url(#glow-intense)">
          {/* Blue Bundle 1 - reduced from 4 to 3 */}
          <path ref={addToRefs} d="M-200,600 C200,500 400,200 800,400 C1200,600 1400,300 1600,200" stroke="url(#streak-blue)" strokeWidth="3.5" fill="none" opacity="0.7" />
          <path ref={addToRefs} d="M-150,580 C250,480 450,220 850,420 C1250,620 1450,280 1650,180" stroke="url(#streak-blue)" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path ref={addToRefs} d="M-250,620 C150,520 350,180 750,380 C1150,580 1350,320 1550,220" stroke="url(#streak-blue)" strokeWidth="1" fill="none" opacity="0.6" />
          
          {/* Blue Bundle 2 - reduced from 4 to 2 */}
          <path ref={addToRefs} d="M-100,700 C300,800 600,300 1000,500 C1400,700 1500,200 1800,300" stroke="url(#streak-blue)" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path ref={addToRefs} d="M-150,680 C250,780 550,320 950,520 C1350,720 1450,220 1750,320" stroke="url(#streak-blue)" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Orange Bundle 1 - reduced from 4 to 3 */}
          <path ref={addToRefs} d="M-200,400 C200,600 500,700 900,400 C1300,100 1500,400 1700,500" stroke="url(#streak-orange)" strokeWidth="4" fill="none" opacity="0.8" />
          <path ref={addToRefs} d="M-150,380 C250,580 550,680 950,380 C1350,80 1550,380 1750,480" stroke="url(#streak-orange)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path ref={addToRefs} d="M-250,420 C150,620 450,720 850,420 C1250,120 1450,420 1650,520" stroke="url(#streak-orange)" strokeWidth="1" fill="none" opacity="0.7" />

          {/* Orange Bundle 2 - reduced from 4 to 2 */}
          <path ref={addToRefs} d="M-300,300 C100,200 400,600 800,500 C1200,400 1300,700 1700,600" stroke="url(#streak-orange)" strokeWidth="3" fill="none" opacity="0.75" />
          <path ref={addToRefs} d="M-350,320 C50,220 350,620 750,520 C1150,420 1250,720 1650,620" stroke="url(#streak-orange)" strokeWidth="1.5" fill="none" opacity="0.6" />
          
          {/* Crossing lines - reduced from 4 to 2 */}
          <path ref={addToRefs} d="M0,450 C300,350 500,650 900,550 C1300,450 1400,150 1800,250" stroke="url(#streak-blue)" strokeWidth="2" fill="none" opacity="0.6" />
          <path ref={addToRefs} d="M-100,200 C300,400 600,100 1000,300 C1400,500 1600,200 1900,400" stroke="url(#streak-orange)" strokeWidth="2" fill="none" opacity="0.65" />
        </g>
      </svg>
    </div>
  );
});
