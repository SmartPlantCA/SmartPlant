#!/bin/bash
cd ../web/
npm i
npm run build
cd build
sudo rm -rf /var/www/html/*
sudo mv * /var/www/html/
git reset --hard
echo "Deploy done"
