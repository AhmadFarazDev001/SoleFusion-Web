import React from 'react';
import { motion } from 'framer-motion';
import { shoes } from '../App';

export const Collection = ({ currentShoe, onShoeSelect }: { currentShoe: any, onShoeSelect: (idx: number) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto z-10 relative"
    >
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ backgroundColor: currentShoe.color1, transition: 'background-color 0.8s' }} />
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full blur-[100px] pointer-events-none opacity-20" style={{ backgroundColor: currentShoe.color2, transition: 'background-color 0.8s' }} />

      <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-[100px] uppercase mb-4 text-white leading-none">
        The Archive
      </h1>
      <p className="text-white/60 font-inter text-lg md:text-xl max-w-2xl mb-16">
        Discover the complete lineage of SoleFusion innovations. Every drop, every colorway, engineered for ultimate velocity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shoes.map((shoe, idx) => (
          <div 
            key={shoe.id} 
            className="group relative bg-[#121c2e] rounded-3xl p-8 overflow-hidden backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer"
            style={{ '--theme-color': shoe.color1 } as any}
          >
            <div 
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" 
              style={{ backgroundColor: shoe.color1 }}
            />
            
            <div className="relative h-64 flex items-center justify-center mb-8">
              <img 
                src={shoe.image} 
                alt={shoe.name} 
                className="w-[85%] h-auto object-contain group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-700 ease-out" 
                style={{ filter: `drop-shadow(0 20px 20px rgba(0,0,0,0.5))` }}
              />
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-white/40 text-sm mb-1 font-inter tracking-[0.2em] uppercase">Edition 0{idx + 1}</p>
                <h3 className="font-montserrat font-bold text-2xl uppercase tracking-wider">{shoe.name}</h3>
                <button
                  onClick={() => onShoeSelect(idx)}
                  className="mt-6 px-6 py-2 rounded-full font-inter font-bold uppercase text-xs tracking-widest border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  View Launch
                </button>
              </div>
              <p className="font-analog text-2xl" style={{ color: shoe.color2 }}>${shoe.price}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
