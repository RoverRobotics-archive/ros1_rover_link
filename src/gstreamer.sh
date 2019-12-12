#!/usr/bin/env bash
gst-launch-1.0 -v v4l2src device=/dev/video1 ! h264parse ! rtph264pay config-interval=1 pt=96 ! udpsink host=172.20.128.2 port=8004
