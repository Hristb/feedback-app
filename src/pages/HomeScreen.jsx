import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogIn, Trophy, TrendingUp, Zap, Star, Award, Target, Calendar, ArrowRight, Clock, Sparkles, LogOut, Copy, Check } from 'lucide-react';

const HomeScreen = ({ userProfile, onLogout }) => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);
  const [squadHistory, setSquadHistory] = useState(() => {
    // Cargar historial inicial desde localStorage
    const historyKey = userProfile?.uid ? `squadHistory_${userProfile.uid}` : 'squadHistory';
    const saved = localStorage.getItem(historyKey);
    return saved ? JSON.parse(saved) : [];
  });

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
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100 p-6">
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
            Squad Vote
          </h1>
          <p className="text-neutral-600 text-lg">
            Reconoce las fortalezas de tu equipo
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-brand-400 to-brand-600 text-white border-none">
            <div className="flex items-center gap-3">
              <Trophy className="w-10 h-10" />
              <div>
                <div className="text-3xl font-bold">{squadHistory.length}</div>
                <div className="text-sm opacity-90">Squads Participados</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-success to-success-dark text-white border-none">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-10 h-10" />
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-90">Compromiso</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-info to-brand-500 text-white border-none">
            <div className="flex items-center gap-3">
              <Clock className="w-10 h-10" />
              <div>
                <div className="text-3xl font-bold">En Vivo</div>
                <div className="text-sm opacity-90">Estado</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
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
            Squad Vote te ayuda a reconocer las fortalezas únicas de cada miembro de tu equipo
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
