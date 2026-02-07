import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import LandingPage from './pages/LandingPage';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import CreateOrJoinSquad from './pages/CreateOrJoinSquad';
import SquadDashboard from './pages/SquadDashboard';
import VotingScreen from './pages/VotingScreen';
import ResultsScreen from './pages/ResultsScreen';
import ProfileScreen from './pages/ProfileScreen';
import LeaderboardScreen from './pages/LeaderboardScreen';
import AchievementsScreen from './pages/AchievementsScreen';

function App() {
  const [squads, setSquads] = useState({});
  
  // Perfil de usuario PERSISTENTE (no se pierde)
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Squad actual TEMPORAL (se puede salir)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [hasVisited, setHasVisited] = useState(() => {
    return localStorage.getItem('hasVisited') === 'true';
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    setLoading(false);
  }, []);

  // Sync current squad from Firestore in real-time
  useEffect(() => {
    if (!currentUser?.squadCode) {
      setLoading(false);
      return;
    }

    const squadRef = doc(db, 'squads', currentUser.squadCode);
    const unsubscribe = onSnapshot(squadRef, (docSnap) => {
      if (docSnap.exists()) {
        setSquads({ [currentUser.squadCode]: docSnap.data() });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser?.squadCode]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleLogin = async (profile) => {
    // Si tiene uid, cargar karma points desde Firestore
    if (profile.uid && profile.authProvider !== 'guest') {
      try {
        const userRef = doc(db, 'users', profile.uid);
        const userSnap = await getDoc(userRef);
        
        profile.karmaPoints = userSnap.exists() ? (userSnap.data().karmaPoints || 0) : 0;
        profile.recognitionsGiven = userSnap.exists() ? (userSnap.data().recognitionsGiven || 0) : 0;
        profile.recognitionsReceived = userSnap.exists() ? (userSnap.data().recognitionsReceived || 0) : 0;
      } catch (error) {
        console.error('Error loading karma:', error);
        profile.karmaPoints = 0;
      }
    } else {
      profile.karmaPoints = 0;
    }
    
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    // Cargar historial desde Firebase si no es invitado
    if (profile.uid && profile.authProvider !== 'guest') {
      try {
        const userHistoryRef = doc(db, 'userHistory', profile.uid);
        const userHistorySnap = await getDoc(userHistoryRef);
        
        if (userHistorySnap.exists()) {
          const firebaseHistory = userHistorySnap.data().history || [];
          // Guardar en localStorage para acceso rápido
          const historyKey = `squadHistory_${profile.uid}`;
          localStorage.setItem(historyKey, JSON.stringify(firebaseHistory));
        }
      } catch (error) {
        console.error('Error loading history from Firebase:', error);
      }
    }
  };

  const handleCompleteLogout = () => {
    // Logout completo - borrar TODO
    setUserProfile(null);
    setCurrentUser(null);
    localStorage.removeItem('userProfile');
    localStorage.removeItem('currentUser');
    setSquads({});
  };

  const createSquad = async (squadName, userName) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const userId = Date.now();
    const displayName = userName || userProfile?.displayName || 'Usuario';
    
    const newSquad = {
      id: code,
      name: squadName,
      members: [{ 
        id: userId, 
        name: displayName, 
        isCreator: true,
        uid: userProfile?.uid // Guardar uid para karma points
      }],
      votes: []
    };
    
    try {
      await setDoc(doc(db, 'squads', code), newSquad);
      setSquads({ [code]: newSquad });
      setCurrentUser({ squadCode: code, userName: displayName, userId });
      
      // Guardar en historial (asociado al userProfile)
      saveToHistory(code, squadName, 'creator');
      
      // Marcar como visitado
      localStorage.setItem('hasVisited', 'true');
      setHasVisited(true);
      
      return code;
    } catch (error) {
      console.error('Error creating squad:', error);
      return null;
    }
  };

  const joinSquad = async (code, userName) => {
    try {
      const squadRef = doc(db, 'squads', code);
      const squadSnap = await getDoc(squadRef);
      
      if (!squadSnap.exists()) return false;
      
      const squad = squadSnap.data();
      const userId = Date.now();
      const displayName = userName || userProfile?.displayName || 'Usuario';
      
      const updatedSquad = {
        ...squad,
        members: [...squad.members, { 
          id: userId, 
          name: displayName, 
          isCreator: false,
          uid: userProfile?.uid // Guardar uid para karma points
        }]
      };
      
      await updateDoc(squadRef, updatedSquad);
      setCurrentUser({ squadCode: code, userName: displayName, userId });
      
      // Guardar en historial (asociado al userProfile)
      saveToHistory(code, squad.name, 'member');
      
      // Marcar como visitado
      localStorage.setItem('hasVisited', 'true');
      setHasVisited(true);
      
      return true;
    } catch (error) {
      console.error('Error joining squad:', error);
      return false;
    }
  };

  const saveToHistory = async (code, squadName, role) => {
    const historyEntry = {
      code,
      squadName,
      role,
      timestamp: Date.now()
    };
    
    // Guardar en localStorage (respaldo local)
    const historyKey = userProfile?.uid ? `squadHistory_${userProfile.uid}` : 'squadHistory';
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    history.push(historyEntry);
    localStorage.setItem(historyKey, JSON.stringify(history));
    
    // Guardar en Firebase si el usuario tiene uid (no invitado temporal)
    if (userProfile?.uid && userProfile.authProvider !== 'guest') {
      try {
        const userHistoryRef = doc(db, 'userHistory', userProfile.uid);
        const userHistorySnap = await getDoc(userHistoryRef);
        
        const currentHistory = userHistorySnap.exists() ? userHistorySnap.data().history || [] : [];
        currentHistory.push(historyEntry);
        
        await setDoc(userHistoryRef, { history: currentHistory }, { merge: true });
      } catch (error) {
        console.error('Error saving history to Firebase:', error);
      }
    }
  };

  const handleLogout = () => {
    // Solo salir del squad actual - mantener perfil de usuario
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setSquads({});
  };

  const submitVote = async (squadCode, vote) => {
    try {
      const squadRef = doc(db, 'squads', squadCode);
      const squadSnap = await getDoc(squadRef);
      
      if (!squadSnap.exists()) return;
      
      const squad = squadSnap.data();
      const updatedVotes = squad.votes.filter(v => v.voterId !== vote.voterId);
      updatedVotes.push(vote);
      
      const updatedSquad = {
        ...squad,
        votes: updatedVotes
      };
      
      await updateDoc(squadRef, updatedSquad);
      
      // Actualizar karma points del votante (quien da el reconocimiento)
      if (userProfile?.uid) {
        const voterRef = doc(db, 'users', userProfile.uid);
        const voterSnap = await getDoc(voterRef);
        
        const currentKarma = voterSnap.exists() ? (voterSnap.data().karmaPoints || 0) : 0;
        const recognitionsGiven = voterSnap.exists() ? (voterSnap.data().recognitionsGiven || 0) : 0;
        
        await setDoc(voterRef, {
          karmaPoints: currentKarma + vote.karmaEarned,
          recognitionsGiven: recognitionsGiven + 1,
          lastParticipationDate: Date.now()
        }, { merge: true });
        
        // Actualizar userProfile local
        setUserProfile(prev => ({
          ...prev,
          karmaPoints: currentKarma + vote.karmaEarned,
          recognitionsGiven: recognitionsGiven + 1
        }));
      }
      
      // Actualizar karma points del receptor (quien recibe el reconocimiento)
      // Buscar el uid del miembro seleccionado
      const selectedMember = squad.members.find(m => m.id === vote.selectedMemberId);
      if (selectedMember?.uid) {
        const recipientRef = doc(db, 'users', selectedMember.uid);
        const recipientSnap = await getDoc(recipientRef);
        
        const currentKarma = recipientSnap.exists() ? (recipientSnap.data().karmaPoints || 0) : 0;
        const recognitionsReceived = recipientSnap.exists() ? (recipientSnap.data().recognitionsReceived || 0) : 0;
        
        await setDoc(recipientRef, {
          karmaPoints: currentKarma + 15, // RECEIVE_RECOGNITION points
          recognitionsReceived: recognitionsReceived + 1
        }, { merge: true });
      }
      
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦁</div>
          <p className="text-neutral-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Landing Page - Página principal pública con onboarding integrado */}
          <Route 
            path="/" 
            element={<LandingPage />} 
          />

          {/* Login Screen - Autenticación */}
          <Route 
            path="/login" 
            element={
              userProfile ? (
                <Navigate to="/home" />
              ) : (
                <LoginScreen onLogin={handleLogin} />
              )
            } 
          />
          
          {/* Home - Requiere userProfile */}
          <Route 
            path="/home" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : (
                <HomeScreen 
                  userProfile={userProfile}
                  currentUser={currentUser}
                  squads={squads}
                  onLogout={handleCompleteLogout} 
                />
              )
            } 
          />
          
          {/* Squad Creation/Join */}
          <Route 
            path="/squad" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : (
                <CreateOrJoinSquad 
                  onCreateSquad={createSquad}
                  onJoinSquad={joinSquad}
                  userProfile={userProfile}
                />
              )
            } 
          />
          
          {/* Dashboard - Requiere estar en un squad */}
          <Route 
            path="/dashboard" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : currentUser ? (
                <SquadDashboard 
                  squad={squads[currentUser.squadCode]}
                  currentUser={currentUser}
                  userProfile={userProfile}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/home" />
              )
            } 
          />
          
          {/* Vote - Requiere estar en un squad */}
          <Route 
            path="/vote" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : currentUser ? (
                <VotingScreen 
                  squad={squads[currentUser.squadCode]}
                  currentUser={currentUser}
                  userProfile={userProfile}
                  onSubmitVote={submitVote}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/home" />
              )
            } 
          />
          
          {/* Results - Requiere estar en un squad */}
          <Route 
            path="/results" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : currentUser ? (
                <ResultsScreen 
                  squad={squads[currentUser.squadCode]}
                  currentUser={currentUser}
                  userProfile={userProfile}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/home" />
              )
            } 
          />

          {/* Profile - Ver estadísticas personales */}
          <Route 
            path="/profile" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : (
                <ProfileScreen 
                  currentUser={currentUser}
                  userProfile={userProfile}
                  onLogout={handleLogout}
                />
              )
            } 
          />

          {/* Leaderboard - Ranking global */}
          <Route 
            path="/leaderboard" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : (
                <LeaderboardScreen 
                  userProfile={userProfile}
                  onLogout={handleLogout}
                />
              )
            } 
          />

          {/* Achievements - Logros */}
          <Route 
            path="/achievements" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : (
                <AchievementsScreen 
                  userProfile={userProfile}
                  onLogout={handleLogout}
                />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
