import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const slides = [
    {
      title: "Crea equipo",
      description: "Comparte código, todos se unen",
      emoji: "👥",
      gradient: "from-brand-400 via-brand-500 to-brand-600"
    },
    {
      title: "Da kudos",
      description: "Elige animal + cualidad",
      emoji: "⭐",
      gradient: "from-accent via-accent-dark to-brand-500"
    },
    {
      title: "Descubre",
      description: "Ve cómo te reconocen",
      emoji: "🎉",
      gradient: "from-purple-500 via-purple-600 to-purple-700"
    }
  ];

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-accent-50 flex flex-col">
      {/* Hero Section - Mobile First */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-lg">
          {/* Emoji Hero - Extra large */}
          <div className="mb-8" style={{ fontSize: '120px' }}>🦁</div>
          
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg mb-6">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <span className="font-bold text-brand-600">Kudos</span>
          </div>
          
          {/* Headline - Conciso */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-4 leading-tight">
            Reconoce lo mejor de tu equipo
          </h1>
          
          <p className="text-lg sm:text-xl text-neutral-600 mb-8">
            Celebra fortalezas únicas en 2 minutos
          </p>
          
          {/* CTA Principal - Touch friendly */}
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto btn-primary text-lg px-10 py-5 inline-flex items-center justify-center gap-3 shadow-2xl hover:shadow-brand-500/50 transition-all mb-4"
          >
            Comenzar gratis
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-sm text-neutral-500">
            Gratis • Sin tarjeta
          </p>

          {/* Scroll Hint */}
          <div className="mt-8 text-neutral-400 text-sm animate-bounce">
            ↓ Desliza para ver cómo funciona
          </div>
        </div>
      </div>

      {/* How It Works - Swipeable Cards Section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-neutral-800 mb-8">
            ¿Cómo funciona?
          </h2>

          {/* Swipeable Cards Container */}
          <div 
            className="relative max-w-md mx-auto mb-8"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Card Swipeable */}
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slides[currentSlide].gradient} p-10 shadow-2xl transition-all duration-500 ${isDragging ? 'scale-95' : 'scale-100'}`}>
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-black rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black rounded-full -ml-16 -mb-16"></div>
              </div>

              {/* Emoji */}
              <div className="text-center mb-6">
                <div className={`transition-transform ${isDragging ? 'scale-90' : 'scale-100'}`} style={{ fontSize: '100px', lineHeight: '1' }}>
                  {slides[currentSlide].emoji}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {slides[currentSlide].title}
                </h3>
                
                <p className="text-lg text-white leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide 
                        ? 'w-10 h-2.5 bg-white shadow-lg' 
                        : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60 hover:scale-125'
                    } ${index === currentSlide + 1 ? 'animate-pulse' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Swipe Hint */}
            <div className="text-center mt-4 text-neutral-400 text-sm">
              ← Desliza para ver más →
            </div>
          </div>
        </div>
      </div>

      {/* Benefits - Ultra Minimal */}
      <div className="bg-gradient-to-br from-brand-50 to-accent-50 py-12 sm:py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { emoji: '💙', text: 'Fortalece vínculos' },
              { emoji: '⚡', text: 'Súper rápido' },
              { emoji: '🎯', text: 'Feedback positivo' },
              { emoji: '🔒', text: 'Anónimo y seguro' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl">{item.emoji}</div>
                <div className="font-semibold text-neutral-800">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final - Sticky Bottom on Mobile */}
      <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 py-8 sm:py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Empieza hoy
          </h2>
          <p className="text-brand-100 mb-6 text-sm sm:text-base max-w-md mx-auto">
            Gratis para siempre
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto bg-white text-brand-600 px-8 py-4 rounded-2xl font-bold text-lg inline-flex items-center justify-center gap-3 hover:bg-brand-50 transition-all shadow-2xl active:scale-95"
          >
            Comenzar
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Footer Minimal */}
      <div className="bg-neutral-900 text-neutral-400 py-6">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>© 2026 Kudos • Hecho con ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
