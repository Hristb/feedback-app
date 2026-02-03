import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import CreateOrJoinSquad from './pages/CreateOrJoinSquad';
import SquadDashboard from './pages/SquadDashboard';
import VotingScreen from './pages/VotingScreen';
import ResultsScreen from './pages/ResultsScreen';

function App() {
  const [squads, setSquads] = useState(() => {
    const saved = localStorage.getItem('squads');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('squads', JSON.stringify(squads));
  }, [squads]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const createSquad = (squadName, userName) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newSquad = {
      id: code,
      name: squadName,
      members: [{ id: Date.now(), name: userName, isCreator: true }],
      votes: []
    };
    
    setSquads({ ...squads, [code]: newSquad });
    setCurrentUser({ squadCode: code, userName, userId: Date.now() });
    
    return code;
  };

  const joinSquad = (code, userName) => {
    const squad = squads[code];
    if (!squad) return false;
    
    const userId = Date.now();
    const updatedSquad = {
      ...squad,
      members: [...squad.members, { id: userId, name: userName, isCreator: false }]
    };
    
    setSquads({ ...squads, [code]: updatedSquad });
    setCurrentUser({ squadCode: code, userName, userId });
    
    return true;
  };

  const submitVote = (squadCode, vote) => {
    const squad = squads[squadCode];
    if (!squad) return;
    
    const updatedVotes = squad.votes.filter(v => v.voterId !== vote.voterId);
    updatedVotes.push(vote);
    
    const updatedSquad = {
      ...squad,
      votes: updatedVotes
    };
    
    setSquads({ ...squads, [squadCode]: updatedSquad });
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route 
            path="/squad" 
            element={
              <CreateOrJoinSquad 
                onCreateSquad={createSquad}
                onJoinSquad={joinSquad}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              currentUser ? (
                <SquadDashboard 
                  squad={squads[currentUser.squadCode]}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/squad" />
              )
            } 
          />
          <Route 
            path="/vote" 
            element={
              currentUser ? (
                <VotingScreen 
                  squad={squads[currentUser.squadCode]}
                  currentUser={currentUser}
                  onSubmitVote={submitVote}
                />
              ) : (
                <Navigate to="/squad" />
              )
            } 
          />
          <Route 
            path="/results" 
            element={
              currentUser ? (
                <ResultsScreen 
                  squad={squads[currentUser.squadCode]}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/squad" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
