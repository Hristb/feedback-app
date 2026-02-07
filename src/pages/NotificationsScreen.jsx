import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { UserCheck, UserX, Clock, CheckCircle, XCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const NotificationsScreen = ({ userProfile, currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar solicitudes pendientes en tiempo real
  useEffect(() => {
    if (!userProfile?.uid) {
      navigate('/login');
      return;
    }

    const requestsRef = collection(db, 'friendRequests');
    const q = query(
      requestsRef,
      where('to', '==', userProfile.uid),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const requestsData = [];
      
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        
        // Obtener info del remitente
        try {
          const senderRef = doc(db, 'users', data.from);
          const senderSnap = await getDoc(senderRef);
          
          requestsData.push({
            id: docSnap.id,
            ...data,
            senderName: senderSnap.exists() ? senderSnap.data().displayName : 'Usuario',
            senderEmail: senderSnap.exists() ? senderSnap.data().email : null
          });
        } catch (error) {
          console.error('Error loading sender info:', error);
        }
      }
      
      setRequests(requestsData.sort((a, b) => b.timestamp - a.timestamp));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userProfile?.uid, navigate]);

  const handleAccept = async (requestId, fromUserId) => {
    try {
      // Actualizar estado de la solicitud
      const requestRef = doc(db, 'friendRequests', requestId);
      await updateDoc(requestRef, {
        status: 'accepted',
        acceptedAt: serverTimestamp()
      });

      // Agregar amigos mutuamente en ambos usuarios
      const userRef = doc(db, 'users', userProfile.uid);
      const friendRef = doc(db, 'users', fromUserId);

      const userSnap = await getDoc(userRef);
      const friendSnap = await getDoc(friendRef);

      const userFriends = userSnap.exists() ? (userSnap.data().friends || []) : [];
      const friendFriends = friendSnap.exists() ? (friendSnap.data().friends || []) : [];

      // Agregar solo si no existe ya
      if (!userFriends.includes(fromUserId)) {
        await updateDoc(userRef, {
          friends: [...userFriends, fromUserId]
        });
      }

      if (!friendFriends.includes(userProfile.uid)) {
        await updateDoc(friendRef, {
          friends: [...friendFriends, userProfile.uid]
        });
      }

    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Error al aceptar la solicitud');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const requestRef = doc(db, 'friendRequests', requestId);
      await updateDoc(requestRef, {
        status: 'rejected',
        rejectedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Error al rechazar la solicitud');
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Hace un momento';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // segundos

    if (diff < 60) return 'Hace un momento';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
    return `Hace ${Math.floor(diff / 86400)} días`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100 pb-20 md:pb-6">
      <Header 
        userName={currentUser?.userName} 
        userProfile={userProfile}
        onLogout={onLogout}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            Solicitudes de Amistad
          </h1>
          <p className="text-neutral-600">
            Acepta o rechaza las solicitudes de amistad que has recibido
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="card text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand-500 border-t-transparent"></div>
            <p className="mt-4 text-neutral-600">Cargando...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && requests.length === 0 && (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">✉️</div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              No tienes solicitudes pendientes
            </h3>
            <p className="text-neutral-600 mb-6">
              Cuando alguien te envíe una solicitud de amistad, aparecerá aquí
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <UserCheck className="w-5 h-5" />
              Ir a Mi Perfil
            </button>
          </div>
        )}

        {/* Requests List */}
        {!loading && requests.length > 0 && (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="card hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {request.senderName?.charAt(0) || '?'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-800 truncate">
                          {request.senderName}
                        </h3>
                        {request.senderEmail && (
                          <p className="text-sm text-neutral-500 truncate">
                            {request.senderEmail}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(request.timestamp)}
                      </div>
                    </div>

                    <p className="text-neutral-700 mb-4">
                      Te ha enviado una solicitud de amistad
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(request.id, request.from)}
                        className="flex-1 btn-primary py-2.5 text-sm flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aceptar
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex-1 btn-secondary py-2.5 text-sm flex items-center justify-center gap-2 hover:bg-error-light hover:text-error hover:border-error"
                      >
                        <XCircle className="w-4 h-4" />
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default NotificationsScreen;
