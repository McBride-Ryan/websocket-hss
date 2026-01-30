#!/bin/bash

# Optimizations
php artisan migrate --force
php artisan config:clear

# Background processes
php artisan serve --host=0.0.0.0 --port=8000 &
npm run dev &
php artisan reverb:start --host=0.0.0.0 --port=8081 --debug &
php artisan schedule:work &
php artisan queue:work --database=redis --queue=default &

wait -n
exit $?
