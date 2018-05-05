#!/bin/bash

mkdir build/node_modules/normalize.css/ -p
cp index.html ./build
./node_modules/.bin/browserify index.js -o bundle.js
cp bundle.js ./build
cp ./node_modules/normalize.css/normalize.css build/node_modules/normalize.css/
