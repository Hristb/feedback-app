// 🎮 Sistema de Puntos Karma - Kudos
// Gestión completa de puntos, niveles y badges

export const KARMA_ACTIONS = {
  GIVE_RECOGNITION: { points: 10, name: 'Dar reconocimiento' },
  RECEIVE_RECOGNITION: { points: 15, name: 'Recibir reconocimiento' },
  MOST_VOTED: { points: 50, name: 'Más votado del squad' },
  EARLY_BIRD: { points: 5, name: 'Participar en primeras 24h' },
  DETAILED_REASON: { points: 3, name: 'Razón detallada (+50 chars)' },
  STREAK_BONUS: { points: 5, name: 'Racha semanal', maxBonus: 25 },
  NO_PARTICIPATION: { points: -20, name: 'No participar' },
  ABANDON_SQUAD: { points: -50, name: 'Abandonar squad' }
};

export const LEVELS = [
  {
    id: 'bronze',
    name: 'Bronce',
    emoji: '🥉',
    minPoints: 0,
    maxPoints: 99,
    title: 'Novato',
    badge: 'Primer Paso',
    color: 'from-amber-600 to-amber-700',
    unlocks: ['Perfil básico']
  },
  {
    id: 'silver',
    name: 'Plata',
    emoji: '🥈',
    minPoints: 100,
    maxPoints: 499,
    title: 'Colaborador',
    badge: 'Compañero Confiable',
    color: 'from-slate-400 to-slate-500',
    unlocks: ['Estadísticas básicas', 'Ver leaderboard']
  },
  {
    id: 'gold',
    name: 'Oro',
    emoji: '🥇',
    minPoints: 500,
    maxPoints: 1499,
    title: 'Líder de Reconocimiento',
    badge: 'Construye Equipo',
    color: 'from-yellow-400 to-yellow-600',
    unlocks: ['Dashboard avanzado', 'Estadísticas detalladas', 'Comparativas']
  },
  {
    id: 'platinum',
    name: 'Platino',
    emoji: '💎',
    minPoints: 1500,
    maxPoints: Infinity,
    title: 'Leyenda',
    badge: 'Maestro del Reconocimiento',
    color: 'from-cyan-400 to-blue-500',
    unlocks: ['Insignia especial', 'Dashboard de líder', 'Perfil destacado']
  }
];

export const ACHIEVEMENTS = [
  // Básicos
  { id: 'first_time', name: 'Primera Vez', emoji: '🌟', description: 'Dar primer reconocimiento', requirement: 1, type: 'give' },
  { id: 'popular', name: 'Popular', emoji: '🎭', description: 'Recibir 10 reconocimientos', requirement: 10, type: 'receive' },
  { id: 'generous', name: 'Generoso', emoji: '🎁', description: 'Dar 20 reconocimientos', requirement: 20, type: 'give' },
  
  // Avanzados
  { id: 'deep_empathy', name: 'Empatía Profunda', emoji: '💙', description: 'Escribir 50 razones >100 caracteres', requirement: 50, type: 'detailed' },
  { id: 'collector', name: 'Coleccionista', emoji: '🦁', description: 'Recibir todos los animales', requirement: 21, type: 'animals' },
  { id: 'mentor', name: 'Mentor', emoji: '👨‍🏫', description: 'Ser más votado 5 veces', requirement: 5, type: 'most_voted' },
  
  // Épicos
  { id: 'legend', name: 'Leyenda Viva', emoji: '🏆', description: '100 días de racha', requirement: 100, type: 'streak' },
  { id: 'architect', name: 'Arquitecto de Equipo', emoji: '🏗️', description: 'Crear 10 squads exitosos', requirement: 10, type: 'creator' },
  { id: 'unicorn', name: 'Unicornio', emoji: '🦄', description: 'Recibir el mismo animal 10 veces', requirement: 10, type: 'same_animal' }
];

// Calcular nivel actual basado en puntos
export const calculateLevel = (points) => {
  return LEVELS.find(level => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0];
};

// Calcular progreso al siguiente nivel
export const calculateProgress = (points) => {
  const currentLevel = calculateLevel(points);
  const nextLevel = LEVELS[LEVELS.findIndex(l => l.id === currentLevel.id) + 1];
  
  if (!nextLevel) {
    return { percent: 100, pointsToNext: 0, nextLevel: null };
  }
  
  const pointsInCurrentLevel = points - currentLevel.minPoints;
  const pointsNeededForNext = nextLevel.minPoints - currentLevel.minPoints;
  const percent = Math.round((pointsInCurrentLevel / pointsNeededForNext) * 100);
  const pointsToNext = nextLevel.minPoints - points;
  
  return { percent, pointsToNext, nextLevel };
};

