#!/bin/bash
# install nginx if not installed
sudo apt update
sudo apt install nginx -y

# configure Nginx (optional if already configured)
sudo cp /var/www/react-app/nginx.conf /etc/nginx/sites-available/react-app
sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
