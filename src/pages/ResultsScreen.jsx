import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Heart, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

const ResultsScreen = ({ squad, currentUser, userProfile, onLogout }) => {
  const navigate = useNavigate();

  if (!squad) return null;

  // Organizar resultados por miembro
  const memberResults = squad.members.map(member => {
    const votesReceived = squad.votes.filter(v => v.selectedMemberId === member.id);
    
    return {
      member,
      votesReceived,
      totalVotes: votesReceived.length
    };
  }).sort((a, b) => b.totalVotes - a.totalVotes);

  const currentUserResult = memberResults.find(r => r.member.id === currentUser.userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100 pb-24">
      <Header userName={currentUser.userName} userProfile={userProfile} onLogout={onLogout} />
      
      <div className="p-6 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-neutral-600" />
        </button>
        
        <h1 className="text-2xl font-bold text-neutral-800">Resultados</h1>
        
        <div className="w-10" />
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">
          ¡Votación Completa!
        </h2>
        <p className="text-neutral-600">
          Así ve tu equipo a cada miembro
        </p>
      </div>

      {/* Current User Highlight */}
      {currentUserResult && currentUserResult.votesReceived.length > 0 && (
        <div className="card bg-gradient-to-br from-brand-500 to-brand-700 text-white border-none mb-6">
          <div className="text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-3">Tu Reconocimiento</h3>
            
            {currentUserResult.votesReceived.map((vote, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-3 last:mb-0">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="text-4xl">{vote.animal.emoji}</div>
                  <div>
                    <div className="font-bold text-lg">{vote.animal.name}</div>
                    <div className="text-sm opacity-90">{vote.quality.name}</div>
                  </div>
                </div>
                {vote.reason && (
                  <p className="text-sm italic opacity-90 mt-2">
                    "{vote.reason}"
                  </p>
                )}
                <p className="text-xs opacity-75 mt-2">
                  - {vote.voterName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Results */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Todos los Reconocimientos
        </h3>

        {memberResults.map((result, index) => (
          <div key={result.member.id} className="card">
            <div className="flex items-start gap-4">
              {/* Member Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                  {result.member.name.charAt(0).toUpperCase()}
                </div>
                {index < 3 && result.totalVotes > 0 && (
                  <div className="text-center mt-1">
                    {index === 0 && <div className="text-2xl">🥇</div>}
                    {index === 1 && <div className="text-2xl">🥈</div>}
                    {index === 2 && <div className="text-2xl">🥉</div>}
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="flex-1">
                <h4 className="font-bold text-neutral-800 text-lg mb-1">
                  {result.member.name}
                  {result.member.id === currentUser.userId && (
                    <span className="text-xs text-purple-500 ml-2">(Tú)</span>
                  )}
                </h4>
                
                {result.votesReceived.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic">
                    No recibió votos
                  </p>
                ) : (
                  <div className="space-y-2">
                    {result.votesReceived.map((vote, vIndex) => (
                      <div key={vIndex} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{vote.animal.emoji}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-neutral-800">
                              {vote.animal.name}
                            </div>
                            <div className="text-xs text-neutral-600">
                              {vote.quality.name}
                            </div>
                          </div>
                        </div>
                        {vote.reason && (
                          <p className="text-xs text-neutral-600 italic mt-2">
                            "{vote.reason}"
                          </p>
                        )}
                        <p className="text-xs text-neutral-500 mt-1">
                          Por {vote.voterName}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-secondary w-full"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
    </div>
  );
};

export default ResultsScreen;
