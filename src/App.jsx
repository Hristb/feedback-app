import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';
import LoginScreen from './pages/LoginScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import HomeScreen from './pages/HomeScreen';
import CreateOrJoinSquad from './pages/CreateOrJoinSquad';
import SquadDashboard from './pages/SquadDashboard';
import VotingScreen from './pages/VotingScreen';
import ResultsScreen from './pages/ResultsScreen';

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

  // Escuchar cambios de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const profile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL,
          authProvider: 'firebase'
        };
        setUserProfile(profile);
        localStorage.setItem('userProfile', JSON.stringify(profile));
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
      members: [{ id: userId, name: displayName, isCreator: true }],
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
        members: [...squad.members, { id: userId, name: displayName, isCreator: false }]
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
    <Router basename="/feedback-app">
      <div className="min-h-screen">
        <Routes>
          {/* Login Screen - Solo si NO hay userProfile */}
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
          
          {/* Root - Redirige según estado */}
          <Route 
            path="/" 
            element={
              !userProfile ? (
                <Navigate to="/login" />
              ) : hasVisited ? (
                <Navigate to="/home" />
              ) : (
                <WelcomeScreen />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
