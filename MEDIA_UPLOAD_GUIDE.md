# 📱 Cómo Cargar Videos y Audios en ANSISOCIETY

## ✅ Opción 1: Archivos Locales (Recomendado para inicio)

### 1️⃣ Crear las carpetas

Tu servidor esperará archivos en estas ubicaciones:

```
/public/multimedia/
├── audios/
│   ├── lluvia-suave.mp3
│   ├── bosque-amanecer.mp3
│   └── olas-mar.mp3
├── videos/
│   ├── respiracion-4-7-8.mp4
│   ├── relajacion-muscular.mp4
│   └── paisajes-4k.mp4
└── meditaciones/
    ├── atencion-plena.mp3
    ├── respiracion-consciente.mp3
    ├── meditacion-dormir.mp3
    └── autocompasion.mp3
```

### 2️⃣ Cargar los archivos

1. En tu explorador de archivos, navega a:
   ```
   c:\Users\diegu\OneDrive\Documentos\Facultad\8vo Semestre\T_INV_II\ansisociety\public\multimedia\
   ```

2. Copia tus archivos MP3 en `audios/` y `meditaciones/`
3. Copia tus archivos MP4 en `videos/`

### 3️⃣ Los URLs ya están actualizados

El código está listo para usar:
```javascript
url: "/multimedia/audios/lluvia-suave.mp3"
url: "/multimedia/videos/respiracion-4-7-8.mp4"
```

### ⚡ Ventajas:
- ✅ Carga rápida (sin latencia de servidor externo)
- ✅ Control total sobre los archivos
- ✅ Funciona sin conexión si está en caché

### ⚠️ Limitaciones:
- 📦 Aumenta el tamaño del proyecto
- 🐢 Compilación más lenta
- 💾 Máximo recomendado: 500MB total

---

## 🌐 Opción 2: URL Externa (CDN/YouTube)

Puedes usar URLs externas directamente. Ejemplos:

### Para YouTube:
```javascript
const videos = [
  {
    titulo: "Respiración 4-7-8",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    // Reemplazar con tu video real
  }
];
```

Luego usar iframe en lugar de `<video>`:
```jsx
<iframe 
  width="100%" 
  height="180" 
  src={video.url}
  frameBorder="0"
  allowFullScreen
  style={{ borderRadius: "12px" }}
/>
```

### Para Vimeo, Dailymotion, etc:
Igual que YouTube - solo cambiar la URL del embed.

### ✅ Ventajas:
- 📦 Sin almacenamiento local
- 🚀 Carga muy rápida (CDN)
- 📊 Analytics automáticos

### ⚠️ Limitaciones:
- 🌐 Requiere internet
- 🔒 Dependencia de plataforma
- 📺 Publicidad potencial

---

## 🔥 Opción 3: Firebase Storage (Recomendado para producción)

Ya tienes Firebase configurado. Este es el mejor para crecer.

### 1️⃣ Subir archivos a Firebase Storage

```bash
# Instalar Firebase CLI (si no lo tienes)
npm install -g firebase-tools

# Login a Firebase
firebase login

# Iniciar proyecto
firebase init storage
```

### 2️⃣ Crear carpetas en Firebase Console

1. Ve a: https://console.firebase.google.com
2. Selecciona tu proyecto
3. Ve a Storage → Crear carpeta
4. Crea: `multimedia/audios/`, `multimedia/videos/`, `multimedia/meditaciones/`

### 3️⃣ Subir archivos manualmente

En Firebase Console:
1. Sube tus archivos en cada carpeta
2. Firebase genera URLs accesibles

### 4️⃣ Copiar URLs y actualizar el código

Cada archivo genera una URL similar a:
```
https://storage.googleapis.com/tu-proyecto.appspot.com/multimedia/audios/lluvia-suave.mp3?alt=media&token=abc123
```

Actualiza en `recursos/page.tsx`:
```javascript
const audios = [
  {
    titulo: "Lluvia suave para dormir",
    url: "https://storage.googleapis.com/tu-proyecto.appspot.com/multimedia/audios/lluvia-suave.mp3",
  }
];
```

