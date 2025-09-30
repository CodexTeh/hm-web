#!/bin/bash

set -e  # Exit immediately if any command fails
git pull origin main
/home/hmawani/.asdf/shims/yarn
/home/hmawani/.asdf/shims/yarn build

# Copy the built files to the web directory
cp -r /home/hmawani/app/hm-web/build/* /var/www/hmawani-web/
echo "Deployement successfull! Refresh your browser!"
