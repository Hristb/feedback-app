import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Vote, Trophy, Copy, Check } from 'lucide-react';
import Header from '../components/Header';

const SquadDashboard = ({ squad, currentUser, userProfile, onLogout }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  if (!squad) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-neutral-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const userVote = squad.votes.find(v => v.voterId === currentUser.userId);
  const votingComplete = squad.members.length > 1 && 
                        squad.votes.length === squad.members.length;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(squad.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
      <Header userName={currentUser.userName} userProfile={userProfile} onLogout={onLogout} />
      
      <div className="p-6 max-w-md mx-auto">
        {/* Header */}
        <div className="card mb-6 bg-gradient-to-br from-brand-500 to-brand-700 text-white border-none">
        <div className="text-center">
          <div className="text-5xl mb-3">🦁</div>
          <h1 className="text-2xl font-bold mb-2">{squad.name}</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-mono text-lg font-bold">
              {squad.id}
            </div>
            <button
              onClick={handleCopyCode}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-info to-brand-500 text-white border-none">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{squad.members.length}</div>
              <div className="text-sm opacity-90">Miembros</div>
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-green-400 to-emerald-500 text-white border-none">
          <div className="flex items-center gap-3">
            <Vote className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{squad.votes.length}</div>
              <div className="text-sm opacity-90">Votos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-bold text-neutral-800">Miembros del Squad</h2>
        </div>
        
        <div className="space-y-2">
          {squad.members.map((member, index) => {
            const hasVoted = squad.votes.some(v => v.voterId === member.id);
            
            return (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-brand-500 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800">
                      {member.name}
                      {member.id === currentUser.userId && (
                        <span className="text-xs text-purple-500 ml-2">(Tú)</span>
                      )}
                    </div>
                    {member.isCreator && (
                      <div className="text-xs text-neutral-500">Creador</div>
                    )}
                  </div>
                </div>
                
                {hasVoted && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {!userVote ? (
          <button
            onClick={() => navigate('/vote')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Vote className="w-5 h-5" />
            Votar Ahora
          </button>
        ) : (
          <div className="card bg-green-50 border-green-300 text-center">
            <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="font-semibold text-green-700">
              ¡Ya has votado!
            </p>
            <p className="text-sm text-green-600 mt-1">
              Espera a que todos completen su voto
            </p>
          </div>
        )}

        {votingComplete && (
          <button
            onClick={() => navigate('/results')}
            className="btn-primary w-full flex items-center justify-center gap-2 bg-gradient-to-r from-success to-success-dark"
          >
            <Trophy className="w-5 h-5" />
            Ver Resultados
          </button>
        )}

        {!votingComplete && (
          <div className="card bg-warning-light border-warning text-center">
            <div className="text-2xl mb-2">⏳</div>
            <p className="text-sm text-warning-dark">
              {squad.votes.length} de {squad.members.length} votos completados
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default SquadDashboard;
