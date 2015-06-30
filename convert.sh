#!/bin/bash
ls *.flac | while read -n f; do
    ffmpeg -nostdin -y -i "$f" -c:a libopus -b:a 200k "${f%.flac}.opus" || exit $?
    ffmpeg -nostdin -y -i "$f" -c:a libmp3lame -q 1 "${f%.flac}.mp3" || exit $?
done
