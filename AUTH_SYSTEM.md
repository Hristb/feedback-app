# Sistema de Autenticación y Gestión de Usuario

## 🎯 Cambios Implementados

### 1. **Separación de Conceptos** 
Antes teníamos un problema: el usuario perdía su identidad al "salir" porque confundíamos:
- ❌ **ANTES**: `currentUser` = usuario + squad (se perdía todo al logout)
- ✅ **AHORA**: 
  - `userProfile` = identidad persistente del usuario (email, nombre, foto)
  - `currentUser` = sesión temporal en un squad específico

### 2. **Sistema de Autenticación**

#### Nuevos archivos creados:
- `src/pages/LoginScreen.jsx` - Pantalla de login/registro

#### Métodos de autenticación:
1. **Google Sign-In** (recomendado)
   - Un clic para autenticarse
   - Foto de perfil automática
   
2. **Email/Contraseña**
   - Registro con email
   - Login tradicional
   
3. **Modo Invitado**
   - Sin crear cuenta
   - ⚠️ No guarda progreso entre dispositivos

### 3. **Flujo de Usuario Mejorado**

```
┌─────────────────────────────────────────────────┐
│  1. LoginScreen (/login)                        │
│     - Google Sign-In                            │
│     - Email/Password                            │
│     - Modo Invitado                             │
└─────────────┬───────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────┐
│  2. HomeScreen (/home)                          │
│     - Ver estadísticas personales               │
│     - Puntos mensuales y totales                │
│     - Historial de squads con puntos            │
│     - Sistema de niveles (1-5)                  │
└─────────────┬───────────────────────────────────┘
              │
              ├─► Crear Squad (150 pts) ───┐
              │                             │
              └─► Unirse a Squad (100 pts) ─┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────┐
│  3. Squad Dashboard                             │
│     - Ver miembros                              │
│     - Votar                                     │
│     - "Salir del Squad" (vuelve a Home)         │
└─────────────────────────────────────────────────┘
```

### 4. **Sistema de Puntos Mensuales**

El HomeScreen ahora muestra:
- **Puntos este mes**: Solo squads del mes actual
- **Puntos totales**: Histórico completo
- **Sistema de niveles**:
  - 🚀 Nivel 1: Novato Entusiasta (0-99 pts)
  - 🎯 Nivel 2: Miembro Comprometido (100-299 pts)
  - ⭐ Nivel 3: Colaborador Activo (300-599 pts)
  - 🌟 Nivel 4: Experto en Equipos (600-999 pts)
  - 👑 Nivel 5: Líder Legendario (1000+ pts)

**Puntos por acción:**
- Crear squad: 150 puntos
- Unirse a squad: 100 puntos

### 5. **Historial Personalizado**

Antes: `localStorage.squadHistory` (compartido por todos)
Ahora: `localStorage.squadHistory_{uid}` (único por usuario)

**Cada entrada incluye:**
```javascript
{
  code: "ABC123",
  squadName: "Los Increíbles",
  role: "creator" | "member",
  timestamp: 1707264000000
}
```

### 6. **Navegación Mejorada**

#### En todas las páginas con Header:
- ⬅️ **Botón "Volver"** (flecha izquierda)
- 🏠 **Menú → "Ir al Inicio"**
- 🚪 **Menú → "Salir del Squad"** (NO borra el perfil)

#### En CreateOrJoinSquad:
- ⬅️ **Botón "Volver al inicio"** siempre visible

### 7. **Modificaciones en Firebase**

`src/firebase.js` ahora incluye:
```javascript
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

### 8. **Cambios en App.jsx**

**Nuevas funciones:**
- `handleLogin(profile)` - Guarda perfil persistente
- `handleCompleteLogout()` - Cierra sesión completa (raro)
- `handleLogout()` - Solo sale del squad (común)

**Protección de rutas:**
- Sin `userProfile` → redirige a `/login`
- Con `userProfile` pero sin `currentUser` → puede navegar libremente
- En `/dashboard`, `/vote`, `/results` → requiere estar en un squad

## 🔧 Configuración de Firebase

### Habilitar Google Sign-In:
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Proyecto: feedback-app-d1552
3. Authentication → Sign-in method
4. Habilitar "Google"
5. Configurar email de soporte

### Habilitar Email/Password:
1. Authentication → Sign-in method
2. Habilitar "Email/Password"

## 📊 Datos de Ejemplo

### userProfile (persistente):
```javascript
{
  uid: "google_123456",
  email: "usuario@gmail.com",
  displayName: "Juan Pérez",
  photoURL: "https://...",
  authProvider: "google"
}
```

### currentUser (temporal):
```javascript
{
  squadCode: "ABC123",
  userName: "Juan Pérez",
  userId: 1707264000000
}
```

## ✅ Problemas Resueltos

1. ✅ **Usuario pierde identidad al salir del squad**
   - Solución: `userProfile` separado de `currentUser`

2. ✅ **Historial se comparte entre usuarios**
   - Solución: `squadHistory_{uid}` único por usuario

3. ✅ **No hay forma de volver sin perder progreso**
   - Solución: Botones de navegación en todo el flujo

4. ✅ **Sin autenticación real**
   - Solución: Firebase Auth con Google y Email

5. ✅ **Puntos mensuales no se calculaban**
   - Solución: HomeScreen calcula stats por mes

## 🚀 Próximos Pasos Sugeridos

1. **Foto de perfil en Header**
   - Si el usuario tiene `photoURL`, mostrarla en vez de inicial
   
2. **Notificaciones funcionales**
   - Cuando alguien vota
   - Cuando se completa el squad
   
3. **Página de perfil completa**
   - Editar nombre
   - Ver estadísticas detalladas
   - Badges/logros
   
4. **Dark mode**
   - Ya tenemos los colores en el sistema
   
5. **Recuperar squads anteriores**
   - Permitir volver a entrar a un squad del historial
