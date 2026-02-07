import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animals, qualities } from '../data/content';
import { ChevronLeft, Check, Trophy, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import { calculateKarmaPoints } from '../utils/karmaSystem';
import BottomNav from '../components/BottomNav';

const VotingScreen = ({ squad, currentUser, userProfile, onSubmitVote, onLogout }) => {
  const navigate = useNavigate();
  const MAX_VOTES = 3;
  const [step, setStep] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState([]); // Array para hasta 3 miembros
  const [currentVoteIndex, setCurrentVoteIndex] = useState(0);
  const [votes, setVotes] = useState([]); // Array de votos completos
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [reason, setReason] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hoveredAnimal, setHoveredAnimal] = useState(null);
  const [karmaEarned, setKarmaEarned] = useState(0);

  if (!squad) return null;

  const availableMembers = squad.members.filter(
    m => m.id !== currentUser.userId
  );

  const handleSubmit = () => {
    // Crear el voto actual
    const currentVote = {
      memberId: selectedMembers[currentVoteIndex].id,
      memberName: selectedMembers[currentVoteIndex].name,
      animal: selectedAnimal,
      quality: selectedQuality,
      reason: reason
    };
    
    const allVotes = [...votes, currentVote];
    
    // Si hay más miembros por votar, ir al siguiente
    if (currentVoteIndex < selectedMembers.length - 1) {
      setVotes(allVotes);
      setCurrentVoteIndex(currentVoteIndex + 1);
      setSelectedAnimal(null);
      setSelectedQuality(null);
      setReason('');
      setStep(2); // Volver a seleccionar animal para el siguiente miembro
      return;
    }
    
    // Si ya votamos por todos, calcular karma y enviar
    const metadata = {
      reasonLength: reason.length,
      isEarlyBird: false,
      hasDetailedReason: reason.length >= 50,
      multipleRecognitions: allVotes.length // Bonus por votar a varios
    };
    
    const pointsEarned = calculateKarmaPoints('GIVE_RECOGNITION', metadata) * allVotes.length;
    setKarmaEarned(pointsEarned);
    
    // Enviar todos los votos
    allVotes.forEach(vote => {
      const fullVote = {
        voterId: currentUser.userId,
        voterName: currentUser.userName,
        selectedMemberId: vote.memberId,
        selectedMemberName: vote.memberName,
        animal: vote.animal,
        quality: vote.quality,
        reason: vote.reason,
        timestamp: Date.now(),
        karmaEarned: pointsEarned / allVotes.length
      };
      onSubmitVote(squad.id, fullVote);
    });
    
    setShowConfirmation(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            ¡Voto Registrado!
          </h2>
          
          {/* Karma Points Earned */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl border-2 border-amber-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-amber-600" />
              <span className="text-lg font-bold text-amber-900">¡Karma Ganado!</span>
            </div>
            <div className="text-4xl font-bold text-amber-700">+{karmaEarned}</div>
            <p className="text-sm text-amber-800 mt-1">puntos de karma</p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 text-sm text-neutral-600">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Sigue reconociendo a tu equipo para ganar más</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100 pb-24">
      <Header userName={currentUser.userName} userProfile={userProfile} onLogout={onLogout} />
      
      <div className="p-6 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/dashboard')}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-neutral-600" />
        </button>
        
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-12 rounded-full transition-all ${
                s <= step
                  ? 'bg-gradient-to-r from-brand-500 to-brand-700'
                  : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
        
        <div className="w-10" />
      </div>

      {/* Step 1: Select Members (hasta 3) */}
      {step === 1 && (
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">👥</div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              ¿A quién reconoces?
            </h2>
            <p className="text-neutral-600">
              Selecciona hasta {MAX_VOTES} miembros de tu equipo
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              {[...Array(MAX_VOTES)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i < selectedMembers.length
                      ? 'bg-brand-500 scale-125'
                      : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {availableMembers.map((member) => {
              const isSelected = selectedMembers.some(m => m.id === member.id);
              const selectionNumber = selectedMembers.findIndex(m => m.id === member.id) + 1;
              
              return (
                <button
                  key={member.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
                    } else if (selectedMembers.length < MAX_VOTES) {
                      setSelectedMembers([...selectedMembers, member]);
                    }
                  }}
                  className={`card w-full hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer relative ${
                    isSelected
                      ? 'border-2 border-brand-500 bg-brand-50 shadow-lg'
                      : 'border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold relative">
                      {member.name.charAt(0).toUpperCase()}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                          {selectionNumber}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-neutral-800">
                        {member.name}
                      </h3>
                    </div>
                    {isSelected && (
                      <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {selectedMembers.length > 0 && (
            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              Continuar con {selectedMembers.length} {selectedMembers.length === 1 ? 'persona' : 'personas'}
              <Check className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Step 2: Select Animal */}
      {step === 2 && (
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🦁</div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              ¿Qué animal representa a {selectedMembers[currentVoteIndex]?.name}?
            </h2>
            <p className="text-neutral-600">
              Votando {currentVoteIndex + 1} de {selectedMembers.length}
            </p>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pb-4">
            {animals.map((animal) => (
              <button
                key={animal.id}
                onClick={() => {
                  setSelectedAnimal(animal);
                  setStep(3);
                }}
                className={`card w-full hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer text-left group ${
                  selectedAnimal?.id === animal.id
                    ? 'border-2 border-brand-500 bg-brand-50 shadow-xl scale-[1.02]'
                    : 'border-2 border-transparent'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl shrink-0 group-hover:scale-110 transition-transform">
                    {animal.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-800 text-lg mb-2">
                      {animal.name}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {animal.description}
                    </p>
                  </div>
                  {selectedAnimal?.id === animal.id && (
                    <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shrink-0 animate-scale-in">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Select Quality */}
      {step === 3 && (
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">⭐</div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              ¿Qué cualidad destaca en {selectedMembers[currentVoteIndex]?.name}?
            </h2>
            <p className="text-neutral-600">
              Votando {currentVoteIndex + 1} de {selectedMembers.length}
            </p>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pb-4">
            {qualities.map((quality) => (
              <button
                key={quality.id}
                onClick={() => {
                  setSelectedQuality(quality);
                  setStep(4);
                }}
                className={`relative overflow-hidden card w-full transition-all duration-300 cursor-pointer text-left group ${
                  selectedQuality?.id === quality.id
                    ? 'border-2 border-white shadow-2xl scale-105'
                    : 'hover:shadow-xl hover:scale-105 border-2 border-transparent'
                }`}
              >
                {/* Gradiente de fondo */}
                <div className={`absolute inset-0 bg-gradient-to-r ${quality.gradient} group-hover:brightness-105 transition-all`}></div>
                
                {/* Pattern decorativo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full -ml-8 -mb-8"></div>
                </div>

                {/* Contenido */}
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1 text-neutral-800 group-hover:scale-105 transition-transform">
                    {quality.name}
                  </h3>
                  <p className="text-sm text-neutral-700">
                    {quality.description}
                  </p>
                </div>

                {/* Icono de check si está seleccionado */}
                {selectedQuality?.id === quality.id && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center z-20 animate-scale-in shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Write Reason */}
      {step === 4 && (
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">💭</div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              ¿Por qué elegiste a {selectedMembers[currentVoteIndex]?.name}?
            </h2>
            <p className="text-neutral-600">
              Votando {currentVoteIndex + 1} de {selectedMembers.length} • Opcional
            </p>
          </div>

          {/* Summary Card */}
          <div className="card bg-gradient-to-br from-brand-50 to-brand-100 mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{selectedAnimal?.emoji}</div>
              <h3 className="font-bold text-neutral-800 text-lg">
                {selectedMembers[currentVoteIndex]?.name}
              </h3>
              <p className="text-sm text-neutral-600 mt-1">
                {selectedQuality?.name}
              </p>
            </div>
          </div>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Escribe por qué reconoces a esta persona..."
            className="input-field min-h-[120px] mb-6"
            rows={5}
          />

          <button
            onClick={handleSubmit}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            {currentVoteIndex < selectedMembers.length - 1 
              ? `Siguiente (${currentVoteIndex + 2}/${selectedMembers.length})`
              : 'Confirmar Todos los Votos'
            }
          </button>
        </div>
      )}
    </div>
    <BottomNav />
    </div>
  );
};

export default VotingScreen;
