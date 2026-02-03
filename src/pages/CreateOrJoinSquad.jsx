import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogIn, Sparkles } from 'lucide-react';

const CreateOrJoinSquad = ({ onCreateSquad, onJoinSquad }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // 'create' or 'join'
  const [squadName, setSquadName] = useState('');
  const [userName, setUserName] = useState('');
  const [squadCode, setSquadCode] = useState('');
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleCreateSquad = (e) => {
    e.preventDefault();
    setError('');
    
    if (!squadName.trim() || !userName.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    const code = onCreateSquad(squadName, userName);
    setGeneratedCode(code);
  };

  const handleJoinSquad = (e) => {
    e.preventDefault();
    setError('');
    
    if (!squadCode.trim() || !userName.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    const success = onJoinSquad(squadCode.toUpperCase(), userName);
    
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Squad Creado!
          </h2>
          <p className="text-gray-600 mb-6">
            Comparte este código con tu equipo:
          </p>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 mb-6">
            <div className="text-4xl font-bold text-gray-800 tracking-wider">
              {generatedCode}
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🦁</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Squad Vote
            </h1>
            <p className="text-gray-600">
              ¿Qué deseas hacer?
            </p>
          </div>

          <button
            onClick={() => setMode('create')}
            className="card w-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Crear Squad
                </h3>
                <p className="text-gray-600 text-sm">
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Unirse a Squad
                </h3>
                <p className="text-gray-600 text-sm">
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card max-w-md w-full">
        <button
          onClick={() => setMode(null)}
          className="text-gray-600 mb-6 hover:text-gray-800 transition-colors"
        >
          ← Volver
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {mode === 'create' ? 'Crear Nuevo Squad' : 'Unirse a Squad'}
          </h2>
          <p className="text-gray-600 text-sm">
            {mode === 'create' 
              ? 'Ingresa los detalles de tu equipo' 
              : 'Ingresa el código que te compartieron'}
          </p>
        </div>

        <form onSubmit={mode === 'create' ? handleCreateSquad : handleJoinSquad}>
          {mode === 'create' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
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
              <label className="block text-gray-700 font-semibold mb-2">
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
            <label className="block text-gray-700 font-semibold mb-2">
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
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-300 rounded-2xl text-red-700 text-sm">
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
