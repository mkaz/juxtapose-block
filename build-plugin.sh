#!/bin/bash

VERSION=$(jq -r ".version" package.json)

# TODO: add check package.json version and PHP plugin version match

rm -rf dist/*
mkdir -p dist/juxtapose-block/assets
mkdir -p dist/juxtapose-block/build
cp -r assets/juxtapose dist/juxtapose-block/assets/
cp editor.css dist/juxtapose-block/
cp build/index.js dist/juxtapose-block/build/
cp juxtapose.php dist/juxtapose-block/

cd dist
zip -r "juxtapose-block-$VERSION.zip" juxtapose-block
