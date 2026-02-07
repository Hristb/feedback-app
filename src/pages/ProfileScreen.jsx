import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Trophy, TrendingUp, Star, Zap, Award, ArrowLeft, Target, Crown, Heart, Gift, Users, Calendar, Sparkles, Mail, Shield, UserPlus, X, Check, Copy } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { calculateLevel, calculateProgress, ACHIEVEMENTS } from '../utils/karmaSystem';

const ProfileScreen = ({ currentUser, userProfile, onLogout }) => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendInput, setFriendInput] = useState('');
  const [friendError, setFriendError] = useState('');
  const [sendingRequest, setSendingRequest] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

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
  const handleSendFriendRequest = async () => {
    if (!friendInput.trim()) {
      setFriendError('Ingresa un email o código único');
      return;
    }

    setSendingRequest(true);
    setFriendError('');

    try {
      // Buscar usuario por email o por uid (código de invitado)
      const usersRef = collection(db, 'users');
      let targetUser = null;
      let targetUserId = null;

      // Buscar por email primero
      if (friendInput.includes('@')) {
        const emailQuery = query(usersRef, where('email', '==', friendInput.toLowerCase()));
        const emailSnapshot = await getDocs(emailQuery);
        
        if (!emailSnapshot.empty) {
          targetUserId = emailSnapshot.docs[0].id;
          targetUser = emailSnapshot.docs[0].data();
        }
      } else {
        // Buscar por código único (uid de invitado)
        const userDoc = await getDoc(doc(db, 'users', friendInput));
        if (userDoc.exists()) {
          targetUserId = friendInput;
          targetUser = userDoc.data();
        }
      }

      if (!targetUser || !targetUserId) {
        setFriendError('❌ Usuario no encontrado');
        setSendingRequest(false);
        return;
      }

      // No puedes agregarte a ti mismo
      if (targetUserId === userProfile.uid) {
        setFriendError('❌ No puedes agregarte a ti mismo como amigo');
        setSendingRequest(false);
        return;
      }

      // Verificar si ya son amigos
      const userRef = doc(db, 'users', userProfile.uid);
      const userSnap = await getDoc(userRef);
      const friends = userSnap.exists() ? (userSnap.data().friends || []) : [];

      if (friends.includes(targetUserId)) {
        setFriendError('❌ Ya son amigos');
        setSendingRequest(false);
        return;
      }

      // Verificar si ya existe una solicitud pendiente
      const requestsRef = collection(db, 'friendRequests');
      const existingRequest = query(
        requestsRef,
        where('from', '==', userProfile.uid),
        where('to', '==', targetUserId),
        where('status', '==', 'pending')
      );
      const existingSnap = await getDocs(existingRequest);

      if (!existingSnap.empty) {
        setFriendError('⚠️ Ya enviaste una solicitud a este usuario');
        setSendingRequest(false);
        return;
      }

      // Crear solicitud de amistad
      await addDoc(collection(db, 'friendRequests'), {
        from: userProfile.uid,
        to: targetUserId,
        status: 'pending',
        timestamp: serverTimestamp()
      });

      // Éxito
      setShowAddFriendModal(false);
      setFriendInput('');
      alert(`✅ Solicitud enviada a ${targetUser.displayName}`);
    } catch (error) {
      console.error('Error sending friend request:', error);
      setFriendError('❌ Error al enviar solicitud: ' + error.message);
    } finally {
      setSendingRequest(false);
    }
  };

  const copyUniqueCode = () => {
    navigator.clipboard.writeText(userProfile.uid);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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
      <Header userName={userProfile?.displayName} userProfile={userProfile} onLogout={onLogout} />
      
      <div className="p-4 sm:p-6 max-w-4xl mx-auto pb-24 md:pb-6">
        {/* Profile Header Card */}
        <div className="card mb-6 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white border-none overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              {/* Avatar */}
              <div className="relative">
                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-5xl sm:text-6xl shadow-2xl border-4 border-white/30`}>
                  {level.emoji}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <Trophy className="w-6 h-6 text-brand-600" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {userStats.displayName}
                </h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    {level.title}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    {level.badge}
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{userProfile?.email}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {progress.nextLevel && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">Progreso al siguiente nivel</span>
                  <span className="font-bold">{progress.pointsToNext} pts restantes</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500 shadow-lg"
                    style={{ width: `${progress.percent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white/70 mt-1">
                  {progress.percent}% completado para {progress.nextLevel?.title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Karma Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="card bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:scale-105 transition-transform">
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold">{userStats.totalKarmaPoints}</div>
              <div className="text-xs sm:text-sm opacity-90">Karma Total</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-pink-400 to-rose-500 text-white hover:scale-105 transition-transform">
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold">{userStats.recognitionsGiven}</div>
              <div className="text-xs sm:text-sm opacity-90">Dados</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-400 to-indigo-500 text-white hover:scale-105 transition-transform">
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold">{userStats.recognitionsReceived}</div>
              <div className="text-xs sm:text-sm opacity-90">Recibidos</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-cyan-400 to-blue-500 text-white hover:scale-105 transition-transform">
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold">{userStats.currentStreak}</div>
              <div className="text-xs sm:text-sm opacity-90">Racha</div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold text-neutral-800">Mis Amigos</h2>
            </div>
            <button
              onClick={() => setShowAddFriendModal(true)}
              className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Agregar Amigo
            </button>
          </div>

          {/* Código único para compartir */}
          <div className="bg-brand-50 border-2 border-brand-200 rounded-xl p-4 mb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="text-sm font-semibold text-neutral-700 mb-1">
                  Tu código único
                </div>
                <p className="text-xs text-neutral-600 mb-2">
                  Comparte este código para que te agreguen como amigo
                </p>
                <div className="flex items-center gap-2">
                  <code className="px-3 py-1.5 bg-white border border-brand-300 rounded-lg text-brand-600 font-mono text-sm">
                    {userProfile.uid}
                  </code>
                  <button
                    onClick={copyUniqueCode}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Copiar código"
                  >
                    {copiedCode ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-neutral-600" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-3xl">🔗</div>
            </div>
          </div>

          <div className="text-center text-neutral-500 py-8">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Lista de amigos próximamente...</p>
          </div>
        </div>

        {/* Original Achievements Section */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-brand-500" />
              <h2 className="text-xl font-bold text-neutral-800">Logros</h2>
            </div>
            <button
              onClick={() => navigate('/achievements')}
              className="text-sm text-brand-600 font-semibold hover:underline"
            >
              Ver todos →
            </button>
          </div>
          
          {userStats.unlockedAchievements.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ACHIEVEMENTS.filter(a => userStats.unlockedAchievements.includes(a.id))
                .slice(0, 6)
                .map(achievement => (
                <div
                  key={achievement.id}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-3 hover:shadow-lg transition-all"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{achievement.emoji}</div>
                    <div className="text-xs font-bold text-amber-900">{achievement.name}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500">
              <Gift className="w-12 h-12 mx-auto mb-2 text-neutral-300" />
              <p className="text-sm">Aún no has desbloqueado logros</p>
              <p className="text-xs mt-1">¡Participa en votaciones para ganar logros!</p>
            </div>
          )}
        </div>

        {/* Activity Card */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-brand-500" />
            <h2 className="text-xl font-bold text-neutral-800">Actividad</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-800">Squads Participados</div>
                  <div className="text-xs text-neutral-500">Total de equipos</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-brand-600">
                {Math.floor(userStats.totalKarmaPoints / 50) || 0}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-800">Más Votado</div>
                  <div className="text-xs text-neutral-500">Veces destacado</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {userStats.timesMostVoted}
              </div>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="card bg-gradient-to-br from-neutral-50 to-white">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-brand-500" />
            <h2 className="text-xl font-bold text-neutral-800">Información de Cuenta</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Método de autenticación</span>
              <span className="font-semibold text-neutral-800 capitalize">
                {userProfile?.authProvider || 'Email'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Estado</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Activo ✓
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para agregar amigo */}
      {showAddFriendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setShowAddFriendModal(false);
                setFriendInput('');
                setFriendError('');
              }}
              className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Agregar Amigo
              </h2>
              <p className="text-neutral-600 text-sm">
                Ingresa el email o código único de tu amigo
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Email o Código Único
              </label>
              <input
                type="text"
                value={friendInput}
                onChange={(e) => setFriendInput(e.target.value)}
                placeholder="ejemplo@email.com o guest_123456"
                className="input-field"
                autoFocus
              />
              {friendError && (
                <p className="text-xs text-error mt-2">{friendError}</p>
              )}
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-neutral-600">
                💡 <strong>Tip:</strong> Si tu amigo es invitado, pídele su código único desde su perfil
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddFriendModal(false);
                  setFriendInput('');
                  setFriendError('');
                }}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendFriendRequest}
                disabled={sendingRequest || !friendInput.trim()}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sendingRequest ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Enviar Solicitud
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default ProfileScreen;
