import React from 'react';
import { Home, Trophy, Gift, Crown, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Inicio', path: '/home' },
    { icon: Trophy, label: 'Ranking', path: '/leaderboard' },
    { icon: Gift, label: 'Logros', path: '/achievements' },
    { icon: Crown, label: 'Squads', path: '/home' },
    { icon: User, label: 'Perfil', path: '/profile' }
  ];

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 border-t border-brand-800 shadow-2xl z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
                active 
                  ? 'text-white scale-110' 
                  : 'text-brand-200/70 hover:text-white hover:scale-105'
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? 'drop-shadow-lg' : ''}`} />
              <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
