import React from 'react';
import { Trophy, TrendingUp, Award, Crown, Medal } from 'lucide-react';
import { calculateLevel } from '../utils/karmaSystem';

const SquadLeaderboard = ({ squadStats, currentUserId }) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-brand-500" />
        <h2 className="text-2xl font-bold text-neutral-800">Leaderboard del Squad</h2>
      </div>

      <div className="space-y-3">
        {squadStats.map((member, index) => {
          const isCurrentUser = member.id === currentUserId;
          const level = calculateLevel(member.karmaPoints);
          const isTop3 = index < 3;
          
          // Iconos de posición
          const PositionIcon = index === 0 ? Crown : index === 1 ? Medal : index === 2 ? Award : null;
          const positionColor = index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-600' : 'text-neutral-400';

          return (
            <div
              key={member.id}
              className={`relative overflow-hidden rounded-2xl transition-all ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-xl scale-105' 
                  : isTop3
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200'
                  : 'bg-white border border-neutral-200'
              }`}
            >
              {/* Pattern decorativo para el usuario actual */}
              {isCurrentUser && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                </div>
              )}

              <div className="relative p-4 flex items-center gap-4">
                {/* Posición */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isCurrentUser 
                    ? 'bg-white/20' 
                    : isTop3 
                    ? 'bg-white' 
                    : 'bg-neutral-100'
                }`}>
                  {isTop3 && PositionIcon ? (
                    <PositionIcon className={`w-6 h-6 ${isCurrentUser ? 'text-white' : positionColor}`} />
                  ) : (
                    <span className={`text-xl font-bold ${isCurrentUser ? 'text-white' : 'text-neutral-600'}`}>
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Avatar y nombre */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-lg ${isCurrentUser ? 'text-white' : 'text-neutral-800'}`}>
                      {member.name}
                    </h3>
                    {isCurrentUser && (
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Tú</span>
                    )}
                    {member.isMostVoted && (
                      <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Más votado
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-4 h-4 ${isCurrentUser ? 'text-white/70' : 'text-brand-500'}`} />
                      <span className={isCurrentUser ? 'text-white/90' : 'text-neutral-600'}>
                        {member.recognitionsGiven} dados
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className={`w-4 h-4 ${isCurrentUser ? 'text-white/70' : 'text-purple-500'}`} />
                      <span className={isCurrentUser ? 'text-white/90' : 'text-neutral-600'}>
                        {member.recognitionsReceived} recibidos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Karma Points */}
                <div className="text-right shrink-0">
                  <div className={`text-2xl font-bold ${isCurrentUser ? 'text-white' : 'text-brand-600'}`}>
                    {member.karmaPoints}
                  </div>
                  <div className={`text-xs ${isCurrentUser ? 'text-white/70' : 'text-neutral-500'}`}>
                    pts
                  </div>
                  <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                    isCurrentUser 
                      ? 'bg-white/20 text-white' 
                      : `bg-gradient-to-r ${level.color} text-white`
                  }`}>
                    {level.emoji} {level.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estadísticas del squad */}
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <h3 className="text-sm font-bold text-neutral-700 mb-3">Estadísticas del Squad</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-200">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-xs text-neutral-600">Participación</div>
            <div className="text-lg font-bold text-blue-900">
              {Math.round((squadStats.filter(m => m.recognitionsGiven > 0).length / squadStats.length) * 100)}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-xs text-neutral-600">Total Kudos</div>
            <div className="text-lg font-bold text-purple-900">
              {squadStats.reduce((sum, m) => sum + m.recognitionsGiven, 0)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-200">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs text-neutral-600">Karma Total</div>
            <div className="text-lg font-bold text-amber-900">
              {squadStats.reduce((sum, m) => sum + m.karmaPoints, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadLeaderboard;
