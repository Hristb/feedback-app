# 🚀 GitHub Pages Deployment Guide

## Deploy a GitHub Pages

### Opción 1: Usar el script npm (Recomendado)

```bash
npm run deploy
```

Este comando:
1. Ejecuta `npm run build` (compila el proyecto)
2. Sube el contenido de `dist/` a la rama `gh-pages`

### Opción 2: Deploy manual

```bash
# 1. Compilar el proyecto
npm run build

# 2. Subir a GitHub Pages
npx gh-pages -d dist
```

## ⚠️ Importante para Firebase

Si usas autenticación de Firebase, debes agregar el dominio de GitHub Pages a Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `feedback-app-d1552`
3. **Authentication** → **Settings** → **Authorized domains**
4. Agrega: `hristb.github.io`

## 🔧 Configuración Actual

El proyecto está configurado para:
- **Base path**: `/feedback-app/`
- **URL producción**: https://hristb.github.io/feedback-app/
- **Branch de deploy**: `gh-pages`

## 📝 Archivos de Configuración

### vite.config.js
```javascript
base: '/feedback-app/'  // Path base para GitHub Pages
```

### package.json
```json
"homepage": "https://hristb.github.io/feedback-app/"
```

### src/App.jsx
```javascript
<Router basename="/feedback-app">
```

## 🐛 Troubleshooting

### Página en blanco
- ✅ Verifica que `base` en vite.config.js coincida con el nombre del repo
- ✅ Asegúrate de que el archivo `.nojekyll` existe en `public/`
- ✅ Verifica que GitHub Pages esté configurado para servir desde `gh-pages`

### Routing no funciona (404 en rutas)
- ✅ El archivo `public/404.html` maneja el routing de SPA
- ✅ El script en `index.html` restaura la ruta correcta

### Firebase Auth no funciona
- ✅ Agrega `hristb.github.io` a dominios autorizados en Firebase

## 📦 Build Local

Para probar el build localmente:

```bash
npm run build
npm run preview
```

Visita: http://localhost:4173/feedback-app/

## 🔄 Workflow Completo

```bash
# 1. Hacer cambios al código
git add .
git commit -m "Descripción de cambios"

# 2. Subir cambios a GitHub
git push origin main

# 3. Deploy a GitHub Pages
npm run deploy
```

## ✅ Verificar Deployment

Después del deploy, espera 1-2 minutos y visita:
https://hristb.github.io/feedback-app/

## 🎯 Modo Desarrollo vs Producción

### Desarrollo (localhost)
```bash
npm run dev
# URL: http://localhost:3000/
```

### Producción (GitHub Pages)
```bash
npm run deploy
# URL: https://hristb.github.io/feedback-app/
```

---

**Nota**: El primer deploy puede tardar unos minutos en aparecer. Verifica en:
GitHub repo → Settings → Pages → que esté configurado para servir desde `gh-pages` branch.
