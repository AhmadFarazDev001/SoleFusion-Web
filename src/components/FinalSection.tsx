import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FinalSection = ({ currentShoe, scrollContainerRef }: { currentShoe: any, scrollContainerRef?: React.RefObject<HTMLElement> }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const baseScale = currentShoe.scale || 1;
  // On mobile, clamp scale higher so shoes 2-6 don't look tiny
  const mobileScale = Math.max(baseScale, 0.9);
  const tabletScale = Math.max(baseScale, 0.75);
  const baseRotation = currentShoe.rotation !== undefined ? currentShoe.rotation : -10;

  const finalScale = isMobile ? mobileScale * 1.5 : isTablet ? tabletScale * 1.5 : baseScale * 1.45;

  // Solar system orbits and planets - reduced count for performance
  const planets = [
    { title: "Breathable", desc: "Air-mesh upper", size: isMobile ? 55 : 75, distance: isMobile ? 100 : 220, angle: 0, speed: 18, color: currentShoe.color1 },
    { title: "Lightweight", desc: "Feather foam", size: isMobile ? 60 : 80, distance: isMobile ? 140 : 320, angle: 120, speed: 24, color: currentShoe.color2 },
    { title: "Durable", desc: "Carbon rubber", size: isMobile ? 50 : 65, distance: isMobile ? 175 : 410, angle: 240, speed: 30, color: "#ffffff" },
  ];

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative z-10 w-full h-screen snap-start shrink-0 flex flex-col items-center justify-center overflow-hidden"
        style={{ 
          backgroundColor: currentShoe.bgEdge,
          transition: 'background-color 0.8s ease'
        }}
      >
        {/* Solar System Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          {/* Orbits */}
          {planets.map((planet, idx) => (
            <div 
              key={`orbit-${idx}`}
              className="absolute rounded-full border border-white/10"
              style={{
                width: planet.distance * 2,
                height: planet.distance * 2,
              }}
            />
          ))}

          {/* Planets */}
          {planets.map((planet, idx) => (
            <motion.div
              key={`planet-container-${idx}`}
              className="absolute top-1/2 left-1/2 w-0 h-0 z-10"
              animate={{
                rotate: [planet.angle, planet.angle + 360],
              }}
              transition={{
                duration: planet.speed,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute rounded-full flex flex-col items-center justify-center text-center p-2 border border-white/20"
                style={{
                  width: planet.size,
                  height: planet.size,
                  left: -planet.size / 2,
                  top: -planet.distance - planet.size / 2,
                  backgroundColor: `${planet.color}40`,
                  boxShadow: `0 0 15px ${planet.color}30`,
                }}
                animate={{
                  rotate: [-planet.angle, -(planet.angle + 360)],
                }}
                transition={{
                  duration: planet.speed,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <span className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} font-bold text-white uppercase tracking-wider`}>{planet.title}</span>
                <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} text-white/90 mt-1`}>{planet.desc}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Center content */}
        <div className="w-full h-full flex flex-col items-center justify-center relative z-20 pointer-events-none">
          
          <motion.h2 
            className="absolute top-[15%] md:top-[20%] font-montserrat font-black uppercase tracking-tighter text-5xl md:text-7xl lg:text-8xl text-center z-40"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/20">The</span><br />
            <span className="text-white">Universe</span><br />
            <span className="text-white/20">Awaits</span>
          </motion.h2>

          {/* Animated Shoe */}
          <div className="w-full h-full flex items-center justify-center relative">
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              whileInView={{ scale: finalScale, rotate: baseRotation, opacity: 1 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              viewport={{ once: true, amount: 0.1 }}
              className="z-30 w-full max-w-lg lg:max-w-xl flex items-center justify-center"
            >
              <motion.img
                src={currentShoe.image}
                alt={currentShoe.name}
                className="w-full object-contain"
                style={{
                  filter: `drop-shadow(0 15px 25px rgba(0,0,0,0.4))`,
                  willChange: "transform",
                }}
                animate={{
                  y: ["0%", "-2%", "0%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Sun glow behind shoe */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full blur-[60px] z-20"
              style={{ 
                backgroundColor: currentShoe.color1,
                willChange: "transform, opacity",
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.35 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: currentShoe.color1 }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.35, 0.5, 0.35]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Minimalistic Footer */}
      <footer 
        className="w-full py-8 px-6 md:px-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 z-30 snap-end shrink-0"
        style={{ backgroundColor: currentShoe.bgEdge, transition: 'background-color 0.8s ease' }}
      >
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={currentShoe.color1} />
            <path d="M2 17L12 22L22 17" stroke={currentShoe.color2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke={currentShoe.color2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-montserrat font-bold text-white tracking-widest text-sm">SOLEFUSION</span>
        </div>
        
        <div className="flex gap-6 text-xs font-inter text-white/50 uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <div className="text-xs font-inter text-white/30">
          © 2026 SoleFusion. All rights reserved.
        </div>
      </footer>
    </>
  );
};
