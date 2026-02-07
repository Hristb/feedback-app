import React from 'react';
import { Trophy, Star, Target, Award, Zap, Heart, Crown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { ACHIEVEMENTS } from '../utils/karmaSystem';

const AchievementsScreen = ({ userProfile, onLogout }) => {
  const navigate = useNavigate();

  // Logros desbloqueados del usuario
  const unlockedIds = userProfile?.achievements || [];
  const unlockedAchievements = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id));
  const lockedAchievements = ACHIEVEMENTS.filter(a => !unlockedIds.includes(a.id));

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
            Tus Logros
          </h1>
          <p className="text-neutral-600">
            {unlockedAchievements.length} de {ACHIEVEMENTS.length} desbloqueados
          </p>
        </div>

        {/* Progress Bar */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-neutral-700">Progreso de Logros</span>
            <span className="text-sm font-bold text-brand-600">
              {Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
              style={{ width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Desbloqueados ({unlockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unlockedAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className="card bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-3xl shadow-md">
                      {achievement.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-800 mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-xs text-neutral-600 mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 text-amber-600" />
                        <span className="text-xs font-bold text-amber-700">
                          +{achievement.points} pts
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-neutral-500" />
              Por Desbloquear ({lockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lockedAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className="card bg-gradient-to-br from-neutral-100 to-neutral-50 border-2 border-neutral-200 opacity-60 hover:opacity-80 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-neutral-300 rounded-xl flex items-center justify-center text-3xl grayscale">
                      {achievement.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-600 mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 text-neutral-400" />
                        <span className="text-xs font-bold text-neutral-500">
                          +{achievement.points} pts
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 bg-neutral-300 rounded-full">
                      <span className="text-neutral-500 text-lg">🔒</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Card */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">💡 Cómo desbloquear logros</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Participa activamente en votaciones</li>
                <li>• Da reconocimientos detallados y sinceros</li>
                <li>• Mantén rachas de participación semanal</li>
                <li>• Recibe votos de tus compañeros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AchievementsScreen;
