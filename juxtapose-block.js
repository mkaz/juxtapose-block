/**
 * Juxtapose Block
 * A block that allows inserting side-by-side image comparison.
 * Uses JuxtaposeJS from KnightLab.
 * https://github.com/NUKnightLab/juxtapose
 */

( function(wp) {

	// WordPress dependencies
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
			let previewJuxtapose = null
			let imgLeft = null;
			let imgRight = null;
			let controlsLeft = null;
			let controlsRight = null;

			// if either attribute is defined, show image(s) selected
			if ( attributes.imageLeft || attributes.imageRight ) {
				if ( attributes.imageLeft ) {
					imgLeft = el( 'img', { src: attributes.imageLeft } );
				}
				if ( attributes.imageRight ) {
					imgRight = el( 'img', { src: attributes.imageRight } );
				}

				// if both attributes defined, add juxtapose class which triggers view
				cls = ( attributes.imageLeft && attributes.imageRight ) ? 'juxtapose' : '';
				previewJuxtapose = el( 'div', { className: cls }, [ imgLeft, imgRight ]);
			}

			// show media upload button if left image not defined
			if ( ! attributes.imageLeft ) {
				controlsLeft = el( MediaUpload, {
					onSelect: function(el) { setAttributes( { imageLeft: el.url } ); juxtapose.scanPage(); },
					allowedTypes: [ 'image' ],
					render: ( { open } ) => (
						el( IconButton, {
								icon: 'edit',
								onClick: open,
							},
							'Add Left Image'
						)
					)
				});
			}

			// show media upload button if right image not defined
			if ( ! attributes.imageRight ) {
				controlsRight = el( MediaUpload, {
					onSelect: function(el) { setAttributes( { imageRight: el.url } ); juxtapose.scanPage(); },
					allowedTypes: [ 'image' ],
					render: ( { open } ) => (
						el( IconButton, {
								icon: 'edit',
								onClick: open,
							},
							'Add Right Image'
						)
					)
				});
			}

			const editControls = el( 'div', { className: 'edit-controls' }, [
				el( 'div', { className: 'img-edit-left' }, controlsLeft ),
				el( 'div', { className: 'img-edit-right' }, controlsRight )
			]);

			return [
				el( InspectorControls, { key: 'controls' },
					el( 'div', {}, 'Start Position' )
				),
				el( 'div', { className: className }, [
						previewJuxtapose,
						editControls
				])
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
