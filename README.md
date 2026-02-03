# 🦁 Squad Vote - MVP

Una aplicación web mobile-first para que equipos reconozcan las fortalezas de sus miembros de forma divertida y significativa.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## 🎯 ¿Qué es Squad Vote?

Squad Vote es una aplicación que permite a los equipos realizar votaciones para reconocer las cualidades de cada miembro. Cada persona puede:
- ✅ Crear o unirse a un equipo (Squad)
- ✅ Votar por un compañero
- ✅ Asignar un animal que lo representa
- ✅ Destacar una cualidad especial
- ✅ Compartir la razón de su elección
- ✅ Ver los resultados cuando todos hayan votado

## 🚀 Características

- **Mobile-First**: Diseñada prioritariamente para dispositivos móviles
- **Colores Juveniles**: Paleta de colores pasteles inspirada en Liongo (rosas, amarillos, morados, azules)
- **Sin Base de Datos**: Usa localStorage para persistencia (MVP)
- **Código de Squad**: Sistema simple de códigos para unir equipos
- **21 Animales**: Cada uno con su significado único
- **24 Cualidades**: Para reconocer diferentes fortalezas
- **Resultados en Tiempo Real**: Visualiza cuando todos hayan votado

## 🛠️ Stack Tecnológico

### Framework: **React + Vite**

#### ¿Por qué esta elección?

1. **Vite** 
   - ⚡ Inicio instantáneo del servidor de desarrollo
   - 🔥 Hot Module Replacement (HMR) ultra rápido
   - 📦 Build optimizado para producción
   - 🎯 Configuración mínima para MVP

2. **React**
   - 🌍 Ecosistema maduro y amplio soporte
   - 🧩 Componentes reutilizables
   - 📱 Excelente para aplicaciones mobile-first
   - 🔄 useState y useEffect para manejo de estado simple

3. **TailwindCSS**
   - 🎨 Diseño rápido con utility classes
   - 📱 Responsive design out-of-the-box
   - 🎭 Fácil personalización de colores y temas
   - 💨 Purge automático para bundles pequeños

4. **React Router**
   - 🧭 Navegación entre pantallas
   - 📍 URLs limpias y manejables
   - 🔐 Protección de rutas simple

5. **Lucide React**
   - 🎯 Iconos modernos y ligeros
   - 🎨 Fácil personalización
   - 📦 Tree-shaking automático

### Alternativas Consideradas

- **Next.js**: Demasiado complejo para un MVP sin necesidad de SSR
- **Vue**: Menos familiaridad general del mercado
- **Angular**: Overhead innecesario para esta escala
- **Create React App**: Más lento que Vite

## 📁 Estructura del Proyecto

```
proyecto/
├── src/
│   ├── pages/
│   │   ├── WelcomeScreen.jsx      # Pantalla de bienvenida con carousel
│   │   ├── CreateOrJoinSquad.jsx  # Crear o unirse a squad
│   │   ├── SquadDashboard.jsx     # Dashboard del equipo
│   │   ├── VotingScreen.jsx       # Proceso de votación (4 pasos)
│   │   └── ResultsScreen.jsx      # Resultados finales
│   ├── data/
│   │   └── content.js             # Animales y cualidades
│   ├── App.jsx                    # Router principal y lógica de estado
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Estilos globales + Tailwind
├── index.html
├── package.json
├── vite.config.js
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

## 📦 Instalación

### Prerequisitos
- Node.js 16+ 
- npm o yarn

### Pasos

1. **Instalar dependencias**
```powershell
npm install
```

2. **Iniciar servidor de desarrollo**
```powershell
npm run dev
```

3. **Acceder a la aplicación**
```
http://localhost:3000
```

4. **Build para producción**
```powershell
npm run build
```

5. **Preview del build**
```powershell
npm run preview
```

## 🎮 Cómo Funciona

### 1. **Bienvenida** (`/`)
- Carousel explicativo de 4 slides
- Navegación con flechas y dots
- Botón "¡Comenzar!"

### 2. **Crear o Unirse** (`/squad`)
- **Opción A: Crear Squad**
  - Ingresa nombre del squad
  - Ingresa tu nombre
  - Recibes código único (6 caracteres)
  
- **Opción B: Unirse a Squad**
  - Ingresa código del squad
  - Ingresa tu nombre
  - Te unes al equipo

### 3. **Dashboard** (`/dashboard`)
- Ve el código del squad (copiable)
- Lista de miembros
- Estado de votación (quién ha votado)
- Botón para votar
- Botón para ver resultados (cuando todos votaron)

### 4. **Votación** (`/vote`)
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

### 5. **Resultados** (`/results`)
- Destaca TU reconocimiento recibido
- Lista completa de todos los miembros
- Muestra animal, cualidad y razón de cada voto
- Ranking visual (🥇🥈🥉)

## 💾 Persistencia de Datos

El MVP usa **localStorage** para mantener:
- Todos los squads creados
- Miembros de cada squad
- Votos realizados
- Usuario actual

```javascript
// Estructura en localStorage:
{
  squads: {
    "ABC123": {
      id: "ABC123",
      name: "Los Increíbles",
      members: [...],
      votes: [...]
    }
  },
  currentUser: {
    squadCode: "ABC123",
    userName: "María",
    userId: 1234567890
  }
}
```

## 🔮 Futuras Mejoras

### Fase 2 (Backend)
- [ ] API REST con Node.js/Express
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Sistema de autenticación real
- [ ] WebSockets para actualizaciones en tiempo real

### Fase 3 (Features)
- [ ] Imágenes reales de animales (actualmente emojis)
- [ ] Compartir resultados en redes sociales
- [ ] Historial de votaciones
- [ ] Múltiples rondas de votación
- [ ] Estadísticas del equipo
- [ ] Exportar resultados a PDF

### Fase 4 (UX)
- [ ] Animaciones más elaboradas
- [ ] Sonidos de confirmación
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] Accesibilidad (a11y) mejorada

## 🐛 Limitaciones del MVP

- ❌ Sin base de datos (solo localStorage)
- ❌ Sin autenticación real
- ❌ Sin sincronización entre dispositivos
- ❌ Los datos se pierden si se borra el navegador
- ❌ Un usuario puede votar múltiples veces (no hay control real)
- ❌ No hay edición de votos
- ❌ Sin notificaciones push

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
