# 🦁 Kudos

**Reconoce las fortalezas que hacen únicos a tus compañeros**

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)
![Firebase](https://img.shields.io/badge/Firebase-12.9-orange)

🔗 **[Ver Demo en Vivo](https://hristb.github.io/feedback-app/)**

## 🎯 ¿Qué es Kudos?

Kudos es la forma más divertida y significativa de reconocer las fortalezas únicas de cada persona en tu equipo. No solo votas, celebras lo que hace especial a cada compañero.

**En 2 minutos puedes:**
- ✨ Crear o unirte a un equipo con un código
- 🦁 Reconocer a un compañero con un animal totémico
- ⭐ Destacar su cualidad más especial
- 💬 Compartir por qué lo elegiste
- 🎉 Descubrir cómo te ven los demás

## 🚀 Características Principales

### 🌟 Onboarding Claro
- **Landing Page**: Explica qué es Kudos antes de empezar
- **Carousel de 3 pasos**: Tutorial visual interactivo
- **Sin fricción**: De visitante a usuario en segundos

### Autenticación Flexible
- 🔐 **Google Sign-In**: Login rápido con cuenta de Google
- 📧 **Email/Password**: Registro tradicional con validación
- 👤 **Modo Invitado**: Acceso sin cuenta (datos locales)
- 👁️ **Toggle Password**: Ver/ocultar contraseña
- ✅ **Validación Visual**: Feedback inmediato en formularios

### Experiencia de Usuario Mejorada
- **Navegación Directa**: Botones llevan directo al formulario sin pasos extra
- **Perfil Visible**: Header con avatar y logout accesible
- **Copiar Códigos**: Un clic para copiar código de squad con feedback
- **HashRouter**: URLs con # para compatibilidad GitHub Pages sin 404
- **Transiciones Suaves**: Animaciones entre vistas

### Gestión de Squads
- **Crear Squad**: Genera código único para compartir
- **Unirse a Squad**: Ingresa código para unirte al equipo
- **Historial**: Ve tus últimos 5 squads con códigos copiables
- **Persistencia Dual**: localStorage + Firebase Firestore

### Sistema de Votación
- **21 Animales**: Cada uno con su significado único
- **24 Cualidades**: Para reconocer diferentes fortalezas
- **Resultados en Tiempo Real**: Visualiza cuando todos hayan votado
- **Mobile-First**: Optimizado para dispositivos móviles

## 🛠️ Stack Tecnológico

### Core
- **React 18.2** - Framework UI con hooks
- **Vite 5.4** - Build tool ultra rápido
- **React Router 6.20** - Navegación con HashRouter
- **TailwindCSS 3.3** - Utility-first CSS

### Backend & Auth
- **Firebase 12.9**
  - 🔐 Authentication (Google, Email/Password)
  - 🗄️ Firestore (Base de datos NoSQL)
  - ☁️ Hosting para despliegue

### UI & Icons
- **Lucide React** - Iconos modernos y ligeros
- **Gradientes Personalizados** - Paleta juvenil y atractiva

### Deployment
- **GitHub Pages** - Hosting estático gratuito
- **gh-pages** - CLI para deploy automatizado

### ¿Por qué esta elección?

1. **Vite** 
   - ⚡ Inicio instantáneo del servidor de desarrollo
   - 🔥 Hot Module Replacement (HMR) ultra rápido
   - 📦 Build optimizado para producción

2. **React + Hooks**
   - 🧩 Componentes reutilizables
   - 📱 Excelente para aplicaciones mobile-first
   - 🔄 Estado simple con useState/useEffect

3. **Firebase**
   - 🚀 Backend completo sin servidor
   - 🔐 Autenticación lista para usar
   - 💾 Sincronización en tiempo real
   - 🆓 Tier gratuito generoso

4. **TailwindCSS**
   - 🎨 Diseño rápido con utility classes
   - 📱 Responsive design integrado
   - 💨 Purge automático para bundles pequeños

5. **HashRouter**
   - 🔗 Compatibilidad GitHub Pages sin configuración servidor
   - 🚫 Elimina errores 404 en refresh
   - ✅ URLs limpias con fragmento (#)

## 📁 Estructura del Proyecto

```
feedback-app/
├── src/
│   ├── pages/
│   │   ├── LoginScreen.jsx        # Autenticación (Google/Email/Guest)
│   │   ├── HomeScreen.jsx         # Dashboard con historial y stats
│   │   ├── CreateOrJoinSquad.jsx  # Crear o unirse a squad
│   │   ├── SquadDashboard.jsx     # Dashboard del equipo
│   │   ├── VotingScreen.jsx       # Proceso de votación (4 pasos)
│   │   └── ResultsScreen.jsx      # Resultados finales
│   ├── data/
│   │   └── content.js             # Animales y cualidades
│   ├── firebase.js                # Configuración Firebase
│   ├── App.jsx                    # Router + Auth state
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Estilos globales + Tailwind
├── public/
├── index.html
├── package.json
├── vite.config.js                 # Config con base path para GH Pages
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Paleta de Colores

```css
Primary (Rosa):   #fda4af → #f43f5e
Secondary (Amarillo): #fef08a → #eab308
Accent (Azul):    #7dd3fc → #0ea5e9
Backgrounds:      Rosa 50, Púrpura 50, Azul 50
```

## 📦 Instalación y Desarrollo

### Prerequisitos
- Node.js 16+ 
- npm o yarn
- Cuenta de Firebase (para auth y Firestore)

### Pasos

1. **Clonar repositorio**
```bash
git clone https://github.com/Hristb/feedback-app.git
cd feedback-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Crea proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Authentication (Google, Email/Password)
   - Crea base de datos Firestore
   - Copia las credenciales y créalas en `src/firebase.js`

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```
   - Abre http://localhost:3000/feedback-app/

5. **Build para producción**
```bash
npm run build
```

6. **Deploy a GitHub Pages**
```bash
npm run deploy
```
   - Ve a Settings → Pages → Selecciona rama `gh-pages`
   - Tu app estará en `https://<usuario>.github.io/feedback-app/`

## 🎮 Cómo Funciona

### 1. **Login** (`/login`)
- **Google Sign-In**: Login con cuenta de Google
- **Email/Password**: Registro o login tradicional con validación visual
- **Modo Invitado**: Acceso sin cuenta (solo localStorage)
- Toggle para ver/ocultar contraseña
- Validación de email con feedback visual

### 2. **Home** (`/home`)
- Header con perfil de usuario y botón logout
- Stats cards: Squads participados, compromiso, estado
- Botón **"Crear Nuevo Squad"** → Va directo al formulario
- Botón **"Unirse a Squad"** → Va directo al formulario de ingreso
- Historial de últimos 5 squads con códigos copiables (un clic)

### 3. **Crear o Unirse** (`/squad`)
- Lee parámetro `?mode=create` o `?mode=join` de la URL
- Muestra formulario correspondiente directamente (sin doble selección)

**Crear Squad:**
  - Ingresa nombre del squad
  - Usa tu nombre de perfil automáticamente
  - Recibes código único (6 caracteres)
  
**Unirse a Squad:**
  - Ingresa código del squad
  - Usa tu nombre de perfil automáticamente
  - Te unes al equipo

### 4. **Dashboard** (`/dashboard`)
- Ve el código del squad (copiable)
- Lista de miembros
- Estado de votación (quién ha votado)
- Botón para votar
- Botón para ver resultados (cuando todos votaron)

### 5. **Votación** (`/vote`)
**Proceso de 4 pasos:**

**Paso 1:** Selecciona un compañero
- Lista de miembros (excepto tú)

**Paso 2:** Elige un animal
- Grid de 21 animales con emoji
- Cada uno con su descripción

**Paso 3:** Selecciona una cualidad
- Lista de 24 cualidades
- Con descripción de cada una

**Paso 4:** Escribe tu razón (opcional)
- Campo de texto libre
- Resumen visual de tu voto
- Confirmar voto

### 6. **Resultados** (`/results`)
- Destaca TU reconocimiento recibido
- Lista completa de todos los miembros
- Muestra animal, cualidad y razón de cada voto
- Ranking visual (🥇🥈🥉)

## 💾 Persistencia de Datos

Implementación **dual** para máxima compatibilidad:

### localStorage (Modo Invitado)
```javascript
{
  userProfile: {
    uid: "guest_1234567890",
    displayName: "María",
    authProvider: "guest"
  },
  squadHistory_guest_1234567890: [...]
}
```

### Firebase Firestore (Usuarios autenticados)
```javascript
// Colección: squads
{
  id: "ABC123",
  name: "Los Increíbles",
  createdBy: "user_uid_123",
  members: [...],
  votes: [...]
}

// Colección: userHistory
{
  userId: "user_uid_123",
  history: [
    {
      squadId: "ABC123",
      squadName: "Los Increíbles",
      role: "creator",
      timestamp: "2026-02-06T..."
    }
  ]
}
```

**Ventajas:**
- ✅ Invitados funcionan sin servidor (offline-first)
- ✅ Usuarios registrados sincronizan entre dispositivos
- ✅ Historial persistente en Firebase
- ✅ Backup automático en la nube

## 🔮 Mejoras Implementadas (v1.0)

### ✅ Autenticación Completa
- [x] Google Sign-In con Firebase Auth
- [x] Email/Password con registro y validación
- [x] Modo Invitado para acceso sin cuenta
- [x] Toggle ver/ocultar contraseña
- [x] Validación visual de email con feedback

### ✅ UX Mejorada
- [x] Navegación directa sin dobles selecciones
- [x] Header con perfil de usuario visible
- [x] Botón logout accesible
- [x] Copiar códigos de squad con un clic
- [x] Feedback visual "Copiado" ✓
- [x] Tabs compactos para mobile (<375px)
- [x] Transiciones suaves entre vistas

### ✅ Persistencia Dual
- [x] localStorage para invitados
- [x] Firebase Firestore para usuarios registrados
- [x] Historial sincronizado en la nube
- [x] Backup automático

### ✅ Deployment
- [x] HashRouter para GitHub Pages
- [x] Build optimizado con Vite
- [x] Deploy automatizado con gh-pages
- [x] URLs sin errores 404 en refresh

## 🔮 Futuras Mejoras

### Fase 2 (Features)
- [ ] Notificaciones push cuando todos voten
- [ ] Chat en tiempo real dentro del squad
- [ ] Múltiples rondas de votación
- [ ] Estadísticas y analytics del equipo
- [ ] Exportar resultados a PDF/Imagen
- [ ] Compartir resultados en redes sociales

### Fase 3 (UX)
- [ ] Imágenes reales de animales (reemplazar emojis)
- [ ] Animaciones más elaboradas con Framer Motion
- [ ] Sonidos de confirmación y celebración
- [ ] Modo oscuro
- [ ] Internacionalización (Español/Inglés)
- [ ] Accesibilidad (WCAG 2.1 AA)

### Fase 4 (Backend)
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] API REST para integraciones
- [ ] Edición y eliminación de votos
- [ ] Sistema de roles (admin, member)
- [ ] Moderación de contenido
- [ ] Rate limiting y seguridad

## 🐛 Conocidas

- ⚠️ Invitados: datos solo en localStorage (no sincronizan entre dispositivos)
- ⚠️ Sin edición de votos una vez enviados
- ⚠️ Sin control de múltiples votos del mismo usuario (confianza del equipo)
- ⚠️ HashRouter genera URLs con # (necesario para GitHub Pages)

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contribuir

Este es un MVP. Para contribuir:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es un MVP educativo.

## 👨‍💻 Autor

Desarrollado como MVP para sistema de reconocimiento de equipos.

---

## 🎯 Decisiones de Diseño

### ¿Por qué Mobile-First?
- Mayor uso de smartphones
- Experiencia más personal
- Facilita votaciones rápidas
- Diseño más íntimo y cercano

### ¿Por qué Colores Pasteles?
- Atractivos para todos los géneros
- Ambiente amigable y positivo
- Reducen fatiga visual
- Transmiten calma y profesionalismo juvenil

### ¿Por qué Animales?
- Forma lúdica de describir personalidades
- Fácil de recordar
- Universal y sin juicios negativos
- Generan conversaciones positivas

### ¿Por qué 4 Pasos en la Votación?
- Evita decisiones apresuradas
- Permite reflexión
- Construye narrativa completa
- Muestra progreso claro

---

**¡Listo para reconocer a tu equipo! 🦁✨**
