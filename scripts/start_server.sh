#!/bin/bash
pkill -f "serve" || true
nohup serve -s /home/ubuntu/react-app -l 3000 > /dev/null 2>&1 &
