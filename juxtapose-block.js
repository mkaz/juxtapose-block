/**
 * Juxtapose Block
 * A block that allows inserting side-by-side image comparison.
 * Uses JuxtaposeJS from KnightLab.
 * https://github.com/NUKnightLab/juxtapose
 */

/**
 * WordPress dependencies
 */
( function(wp) {
	const  el = wp.element.createElement;
    const registerBlockType = wp.blocks.registerBlockType;
	const { InspectorControls, MediaUpload } = wp.editor;
	const IconButton = wp.components.IconButton;

	registerBlockType( 'mkaz/juxtapose-block', {

		title: 'Juxtapose Images',

		icon: 'image-flip-horizontal',

		category: 'layout',

		attributes: {
			imageLeft: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.imgLeft',
			},
			imageRight: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.imgRight',
			},
		},

		edit({ attributes, setAttributes, className }) {
			return [
				el( InspectorControls, { key: 'controls' },
					el( 'div', {}, 'Start Position' )
				),
				el( 'div', { className: className },
					[
						el( MediaUpload, {
							onSelect: function(el) { setAttributes( { imageLeft: el.url } ); },
							allowedTypes: [ 'image' ],
							render: ( { open } ) => (
								el( IconButton, {
										label: 'Add image',
										icon: 'edit',
										onClick: open,
									}
								)
							)
						}),
						el( MediaUpload, {
							onSelect: function(el) { setAttributes( { imageRight: el.url } ); },
							allowedTypes: [ 'image' ],
							render: ( { open } ) => (
								el( IconButton, {
										label: 'Add image',
										icon: 'edit',
										onClick: open,
									}
								)
							)
						})
					]
				)
			];
		},

		save({ attributes }) {
			return el(
				'div',
				{ className: 'juxtapose' }, [
					el( 'img', { src: attributes.imageLeft, className: 'imgLeft' }, '' ),
					el( 'img', { src: attributes.imageRight, className: 'imgRight' }, '' )
				]
			);
		}
	});

})(window.wp);
