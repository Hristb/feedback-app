import React, { useState } from 'react';
import { Bell, MoreVertical, LogOut, Home, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            {showBackToHome && (
              <button
                onClick={() => navigate('/home')}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-600 hover:text-brand-600"
                title="Volver al inicio"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="text-2xl">🦁</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              Squad Vote
            </h1>
          </div>

          {/* Right Side - Avatar, Notifications, Menu */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors relative group">
              <Bell className="w-5 h-5 text-neutral-600 group-hover:text-brand-600 transition-colors" />
              {/* Badge de notificaciones (opcional) */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>

            {/* Avatar con inicial */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                {getInitial(displayName)}
              </div>
              <span className="hidden sm:block text-sm font-medium text-neutral-700">
                {displayName}
              </span>
            </div>

            {/* Menu de tres puntos */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
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
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-20">
                    <button
                      onClick={() => {
                        navigate('/home');
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors flex items-center gap-3 text-neutral-700"
                    >
                      <Home className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Ir al Inicio</div>
                        <div className="text-xs text-neutral-500">Página principal</div>
                      </div>
                    </button>

                    <button
                      className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors flex items-center gap-3 text-neutral-700"
                    >
                      <User className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Mi Perfil</div>
                        <div className="text-xs text-neutral-500">Ver información</div>
                      </div>
                    </button>

                    <div className="border-t border-neutral-200 my-2" />

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-error-light transition-colors flex items-center gap-3 text-error"
                    >
                      <LogOut className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Salir del Squad</div>
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
