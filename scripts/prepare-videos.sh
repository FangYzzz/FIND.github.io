#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p static/videos/web static/images/task-posters
for name in find-overview task_{1..8}; do
  source_file="static/videos/$name.mp4"
  web_file="static/videos/web/$name.mp4"
  temp_file="static/videos/web/$name.tmp.mp4"
  if [[ ! -f "$source_file" ]]; then
    printf 'Missing source: %s\n' "$source_file" >&2
    exit 1
  fi
  codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 "$source_file")
  pixel_format=$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$source_file")
  audio_codec=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$source_file")
  if [[ "$codec" == h264 && "$pixel_format" == yuv420p && "$audio_codec" == aac ]]; then
    cp "$source_file" "$temp_file"
  else
    ffmpeg -y -v error -i "$source_file" -map 0:v:0 -map 0:a:0? \
      -c:v libx264 -preset veryfast -crf 22 -pix_fmt yuv420p -profile:v high -level 4.2 \
      -c:a aac -b:a 128k -movflags +faststart "$temp_file"
  fi
  web_codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt -of csv=p=0 "$temp_file")
  if [[ "$web_codec" != h264,yuv420p ]]; then
    printf 'Unexpected output codec for %s: %s\n' "$name" "$web_codec" >&2
    exit 1
  fi
  mv "$temp_file" "$web_file"
  if [[ "$name" == task_* ]]; then
    ffmpeg -y -v error -ss 0.1 -i "$web_file" -frames:v 1 -vf 'scale=960:-2' -q:v 3 "static/images/task-posters/$name.jpg"
  fi
  printf 'Ready: %s\n' "$web_file"
done
