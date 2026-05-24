# Videos

Carga aquí tus archivos MP4 de videos de técnicas de respiración y paisajes relajantes.

## Archivos esperados:

- `respiracion-4-7-8.mp4` - Técnica clínica para calmar ansiedad
- `relajacion-muscular.mp4` - Libera tensión física
- `paisajes-4k.mp4` - Naturaleza y paisajes calmantes

## Formato recomendado:
- Formato: MP4 (H.264), WebM o MOV
- Resolución: 720p o 1080p
- Bitrate: 2000-5000 kbps
- Codec: H.264 para máxima compatibilidad

## Recomendaciones:
1. Descarga videos de fuentes royalty-free como:
   - Pexels Videos
   - Pixabay Videos
   - YouTube Audio Library (algunos)
   - Freepik Videos

2. O crea propios usando:
   - OBS Studio (gratuito)
   - Kdenlive (gratuito)
   - Adobe Premiere (pago)

3. Comprime/optimiza:
   ```bash
   ffmpeg -i input.mov -c:v libx264 -preset medium -crf 28 -c:a aac -b:a 128k respiracion-4-7-8.mp4
   ```

## Duración recomendada:
- Técnicas: 5-15 minutos
- Paisajes: 15-60 minutos
