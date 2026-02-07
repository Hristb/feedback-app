import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Heart, Sparkles } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "¡Bienvenido a Kudos!",
      description: "La forma más divertida de reconocer las fortalezas únicas de tu equipo",
      icon: <Sparkles className="w-16 h-16 text-white" />,
      gradient: "from-brand-400 to-brand-600"
    },
    {
      title: "Crea tu equipo",
      description: "En segundos, forma un squad y comparte el código con tu equipo",
      icon: <Users className="w-16 h-16 text-white" />,
      gradient: "from-accent to-accent-dark"
    },
    {
      title: "Reconoce fortalezas",
      description: "Elige un animal y cualidad que represente lo mejor de cada compañero",
      icon: <Heart className="w-16 h-16 text-white" />,
      gradient: "from-secondary to-secondary-dark"
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
    <div className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto bg-gradient-to-br from-brand-50 via-neutral-50 to-accent-50">
      {/* Logo/Header */}
      <div className="w-full pt-8 pb-4">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦁</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
            Kudos
          </h1>
          <p className="text-neutral-600 mt-2">Da reconocimiento, construye equipo</p>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex-1 w-full flex items-center">
        <div className="w-full">
          <div className={`card bg-gradient-to-br ${slides[currentSlide].gradient} text-white border-none transform transition-all duration-500 shadow-2xl`}>
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">{slides[currentSlide].icon}</div>
              <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
              <p className="text-lg opacity-90 leading-relaxed">{slides[currentSlide].description}</p>
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
        {currentSlide === slides.length - 1 ? (
          <button
            onClick={() => navigate('/login')}
            className="btn-primary w-full text-xl shadow-2xl"
          >
            ¡Comenzar ahora!
          </button>
        ) : (
          <button
            onClick={nextSlide}
            className="w-full px-6 py-4 bg-white text-brand-600 rounded-xl font-bold text-lg hover:bg-brand-50 transition-all shadow-lg"
          >
            Siguiente
          </button>
        )}
        <button
          onClick={() => navigate('/login')}
          className="w-full mt-3 text-neutral-500 hover:text-brand-600 text-sm transition-colors"
        >
          Saltar intro
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
