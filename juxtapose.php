<?php
/**
 * Plugin Name:  Juxtapose Block
 * Plugin URI:   https://github.com/mkaz/juxtapose-block
 * Description:  A plugin that adds a Juxtapose Block, allowing side-by-side image comparison.
 * Version:      0.1.0
 * Author:       Marcus Kazmierczak
 * Author URI:   https://mkaz.blog/
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  juxtapose-block
 *
 * @package Juxtapose_Block
 */

/**
 * Enqueue assets for editor portion of Gutenberg
 */
function juxtapose_editor_assets() {
	// Files.
	$block_path = 'juxtapose-block.js';

	// Block.
	wp_enqueue_script(
		'juxtapose-block',
		plugins_url( $block_path, __FILE__ ),
		array( 'wp-blocks', 'wp-editor', 'wp-element', 'wp-components' ),
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

}
add_action( 'enqueue_block_editor_assets', 'juxtapose_editor_assets' );

/**
 * Enqueue assets for viewing posts
 */
function juxtapose_view_assets() {
	// Files.
	$juxtapose_js = 'assets/juxtapose/juxtapose.min.js';
	$juxtapose_css = 'assets/juxtapose/juxtapose.css';

	// Enqueue Juxtapose style.
	wp_enqueue_style(
		'juxtapose-css',
		plugins_url( $juxtapose_css, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $juxtapose_css )
	);

	// Enqueue Juxtapose JS.
	wp_enqueue_script(
		'juxtapose-js',
		plugins_url( $juxtapose_js, __FILE__ ),
		[], // No dependencies.
		filemtime( plugin_dir_path( __FILE__ ) . $juxtapose_js ),
		true // In footer.
	);

}
add_action( 'wp_enqueue_scripts', 'juxtapose_view_assets' );

