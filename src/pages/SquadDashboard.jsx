import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Vote, Trophy, Copy, Check, Sparkles, TrendingUp, Target, Zap, Search, BarChart3 } from 'lucide-react';
import Header from '../components/Header';
import SquadLeaderboard from '../components/SquadLeaderboard';
import BottomNav from '../components/BottomNav';
import { calculateSquadStats } from '../utils/karmaSystem';

const SquadDashboard = ({ squad, currentUser, userProfile, onLogout }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'members', 'leaderboard'
  const [searchQuery, setSearchQuery] = useState('');

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

  // Calculate squad stats for leaderboard
  const squadStats = calculateSquadStats(squad.votes, squad.members);

  // Filtrar miembros por búsqueda
  const filteredMembers = squad.members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(squad.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Target },
    { id: 'members', label: 'Miembros', icon: Users },
    { id: 'leaderboard', label: 'Ranking', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
      <Header userName={currentUser.userName} userProfile={userProfile} onLogout={onLogout} />
      
      <div className="p-4 sm:p-6 max-w-4xl mx-auto pb-24 md:pb-6">
        {/* Header Card con diseño mejorado */}
        <div className="card mb-6 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white border-none overflow-hidden relative">
          {/* Decoraciones de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-semibold uppercase tracking-wide opacity-90">Tu Squad Activo</span>
              </div>
              <div className="text-6xl mb-3">🦁</div>
              <h1 className="text-3xl font-bold mb-3">{squad.name}</h1>
              
              <div className="flex items-center justify-center gap-2">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-mono text-lg font-bold">
                  {squad.id}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-110"
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
        </div>

        {/* Tabs Navigation */}
        <div className="card mb-6 p-2">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md'
                      : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content: Resumen */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="card bg-gradient-to-br from-blue-400 to-indigo-500 text-white border-none hover:scale-105 transition-transform">
                <div className="text-center">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
                  <div className="text-3xl sm:text-4xl font-bold">{squad.members.length}</div>
                  <div className="text-xs sm:text-sm opacity-90">Miembros</div>
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-green-400 to-emerald-500 text-white border-none hover:scale-105 transition-transform">
                <div className="text-center">
                  <Vote className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
                  <div className="text-3xl sm:text-4xl font-bold">{squad.votes.length}</div>
                  <div className="text-xs sm:text-sm opacity-90">Votos</div>
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-amber-400 to-orange-500 text-white border-none hover:scale-105 transition-transform col-span-2 sm:col-span-1">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
                  <div className="text-3xl sm:text-4xl font-bold">{Math.round((squad.votes.length / squad.members.length) * 100)}%</div>
                  <div className="text-xs sm:text-sm opacity-90">Progreso</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!userVote ? (
                <div>
                  <button
                    onClick={() => navigate('/vote')}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-xl hover:shadow-2xl"
                  >
                    <Zap className="w-6 h-6" />
                    Votar Ahora
                  </button>
                  <p className="text-center text-sm text-neutral-500 mt-2">
                    Reconoce hasta 3 miembros de tu equipo
                  </p>
                </div>
              ) : (
                <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <p className="font-bold text-green-700 text-lg mb-1">
                    ¡Excelente trabajo!
                  </p>
                  <p className="text-sm text-green-600">
                    Ya has votado • Espera a que todos completen
                  </p>
                </div>
              )}

              {votingComplete && (
                <button
                  onClick={() => navigate('/results')}
                  className="btn-primary w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-lg py-4 shadow-xl"
                >
                  <Trophy className="w-6 h-6" />
                  Ver Resultados Finales
                </button>
              )}

              {!votingComplete && squad.members.length > 1 && (
                <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">⏳</div>
                    <div className="flex-1">
                      <p className="font-semibold text-amber-900 mb-1">
                        Progreso de votación
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                            style={{ width: `${(squad.votes.length / squad.members.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-amber-700">
                          {squad.votes.length}/{squad.members.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Preview de Top 3 */}
            {squad.votes.length > 0 && (
              <div className="card bg-gradient-to-br from-brand-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-neutral-800">Top 3 del Squad</h3>
                  <button
                    onClick={() => setActiveTab('leaderboard')}
                    className="text-sm text-brand-600 font-semibold hover:underline"
                  >
                    Ver completo →
                  </button>
                </div>
                <div className="space-y-2">
                  {squadStats.slice(0, 3).map((member, index) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                      <div className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-800">{member.name}</div>
                        <div className="text-xs text-neutral-500">{member.karmaPoints} pts karma</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Miembros */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar miembro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Members List con scroll */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-neutral-800">Miembros del Squad</h2>
                    <p className="text-xs text-neutral-500">
                      {filteredMembers.length} de {squad.members.length} personas
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contenedor con scroll fijo */}
              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => {
                    const hasVoted = squad.votes.some(v => v.voterId === member.id);
                    const isCurrentUser = member.id === currentUser.userId;
                    
                    return (
                      <div
                        key={member.id}
                        className={`relative overflow-hidden rounded-2xl p-4 transition-all hover:shadow-lg ${
                          isCurrentUser
                            ? 'bg-gradient-to-br from-brand-100 to-brand-200 border-2 border-brand-400'
                            : 'bg-gradient-to-br from-neutral-50 to-white border-2 border-transparent hover:border-brand-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            {hasVoted && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-neutral-800 truncate flex items-center gap-2">
                              {member.name}
                              {isCurrentUser && (
                                <span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded-full">Tú</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                              {member.isCreator && (
                                <span className="flex items-center gap-1">
                                  <Trophy className="w-3 h-3" />
                                  Creador
                                </span>
                              )}
                              {hasVoted && (
                                <span className="text-green-600 font-medium">✓ Votó</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    <Users className="w-12 h-12 mx-auto mb-2 text-neutral-300" />
                    <p>No se encontraron miembros</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div>
            {squad.votes.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto">
                <SquadLeaderboard squadStats={squadStats} currentUserId={currentUser.userId} />
              </div>
            ) : (
              <div className="card text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  Aún no hay ranking
                </h3>
                <p className="text-neutral-600">
                  El leaderboard aparecerá cuando los miembros empiecen a votar
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default SquadDashboard;
