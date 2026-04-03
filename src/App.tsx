/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { FeatureSection2 } from './components/FeatureSection2';
import { FinalSection } from './components/FinalSection';
import { Collection } from './pages/Collection';
import { Tech } from './pages/Tech';
import { About } from './pages/About';
import { AnimatePresence, motion } from 'framer-motion';

export const shoes = [
  {
    id: 0,
    name: "Velocity Racer X",
    price: 189.99,
    image: "/shoe.png",
    color1: "#FF7C32",
    color2: "#7ED6FF",
    bgCenter: "#1B263B",
    bgEdge: "#0B1623",
    scale: 1,
    rotation: -10,
    yOffset: 0,
  },
  {
    id: 1,
    name: "Aero Glide",
    price: 219.99,
    image: "/shoe2.png",
    color1: "#2dd4bf",
    color2: "#a7f3d0",
    bgCenter: "#115e59",
    bgEdge: "#042f2e",
    scale: 0.5,
    rotation: 5,
    yOffset: -10,
  },
  {
    id: 2,
    name: "Cosmic Shift",
    price: 249.99,
    image: "/shoe3.png",
    color1: "#6366f1",
    color2: "#c084fc",
    bgCenter: "#312e81",
    bgEdge: "#1e1b4b",
    scale: 0.5,
    rotation: 5,
    yOffset: -10,
  },
  {
    id: 3,
    name: "Inferno Dash",
    price: 229.99,
    image: "/shoe4.png",
    color1: "#dc2626",
    color2: "#fcd34d",
    bgCenter: "#7f1d1d",
    bgEdge: "#450a0a",
    scale: 0.5,
    rotation: 5,
    yOffset: -10,
  },
  {
    id: 4,
    name: "C-Trail Aqua",
    price: 239.99,
    image: "/shoe5.png",
    color1: "#22d3ee",
    color2: "#94a3b8",
    bgCenter: "#1e293b",
    bgEdge: "#0f172a",
    scale: 0.5,
    rotation: 5,
    yOffset: -10,
  },
  {
    id: 5,
    name: "Obsidian Flare",
    price: 259.99,
    image: "/shoe6.png",
    color1: "#f97316",
    color2: "#b45309",
    bgCenter: "#292524",
    bgEdge: "#0c0a09",
    scale: 0.5,
    rotation: 5,
    yOffset: -10,
  }
];

export default function App() {
  const [shoeIndex, setShoeIndex] = useState(0);
  const [activePage, setActivePage] = useState('Home');
  const currentShoe = shoes[shoeIndex];
  const scrollContainerRef = React.useRef<HTMLElement>(null);

  const handleHomeClick = () => {
    setActivePage('Home');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Cmd+Option+I, Cmd+Option+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j' || e.key.toLowerCase() === 'c')) {
        e.preventDefault();
      }
      // Prevent View Source (Ctrl+U)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }
      // Mac specific inspect element
      if (e.metaKey && e.altKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j' || e.key.toLowerCase() === 'u')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main 
      ref={scrollContainerRef}
      className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory text-white font-inter selection:bg-white/20 selection:text-white"
      style={{
        '--color-1': currentShoe.color1,
        '--color-2': currentShoe.color2,
        '--bg-center': currentShoe.bgCenter,
        '--bg-edge': currentShoe.bgEdge,
        backgroundColor: currentShoe.bgEdge,
        scrollBehavior: 'smooth',
        transition: 'background-color 0.8s ease',
      } as React.CSSProperties}
    >
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onHomeClick={handleHomeClick} 
      />
      
      <AnimatePresence mode="wait">
        {activePage === 'Home' ? (
          <motion.div 
            key="Home"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Hero 
              currentShoe={currentShoe} 
              onNext={() => setShoeIndex((i) => (i + 1) % shoes.length)} 
              onPrev={() => setShoeIndex((i) => (i - 1 + shoes.length) % shoes.length)} 
              scrollContainerRef={scrollContainerRef}
            />
            <FeatureSection currentShoe={currentShoe} scrollContainerRef={scrollContainerRef} />
            <FeatureSection2 currentShoe={currentShoe} scrollContainerRef={scrollContainerRef} />
            <FinalSection currentShoe={currentShoe} scrollContainerRef={scrollContainerRef} />
          </motion.div>
        ) : activePage === 'Collection' ? (
          <Collection 
            key="Collection" 
            currentShoe={currentShoe}
            onShoeSelect={(idx: number) => {
              setShoeIndex(idx);
              handleHomeClick();
            }}
          />
        ) : activePage === 'Tech' ? (
          <Tech key="Tech" currentShoe={currentShoe} />
        ) : activePage === 'About' ? (
          <About key="About" currentShoe={currentShoe} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
