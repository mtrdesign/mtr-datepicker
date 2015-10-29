#!/bin/bash

function publish {
  echo -e "\e[33mGo to gh-pages branch\e[39m"

  git checkout gh-pages
  git merge master

  echo -e "\e[33mCleaning...\e[39m"

  sudo rm -rf node_modules
  sudo rm -rf scripts
  sudo rm -rf images
  sudo rm -rf package.json
  sudo rm -rf Gruntfile.js

  echo -e "\e[33mPushing...\e[39m"
  git add -A
  git commit
  git push origin gh-pages
  git checkout master

  echo -e "\e[33mPublishing finished successfully\e[39m"
}

cmd=$1
$cmd "$@"