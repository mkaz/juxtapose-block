/**
 * Juxtapose Block
 * A block that allows inserting side-by-side image comparison.
 * Uses JuxtaposeJS from KnightLab.
 * https://github.com/NUKnightLab/juxtapose
 */


// WordPress dependencies
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.editor;
const { IconButton } = wp.components;
const { Fragment } = wp.element;

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

	edit: ({ attributes, setAttributes, className }) => {
		const { imageLeft, imageRight } = attributes;

		// if both are defined, add juxtaspose class
		// the juxtapose library uses class when page is scanned
		// to find the images and apply the side-by-side magic
		cls = ( imageLeft && imageRight ) ? 'juxtapose' : '';

		return (
			<Fragment>
				<InspectorControls key='controls'>
					<div> Start Position </div>
				</InspectorControls>
				<div className={cls}>

					{ imageLeft ? (
						<img src={imageLeft} />
					) : (
						<div className='img-edit-left'>
							<MediaUpload
								onSelect = {( el ) => { setAttributes( { imageLeft: el.url } ); juxtapose.scanPage(); }}
								allowedTypes = {[ 'image' ]}
								render = {( { open } ) => (
									<IconButton icon='edit' onClick={open}> Add Left Image </IconButton>
								)} />
						</div>
					)}

					{ imageRight ? (
						<img src={imageRight} />
					) : (
						<div className='img-edit-right'>
							<MediaUpload
								onSelect = {( el ) => { setAttributes( { imageRight: el.url } ); juxtapose.scanPage(); }}
								allowedTypes = {[ 'image' ]}
								render = {( { open } ) => (
									<IconButton icon='edit' onClick={open}> Add Right Image </IconButton>
								)} />
						</div>
					)}
				</div>
				<div> Spacer to Select Block </div>
			</Fragment>
		);
	},

	save: ({ attributes }) => {
		return (
			<div className='juxtapose'>
				<img src={attributes.imageLeft} className='imgLeft'/>
				<img src={attributes.imageRight} className= 'imgRight'/>
			</div>
		);
	}
});