### ✅ Ventajas:
- 📦 Sin límite de almacenamiento (ilimitado con plan pagado)
- 🔐 Integración perfecta con Firebase
- 📊 Analytics automáticos
- 🌍 Distribuido globalmente (CDN)
- 👤 Control de acceso por usuario

### 📝 Firestore Rules para acceso público:

```firestore rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /multimedia/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

---

## ☁️ Opción 4: Cloudinary (Fácil y Poderoso)

Excelente para optimizar imágenes/videos automáticamente.

### 1️⃣ Registrarse en Cloudinary
https://cloudinary.com/users/register/free

### 2️⃣ Subir archivos
Dashboard → Media Library → Upload

### 3️⃣ Obtener URLs y actualizar

```javascript
const audios = [
  {
    titulo: "Lluvia suave para dormir",
    url: "https://res.cloudinary.com/tu-user/video/upload/v1234567890/lluvia-suave.mp3",
  }
];
```

### ✅ Ventajas:
- 🎬 Optimización automática de video/audio
- 📱 Responsive delivery
- 🔄 Transformaciones en tiempo real

---

## 📊 Comparativa de Opciones

| Aspecto | Local | URL Externa | Firebase | Cloudinary |
|--------|-------|------------|----------|-----------|
| Costo | 0€ | Gratis | Gratis+ | Gratis+ |
| Velocidad | Rápida | Muy rápida | Muy rápida | Muy rápida |
| Almacenamiento | 500MB máx | Ilimitado | Ilimitado | Ilimitado |
| Facilidad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Escalabilidad | Baja | Alta | Alta | Muy Alta |
| Control | Total | Bajo | Alto | Alto |

---

## 🚀 Mi Recomendación

### Fase 1 (Desarrollo):
Use **Opción 1 (Local)** para probar rápidamente

### Fase 2 (MVP):
Use **Opción 4 (Cloudinary)** si quiere lo más fácil

### Fase 3 (Producción):
Use **Opción 3 (Firebase)** - ya lo tienes configurado

---

## ✅ Formatos Recomendados

### Audio
- **MP3**: .mp3 (compatible universal)
- **OGG**: .ogg (alternativa)
- **WAV**: .wav (alta calidad)

### Video
- **MP4**: .mp4 (mejor compatibilidad)
- **WebM**: .webm (mejor compresión)
- **MOV**: .mov (alternativa)

### Compresión Recomendada

#### Audio:
```bash
# Convertir a MP3 de calidad media
ffmpeg -i input.wav -b:a 192k output.mp3
```

#### Video:
```bash
# Convertir a MP4 optimizado
ffmpeg -i input.mov -c:v libx264 -preset medium -crf 28 -c:a aac -b:a 128k output.mp4
```

---

## 🧪 Testing

Una vez cargues un archivo, prueba visitando:

### Local:
```
http://localhost:3000/multimedia/audios/lluvia-suave.mp3
```

### Firebase:
```
https://storage.googleapis.com/tu-proyecto.appspot.com/multimedia/audios/lluvia-suave.mp3
```

Debe reproducirse en el navegador sin descargar.

---

## 🔧 Solución de Problemas

### El audio/video no funciona:
1. ✅ Verifica que el archivo existe en la ruta correcta
2. ✅ Comprueba que la URL es accesible en el navegador
3. ✅ Revisa la consola del navegador (F12) para errores
4. ✅ Asegúrate que el formato es soportado

### Lentitud al cargar:
1. 📦 Comprime los archivos (ver sección arriba)
2. 🌐 Usa un CDN (Cloudinary o Firebase Storage)
3. 🎯 Reduce el bitrate del audio/video

### Permiso denegado:
1. 🔒 En Firebase: ajusta las reglas de Storage
2. 🔑 En Cloudinary: verifica las credenciales
3. 🔐 En local: verifica permisos de carpeta

---

## 📚 Recursos

- [MDN: HTML Audio/Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [Firebase Storage Docs](https://firebase.google.com/docs/storage)
- [Cloudinary Upload API](https://cloudinary.com/documentation/upload_widget)
- [FFmpeg (para compresión)](https://ffmpeg.org/)

---

**Próximos pasos:**
1. Elige tu opción preferida
2. Carga los archivos
3. Prueba en `http://localhost:3000/recursos`
4. ¡Disfruta! 🎉