// Calcular puntos por acción
export const calculateKarmaPoints = (action, metadata = {}) => {
  let points = 0;
  
  switch(action) {
    case 'GIVE_RECOGNITION':
      points += KARMA_ACTIONS.GIVE_RECOGNITION.points;
      
      // Bonus por razón detallada
      if (metadata.reasonLength >= 50) {
        points += KARMA_ACTIONS.DETAILED_REASON.points;
      }
      
      // Bonus por velocidad (early bird)
      if (metadata.isEarlyBird) {
        points += KARMA_ACTIONS.EARLY_BIRD.points;
      }
      break;
      
    case 'RECEIVE_RECOGNITION':
      points += KARMA_ACTIONS.RECEIVE_RECOGNITION.points;
      break;
      
    case 'MOST_VOTED':
      points += KARMA_ACTIONS.MOST_VOTED.points;
      break;
      
    case 'STREAK_BONUS':
      const streakWeeks = metadata.streakWeeks || 0;
      const bonus = Math.min(streakWeeks * KARMA_ACTIONS.STREAK_BONUS.points, KARMA_ACTIONS.STREAK_BONUS.maxBonus);
      points += bonus;
      break;
      
    case 'NO_PARTICIPATION':
      points += KARMA_ACTIONS.NO_PARTICIPATION.points;
      break;
      
    case 'ABANDON_SQUAD':
      points += KARMA_ACTIONS.ABANDON_SQUAD.points;
      break;
  }
  
  return points;
};

// Verificar achievements desbloqueados
export const checkAchievements = (userStats) => {
  const unlockedAchievements = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    let isUnlocked = false;
    
    switch(achievement.type) {
      case 'give':
        isUnlocked = userStats.recognitionsGiven >= achievement.requirement;
        break;
      case 'receive':
        isUnlocked = userStats.recognitionsReceived >= achievement.requirement;
        break;
      case 'detailed':
        isUnlocked = userStats.detailedReasons >= achievement.requirement;
        break;
      case 'animals':
        isUnlocked = userStats.uniqueAnimalsReceived >= achievement.requirement;
        break;
      case 'most_voted':
        isUnlocked = userStats.timesMostVoted >= achievement.requirement;
        break;
      case 'streak':
        isUnlocked = userStats.longestStreak >= achievement.requirement;
        break;
      case 'creator':
        isUnlocked = userStats.squadsCreated >= achievement.requirement;
        break;
      case 'same_animal':
        isUnlocked = userStats.mostCommonAnimalCount >= achievement.requirement;
        break;
    }
    
    if (isUnlocked && !userStats.unlockedAchievements?.includes(achievement.id)) {
      unlockedAchievements.push(achievement);
    }
  });
  
  return unlockedAchievements;
};

// Calcular stats del squad para leaderboard
export const calculateSquadStats = (votes, members) => {
  const memberStats = {};
  
  // Inicializar stats para cada miembro
  members.forEach(member => {
    memberStats[member.id] = {
      id: member.id,
      name: member.name,
      recognitionsGiven: 0,
      recognitionsReceived: 0,
      karmaPoints: 0
    };
  });
  
  // Contar votos dados y recibidos
  votes.forEach(vote => {
    // Quien votó
    if (memberStats[vote.voterId]) {
      memberStats[vote.voterId].recognitionsGiven++;
      memberStats[vote.voterId].karmaPoints += calculateKarmaPoints('GIVE_RECOGNITION', {
        reasonLength: vote.reason?.length || 0
      });
    }
    
    // Quien recibió
    if (memberStats[vote.selectedMemberId]) {
      memberStats[vote.selectedMemberId].recognitionsReceived++;
      memberStats[vote.selectedMemberId].karmaPoints += calculateKarmaPoints('RECEIVE_RECOGNITION');
    }
  });
  
  // Encontrar el más votado
  const mostVoted = Object.values(memberStats).reduce((max, member) => 
    member.recognitionsReceived > max.recognitionsReceived ? member : max
  );
  
  if (mostVoted && mostVoted.recognitionsReceived > 0) {
    memberStats[mostVoted.id].karmaPoints += calculateKarmaPoints('MOST_VOTED');
    memberStats[mostVoted.id].isMostVoted = true;
  }
  
  // Ordenar por karma points
  return Object.values(memberStats).sort((a, b) => b.karmaPoints - a.karmaPoints);
};

export default {
  KARMA_ACTIONS,
  LEVELS,
  ACHIEVEMENTS,
  calculateLevel,
  calculateProgress,
  calculateKarmaPoints,
  checkAchievements,
  calculateSquadStats
};
