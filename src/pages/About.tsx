import React from 'react';
import { motion } from 'framer-motion';

export const About = ({ currentShoe }: { currentShoe: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center pt-20 px-6 md:px-12 max-w-[1440px] mx-auto z-10 relative"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full blur-[150px] pointer-events-none opacity-20" style={{ backgroundColor: currentShoe.color1, transition: 'background-color 0.8s' }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="font-inter tracking-[0.3em] font-bold uppercase text-white/50 mb-6 text-sm">Our Mission</p>
        
        <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-[80px] uppercase mb-12 text-white leading-[1.1]">
          We Don't Make Shoes.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7C32] to-[#7ED6FF]">
            We Engineer Velocity.
          </span>
        </h1>
        
        <div className="font-inter text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed flex flex-col gap-6">
          <p>
            Founded at the intersection of aerospace engineering and athletic performance, SoleFusion was born from a singular obsession: to break limits.
          </p>
          <p>
            We believe that gravity is just a suggestion. By combining radically lightweight materials, precision aerodynamics, and obsessive craftsmanship, we build footwear that pushes humanity forward.
          </p>
        </div>

        <div className="mt-16 flex justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="font-analog text-3xl md:text-5xl text-white mb-2">2026</span>
            <span className="font-inter text-white/40 text-xs uppercase tracking-widest">Established</span>
          </div>
          <div className="w-[1px] h-16 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="font-analog text-3xl md:text-5xl text-white mb-2">12</span>
            <span className="font-inter text-white/40 text-xs uppercase tracking-widest">Patents</span>
          </div>
          <div className="w-[1px] h-16 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="font-analog text-3xl md:text-5xl text-white mb-2">0</span>
            <span className="font-inter text-white/40 text-xs uppercase tracking-widest">Compromises</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
