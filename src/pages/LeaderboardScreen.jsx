import React from 'react';
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const LeaderboardScreen = ({ userProfile, onLogout }) => {
  const navigate = useNavigate();

  // Mock data - aquí irían los datos reales del leaderboard global
  const mockLeaderboard = [
    { rank: 1, name: 'María García', karma: 1850, level: 'Platinum', emoji: '💎' },
    { rank: 2, name: 'Juan Pérez', karma: 1420, level: 'Gold', emoji: '🥇' },
    { rank: 3, name: 'Ana López', karma: 980, level: 'Silver', emoji: '🥈' },
    { rank: 4, name: 'Carlos Ruiz', karma: 750, level: 'Silver', emoji: '🥈' },
    { rank: 5, name: userProfile?.displayName || 'Tú', karma: userProfile?.karmaPoints || 0, level: 'Bronze', emoji: '🥉' },
  ];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <span className="text-lg font-bold text-neutral-500">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
      <Header 
        userName={userProfile?.displayName} 
        userProfile={userProfile}
        onLogout={onLogout}
      />
      
      <div className="max-w-4xl mx-auto p-6 pb-24 md:pb-6">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            Tabla de Líderes Global
          </h1>
          <p className="text-neutral-600">
            Los mejores del mes en reconocimientos
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
            <div className="text-center">
              <div className="text-3xl mb-1">👑</div>
              <div className="text-2xl font-bold text-amber-900">1,850</div>
              <div className="text-xs text-amber-700">Top Score</div>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="text-center">
              <div className="text-3xl mb-1">⚡</div>
              <div className="text-2xl font-bold text-blue-900">#{mockLeaderboard.findIndex(u => u.name === userProfile?.displayName) + 1 || 5}</div>
              <div className="text-xs text-blue-700">Tu Posición</div>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="text-center">
              <div className="text-3xl mb-1">🎯</div>
              <div className="text-2xl font-bold text-purple-900">{userProfile?.karmaPoints || 0}</div>
              <div className="text-xs text-purple-700">Tu Karma</div>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-neutral-800">Top 100</h2>
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <TrendingUp className="w-3 h-3" />
              Actualizado hace 5 min
            </div>
          </div>

          <div className="space-y-2">
            {mockLeaderboard.map((user, index) => {
              const isCurrentUser = user.name === userProfile?.displayName;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isCurrentUser 
                      ? 'bg-gradient-to-r from-brand-100 to-brand-50 border-2 border-brand-300 shadow-md' 
                      : 'bg-neutral-50 hover:bg-neutral-100'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-12 flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {user.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="font-bold text-neutral-800 flex items-center gap-2">
                      {user.name}
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full">
                          TÚ
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {user.level} Level
                    </div>
                  </div>

                  {/* Karma */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-brand-600 font-bold">
                      <Trophy className="w-4 h-4" />
                      {user.karma}
                    </div>
                    <div className="text-xs text-neutral-500">{user.emoji}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-purple-900 mb-1">Próximamente</h3>
              <p className="text-xs text-purple-700">
                El ranking global se actualizará con datos reales una vez que más usuarios participen. 
                ¡Sigue acumulando karma para escalar posiciones!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default LeaderboardScreen;
