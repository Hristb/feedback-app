# 📋 Checklist de Deploy a GitHub Pages

## ✅ Pasos Completados

1. ✅ **Configurado vite.config.js** con `base: '/feedback-app/'`
2. ✅ **Agregado basename** al Router: `<Router basename="/feedback-app">`
3. ✅ **Creado public/404.html** para SPA routing
4. ✅ **Actualizado index.html** con script de redirect
5. ✅ **Instalado gh-pages**: `npm install --save-dev gh-pages`
6. ✅ **Agregado script deploy** en package.json
7. ✅ **Creado .nojekyll** para evitar procesamiento Jekyll
8. ✅ **Build exitoso** sin errores

## 🚀 Cómo Hacer Deploy

### Comando único:
```bash
npm run deploy
```

Esto hará automáticamente:
1. `npm run build` - Compila el proyecto
2. `gh-pages -d dist` - Sube a GitHub Pages

## ⚠️ IMPORTANTE: Configurar Firebase

### Para que funcione en GitHub Pages, DEBES hacer esto:

1. Ve a: https://console.firebase.google.com/
2. Selecciona proyecto: `feedback-app-d1552`
3. **Authentication** → **Settings** (pestaña superior)
4. Scroll hasta **Authorized domains**
5. Click **Add domain**
6. Agrega: `hristb.github.io`
7. Guarda

**Sin este paso, Google Sign-In NO funcionará en producción.**

## 🔍 Verificar Configuración de GitHub

En tu repositorio de GitHub:

1. Ve a: **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` / `root`
4. Guarda

## 📱 Probar Localmente Antes de Deploy

```bash
# Compilar
npm run build

# Ver preview local (simula producción)
npm run preview
```

Abre: http://localhost:4173/feedback-app/

## 🐛 Solución de Problemas

### Problema: Página en blanco
**Causas posibles:**
- ❌ Base path incorrecto en vite.config.js
- ❌ Falta basename en Router
- ❌ No existe .nojekyll

**Solución:**
```bash
# Verificar archivos
ls public/.nojekyll      # Debe existir
cat vite.config.js       # base: '/feedback-app/'
grep basename src/App.jsx # basename="/feedback-app"
```

### Problema: 404 en rutas (/home, /squad, etc.)
**Causa:** GitHub Pages no sabe que es una SPA

**Solución:** Ya está incluida con:
- `public/404.html` que redirige
- Script en `index.html` que restaura la ruta

### Problema: Firebase Auth error
**Causa:** Dominio no autorizado

**Solución:**
1. Firebase Console
2. Authentication → Settings → Authorized domains
3. Agregar `hristb.github.io`

### Problema: Modo invitado funciona, pero Google/Email no
**Causa:** Firebase no está configurado

**Necesitas habilitar en Firebase:**
1. Authentication → Sign-in method
2. Habilitar "Google"
3. Habilitar "Email/Password"
4. Agregar dominio autorizado (ver arriba)

## 📊 Después del Deploy

El deploy tarda ~2 minutos en estar disponible.

**Verificar:**
1. https://hristb.github.io/feedback-app/ (debe cargar la app)
2. Probar login como invitado (debe funcionar)
3. Crear squad (debe funcionar con Firebase)
4. Probar Google Sign-In (requiere configuración Firebase)

## 🔄 Workflow Completo

```bash
# 1. Desarrollo local
npm run dev               # http://localhost:3000/

# 2. Probar build local
npm run build
npm run preview          # http://localhost:4173/feedback-app/

# 3. Commit cambios
git add .
git commit -m "Nuevas features"
git push origin main

# 4. Deploy a GitHub Pages
npm run deploy

# 5. Verificar en producción
# https://hristb.github.io/feedback-app/
```

## 📝 Notas Finales

- **Modo invitado**: Funciona siempre (usa localStorage)
- **Google/Email login**: Requiere configuración Firebase
- **Firebase Firestore**: Funciona siempre (squads en tiempo real)
- **Historial personal**: Se guarda por usuario (uid único)

## ✨ Características que Funcionarán

✅ Login como invitado
✅ Crear squads
✅ Unirse a squads
✅ Sistema de puntos
✅ Historial de squads
✅ Votaciones
✅ Resultados
✅ Navegación entre páginas
✅ Persistencia de datos (Firebase)

⚠️ Requiere configuración adicional:
- Google Sign-In (agregar dominio en Firebase)
- Email/Password (habilitar en Firebase)

---

**¿Todo listo?** Ejecuta: `npm run deploy` 🚀
