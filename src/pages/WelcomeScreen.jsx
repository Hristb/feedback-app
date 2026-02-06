import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "¡Bienvenido a Squad Vote!",
      description: "Reconoce las fortalezas de tu equipo de una forma divertida y significativa",
      emoji: "🦁",
      gradient: "from-brand-400 to-brand-600"
    },
    {
      title: "Crea o Únete",
      description: "Forma un equipo o únete a uno existente con un código único",
      emoji: "👥",
      gradient: "from-brand-500 to-info"
    },
    {
      title: "Vota y Reconoce",
      description: "Selecciona a un compañero, elige un animal que lo represente y destaca su mejor cualidad",
      emoji: "⭐",
      gradient: "from-info to-brand-400"
    },
    {
      title: "Descubre los Resultados",
      description: "Ve cómo tu equipo te percibe y celebren sus fortalezas juntos",
      emoji: "🎉",
      gradient: "from-brand-500 to-brand-700"
    }
  ];

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
    <div className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      {/* Logo/Header */}
      <div className="w-full pt-8 pb-4">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦁</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
            Squad Vote
          </h1>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex-1 w-full flex items-center">
        <div className="w-full">
          <div className={`card bg-gradient-to-br ${slides[currentSlide].gradient} text-white border-none transform transition-all duration-500`}>
            <div className="text-center py-8">
              <div className="text-7xl mb-6">{slides[currentSlide].emoji}</div>
              <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
              <p className="text-lg opacity-90">{slides[currentSlide].description}</p>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {currentSlide > 0 && (
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-600" />
              </button>
            )}
            
            <div className="flex gap-2 mx-4">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-gradient-to-r from-brand-500 to-brand-700' 
                      : 'w-2 bg-neutral-300'
                  }`}
                />
              ))}
            </div>

            {currentSlide < slides.length - 1 && (
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5 text-neutral-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full pb-8">
        <button
          onClick={() => {
            localStorage.setItem('hasVisited', 'true');
            navigate('/home');
          }}
          className="btn-primary w-full text-xl"
        >
          ¡Comenzar!
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
