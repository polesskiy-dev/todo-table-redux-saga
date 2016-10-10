#!/bin/bash
rm ./todo.zip
zip -r --exclude=./node_modules/* --exclude=*.git* --exclude=./todo.zip todo.zip ./
rm -rf ./todo
