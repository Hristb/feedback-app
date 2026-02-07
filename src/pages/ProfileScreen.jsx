import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Trophy, TrendingUp, Star, Zap, Award, ArrowLeft, Target, Crown } from 'lucide-react';
import Header from '../components/Header';
import UserProfileCard from '../components/UserProfileCard';
import { calculateLevel, calculateProgress, ACHIEVEMENTS } from '../utils/karmaSystem';

const ProfileScreen = ({ currentUser, userProfile, onLogout }) => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserStats = async () => {
      if (!userProfile?.uid) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', userProfile.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserStats({
            totalKarmaPoints: data.karmaPoints || 0,
            displayName: userProfile.displayName,
            recognitionsGiven: data.recognitionsGiven || 0,
            recognitionsReceived: data.recognitionsReceived || 0,
            currentStreak: data.currentStreak || 0,
            timesMostVoted: data.timesMostVoted || 0,
            unlockedAchievements: data.unlockedAchievements || [],
            mostCommonAnimal: data.mostCommonAnimal || null,
            mostCommonQuality: data.mostCommonQuality || null
          });
        } else {
          // Usuario nuevo, inicializar con valores por defecto
          setUserStats({
            totalKarmaPoints: 0,
            displayName: userProfile.displayName,
            recognitionsGiven: 0,
            recognitionsReceived: 0,
            currentStreak: 0,
            timesMostVoted: 0,
            unlockedAchievements: [],
            mostCommonAnimal: null,
            mostCommonQuality: null
          });
        }
      } catch (error) {
        console.error('Error loading user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserStats();
  }, [userProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦁</div>
          <p className="text-neutral-600">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  if (!userStats) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card max-w-md text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-neutral-800 mb-2">
            Perfil no disponible
          </h2>
          <p className="text-neutral-600 mb-4">
            Inicia sesión para ver tu perfil y estadísticas
          </p>
          <button
            onClick={() => navigate('/home')}
            className="btn-primary"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const level = calculateLevel(userStats.totalKarmaPoints);
  const progress = calculateProgress(userStats.totalKarmaPoints);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
      <Header userName={currentUser?.userName} userProfile={userProfile} onLogout={onLogout} />
      
      <div className="p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-neutral-600" />
          </button>
          <h1 className="text-2xl font-bold text-neutral-800">Mi Perfil</h1>
        </div>

        {/* User Profile Card */}
        <div className="mb-6">
          <UserProfileCard userStats={userStats} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none">
            <div className="flex items-center gap-3">
              <Trophy className="w-10 h-10" />
              <div>
                <div className="text-3xl font-bold">{userStats.totalKarmaPoints}</div>
                <div className="text-sm opacity-90">Karma Total</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-none">
            <div className="flex items-center gap-3">
              <Target className="w-10 h-10" />
              <div>
                <div className="text-3xl font-bold">{progress.percent}%</div>
                <div className="text-sm opacity-90">Próximo Nivel</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Showcase */}
        {userStats.unlockedAchievements.length > 0 && (
          <div className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-brand-500" />
              <h2 className="text-xl font-bold text-neutral-800">Logros Desbloqueados</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {userStats.unlockedAchievements.slice(0, 6).map((achievementId) => {
                const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
                if (!achievement) return null;
                
                return (
                  <div
                    key={achievement.id}
                    className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl p-3 border-2 border-amber-300"
                  >
                    <div className="text-3xl mb-1">{achievement.emoji}</div>
                    <div className="text-sm font-bold text-amber-900">{achievement.name}</div>
                    <div className="text-xs text-amber-700 mt-1">{achievement.description}</div>
                  </div>
                );
              })}
            </div>
            
            {userStats.unlockedAchievements.length > 6 && (
              <p className="text-sm text-neutral-600 mt-3 text-center">
                +{userStats.unlockedAchievements.length - 6} logros más
              </p>
            )}
          </div>
        )}

        {/* Locked Achievements */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-neutral-400" />
            <h2 className="text-xl font-bold text-neutral-800">Logros por Desbloquear</h2>
          </div>
          
          <div className="space-y-3">
            {ACHIEVEMENTS.filter(a => !userStats.unlockedAchievements.includes(a.id))
              .slice(0, 5)
              .map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-neutral-100 rounded-xl border border-neutral-200"
                >
                  <div className="text-2xl opacity-30">{achievement.emoji}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-neutral-800">{achievement.name}</div>
                    <div className="text-xs text-neutral-600">{achievement.requirement}</div>
                  </div>
                  <div className="text-xs text-neutral-500 bg-white px-2 py-1 rounded-full">
                    {achievement.type}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="card bg-gradient-to-br from-brand-500 to-brand-700 text-white border-none mt-6">
          <div className="text-center">
            <Zap className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">¡Sigue Creciendo!</h3>
            <p className="text-sm opacity-90 mb-4">
              Participa en más squads para ganar karma y desbloquear logros épicos
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary bg-white text-brand-600 hover:bg-neutral-100"
            >
              Unirse a un Squad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
