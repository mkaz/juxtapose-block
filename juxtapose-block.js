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
			let previewJuxtapose = null
			let imgLeft = null;
			let imgRight = null;
			let actionLeftLabel = 'Add';
			let actionRightLabel = 'Add';

			// mediaUploadControls
			if ( attributes.imageLeft || attributes.imageRight ) {
				if ( attributes.imageLeft ) {
					imgLeft = el( 'img', { src: attributes.imageLeft } );
					actionLeftLabel = 'Change';
				}
				if ( attributes.imageRight ) {
					imgRight = el( 'img', { src: attributes.imageRight } );
					actionRightLabel = 'Change';
				}

				cls = ( attributes.imageLeft && attributes.imageRight ) ? 'juxtapose' : '';
				previewJuxtapose = el( 'div', { className: cls }, [ imgLeft, imgRight ]);
			}

			const editControls = el( 'div', { className: 'edit-controls' }, [
				el( 'div', { className: 'img-edit-left' },
					el( MediaUpload, {
						onSelect: function(el) { setAttributes( { imageLeft: el.url } ); juxtapose.scanPage(); },
						allowedTypes: [ 'image' ],
						render: ( { open } ) => (
							el( IconButton, {
									icon: 'edit',
									onClick: open,
								},
								`${actionLeftLabel} Left Image`
							)
						)
					})
				),
				el( 'div', { className: 'img-edit-right' },
					el( MediaUpload, {
						onSelect: function(el) { setAttributes( { imageRight: el.url } ); juxtapose.scanPage(); },
						allowedTypes: [ 'image' ],
						render: ( { open } ) => (
							el( IconButton, {
									icon: 'edit',
									onClick: open,
								},
								`${actionRightLabel} Right Image`
							)
						)
					})
				)
			]);

			return [
				el( InspectorControls, { key: 'controls' },
					el( 'div', {}, 'Start Position' )
				),
				el( 'div', { className: className },
					[
						previewJuxtapose,
						editControls
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
