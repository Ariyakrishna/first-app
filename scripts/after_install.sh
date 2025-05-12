#!/bin/bash

# Variables
APP_DIR="/var/www/react-app"

echo "Running after_install.sh..."

# Create application directory if it doesn't exist
if [ ! -d "$APP_DIR" ]; then
    echo "Creating application directory at $APP_DIR..."
    sudo mkdir -p "$APP_DIR"
fi

# Set ownership and permissions
sudo chown -R ubuntu:ubuntu "$APP_DIR"
sudo chmod -R 755 "$APP_DIR"

# Clean previous deployment (optional)
echo "Cleaning previous build..."
sudo rm -rf "$APP_DIR"/*

# Move new build files (CodeDeploy copies to /tmp/codedeploy...)
echo "Copying new build files..."
sudo cp -R /tmp/codedeploy-agent/deployment-root/*/deployment-archive/build/* "$APP_DIR"

# Set permissions again
sudo chown -R ubuntu:ubuntu "$APP_DIR"
sudo chmod -R 755 "$APP_DIR"

echo "after_install.sh completed successfully."
