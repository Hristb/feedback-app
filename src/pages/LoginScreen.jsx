import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Mail, Lock, User, Chrome, LogIn, UserPlus, Sparkles } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login', 'register', 'guest'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [guestName, setGuestName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      const userProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        authProvider: 'google'
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      onLogin(userProfile);
      navigate('/home');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || email.split('@')[0],
        authProvider: 'email'
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      onLogin(userProfile);
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const userProfile = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName || email.split('@')[0],
        authProvider: 'email'
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      onLogin(userProfile);
      navigate('/home');
    } catch (error) {
      console.error('Error registering:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres');
      } else {
        setError('Error al crear la cuenta');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = (e) => {
    e.preventDefault();
    if (guestName && guestName.trim()) {
      const userProfile = {
        uid: 'guest_' + Date.now(),
        displayName: guestName.trim(),
        userName: guestName.trim(),
        authProvider: 'guest'
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      onLogin(userProfile);
      navigate('/home');
    } else {
      setError('Por favor ingresa tu nombre');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mb-4">
            <Sparkles className="w-10 h-10 text-brand-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Squad Vote</h1>
          <p className="text-brand-100">Feedback anónimo con tu equipo</p>
        </div>

        {/* Main Card */}
        <div className="card shadow-2xl">
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-neutral-200 rounded-xl font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-brand-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <Chrome className="w-5 h-5" />
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-500">o</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-brand-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                mode === 'register'
                  ? 'bg-brand-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Registrarse
            </button>
            <button
              onClick={() => {
                setMode('guest');
                setError('');
              }}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                mode === 'guest'
                  ? 'bg-brand-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Invitado
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-error-light border-2 border-error rounded-lg text-error-dark text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-11"
                    placeholder="tu@email.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <LogIn className="w-5 h-5" />
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input-field pl-11"
                    placeholder="Tu nombre"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-11"
                    placeholder="tu@email.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="Mínimo 6 caracteres"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <UserPlus className="w-5 h-5" />
                {loading ? 'Creando...' : 'Crear Cuenta'}
              </button>
            </form>
          )}

          {/* Guest Mode Form */}
          {mode === 'guest' && (
            <form onSubmit={handleGuestMode} className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">👋</div>
                <p className="text-sm text-neutral-600">
                  Ingresa como invitado sin necesidad de cuenta
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  ¿Cómo te llamas?
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="input-field pl-11"
                    placeholder="Tu nombre"
                    required
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              <div className="p-3 bg-warning-light border-2 border-warning rounded-lg text-sm text-warning-dark">
                <strong>⚠️ Nota:</strong> Tu progreso se guardará localmente pero no sincronizará entre dispositivos.
              </div>

              <button
                type="submit"
                disabled={loading || !guestName.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" />
                Continuar como Invitado
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6 text-brand-100 text-sm">
          Al continuar, aceptas nuestros términos y condiciones
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
