#!/bin/bash

ffmpeg -i $1 \
    -vcodec libx264 \
    -acodec libvo_aacenc \
    -vprofile baseline \
    -preset fast \
    -b:v 250k \
    -maxrate 250k \
    -bufsize 500k \
    -vf scale=-1:360 \
    -threads 0 \
    -ab 96k \
    "$1.normalized.mp4"
