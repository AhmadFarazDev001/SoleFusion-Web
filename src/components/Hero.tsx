import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LightStreaks } from './LightStreaks';
import { ShoppingCart, Check, Package, ChevronLeft, ChevronRight } from 'lucide-react';

export const Hero = ({ currentShoe, onNext, onPrev, scrollContainerRef }: { currentShoe: any, onNext: () => void, onPrev: () => void, scrollContainerRef?: React.RefObject<HTMLElement> }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [animatingParcel, setAnimatingParcel] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLImageElement>(null);
  const shoeKickRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const priceValueRef = useRef<HTMLSpanElement>(null);
  const parcelRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end start"]
  });

  // Fade out the hero shoe as we scroll down to hand off to FeatureSection
  const heroShoeOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  // Completely hide the element once scrolled away to prevent ghost shoe
  const heroShoeDisplay = useTransform(scrollYProgress, (p) => p > 0.06 ? 'none' : 'block');

  // Mobile-adjusted scale: on small screens, clamp shoe scale higher so shoes 2-6 don't look tiny
  const getAdjustedScale = useCallback((scale: number) => {
    if (typeof window === 'undefined') return scale;
    if (window.innerWidth < 768) return Math.max(scale, 0.9);
    if (window.innerWidth < 1024) return Math.max(scale, 0.75);
    return scale;
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      // Price and button stagger
      gsap.fromTo(
        '.hero-left-element',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, stagger: 0.2, ease: 'power3.out' }
      );

      // Price count up animation
      const priceObj = { val: 0 };
      gsap.to(priceObj, {
        val: currentShoe.price,
        duration: 1.5,
        delay: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          if (priceValueRef.current) {
            priceValueRef.current.innerText = priceObj.val.toFixed(2);
          }
        }
      });

      // Shoe animation
      const targetScale = getAdjustedScale(currentShoe.scale || 1);
      const targetRotation = currentShoe.rotation !== undefined ? currentShoe.rotation : -10;
      const targetY = currentShoe.yOffset || 0;
      gsap.fromTo(
        shoeRef.current,
        { scale: targetScale * 0.8, opacity: 0, rotation: targetRotation - 5, y: targetY },
        { scale: targetScale, opacity: 1, rotation: targetRotation, y: targetY, duration: 1, delay: 0.6, ease: 'back.out(1.5)' }
      );

      // Shoe floating loop - gentle movement
      gsap.to(shoeRef.current, {
        y: targetY - 12,
        rotation: targetRotation + 1.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.6,
      });
      return;
    }

    // Animate shoe change
    if (shoeRef.current) {
      const targetScale = getAdjustedScale(currentShoe.scale || 1);
      const targetRotation = currentShoe.rotation !== undefined ? currentShoe.rotation : -10;
      const targetY = currentShoe.yOffset || 0;
      
      gsap.killTweensOf(shoeRef.current);
      
      gsap.to(shoeRef.current, {
        opacity: 0,
        scale: targetScale * 0.8,
        x: 80,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          const img = new Image();
          img.onload = () => {
            if (shoeRef.current) {
              shoeRef.current.src = currentShoe.image;
              gsap.fromTo(
                shoeRef.current,
                { opacity: 0, scale: targetScale * 0.8, x: -80, y: targetY, rotation: targetRotation - 3, rotationX: 0, rotationY: 0 },
                { opacity: 1, scale: targetScale, x: 0, y: targetY, rotation: targetRotation, rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out', onComplete: () => {
                    gsap.to(shoeRef.current, {
                      y: targetY - 12,
                      rotation: targetRotation + 1.5,
                      duration: 3,
                      repeat: -1,
                      yoyo: true,
                      ease: 'sine.inOut',
                    });
                } }
              );
            }
          };
          img.src = currentShoe.image;
        }
      });
    }

    // Animate price change
    const priceObj = { val: parseFloat(priceValueRef.current?.innerText || "0") };
    gsap.to(priceObj, {
      val: currentShoe.price,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        if (priceValueRef.current) {
          priceValueRef.current.innerText = priceObj.val.toFixed(2);
        }
      }
    });

    // Animate heading change
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentShoe]);

  // Throttled mouse move for 3D tilt - performance optimized
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!shoeRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    
    gsap.to(shoeRef.current, {
      rotationY: x * 15,
      rotationX: -y * 15,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.6,
      overwrite: 'auto'
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!shoeRef.current) return;
    gsap.to(shoeRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.out',
      duration: 0.6
    });
  }, []);

  const handleBuyClick = () => {
    if (animatingParcel) return;
    
    const shoeKick = shoeKickRef.current;
    const parcel = parcelRef.current;
    
    if (!shoeKick || !parcel) return;

    setIsAdded(true);
    setAnimatingParcel(true);

    // Schedule the kick sound synchronously using Web Audio API to bypass mobile autoplay blocks
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        if (ctx.state === 'suspended') ctx.resume();
        const startTime = ctx.currentTime + 0.5; // Exactly aligned with the "impact" label

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, startTime);
        osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.15);
        gain.gain.setValueAtTime(0.8, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.2);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(800, startTime);
        osc2.frequency.exponentialRampToValueAtTime(200, startTime + 0.05);
        gain2.gain.setValueAtTime(0.3, startTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(startTime);
        osc2.stop(startTime + 0.08);
      }
    } catch (e) {
      console.log('Audio error:', e);
    }

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const isMobile = window.innerWidth < 768;
    
    const tipX = cx + window.innerWidth * (isMobile ? 0.15 : 0.12) - 40;
    const tipY = cy + window.innerHeight * (isMobile ? 0.05 : 0.08);

    gsap.set(parcel, {
      x: tipX,
      y: -100,
      opacity: 1,
      scale: isMobile ? 0.6 : 0.8,
      rotation: 15
    });
    
    gsap.set(shoeKick, { transformOrigin: 'center center' });

    const tl = gsap.timeline({
      onComplete: () => {
        setAnimatingParcel(false);
        gsap.set(parcel, { opacity: 0 });
        window.dispatchEvent(new CustomEvent('cart_add', { detail: currentShoe }));
        setTimeout(() => setIsAdded(false), 1500);
      }
    });

    tl.to(parcel, {
      y: tipY,
      rotation: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, 0);

    tl.to(shoeKick, {
      rotation: -30,
      x: -60,
      y: -20,
      duration: 0.4,
      ease: 'sine.inOut'
    }, 0);

    tl.to(shoeKick, {
      rotation: 10,
      x: 20,
      y: 10,
      duration: 0.1,
      ease: 'power4.in'
    }, 0.4);

    tl.addLabel("impact", 0.5);

    tl.to(shoeKick, {
      rotation: 30,
      x: 80,
      y: -40,
      duration: 0.25,
      ease: 'power2.out'
    }, "impact");

    tl.to(shoeKick, {
      rotation: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)'
    }, "impact+=0.25");

    const desktopCart = document.getElementById('cart-icon-desktop');
    const mobileCart = document.getElementById('cart-icon-mobile');
    const targetCart = window.innerWidth >= 1024 ? desktopCart : mobileCart;
    
    let targetX = tipX;
    let targetY2 = tipY;

    if (targetCart) {
      const cartRect = targetCart.getBoundingClientRect();
      targetX = cartRect.left + cartRect.width / 2 - 24;
      targetY2 = cartRect.top + cartRect.height / 2 - 24;
    }

    tl.to(parcel, {
      x: targetX,
      y: targetY2,
      scale: 0.2,
      rotation: 360,
      opacity: 0.5,
      duration: 0.8,
      ease: 'power2.out'
    }, "impact");
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100dvh] snap-start shrink-0 overflow-hidden"
      style={{ backgroundColor: currentShoe.bgEdge, willChange: 'background-color', transition: 'background-color 0.8s ease' }}
    >
      {/* Radial Gradient Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${currentShoe.bgCenter} 0%, ${currentShoe.bgEdge} 60%, ${currentShoe.bgEdge} 100%)`,
          transition: 'background 0.8s ease'
        }} 
      />

      <LightStreaks />

      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Heading positioned behind shoe */}
        <div className="absolute inset-0 flex items-start justify-center pt-[20vh] sm:pt-[25vh] md:pt-[calc(28vh-55px)] lg:pt-24 z-10 pointer-events-none">
          <h1
            ref={headingRef}
            className="font-montserrat font-black uppercase tracking-tighter text-[16vw] sm:text-[15vw] md:text-[14vw] lg:text-[60px] leading-[0.85] lg:leading-none text-center whitespace-normal lg:whitespace-nowrap scale-y-[1.3] lg:scale-y-[1.8] origin-top px-4 lg:px-0"
          >
            <span 
              className="text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${currentShoe.color1}, ${currentShoe.color2})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'background-image 0.8s ease'
              }}
            >
              {currentShoe.name}
            </span>
          </h1>
        </div>

        {/* Shoe Image - Properly sized container that won't overlap UI */}
        <div className="absolute top-[48%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[95%] sm:w-[90%] md:w-full lg:w-[98%] max-w-[1560px] h-[65dvh] md:h-auto mt-0 sm:mt-[1vh] lg:mt-[23px] pointer-events-none overflow-visible flex items-center justify-center">
          <motion.div style={{ opacity: heroShoeOpacity, display: heroShoeDisplay }} className="will-change-[opacity] w-full flex justify-center">
            <div ref={shoeKickRef} className="w-full max-h-full relative flex justify-center">
              {/* Glowing background circle */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full blur-[60px] z-0 opacity-40 pointer-events-none"
                style={{ backgroundColor: currentShoe.color1, transition: 'background-color 0.8s ease' }}
              />
              <img
                ref={shoeRef}
                src={currentShoe.image}
                alt={currentShoe.name}
                className="w-full max-h-[65dvh] md:max-h-none h-auto object-contain relative z-10 pointer-events-none"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                  transform: `rotate(${currentShoe.rotation !== undefined ? currentShoe.rotation : -10}deg)`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              />
            </div>
          </motion.div>
          {/* 3D Shadow below shoe */}
          <div className="absolute -bottom-2 lg:-bottom-6 left-1/2 -translate-x-1/2 w-[50%] h-[12px] lg:h-[24px] bg-black/60 blur-xl rounded-[100%]" />
        </div>

        {/* Left Column: Price & Button - Bottom Left - HIGH z-index */}
        <div className="absolute bottom-4 md:bottom-12 lg:bottom-10 left-4 md:left-8 lg:left-10 z-40 flex items-center gap-3 md:gap-4 lg:gap-6 pointer-events-auto">
          <div 
            ref={priceRef} 
            className="hero-left-element flex items-start font-analog scale-y-[1.2] lg:scale-y-[1.4] origin-bottom"
            style={{ color: currentShoe.color2, filter: `drop-shadow(0 0 15px ${currentShoe.color2})`, transition: 'color 0.8s ease, filter 0.8s ease' }}
          >
            <span className="text-xl md:text-3xl lg:text-3xl leading-none mt-1">$</span>
            <span ref={priceValueRef} className="text-4xl md:text-6xl lg:text-6xl leading-none tracking-tight">0.00</span>
          </div>
          
          <div className="hero-left-element">
            <button 
              onClick={handleBuyClick}
              className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 lg:w-14 lg:h-14 rounded-full cursor-pointer -translate-y-[8px] md:-translate-y-[16px] lg:-translate-y-[16px] backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: isAdded ? currentShoe.color1 : 'rgba(255,255,255,0.1)',
                color: isAdded ? '#fff' : currentShoe.color2,
                boxShadow: isAdded ? `0 0 20px ${currentShoe.color1}` : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {isAdded ? <Check className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" /> : <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />}
            </button>
          </div>
        </div>

        {/* Parcel Box for Animation */}
        <div
          ref={parcelRef}
          className="fixed top-0 left-0 z-[100] pointer-events-none opacity-0 flex items-center justify-center w-12 h-12 rounded-lg"
          style={{ backgroundColor: currentShoe.color1, boxShadow: `0 0 20px ${currentShoe.color1}` }}
        >
          <Package size={24} className="text-white" />
        </div>

        {/* Navigation Arrows - Bottom Right - HIGH z-index */}
        <div className="absolute bottom-8 md:bottom-12 lg:bottom-10 right-6 md:right-8 lg:right-10 z-40 flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={onPrev}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95"
            style={{ color: currentShoe.color2, transition: 'all 0.3s ease' }}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={onNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95"
            style={{ color: currentShoe.color2, transition: 'all 0.3s ease' }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};
