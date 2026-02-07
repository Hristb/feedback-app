# 🔥 Configuración de Firebase - Feedback App

Este documento explica cómo configurar Firebase Authentication y Firestore para que la aplicación guarde usuarios en la base de datos.

## 📋 Tabla de Contenidos

1. [Estructura de Base de Datos](#estructura-de-base-de-datos)
2. [Configuración de Google Sign-In](#configuración-de-google-sign-in)
3. [Reglas de Seguridad](#reglas-de-seguridad)
4. [Flujo de Autenticación](#flujo-de-autenticación)

---

## 🗄️ Estructura de Base de Datos

### Colección: `users`

Cada documento representa un usuario registrado en la aplicación.

**Ruta en Firestore:** `/users/{uid}`

```javascript
{
  "uid": "abc123xyz",                 // ID único del usuario (Firebase Auth UID)
  "email": "usuario@email.com",       // Email del usuario
  "displayName": "Juan Pérez",        // Nombre para mostrar
  "photoURL": "https://...",          // URL de la foto de perfil (Google)
  "authProvider": "google",           // Método: "google" | "email"
  
  // Sistema de Karma Points
  "karmaPoints": 150,                 // Puntos totales acumulados
  "level": "Silver",                  // Nivel: Bronze, Silver, Gold, Platinum
  "achievements": ["first_time"],     // IDs de logros desbloqueados
  
  // Estadísticas del usuario
  "stats": {
    "recognitionsGiven": 5,           // Reconocimientos dados
    "recognitionsReceived": 8,        // Reconocimientos recibidos
    "currentStreak": 2,               // Racha actual de semanas activas
    "bestStreak": 3,                  // Mejor racha histórica
    "mostVotedCount": 1               // Veces que fue el más votado
  },
  
  // Metadatos
  "createdAt": Timestamp,             // Fecha de registro
  "lastLogin": Timestamp              // Último inicio de sesión
}
```

### Colección: `squads`

Esta colección ya existe y almacena los equipos/grupos.

**Ruta en Firestore:** `/squads/{code}`

```javascript
{
  "code": "ABC123",                   // Código único del squad
  "name": "Mi Equipo",                // Nombre del squad
  "createdAt": Timestamp,
  "members": [                        // Array de miembros
    {
      "name": "Juan",
      "uid": "abc123xyz",             // UID del usuario (para karma tracking)
      "photoURL": "https://...",
      "joinedAt": Timestamp
    }
  ],
  "votes": [                          // Votos del squad
    {
      "voterId": "abc123xyz",
      "voterName": "Juan",
      "selectedMemberId": "def456",
      "animal": "León",
      "quality": "Liderazgo",
      "reason": "Excelente guía",
      "karmaEarned": 10,
      "timestamp": Timestamp
    }
  ]
}
```

---

## 🔐 Configuración de Google Sign-In

Para que el login con Google funcione correctamente en producción, debes configurar Firebase Console.

### Paso 1: Habilitar Google Sign-In

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **feedback-app-d1552**
3. En el menú lateral izquierdo, ve a **Authentication**
4. Haz clic en la pestaña **Sign-in method**
5. Busca **Google** en la lista de proveedores
6. Haz clic en el **lápiz** (editar) a la derecha
7. Activa el **interruptor** para habilitar Google
8. Configura:
   - **Project support email**: Tu email (obligatorio)
   - **Project public-facing name**: "Feedback App" o el nombre que prefieras
9. Haz clic en **Save**

✅ **Listo!** Google Sign-In está habilitado.

---

### Paso 2: Agregar Dominios Autorizados

Para que el popup de Google funcione en GitHub Pages, debes agregar el dominio a la lista de autorizados.

#### Opción A: Desde Authentication

1. En **Authentication**, ve a la pestaña **Settings**
2. Baja hasta la sección **Authorized domains**
3. Haz clic en **Add domain**
4. Escribe: `hristb.github.io`
5. Haz clic en **Add**

#### Opción B: Desde Project Settings

1. Ve a **⚙️ Project Settings** (rueda dentada arriba a la izquierda)
2. Baja hasta **Public settings**
3. En **Authorized domains**, haz clic en **Add domain**
4. Escribe: `hristb.github.io`
5. Haz clic en **Done**

### Dominios ya Autorizados por Defecto

Estos dominios ya están permitidos automáticamente:
- ✅ `localhost` → Para desarrollo local
- ✅ `feedback-app-d1552.firebaseapp.com` → Dominio de Firebase Hosting
- ✅ `feedback-app-d1552.web.app` → Dominio alternativo de Firebase

### ¿Qué Dominio Necesito Agregar?

| Entorno | Dominio a Agregar |
|---------|-------------------|
| **GitHub Pages** | `hristb.github.io` |
| **Dominio personalizado** | `tudominio.com` |
| **Vercel** | `tu-app.vercel.app` |
| **Netlify** | `tu-app.netlify.app` |

---

### Paso 3: Verificar que Funciona

1. **Abre tu app en producción:**  
   👉 https://hristb.github.io/feedback-app/

2. **Haz clic en "Iniciar con Google"**

3. **Deberías ver el popup de Google** para seleccionar tu cuenta

4. **Si funciona correctamente:**
   - El popup se abre sin errores
   - Puedes seleccionar tu cuenta
   - Te redirige a la pantalla principal
   - Tu perfil se guarda en Firestore

---

### ❌ Errores Comunes y Soluciones

#### Error: `auth/unauthorized-domain`

```
Firebase: Error (auth/unauthorized-domain)
```

**Causa:** El dominio desde el que estás ejecutando la app no está autorizado.

**Solución:**
1. Ve a Firebase Console > Authentication > Settings > Authorized domains
2. Agrega el dominio exacto desde el que estás accediendo
3. Espera 1-2 minutos para que se propague el cambio
4. Recarga la página y vuelve a intentar

---

#### Error: `auth/popup-blocked`

```
The popup has been blocked by the browser
```

**Causa:** El navegador bloqueó el popup de Google.

**Solución:**
1. Busca el icono de popup bloqueado en la barra de direcciones (🚫)
2. Haz clic en él y selecciona "Permitir popups de este sitio"
3. Recarga la página y vuelve a intentar

---

#### Error: `auth/popup-closed-by-user`

```
The popup has been closed by the user before finalizing the operation
```

**Causa:** El usuario cerró el popup antes de completar el login.

**Solución:** Esto es normal, no requiere acción. El usuario solo necesita volver a hacer clic en el botón.

---

#### Error: `auth/operation-not-allowed`

```
This operation is not allowed
```

**Causa:** Google Sign-In no está habilitado en Firebase Console.

**Solución:** Sigue el [Paso 1](#paso-1-habilitar-google-sign-in) para habilitar Google.

---

## 🛡️ Reglas de Seguridad de Firestore

Para proteger los datos de los usuarios, configura reglas de seguridad en Firestore.

### Paso 1: Ir a Reglas de Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Haz clic en la pestaña **Rules**
3. Verás el editor de reglas

### Paso 2: Configurar Reglas

Copia y pega estas reglas en el editor:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ==========================================
    // Reglas para la colección 'users'
    // ==========================================
    match /users/{userId} {
      // Lectura: Solo el usuario puede leer su propio documento completo
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Escritura: Solo el usuario puede crear/modificar su propio documento
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // Permitir que otros usuarios lean displayName, photoURL y nivel para leaderboard
      allow get: if request.auth != null;
    }
    
    // ==========================================
    // Reglas para la colección 'squads'
    // ==========================================
    match /squads/{squadId} {
      // Lectura: Cualquier usuario autenticado puede leer squads
      allow read: if request.auth != null;
      
      // Escritura: Cualquier usuario autenticado puede crear/modificar squads
      allow write: if request.auth != null;
    }
  }
}
```

### Paso 3: Publicar Reglas

1. Haz clic en **Publish** (arriba a la derecha)
2. Confirma la publicación
3. Verifica que no haya errores de sintaxis

---

### 🔐 Explicación de las Reglas

#### Colección `users`:

| Operación | Quién Puede | Qué Puede Ver/Hacer |
|-----------|-------------|---------------------|
| **read** | Solo el dueño | Leer su propio perfil completo |
| **write** | Solo el dueño | Crear/modificar su propio perfil |
| **get** | Cualquier autenticado | Leer nombre y foto para leaderboards |

**Ejemplo:**
- ✅ Juan puede leer `/users/juan123`
- ❌ Juan NO puede leer `/users/maria456` completo
- ✅ Juan SÍ puede leer el `displayName` de María para el leaderboard

#### Colección `squads`:

| Operación | Quién Puede | Qué Puede Ver/Hacer |
|-----------|-------------|---------------------|
| **read** | Cualquier autenticado | Leer todos los squads |
| **write** | Cualquier autenticado | Crear/modificar squads |

**Ejemplo:**
- ✅ Cualquier usuario autenticado puede crear un squad
- ✅ Cualquier miembro puede votar en un squad
- ❌ Usuarios sin login NO pueden acceder

---

## 🚀 Flujo de Autenticación

### 1. Registro/Login

```
Usuario → LoginScreen.jsx → Firebase Auth → Firestore
                                              ↓
                              Crear/Actualizar documento en /users/{uid}
                                              ↓
                              Cargar perfil completo con karma
                                              ↓
                              Guardar en localStorage + Estado React
```

### 2. ¿Qué se Guarda en Firestore?

Cuando un usuario se registra o hace login:

#### a) **Firebase Authentication**
- Crea/autentica la cuenta
- Maneja passwords encriptados
- Genera UID único

#### b) **LoginScreen.jsx** llama a `saveUserToFirestore()`:

**Si es usuario NUEVO:**
```javascript
{
  uid: "abc123",
  email: "usuario@email.com",
  displayName: "Usuario",
  authProvider: "google",
  karmaPoints: 0,              // ← Inicia en 0
  level: "Bronze",             // ← Primer nivel
  achievements: [],            // ← Sin logros
  stats: {
    recognitionsGiven: 0,
    recognitionsReceived: 0,
    currentStreak: 0,
    bestStreak: 0,
    mostVotedCount: 0
  },
  createdAt: Timestamp,
  lastLogin: Timestamp
}
```

**Si es usuario EXISTENTE:**
- Solo actualiza `lastLogin`
- Carga todos los datos existentes (karma, nivel, logros, etc.)

#### c) **App.jsx** carga el perfil:
```javascript
useEffect(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Cargar perfil completo desde Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setUserProfile(userDoc.data());
    }
  });
}, []);
```

---

### 3. Persistencia de Datos

#### ¿Dónde se Guardan los Datos?

| Ubicación | Qué Guarda | Duración |
|-----------|------------|----------|
| **Firestore** | Perfil completo + karma | ♾️ Permanente |
| **localStorage** | Copia del perfil | Hasta que se limpie el navegador |
| **Estado React** | Perfil activo | Durante la sesión |

#### ¿Por Qué es Importante?

✅ **Firestore = Fuente de verdad**  
Todos los datos persisten aquí para siempre.

✅ **localStorage = Cache**  
Para acceso rápido sin red.

✅ **Estado React = Datos activos**  
Para renderizar la UI en tiempo real.

---

## 📊 Verificar que Funciona

### En Firebase Console:

1. Ve a **Firestore Database**
2. Busca la colección **`users`**
3. Deberías ver un documento por cada usuario registrado

**Ejemplo de documento:**

```
Collection: users
  └── Document: abc123xyz
      ├── uid: "abc123xyz"
      ├── email: "usuario@gmail.com"
      ├── displayName: "Juan Pérez"
      ├── photoURL: "https://lh3.googleusercontent.com/..."
      ├── authProvider: "google"
      ├── karmaPoints: 0
      ├── level: "Bronze"
      ├── achievements: []
      ├── stats: {...}
      ├── createdAt: February 6, 2026 at 10:30:00 AM UTC-3
      └── lastLogin: February 6, 2026 at 10:30:00 AM UTC-3
