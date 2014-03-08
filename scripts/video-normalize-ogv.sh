#!/bin/bash

ffmpeg -i $1 \
    -vcodec libtheora \
    -vprofile baseline \
    -preset slow \
    -b:v 250k \
    -maxrate 250k \
    -bufsize 500k \
    -vf scale=-1:360 \
    -threads 0 \
    -acodec libvorbis \
    -ab 96k \
    "$1.normalized.ogv"
