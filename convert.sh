#!/bin/bash
ls *.flac | while read -r f; do
    ffmpeg -nostdin -y -i "$f" -c:a libopus -b:a 160k "${f%.flac}.opus" || exit $?
    ffmpeg -nostdin -y -i "$f" -c:a libmp3lame -q 3 "${f%.flac}.mp3" || exit $?
done
