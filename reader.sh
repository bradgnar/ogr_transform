#!/bin/bash

echo "script starting"

find /home/bradgnar/ENC_ROOT/US5NC18M/ -name "*.00*" | xargs -0  

echo "script ended"