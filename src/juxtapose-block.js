/**
 * Juxtapose Block
 * A block that allows inserting side-by-side image comparison.
 * Uses JuxtaposeJS from KnightLab.
 * https://github.com/NUKnightLab/juxtapose
 */


// WordPress dependencies
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaPlaceholder } = wp.editor;
const { TextControl } = wp.components;
const { Fragment } = wp.element;

registerBlockType( 'mkaz/juxtapose-block', {

	title: 'Juxtapose Images',

	icon: 'image-flip-horizontal',

	category: 'layout',

	attributes: {
		imageBefore: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.imgBefore',
		},
		imageAfter: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.imgAfter',
		},
	},

	edit: ({ attributes, setAttributes, className }) => {
		const { imageBefore, imageAfter } = attributes;

		// if both are defined, add juxtaspose class
		// the juxtapose library uses class when page is scanned
		// to find the images and apply the side-by-side magic
		cls = ( imageBefore && imageAfter ) ? 'juxtapose' : 'controls';

		return (
			<Fragment>
				<InspectorControls key='controls'>
					<div> Start Position </div>
				</InspectorControls>
				<div className={cls}>

					{ imageBefore ? (
						<img src={imageBefore} />
					) : (
						<div className='img-edit-before'>
							<MediaPlaceholder
								onSelect = {
									( el ) => {
										setAttributes( { imageBefore: el.url } );
										juxtapose.scanPage();
									}
								}
								allowedTypes = {[ 'image' ]}
								labels ={ {title: 'Image Before'} }
							/>
						</div>
					)}

					{ imageAfter ? (
						<img src={imageAfter} />
					) : (
						<div className='img-edit-after'>
							<MediaPlaceholder
								onSelect = {
									( el ) => {
										setAttributes( { imageAfter: el.url } );
										juxtapose.scanPage();
									}
								}
								allowedTypes = {[ 'image' ]}
								labels = { {title: 'Image After'} }
							/>
						</div>
					)}
				</div>
				<div className='caption'>
					<TextControl
						placeholder="Caption here..."
					/>
				</div>
			</Fragment>
		);
	},

	save: ({ attributes }) => {
		return (
			<div className='juxtapose'>
				<img src={attributes.imageBefore} className='imgBefore'/>
				<img src={attributes.imageAfter} className= 'imgAfter'/>
			</div>
		);
	}
});

