import React from 'react';
import { Trophy, TrendingUp, Award, Target, Zap, Star } from 'lucide-react';
import { calculateLevel, calculateProgress, ACHIEVEMENTS } from '../utils/karmaSystem';

const UserProfileCard = ({ userStats }) => {
  const level = calculateLevel(userStats.totalKarmaPoints || 0);
  const progress = calculateProgress(userStats.totalKarmaPoints || 0);
  
  // Achievements desbloqueados
  const unlockedAchievements = ACHIEVEMENTS.filter(a => 
    userStats.unlockedAchievements?.includes(a.id)
  );

  return (
    <div className="card bg-gradient-to-br from-white to-brand-50">
      {/* Header con nivel */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}>
          {level.emoji}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-800">{userStats.displayName}</h2>
          <p className="text-xs sm:text-sm text-neutral-600">Nivel {LEVELS.indexOf(level) + 1} - {level.title}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
            <Trophy className="w-4 h-4 text-brand-500" />
            <span className="font-bold text-brand-600">{userStats.totalKarmaPoints || 0} pts</span>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      {progress.nextLevel && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-neutral-600 mb-2">
            <span>Progreso al siguiente nivel</span>
            <span className="font-semibold">{progress.pointsToNext} pts restantes</span>
          </div>
          <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${level.color} transition-all duration-500`}
              style={{ width: `${progress.percent}%` }}
            ></div>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {progress.percent}% completado
          </p>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" />
            <span className="text-[10px] sm:text-xs text-neutral-600">Dados</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-800">
            {userStats.recognitionsGiven || 0}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
            <span className="text-[10px] sm:text-xs text-neutral-600">Recibidos</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-800">
            {userStats.recognitionsReceived || 0}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-[10px] sm:text-xs text-neutral-600">Racha</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-800">
            {userStats.currentStreak || 0} días
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
            <span className="text-[10px] sm:text-xs text-neutral-600">Más votado</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-800">
            {userStats.timesMostVoted || 0}x
          </div>
        </div>
      </div>

      {/* Badge del nivel actual */}
      <div className="bg-white rounded-xl p-4 border-2 border-brand-200 mb-6">
        <div className="flex items-center gap-3">
          <Award className={`w-8 h-8 text-${level.color}`} />
          <div>
            <h3 className="font-bold text-neutral-800">{level.badge}</h3>
            <p className="text-xs text-neutral-600">Badge de {level.name}</p>
          </div>
        </div>
      </div>

      {/* Achievements desbloqueados */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-neutral-700 mb-3 flex items-center gap-2">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Logros Desbloqueados ({unlockedAchievements.length})
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {unlockedAchievements.slice(0, 6).map(achievement => (
              <div
                key={achievement.id}
                className="bg-gradient-to-br from-amber-100 to-amber-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 border border-amber-300"
                title={achievement.description}
              >
                <span className="text-base sm:text-xl">{achievement.emoji}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-amber-900">{achievement.name}</span>
              </div>
            ))}
            {unlockedAchievements.length > 6 && (
              <div className="bg-neutral-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg flex items-center">
                <span className="text-[10px] sm:text-xs font-semibold text-neutral-600">
                  +{unlockedAchievements.length - 6} más
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animal y Cualidad más comunes */}
      {userStats.mostCommonAnimal && (
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <h3 className="text-sm font-bold text-neutral-700 mb-3">Tu Esencia</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
              <div className="text-3xl mb-1">{userStats.mostCommonAnimal.emoji}</div>
              <div className="text-xs font-semibold text-purple-900">{userStats.mostCommonAnimal.name}</div>
              <div className="text-xs text-purple-600">{userStats.mostCommonAnimal.count}x</div>
            </div>
            {userStats.mostCommonQuality && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-200">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-xs font-semibold text-blue-900">{userStats.mostCommonQuality.name}</div>
                <div className="text-xs text-blue-600">{userStats.mostCommonQuality.count}x</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
