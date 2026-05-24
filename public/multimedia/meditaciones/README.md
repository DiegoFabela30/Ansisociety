# Meditaciones

Carga aquí tus archivos MP3 de meditaciones guiadas y ejercicios de respiración.

## Archivos esperados:

- `atencion-plena.mp3` - Introducción al mindfulness
- `respiracion-consciente.mp3` - Ancla en la respiración
- `meditacion-dormir.mp3` - Guía nocturna para dormir
- `autocompasion.mp3` - Cultiva relación amable contigo mismo

## Formato recomendado:
- Formato: MP3 o OGG
- Bitrate: 128 kbps (voz se escucha bien)
- Duración: 7-20 minutos
- Mono o Estéreo ambos funcionan

## Recomendaciones:
1. Descarga meditaciones gratuitas de:
   - Insight Timer
   - Calm (algunas gratis)
   - UCLA Mindful
   - Plataformas de yoga

2. O graba propias:
   - Micrófono: USB o integrado
   - Software: Audacity (gratuito)
   - Voz clara y calmada

3. Optimiza tamaño:
   ```bash
   ffmpeg -i input.wav -b:a 128k atencion-plena.mp3
   ```

## Tips para buena calidad:
- Habla lentamente y con claridad
- Fondo silencioso o con sonidos naturales bajos
- Pasos claros: inicio, guía, final
- Duración consistente para cada tipo
