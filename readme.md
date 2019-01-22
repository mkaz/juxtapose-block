
## Juxtapose Block

A WordPress plugin which adds a block that enables you to create a side-by-side comparison of two images.
The block is built off the [JuxtaposeJS library](https://juxtapose.knightlab.com/) by Knight Lab.

Example:

![Screenshot](screenshot.png)

### Usage

Install juxtapose-block plugin to your WordPress plugins directory and activate. You can download a zip from the [releases page](https://github.com/mkaz/juxtapose-block/releases) and upload to install.

* Add block to your post using the (+) block inspector
* Select before and after images, works best if they are the same size
* Select Orientation (Above/Below, Side-by-side) in Block settings


### Development

The juxtapose-block uses a standard npm build process.

Development build w/ watch:
```
npm install
npm run dev
```

Production build:
```
npm install
npm run build
```

TODO: add linting, tests, and other "real" things.

### Colophon

- Uses JuxtaposeJS from Knight Lab, https://juxtapose.knightlab.com/


### License

Licensed under <a href="https://opensource.org/licenses/GPL-2.0"> GPL 2.0 or later </a>.

