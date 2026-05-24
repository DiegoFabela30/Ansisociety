# Audios

Carga aquí tus archivos MP3 de música relajante y sonidos de naturaleza.

## Archivos esperados:

- `lluvia-suave.mp3` - Sonidos de naturaleza para relajar
- `bosque-amanecer.mp3` - Pájaros y brisa matutina
- `olas-mar.mp3` - Ritmo constante del océano

## Formato recomendado:
- Formato: MP3, OGG o WAV
- Bitrate: 128-192 kbps (balance entre calidad y tamaño)
- Duración: Mencionar en el nombre o metadatos

## Recomendaciones:
1. Descarga audios de fuentes de royalty-free como:
   - Unsplash Sound
   - Pixabay Music
   - Freepik Sounds
   - YouTube Audio Library

2. O crea propios usando Audacity (gratuito)

3. Comprime si es necesario:
   ```bash
   ffmpeg -i input.wav -b:a 192k lluvia-suave.mp3
   ```
