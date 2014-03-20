#!/bin/bash

ffmpeg -i $1 \
    -strict experimental \
    -b 384k \
    -vcodec mpeg4 \
    -flags +loop+mv4 \
    -cmp 256 \
    -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 \
    -subq 7 \
    -trellis 1 \
    -refs 5 \
    -bf 0 \
    -flags2 +mixed_refs \
    -coder 0 \
    -me_range 16 \
    -g 250 \
    -keyint_min 25 \
    -sc_threshold 40 \
    -i_qfactor 0.71 \
    -qmin 10 \
    -qmax 51 \
    -qdiff 4 \
    -acodec aac \
    -ac 2 \
    -ab 128k \
    -ar 44100 \
    "$1.normalized.mp4"

#-acodec libfaac \
