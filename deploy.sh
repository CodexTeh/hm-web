#!/bin/bash

set -e  # Exit immediately if any command fails

# 1. Pull latest code
git pull origin main

# 2. Build the project
/home/hmawani/.asdf/shims/yarn
/home/hmawani/.asdf/shims/yarn build

# 3. Create a new temporary deploy directory
NEW_DIR="/var/www/hmawani-web-$(date +%s)"
mkdir -p "$NEW_DIR"

# 4. Copy the built files into the new directory
cp -r /home/hmawani/app/hm-web/build/* "$NEW_DIR/"

# 5. Swap the directories atomically
# Assuming /var/www/hmawani-web is currently live
mv /var/www/hmawani-web /var/www/hmawani-web-old
mv "$NEW_DIR" /var/www/hmawani-web

# 6. Remove old version (optional)
rm -rf /var/www/hmawani-web-old

echo "Deployment successful! Refresh your browser!"
