import React, { useState } from 'react';
import { Bell, MoreVertical, LogOut, Home, User, ArrowLeft, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateLevel } from '../utils/karmaSystem';

const Header = ({ userName, userProfile, onLogout, showBackToHome = true }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // Obtener la primera letra del nombre
  const getInitial = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/home');
    }
  };

  const displayName = userName || userProfile?.displayName || 'Usuario';
  
  // Calcular nivel del usuario basado en karma points
  const karmaPoints = userProfile?.karmaPoints || 0;
  const level = calculateLevel(karmaPoints);

  return (
    <header className="bg-gradient-to-r from-white via-brand-50/30 to-white border-b-2 border-brand-200/50 sticky top-0 z-50 shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            {showBackToHome && (
              <button
                onClick={() => navigate('/home')}
                className="p-2 rounded-lg hover:bg-brand-100 transition-colors text-neutral-600 hover:text-brand-600"
                title="Volver al inicio"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="text-2xl drop-shadow-sm">🦁</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              Kudos
            </h1>
          </div>

          {/* Right Side - Avatar, Notifications, Menu */}
          <div className="flex items-center gap-3">
            {/* Karma Points Badge */}
            {karmaPoints > 0 && (
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${level.color} border-2 border-white/30 shadow-md`}>
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">{karmaPoints}</span>
                <span className="text-white/90 text-xs">{level.emoji}</span>
              </div>
            )}

            {/* Notification Bell */}
            <button className="p-2 rounded-full hover:bg-brand-100 transition-colors relative group">
              <Bell className="w-5 h-5 text-neutral-600 group-hover:text-brand-600 transition-colors" />
              {/* Badge de notificaciones (opcional) */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse"></span>
            </button>

            {/* Avatar con inicial */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-2 border-white">
                {getInitial(displayName)}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-neutral-700">
                {displayName}
              </span>
            </div>

            {/* Menu de tres puntos */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-brand-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-neutral-600 hover:text-brand-600 transition-colors" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-brand-200 py-2 z-20">
                    <button
                      onClick={() => {
                        navigate('/home');
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-brand-50 transition-colors flex items-center gap-3 text-neutral-700 hover:text-brand-700"
                    >
                      <Home className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">Ir al Inicio</div>
                        <div className="text-xs text-neutral-500">Página principal</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-brand-50 transition-colors flex items-center gap-3 text-neutral-700 hover:text-brand-700"
                    >
                      <User className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">Mi Perfil</div>
                        <div className="text-xs text-neutral-500">Ver información</div>
                      </div>
                    </button>

                    <div className="border-t border-brand-100 my-2" />

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-error-light transition-colors flex items-center gap-3 text-error hover:text-error-dark"
                    >
                      <LogOut className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">Salir del Squad</div>
                        <div className="text-xs text-error-dark/70">Volver al inicio</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
