#!/bin/bash

function publish_demo {
  echo -e "\e[33mCleaning...\e[39m"

  git checkout gh-pages
  git merge master

  sudo rm -rf node_modules
  sudo rm -rf scripts
  sudo rm -rf styles
  sudo rm -rf images
  sudo rm -rf package.json
  sudo rm -rf Gruntfile.js
  sudo rm -rf index.html
}

cmd=$1
$cmd "$@"