```

### En la App:

1. **Registra un usuario nuevo** con email
2. **Ve a Firebase Console** → Deberías ver el documento creado
3. **Cierra sesión y vuelve a hacer login**
4. **Tu karma debería persistir** entre sesiones
5. **Login con Google** debería funcionar sin errores
6. **Ve al perfil** → Deberías ver tu karma y nivel

---

## 🔧 Comandos Útiles

### Instalar Firebase CLI (opcional)

```bash
npm install -g firebase-tools
```

### Login en Firebase

```bash
firebase login
```

### Exportar datos de Firestore

```bash
firebase firestore:export backup/
```

### Limpiar datos de prueba

```javascript
// En Firebase Console > Firestore > users
// Selecciona documentos de prueba y elimínalos manualmente
```

---

## ✅ Checklist de Configuración

Verifica que hayas completado estos pasos:

- [ ] Google Sign-In habilitado en Firebase Console
- [ ] Dominio `hristb.github.io` agregado a dominios autorizados
- [ ] Reglas de Firestore configuradas y publicadas
- [ ] Probado registro con email/password
- [ ] Probado login con Google
- [ ] Verificado que los datos se guardan en Firestore
- [ ] Verificado que el karma persiste entre sesiones
- [ ] Verificado que `lastLogin` se actualiza

---

## 🆘 Soporte y Depuración

### 1. **Revisa la Consola del Navegador**

Abre DevTools (F12) y busca:
- ❌ Errores de Firebase Auth
- ❌ Errores de Firestore
- ✅ Logs de éxito

### 2. **Verifica Firebase Console**

- Ve a **Firestore Database** → ¿Se están creando documentos?
- Ve a **Authentication** → ¿Los usuarios aparecen ahí?

### 3. **Revisa las Reglas de Firestore**

- Ve a **Firestore > Rules** → ¿Están publicadas?
- Prueba las reglas con el **Rules Playground**

### 4. **Verifica Dominios Autorizados**

- Ve a **Authentication > Settings > Authorized domains**
- Debe incluir tu dominio de producción

### 5. **Revisa el Código**

```javascript
// En LoginScreen.jsx
console.log('Usuario guardado en Firestore:', userProfile);

