import React from 'react';
import { motion } from 'framer-motion';

export const Tech = ({ currentShoe }: { currentShoe: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto z-10 relative"
    >
      <div className="absolute top-[30%] left-[5%] w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none opacity-20" style={{ backgroundColor: currentShoe.color1, transition: 'background-color 0.8s' }} />
      <div className="absolute bottom-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ backgroundColor: currentShoe.color2, transition: 'background-color 0.8s' }} />

      <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-[100px] uppercase mb-16 text-white leading-none text-center">
        Next-Gen Tech
      </h1>

      <div className="flex flex-col gap-24">
        {/* Tech Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />
            <div className="w-full h-[400px] bg-[#121c2e] border border-white/10 rounded-[40px] flex items-center justify-center relative overflow-hidden">
              {/* Abstract graphic representing foam/bounce */}
              <div className="absolute w-[150%] h-[150%] animate-spin-slow" style={{ background: 'conic-gradient(from 0deg, transparent, rgba(56, 189, 248, 0.2), transparent)' }} />
              <img src="/shoe2.png" alt="Tech detail" className="w-[80%] h-auto object-contain relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="font-inter tracking-[0.2em] font-bold uppercase mb-4 text-sm" style={{ color: currentShoe.color1 }}>Innovation 01</p>
            <h2 className="font-montserrat font-black uppercase text-4xl lg:text-5xl mb-6">Aero-Core<br/>Foam</h2>
            <p className="font-inter text-white/60 text-lg leading-relaxed mb-8">
              Engineered at the molecular level, our proprietary Aero-Core foam returns 85% of kinetic energy. It’s 30% lighter than standard EVA foam while providing unparalleled shock absorption.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-analog text-4xl text-white mb-2">85%</p>
                <p className="font-inter text-white/40 text-xs tracking-wider uppercase">Energy Return</p>
              </div>
              <div>
                <p className="font-analog text-4xl text-white mb-2">-30%</p>
                <p className="font-inter text-white/40 text-xs tracking-wider uppercase">Weight</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 blur-[50px] rounded-full opacity-30" style={{ backgroundColor: currentShoe.color2 }} />
            <div className="w-full h-[400px] bg-[#121c2e] border border-white/10 rounded-[40px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-full h-[2px] top-1/2 left-0 opacity-50" style={{ backgroundColor: currentShoe.color2, boxShadow: `0 0 20px ${currentShoe.color2}` }} />
              <div className="absolute w-[2px] h-full top-0 left-1/2 opacity-50" style={{ backgroundColor: currentShoe.color2, boxShadow: `0 0 20px ${currentShoe.color2}` }} />
              <img src="/shoe.png" alt="Tech detail" className="w-[80%] h-auto object-contain relative z-10 drop-shadow-2xl hover:-translate-y-4 transition-transform duration-700" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="font-inter tracking-[0.2em] font-bold uppercase mb-4 text-sm" style={{ color: currentShoe.color2 }}>Innovation 02</p>
            <h2 className="font-montserrat font-black uppercase text-4xl lg:text-5xl mb-6">Carbon-infused<br/>Plates</h2>
            <p className="font-inter text-white/60 text-lg leading-relaxed mb-8">
              Micro-layered carbon fiber runs the entire length of the chassis. This creates a trampoline effect that propels you forward with every single strike, dramatically reducing fatigue over long distances.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-analog text-4xl text-white mb-2">1.2mm</p>
                <p className="font-inter text-white/40 text-xs tracking-wider uppercase">Plate Thickness</p>
              </div>
              <div>
                <p className="font-analog text-4xl text-white mb-2">3x</p>
                <p className="font-inter text-white/40 text-xs tracking-wider uppercase">Durability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Section 3 */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 blur-[50px] rounded-full opacity-30" style={{ backgroundColor: currentShoe.color1 }} />
            <div className="w-full h-[400px] bg-[#121c2e] border border-white/10 rounded-[40px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-[180%] h-[180%] animate-[spin_10s_linear_infinite]" style={{ background: `conic-gradient(from 0deg, transparent, ${currentShoe.color1}40, transparent)` }} />
              <img src="/shoe3.png" alt="Mesh detail" className="w-[85%] h-auto object-contain relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="font-inter tracking-[0.2em] font-bold uppercase mb-4 text-sm" style={{ color: currentShoe.color1 }}>Innovation 03</p>
            <h2 className="font-montserrat font-black uppercase text-4xl lg:text-5xl mb-6">Adaptive<br/>Mesh Upper</h2>
            <p className="font-inter text-white/60 text-lg leading-relaxed mb-8">
              Woven tightly around high-tension zones and loosely in heat-dispersion areas, our 3D-mapped upper breathes exactly where you sweat, locking in heel stability seamlessly.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-analog text-4xl text-white mb-2">0.2g</p>
                <p className="font-inter text-white/40 text-xs tracking-wider uppercase">Thread Weight</p>
              </div>
              <div>
                <p className="font-analog text-4xl text-white mb-2">5X</p>
                <p className="font-inter text-white/40 text-xs tracking-wider uppercase">Tensile Strength</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Section 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 blur-[50px] rounded-full opacity-30" style={{ backgroundColor: currentShoe.color2 }} />
            <div className="w-full h-[400px] bg-[#121c2e] border border-white/10 rounded-[40px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute bottom-0 w-[40%] h-[20%] rounded-[100%] blur-[20px] opacity-60" style={{ backgroundColor: currentShoe.color2 }} />
              <img src="/shoe5.png" alt="Traction detail" className="w-[80%] h-auto object-contain relative z-10 drop-shadow-2xl hover:-translate-y-4 hover:rotate-3 transition-transform duration-700" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="font-inter tracking-[0.2em] font-bold uppercase mb-4 text-sm" style={{ color: currentShoe.color2 }}>Innovation 04</p>
            <h2 className="font-montserrat font-black uppercase text-4xl lg:text-5xl mb-6">Precision<br/>Traction</h2>
            <p className="font-inter text-white/60 text-lg leading-relaxed mb-8">
              Using predictive AI algorithms, the outsole geometric lugs are clustered exactly where your foot strikes hardest, guaranteeing slip-resistant grip on any terrain.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-analog text-4xl text-white mb-2">0</p>
                <p className="font-inter text-white/40 text-xs tracking-wider uppercase">Slip Ratio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
