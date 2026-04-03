import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Menu, X, Trash2 } from 'lucide-react';
import { Logo } from './Logo';
import gsap from 'gsap';

export const Navbar = ({ 
  activePage = 'Home', 
  setActivePage = (p: string) => {}, 
  onHomeClick = () => {} 
}: { 
  activePage?: string, 
  setActivePage?: (page: string) => void, 
  onHomeClick?: () => void 
}) => {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    const handleCartAdd = (e: any) => {
      if (e.detail) {
        setCartItems(prev => [...prev, { ...e.detail, cartId: Date.now() + Math.random() }]);
      }
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1000);
    };
    window.addEventListener('cart_add', handleCartAdd);
    return () => window.removeEventListener('cart_add', handleCartAdd);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isCartOpen]);

  const removeFromCart = (cartId: number) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  const links = ['Home', 'Collection', 'Tech', 'About'];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-8 pointer-events-none">
      <nav
        ref={navRef}
        className="relative z-50 w-full max-w-[1440px] flex items-center justify-between px-6 md:px-12 pointer-events-auto"
      >
        <div className="flex items-center justify-between w-full lg:w-auto relative z-50">
          <Logo onClick={onHomeClick} />
          
          <div className="flex items-center gap-5 md:gap-8 lg:hidden">
            <button 
              id="cart-icon-mobile"
              onClick={() => setIsCartOpen(true)}
              className={`relative text-white hover:text-[var(--color-2)] transition-all duration-300 ${isGlowing ? 'scale-125' : ''}`}
              style={{
                color: isGlowing ? 'var(--color-1)' : undefined,
                filter: isGlowing ? 'drop-shadow(0 0 15px var(--color-1))' : undefined
              }}
            >
              <ShoppingCart size={26} strokeWidth={1.5} className="md:w-8 md:h-8" />
              {cartItems.length > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2"
                  style={{ backgroundColor: 'var(--color-1)', borderColor: 'var(--bg-edge)' }}
                >
                  {cartItems.length}
                </span>
              )}
            </button>
            {/* Mobile Menu Toggle */}
            <button 
              className="text-white hover:text-[var(--color-2)] transition-colors relative w-8 h-8 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`absolute h-[2px] w-7 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2.5'}`} />
              <span className={`absolute h-[2px] w-7 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`} />
              <span className={`absolute h-[2px] w-7 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2.5'}`} />
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => link === 'Home' ? onHomeClick() : setActivePage(link)}
              className={`font-inter font-medium uppercase tracking-[0.04em] text-[14px] xl:text-[16px] transition-colors duration-200 ${
                activePage === link ? 'text-[var(--color-2)]' : 'text-white hover:text-[var(--color-2)]'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Cart Icon (Desktop) */}
        <button 
          id="cart-icon-desktop"
          onClick={() => setIsCartOpen(true)}
          className={`hidden lg:block relative text-white hover:text-[var(--color-2)] transition-all duration-300 ${isGlowing ? 'scale-125' : ''}`}
          style={{
            color: isGlowing ? 'var(--color-1)' : undefined,
            filter: isGlowing ? 'drop-shadow(0 0 15px var(--color-1))' : undefined
          }}
        >
          <ShoppingCart size={28} strokeWidth={1.5} />
          {cartItems.length > 0 && (
            <span 
              className="absolute -top-2 -right-2 text-white text-[11px] font-bold w-[22px] h-[22px] flex items-center justify-center rounded-full border-2"
              style={{ backgroundColor: 'var(--color-1)', borderColor: 'var(--bg-edge)' }}
            >
              {cartItems.length}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 flex flex-col items-center justify-center lg:hidden z-40 ${
          isMobileMenuOpen 
            ? 'pointer-events-auto' 
            : 'pointer-events-none'
        }`}
      >
        {/* Full-Screen Glassmorphism Window */}
        <div 
          className={`absolute inset-0 w-full h-full backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
          style={{ backgroundColor: 'color-mix(in srgb, var(--bg-edge) 80%, transparent)' }}
        >
          {/* Decorative background elements for immersive feel */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] transition-colors duration-1000" style={{ backgroundColor: 'color-mix(in srgb, var(--color-2) 20%, transparent)' }} />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] transition-colors duration-1000" style={{ backgroundColor: 'color-mix(in srgb, var(--color-1) 20%, transparent)' }} />
          </div>

          <div className="flex flex-col items-center gap-8 w-full relative z-10">
            {links.map((link, index) => (
              <button
                key={link}
                className={`font-montserrat font-black uppercase tracking-widest text-[32px] md:text-[48px] transition-all duration-500 ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } ${
                  activePage === link ? 'text-[var(--color-2)]' : 'text-white hover:text-[var(--color-2)]'
                }`}
                style={{ transitionDelay: `${isMobileMenuOpen ? 100 + index * 75 : 0}ms` }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (link === 'Home') onHomeClick();
                  else setActivePage(link);
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Side Menu */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
        
        {/* Cart Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-[#0B1623] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-montserrat font-bold text-white uppercase tracking-wider">Your Cart</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/50 gap-4">
                <ShoppingCart size={48} className="opacity-20" />
                <p className="font-inter text-lg">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartId} className="flex gap-4 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <div 
                    className="w-20 h-20 rounded-lg flex items-center justify-center p-2 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${item.bgCenter}, ${item.bgEdge})` }}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-auto object-contain drop-shadow-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-montserrat font-bold text-sm uppercase tracking-wide">{item.name}</h3>
                    <p className="text-[var(--color-2)] font-analog text-lg mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/70 font-inter">Total</span>
                <span className="text-3xl font-analog text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                className="w-full py-4 rounded-full font-montserrat font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: 'var(--color-1)', color: '#fff', boxShadow: '0 0 20px var(--color-1)' }}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
