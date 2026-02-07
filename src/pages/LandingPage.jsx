import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Sparkles, TrendingUp, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-accent-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-7xl mb-6 animate-bounce">🦁</div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 bg-clip-text text-transparent mb-6 leading-tight">
            Reconoce las fortalezas que hacen únicos a tus compañeros
          </h1>
          
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Kudos es una forma divertida y significativa de celebrar las cualidades especiales de cada persona en tu equipo
          </p>
          
          <button
            onClick={() => navigate('/welcome')}
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3 shadow-2xl hover:shadow-brand-500/50 transition-all"
          >
            Comenzar gratis
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-sm text-neutral-500 mt-4">
            No requiere tarjeta de crédito • Gratis para siempre
          </p>
        </div>

        {/* Mockup Preview */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-brand-400 to-brand-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center text-2xl">
                  🦉
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-neutral-100 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center text-2xl">
                  🦊
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-neutral-100 rounded w-1/3"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-2xl">
                  🦁
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-4/5 mb-2"></div>
                  <div className="h-3 bg-neutral-100 rounded w-2/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-xl text-neutral-600">
              En 3 simples pasos, transforma el reconocimiento en tu equipo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-400 to-brand-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-brand-500 mb-4">1</div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                Crea o únete a un equipo
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Genera un código único o ingresa uno existente para unirte a tu squad
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-accent mb-4">2</div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                Reconoce a un compañero
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Elige un animal y cualidad que represente sus fortalezas únicas
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary-dark rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-secondary-dark mb-4">3</div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">
                Descubre cómo te ven
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Cuando todos voten, revela los reconocimientos que recibiste
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-brand-50 to-accent-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              ¿Por qué Kudos?
            </h2>
            <p className="text-xl text-neutral-600">
              Más que una app, es una nueva forma de conectar con tu equipo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card group hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-800 mb-2">
                    Fortalece conexiones
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Crea vínculos más profundos reconociendo lo que hace especial a cada persona
                  </p>
                </div>
              </div>
            </div>

            <div className="card group hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-800 mb-2">
                    Feedback positivo
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Enfócate en fortalezas, no en debilidades. Celebra lo que funciona
                  </p>
                </div>
              </div>
            </div>

            <div className="card group hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-800 mb-2">
                    Súper rápido
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    En menos de 2 minutos puedes dar reconocimiento significativo a tu equipo
                  </p>
                </div>
              </div>
            </div>

            <div className="card group hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-info to-brand-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-800 mb-2">
                    Anónimo y seguro
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Reconoce libremente sin presiones. Los resultados se revelan juntos
                  </p>
                </div>
              </div>
            </div>

            <div className="card group hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-success-dark rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-800 mb-2">
                    Mejora el ambiente
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Equipos que se reconocen mutuamente son más felices y productivos
                  </p>
                </div>
              </div>
            </div>

            <div className="card group hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-accent rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-800 mb-2">
                    Para todos los equipos
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Startups, empresas, escuelas, comunidades. Cualquier grupo de personas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comienza a dar reconocimiento hoy
          </h2>
          <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Únete a los equipos que ya están transformando su cultura con Kudos
          </p>
          <button
            onClick={() => navigate('/welcome')}
            className="bg-white text-brand-600 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 hover:bg-brand-50 transition-all shadow-2xl hover:scale-105"
          >
            Pruébalo gratis
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-sm text-brand-100 mt-4">
            Gratis para siempre • Sin tarjeta de crédito
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-neutral-900 text-neutral-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-4xl mb-4">🦁</div>
          <p className="text-lg font-semibold text-white mb-2">Kudos</p>
          <p className="text-sm">
            Reconoce las fortalezas que hacen únicos a tus compañeros
          </p>
          <div className="mt-6 text-xs">
            © 2026 Kudos. Hecho con ❤️ para equipos increíbles
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
