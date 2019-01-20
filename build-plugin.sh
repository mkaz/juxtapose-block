#!/bin/bash

VERSION=$(jq -r ".version" package.json)

# TODO: add check package.json version and PHP plugin version match

cp -r assets dist/juxtapose-block/
cp editor.css dist/juxtapose-block/
cp juxtapose-block.build.js dist/juxtapose-block/
cp juxtapose.php dist/juxtapose-block/

cd dist
zip -r "juxtapose-block-$VERSION.zip" juxtapose-block
