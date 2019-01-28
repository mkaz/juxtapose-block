/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Juxtapose Block
 * A block that allows inserting side-by-side image comparison.
 * Uses JuxtaposeJS from KnightLab.
 * https://github.com/NUKnightLab/juxtapose
 */

// WordPress dependencies
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    MediaPlaceholder = _wp$editor.MediaPlaceholder;
var _wp$components = wp.components,
    SelectControl = _wp$components.SelectControl,
    TextControl = _wp$components.TextControl;
var Fragment = wp.element.Fragment;


registerBlockType('mkaz/juxtapose-block', {

	title: 'Juxtapose Images',

	icon: 'image-flip-horizontal',

	category: 'layout',

	attributes: {
		imageBefore: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.imgBefore'
		},
		imageAfter: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.imgAfter'
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption'
		},
		orientation: {
			type: 'string'
		}
	},

	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    setAttributes = _ref.setAttributes,
		    className = _ref.className;
		var imageBefore = attributes.imageBefore,
		    imageAfter = attributes.imageAfter,
		    caption = attributes.caption,
		    orientation = attributes.orientation;

		// if both are defined, add juxtaspose class
		// the juxtapose library uses class when page is scanned
		// to find the images and apply the side-by-side magic

		cls = imageBefore && imageAfter ? 'juxtapose' : 'controls';

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				InspectorControls,
				{ key: 'controls' },
				wp.element.createElement(
					'h4',
					null,
					' Orientation '
				),
				wp.element.createElement(SelectControl, {
					value: orientation,
					options: [{ label: 'Side by Side', value: 'horizontal' }, { label: 'Above and Below', value: 'vertical' }],
					onChange: function onChange(val) {
						setAttributes({ orientation: val });
						// need slight delay so markup can be updated before
						// scan page gets triggered
						setTimeout(function () {
							juxtapose.scanPage();
						}, 100);
					}
				})
			),
			wp.element.createElement(
				'div',
				{ className: cls, 'data-mode': orientation },
				imageBefore ? wp.element.createElement('img', { src: imageBefore }) : wp.element.createElement(
					'div',
					{ className: 'img-edit-before' },
					wp.element.createElement(MediaPlaceholder, {
						onSelect: function onSelect(el) {
							setAttributes({ imageBefore: el.url });
							juxtapose.scanPage();
						},
						allowedTypes: ['image'],
						labels: { title: 'Image Before' }
					})
				),
				imageAfter ? wp.element.createElement('img', { src: imageAfter }) : wp.element.createElement(
					'div',
					{ className: 'img-edit-after' },
					wp.element.createElement(MediaPlaceholder, {
						onSelect: function onSelect(el) {
							setAttributes({ imageAfter: el.url });
							juxtapose.scanPage();
						},
						allowedTypes: ['image'],
						labels: { title: 'Image After' }
					})
				)
			),
			wp.element.createElement(
				'div',
				{ className: 'caption' },
				wp.element.createElement(TextControl, {
					placeholder: 'Write caption\u2026',
					onChange: function onChange(val) {
						return setAttributes({ caption: val });
					},
					value: caption
				})
			)
		);
	},

	save: function save(_ref2) {
		var attributes = _ref2.attributes;

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'figure',
				{ className: 'juxtapose', 'data-mode': attributes.orientation },
				wp.element.createElement('img', { src: attributes.imageBefore, className: 'imgBefore' }),
				wp.element.createElement('img', { src: attributes.imageAfter, className: 'imgAfter' })
			),
			wp.element.createElement(
				'figcaption',
				null,
				attributes.caption
			)
		);
	}
});

/***/ })
/******/ ]);