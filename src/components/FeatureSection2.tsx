import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FeatureSection2 = ({ currentShoe, scrollContainerRef }: { currentShoe: any, scrollContainerRef?: React.RefObject<HTMLElement> }) => {
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  const baseScale = currentShoe.scale || 1;
  // On mobile, clamp scale higher so shoes 2-6 don't look tiny
  const mobileScale = Math.max(baseScale, 0.9);
  const tabletScale = Math.max(baseScale, 0.75);
  const baseRotation = currentShoe.rotation !== undefined ? currentShoe.rotation : -10;

  // Shoe Y: slide in from above
  const shoeY = useTransform(scrollYProgress, [0, 0.45, 1], ["-100vh", "0vh", "0vh"]);
  
  // X transform: come from right side (where FS1 shoe ended), settle on left
  const shoeX = useTransform(scrollYProgress, (p) => {
    if (isMobile || isTablet) return "0%";
    const progress = Math.min(p / 0.45, 1);
    return `calc((min(50vw - 24px, 696px) + 10%) * (1 - ${progress}) + -10% * ${progress})`;
  });
  
  // Scales use normalized values for mobile/tablet
  const endScaleFS1 = isMobile ? mobileScale * 1.4 : isTablet ? tabletScale * 1.4 : baseScale * 1.45;
  const shoeScale = useTransform(scrollYProgress, [0, 0.45, 1], [endScaleFS1, endScaleFS1, endScaleFS1]);
  
  // Rotation from end of FS1
  const endRotationFS1 = baseRotation + 20;
  const shoeRotate = useTransform(scrollYProgress, [0, 0.45, 1], [endRotationFS1, endRotationFS1 - 30, endRotationFS1 - 30]);
  
  // RotateY continues rotation
  const shoeRotateY = useTransform(scrollYProgress, [0, 0.45, 1], [180, 360, 360]);
  
  const shoeOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], [0, 0, 1, 1]);
  // Completely hide when not needed
  const shoeDisplay = useTransform(scrollYProgress, (p) => p < 0.08 ? 'none' : 'block');

  // Background circle transforms
  const circleScale = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 0.15]);

  return (
    <section 
      ref={sectionRef}
      className="relative z-10 w-full h-screen snap-start shrink-0 flex items-center justify-center px-6 md:px-12 lg:px-24 pt-20 lg:pt-0"
      style={{ 
        backgroundColor: currentShoe.bgCenter,
        transition: 'background-color 0.8s ease'
      }}
    >
      {/* Radial Gradient Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${currentShoe.bgEdge} 0%, ${currentShoe.bgCenter} 60%, ${currentShoe.bgCenter} 100%)`,
          transition: 'background 0.8s ease'
        }} 
      />

      <div className="w-full h-full max-w-[1440px] mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12 z-10 pb-10 lg:pb-0">
        
        {/* Right: Feature Text (Mirrored) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end justify-center flex-1 mt-10 lg:mt-0 text-left lg:text-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col items-start lg:items-end w-full"
          >
            <h2 className="font-montserrat font-black uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl mb-6 leading-none">
              <span className="text-white">Ultimate</span><br />
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(to left, ${currentShoe.color1}, ${currentShoe.color2})`,
                }}
              >
                Traction
              </span>
            </h2>
            <p className="font-inter text-white/70 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
              Conquer any terrain with our multi-directional grip system. The {currentShoe.name} provides unparalleled stability and control in all conditions.
            </p>
            
            <div className="flex flex-col gap-4 items-start lg:items-end w-full">
              {[
                "All-Weather Grip Outsole",
                "Dynamic Stability Frame",
                "Impact Absorbing Heel"
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-4 flex-row lg:flex-row-reverse"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: false }}
                >
                  <div 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: currentShoe.color2, boxShadow: `0 0 10px ${currentShoe.color2}` }}
                  />
                  <span className="font-inter font-medium text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Left: Animated Shoe */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center relative flex-1 pointer-events-none overflow-visible">
          <motion.div
            style={{
              y: shoeY,
              x: shoeX,
              opacity: shoeOpacity,
              display: shoeDisplay,
            }}
            className="w-full max-w-lg lg:max-w-xl flex items-center justify-center relative z-20 will-change-transform"
          >
            <motion.img
              src={currentShoe.image}
              alt={currentShoe.name}
              className="w-full object-contain relative z-20"
              style={{
                scale: shoeScale,
                rotate: shoeRotate,
                rotateY: shoeRotateY,
                filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.5))`,
                willChange: 'transform',
              }}
            />
            
            {/* Decorative background circle behind the shoe */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full blur-3xl z-10"
              style={{ 
                backgroundColor: currentShoe.color2,
                scale: circleScale,
                opacity: circleOpacity
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
