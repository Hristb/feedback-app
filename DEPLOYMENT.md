# 🚀 Guía de Despliegue - Squad Vote

## Opciones de Despliegue Gratuitas

### 1. **Vercel** (Recomendado) ⭐

**Ventajas:**
- Deploy automático desde GitHub
- SSL gratuito
- CDN global
- Preview deployments

**Pasos:**
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy a producción
vercel --prod
```

**O desde la Web:**
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio GitHub
3. Vercel detectará Vite automáticamente
4. ¡Deploy! 🚀

---

### 2. **Netlify**

**Ventajas:**
- Muy fácil de usar
- Formularios integrados
- Redirects y rewrites

**Pasos:**
```bash
# 1. Instalar Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Inicializar
netlify init

# 4. Deploy
netlify deploy --prod
```

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`

---

### 3. **GitHub Pages**

**Ventajas:**
- Totalmente gratis
- Integrado con GitHub

**Pasos:**

1. Instalar gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Modificar `package.json`:
```json
{
  "homepage": "https://tuusuario.github.io/squad-vote",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Modificar `vite.config.js`:
```javascript
export default defineConfig({
  base: '/squad-vote/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

---

### 4. **Railway**

**Ventajas:**
- Soporte para backend (cuando lo necesites)
- Base de datos incluida
- Muy fácil setup

**Pasos:**
1. Ve a [railway.app](https://railway.app)
2. Conecta GitHub
3. Selecciona el repo
4. Railway detecta Vite automáticamente
5. Deploy automático

---

## 📱 Configuración PWA (Opcional)

Para convertirlo en Progressive Web App:

### 1. Instalar plugin:
```bash
npm install vite-plugin-pwa -D
```

### 2. Actualizar `vite.config.js`:
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Squad Vote',
        short_name: 'Squad',
        description: 'Reconoce a tu equipo',
        theme_color: '#f43f5e',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 🔒 Variables de Entorno (Futuro)

Cuando agregues backend, crea `.env`:

```env
VITE_API_URL=https://api.tuservidor.com
VITE_APP_NAME=Squad Vote
```

Uso en código:
```javascript
const API_URL = import.meta.env.VITE_API_URL
```

---

## 📊 Analytics (Opcional)

### Google Analytics 4

1. Instalar:
```bash
npm install react-ga4
```

2. En `main.jsx`:
```javascript
import ReactGA from 'react-ga4'

ReactGA.initialize('G-XXXXXXXXXX')
ReactGA.send('pageview')
```

---

## 🔧 Optimizaciones Pre-Deploy

### 1. Comprimir imágenes
- Usa emojis (ya lo hacemos ✅)
- O TinyPNG para PNGs

### 2. Analizar bundle:
```bash
npm install --save-dev rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer()
  ]
})
```

### 3. Lazy loading de rutas:
```javascript
// App.jsx
const VotingScreen = lazy(() => import('./pages/VotingScreen'))
const ResultsScreen = lazy(() => import('./pages/ResultsScreen'))
```

---

## 🌍 Dominios Personalizados

### En Vercel:
1. Ve a Settings > Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones

### En Netlify:
1. Site settings > Domain management
2. Add custom domain
3. Sigue instrucciones DNS

---

## ✅ Checklist Pre-Deploy

- [ ] `npm run build` funciona sin errores
- [ ] Probado en Chrome, Safari, Firefox
- [ ] Probado en mobile (responsive)
- [ ] localStorage funciona correctamente
- [ ] Todas las rutas funcionan
- [ ] Iconos y assets cargan correctamente
- [ ] Performance > 90 en Lighthouse
- [ ] No hay console.errors

---

## 🐛 Troubleshooting

### Error: "Failed to resolve module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Rutas no funcionan en producción
Agregar `_redirects` en `/public`:
```
/*    /index.html   200
```

### Build muy pesado
- Verifica bundle con visualizer
- Usa code splitting
- Lazy load rutas

---

## 📈 Monitoreo Post-Deploy

### Herramientas gratuitas:
- **Sentry**: Error tracking
- **Hotjar**: Heatmaps y grabaciones
- **Google Analytics**: Métricas de uso
- **Vercel Analytics**: Performance en tiempo real

---

**¡Tu app está lista para el mundo! 🌍🚀**
