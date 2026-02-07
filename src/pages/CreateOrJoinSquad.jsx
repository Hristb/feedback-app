import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Users, LogIn, Sparkles, ArrowLeft } from 'lucide-react';

const CreateOrJoinSquad = ({ onCreateSquad, onJoinSquad, userProfile }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(null); // 'create' or 'join'
  const [squadName, setSquadName] = useState('');
  const [userName, setUserName] = useState(userProfile?.displayName || '');
  const [squadCode, setSquadCode] = useState('');
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Leer mode de URL params y setear automáticamente
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'create' || urlMode === 'join') {
      setMode(urlMode);
    }
  }, [searchParams]);

  const handleCreateSquad = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!squadName.trim() || !userName.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    const code = await onCreateSquad(squadName, userName);
    if (code) {
      setGeneratedCode(code);
    } else {
      setError('Error al crear el squad. Intenta nuevamente.');
    }
  };

  const handleJoinSquad = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!squadCode.trim() || !userName.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    const success = await onJoinSquad(squadCode.toUpperCase(), userName);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Código de squad no válido');
    }
  };

  if (generatedCode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            ¡Squad Creado!
          </h2>
          <p className="text-neutral-600 mb-6">
            Comparte este código con tu equipo:
          </p>
          <div className="bg-gradient-to-r from-accent to-accent-dark rounded-2xl p-6 mb-6">
            <div className="text-4xl font-bold text-neutral-800 tracking-wider">
              {generatedCode}
            </div>
          </div>
          <p className="text-sm text-neutral-500 mb-6">
            Los miembros pueden unirse usando este código
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary w-full"
          >
            Ir al Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!mode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
        {/* Botón de regresar */}
        <button
          onClick={() => navigate('/home')}
          className="absolute top-6 left-6 flex items-center gap-2 text-neutral-600 hover:text-brand-600 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </button>
        
        <div className="max-w-md w-full space-y-4">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🦁</div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              Squad Vote
            </h1>
            <p className="text-neutral-600">
              ¿Qué deseas hacer?
            </p>
          </div>

          <button
            onClick={() => setMode('create')}
            className="card w-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-neutral-800 mb-1">
                  Crear Squad
                </h3>
                <p className="text-neutral-600 text-sm">
                  Inicia un nuevo equipo y obtén un código
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode('join')}
            className="card w-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-info to-brand-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-neutral-800 mb-1">
                  Unirse a Squad
                </h3>
                <p className="text-neutral-600 text-sm">
                  Únete con un código existente
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
      {/* Botón de regresar */}
      <button
        onClick={() => navigate('/home')}
        className="absolute top-6 left-6 flex items-center gap-2 text-neutral-600 hover:text-brand-600 transition-colors font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al inicio
      </button>
      
      <div className="card max-w-md w-full">
        <button
          onClick={() => setMode(null)}
          className="text-neutral-600 mb-6 hover:text-neutral-800 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            {mode === 'create' ? 'Crear Nuevo Squad' : 'Unirse a Squad'}
          </h2>
          <p className="text-neutral-600 text-sm">
            {mode === 'create' 
              ? 'Ingresa los detalles de tu equipo' 
              : 'Ingresa el código que te compartieron'}
          </p>
        </div>

        <form onSubmit={mode === 'create' ? handleCreateSquad : handleJoinSquad}>
          {mode === 'create' && (
            <div className="mb-4">
              <label className="block text-neutral-700 font-semibold mb-2">
                Nombre del Squad
              </label>
              <input
                type="text"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                placeholder="Ej: Los Increíbles"
                className="input-field"
              />
            </div>
          )}

          {mode === 'join' && (
            <div className="mb-4">
              <label className="block text-neutral-700 font-semibold mb-2">
                Código del Squad
              </label>
              <input
                type="text"
                value={squadCode}
                onChange={(e) => setSquadCode(e.target.value.toUpperCase())}
                placeholder="Ej: ABC123"
                className="input-field text-center text-xl tracking-wider"
                maxLength={6}
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-neutral-700 font-semibold mb-2">
              Tu Nombre
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ej: María"
              className="input-field"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-light border-2 border-error rounded-2xl text-error-dark text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            {mode === 'create' ? 'Crear Squad' : 'Unirse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrJoinSquad;
