import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animals, qualities } from '../data/content';
import { ChevronLeft, Check } from 'lucide-react';
import Header from '../components/Header';

const VotingScreen = ({ squad, currentUser, userProfile, onSubmitVote, onLogout }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [reason, setReason] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!squad) return null;

  const availableMembers = squad.members.filter(
    m => m.id !== currentUser.userId
  );

  const handleSubmit = () => {
    const vote = {
      voterId: currentUser.userId,
      voterName: currentUser.userName,
      selectedMemberId: selectedMember.id,
      selectedMemberName: selectedMember.name,
      animal: selectedAnimal,
      quality: selectedQuality,
      reason: reason,
      timestamp: Date.now()
    };

    onSubmitVote(squad.id, vote);
    setShowConfirmation(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            ¡Voto Registrado!
          </h2>
          <p className="text-neutral-600">
            Gracias por reconocer a tu compañero
          </p>
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

      {/* Step 1: Select Member */}
      {step === 1 && (
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">👥</div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              ¿A quién reconoces?
            </h2>
            <p className="text-neutral-600">
              Selecciona un miembro de tu equipo
            </p>
          </div>

          <div className="space-y-3">
            {availableMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedMember(member);
                  setStep(2);
                }}
                className={`card w-full hover:shadow-xl transition-all hover:scale-105 cursor-pointer ${
                  selectedMember?.id === member.id
                    ? 'border-purple-500 bg-purple-50'
                    : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-neutral-800">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Animal */}
      {step === 2 && (
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🦁</div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              ¿Qué animal representa a {selectedMember?.name}?
            </h2>
            <p className="text-neutral-600">
              Elige el que mejor lo/la describe
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pb-4">
            {animals.map((animal) => (
              <button
                key={animal.id}
                onClick={() => {
                  setSelectedAnimal(animal);
                  setStep(3);
                }}
                className={`card hover:shadow-xl transition-all hover:scale-105 cursor-pointer ${
                  selectedAnimal?.id === animal.id
                    ? 'border-purple-500 bg-purple-50'
                    : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{animal.emoji}</div>
                  <h3 className="font-bold text-neutral-800 text-sm mb-1">
                    {animal.name}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {animal.description}
                  </p>
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
              ¿Qué cualidad destaca en {selectedMember?.name}?
            </h2>
            <p className="text-neutral-600">
              Selecciona su mejor característica
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
                className={`card w-full hover:shadow-xl transition-all hover:scale-105 cursor-pointer text-left ${
                  selectedQuality?.id === quality.id
                    ? 'border-purple-500 bg-purple-50'
                    : ''
                }`}
              >
                <h3 className="font-bold text-neutral-800 mb-1">
                  {quality.name}
                </h3>
                <p className="text-sm text-neutral-600">
                  {quality.description}
                </p>
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
              ¿Por qué elegiste a {selectedMember?.name}?
            </h2>
            <p className="text-neutral-600">
              Comparte tu razón (opcional)
            </p>
          </div>

          {/* Summary Card */}
          <div className="card bg-gradient-to-br from-brand-50 to-brand-100 mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{selectedAnimal?.emoji}</div>
              <h3 className="font-bold text-neutral-800 text-lg">
                {selectedMember?.name}
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
            Confirmar Voto
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default VotingScreen;
