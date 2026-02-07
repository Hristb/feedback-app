import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Heart, Sparkles, ArrowRight } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const slides = [
    {
      title: "¡Hola!",
      description: "Reconoce lo mejor de tu equipo",
      icon: Sparkles,
      emoji: "🦁",
      gradient: "from-brand-400 via-brand-500 to-brand-600",
      bgPattern: "from-brand-50 to-accent-50"
    },
    {
      title: "Comparte código",
      description: "Todos se unen, todos votan",
      icon: Users,
      emoji: "👥",
      gradient: "from-accent via-accent-dark to-brand-500",
      bgPattern: "from-accent-50 to-brand-50"
    },
    {
      title: "Descubre tu animal",
      description: "Cada uno es único",
      icon: Heart,
      emoji: "⭐",
      gradient: "from-secondary via-secondary-dark to-accent",
      bgPattern: "from-secondary-50 to-accent-50"
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

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slides[currentSlide].bgPattern} transition-all duration-700 flex flex-col`}>
      {/* Header Minimalista */}
      <div className="px-6 pt-6 pb-2">
        <button
          onClick={() => navigate('/login')}
          className="text-neutral-500 hover:text-brand-600 text-sm font-medium transition-colors ml-auto block"
        >
          Saltar
        </button>
      </div>

      {/* Main Content - Swipeable */}
      <div 
        className="flex-1 flex flex-col items-center justify-center px-6 pb-8"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Emoji Grande Animado */}
        <div className="mb-6 transform transition-all duration-500">
          <div className={`transition-transform ${isDragging ? 'scale-90' : 'scale-100'}`} style={{ fontSize: '120px', lineHeight: '1' }}>
            {slides[currentSlide].emoji}
          </div>
        </div>

        {/* Card Principal */}
        <div className="w-full max-w-sm">
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slides[currentSlide].gradient} p-10 shadow-2xl transition-all duration-500 ${isDragging ? 'scale-95' : 'scale-100'}`}>
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                {slides[currentSlide].title}
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed font-medium">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Slide Indicator Integrado */}
            <div className="flex justify-center gap-2 mt-10">
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

          {/* Eliminado el hint "Desliza para continuar" - Los dots son suficientes */}
        </div>
      </div>

      {/* Footer con Botones */}
      <div className="px-6 pb-8 space-y-3">
        {currentSlide === slides.length - 1 ? (
          <button
            onClick={() => navigate('/login')}
            className="w-full py-5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-brand-500/50 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            ¡Comenzar!
            <ArrowRight className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={nextSlide}
            className="w-full py-5 bg-white text-brand-600 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all active:scale-95 border-2 border-brand-100"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
