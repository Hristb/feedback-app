import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogIn, Trophy, TrendingUp, Zap, Star, Award, Target, Calendar, ArrowRight, Clock, Sparkles, LogOut, Copy, Check } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const HomeScreen = ({ userProfile, currentUser, squads, onLogout }) => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);
  const [squadHistory, setSquadHistory] = useState(() => {
    // Cargar historial inicial desde localStorage
    const historyKey = userProfile?.uid ? `squadHistory_${userProfile.uid}` : 'squadHistory';
    const saved = localStorage.getItem(historyKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Obtener datos del squad actual
  const currentSquad = currentUser?.squadCode ? squads[currentUser.squadCode] : null;

  // Recargar historial solo cuando userProfile cambia
  useEffect(() => {
    const historyKey = userProfile?.uid ? `squadHistory_${userProfile.uid}` : 'squadHistory';
    const saved = localStorage.getItem(historyKey);
    setSquadHistory(saved ? JSON.parse(saved) : []);
  }, [userProfile?.uid]);

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('squadHistory');
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100 p-6 pb-24 md:pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Header con Logout */}
        <div className="flex justify-between items-center mb-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold">
              {userProfile?.displayName?.charAt(0) || '?'}
            </div>
            <div>
              <div className="font-semibold text-neutral-800">{userProfile?.displayName}</div>
              <div className="text-xs text-neutral-500">{userProfile?.email || 'Invitado'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-error hover:bg-error-light rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🦁</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent mb-2">
            Kudos
          </h1>
          <p className="text-neutral-600 text-lg">
            Da reconocimiento, construye equipo
          </p>
        </div>

        {/* Stats Cards - Solo si está en un squad */}
        {currentSquad && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card bg-gradient-to-br from-brand-400 to-brand-600 text-white border-none">
              <div className="flex items-center gap-3">
                <Users className="w-10 h-10" />
                <div>
                  <div className="text-3xl font-bold">{currentSquad.members?.length || 0}</div>
                  <div className="text-sm opacity-90">Miembros del Squad</div>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-success to-success-dark text-white border-none">
              <div className="flex items-center gap-3">
                <Trophy className="w-10 h-10" />
                <div>
                  <div className="text-3xl font-bold">{userProfile?.karmaPoints || 0}</div>
                  <div className="text-sm opacity-90">Tus Karma Points</div>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-info to-brand-500 text-white border-none">
              <div className="flex items-center gap-3">
                <Star className="w-10 h-10" />
                <div>
                  <div className="text-3xl font-bold">
                    {currentSquad.votes ? Object.keys(currentSquad.votes).length : 0}
                  </div>
                  <div className="text-sm opacity-90">Votos Emitidos</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Actions - Vista Dinámica */}
        {currentUser?.squadCode ? (
          /* Usuario YA está en un squad - Mostrar squad activo */
          <>
            <div className="card bg-gradient-to-br from-brand-500 to-brand-700 text-white mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Tu Squad Activo</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">
                  {currentSquad?.squadName || 'Squad'}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-sm opacity-90">Código</div>
                    <div className="text-xl font-bold font-mono flex items-center gap-2">
                      {currentUser.squadCode}
                      <button
                        onClick={() => copyCode(currentUser.squadCode)}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                      >
                        {copiedCode === currentUser.squadCode ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-sm opacity-90">Miembros</div>
                    <div className="text-xl font-bold">
                      {currentSquad?.members?.length || 0} 👥
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-white text-brand-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-50 transition-all"
                >
                  Ir al Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sección secundaria para crear/unirse a otro squad */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px bg-neutral-200"></div>
                <span className="text-sm text-neutral-500">O explora más opciones</span>
                <div className="flex-1 h-px bg-neutral-200"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => navigate('/squad?mode=create')}
                className="card hover:shadow-lg transition-all duration-300 cursor-pointer group text-left border-2 border-dashed border-neutral-300 hover:border-brand-400"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-800 mb-1">
                      Crear Otro Squad
                    </h3>
                    <p className="text-neutral-600 text-xs">
                      Inicia un nuevo equipo
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/squad?mode=join')}
                className="card hover:shadow-lg transition-all duration-300 cursor-pointer group text-left border-2 border-dashed border-neutral-300 hover:border-info"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-info to-brand-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-800 mb-1">
                      Unirse a Otro
                    </h3>
                    <p className="text-neutral-600 text-xs">
                      Con código de invitación
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          /* Usuario NO está en un squad - Vista original */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate('/squad?mode=create')}
              className="card hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">
                    Crear Nuevo Squad
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Inicia un nuevo equipo y comienza a reconocer fortalezas
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/squad?mode=join')}
              className="card hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-info to-brand-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">
                    Unirse a Squad
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Únete a un equipo existente con un código único
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Squad History */}
        {squadHistory.length > 0 && (
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold text-neutral-800">Historial Reciente</h2>
            </div>
            
            <div className="space-y-3">
              {squadHistory.slice(-5).reverse().map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-brand-50 to-neutral-50 rounded-xl border border-neutral-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold">
                        {item.squadName?.charAt(0) || 'S'}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-800">
                          {item.squadName || 'Squad'}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {item.role === 'creator' ? 'Creador' : 'Miembro'} • {new Date(item.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyCode(item.code)}
                      className="flex items-center gap-2 text-xs font-mono bg-white hover:bg-brand-50 px-3 py-1.5 rounded-full transition-all border border-neutral-200 hover:border-brand-300"
                    >
                      {copiedCode === item.code ? (
                        <>
                          <Check className="w-3 h-3 text-success" />
                          <span className="text-success">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-neutral-500" />
                          <span className="text-neutral-700">{item.code}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 text-center">
          <p className="text-neutral-500 text-sm">
            Kudos te ayuda a reconocer las fortalezas únicas de cada miembro de tu equipo
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