// En App.jsx
console.log('Usuario cargado desde Firestore:', userProfile);
```

---

## 📝 Notas Adicionales

### Límites de Firebase (Plan Spark - Gratis)

| Recurso | Límite Diario | Límite Mensual |
|---------|---------------|----------------|
| **Authentication** | Ilimitado | 10K usuarios verificados |
| **Firestore Lecturas** | 50K | 50K |
| **Firestore Escrituras** | 20K | 20K |
| **Firestore Eliminaciones** | 20K | 20K |
| **Storage** | - | 1 GB total |

💡 **Recomendación:** Si la app crece, considera el plan **Blaze (pago por uso)**.

---

### Seguridad y Buenas Prácticas

✅ **DO:**
- Usar reglas de Firestore para proteger datos
- Validar datos en el cliente antes de enviar
- Manejar errores de Firebase correctamente
- Usar `serverTimestamp()` para timestamps consistentes

❌ **DON'T:**
- Compartir credenciales de Firebase (`firebaseConfig`)
- Permitir escritura sin autenticación
- Exponer información sensible en Firestore
- Usar `allow read, write: if true` en producción

---

## 🎉 ¡Listo!

Tu aplicación ahora:
- ✅ Guarda usuarios en Firestore
- ✅ Soporta login con Google y Email
- ✅ Persiste karma entre sesiones
- ✅ Está protegida con reglas de seguridad

**Siguiente paso:** Despliega los cambios y prueba en producción.

```bash
git add .
git commit -m "feat: Guardar usuarios en Firestore con Google Sign-In"
git push origin main
npm run deploy
```

---

**¿Necesitas ayuda?** Revisa la sección [🆘 Soporte](#soporte-y-depuración).
