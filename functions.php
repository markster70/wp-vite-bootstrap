<?php
/**
 * usbootstrap functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package usbootstrap
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */

function usbootstrap_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on usbootstrap, use a find and replace
		* to change 'usbootstrap' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'usbootstrap', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'usbootstrap' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'usbootstrap_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}

add_action( 'after_setup_theme', 'usbootstrap_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function usbootstrap_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'usbootstrap_content_width', 640 );
}
add_action( 'after_setup_theme', 'usbootstrap_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function usbootstrap_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'usbootstrap' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'usbootstrap' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'usbootstrap_widgets_init' );


/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

add_filter( 'allowed_block_types_all', 'misha_allowed_block_types', 25, 2 );

function misha_allowed_block_types( $allowed_blocks, $editor_context ) {

    return array(
        'core/image',
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/list-item',
        'core/gallery',
        'core/quote',
        'core/html',
        'core/buttons',
        'core/button',
        'core/columns',
        'core/column',
        'core/file',
        'core/media-text',
        'core/shortcode',
        'core/separator',
        'core/freeform'
    );
}

add_action( 'admin_enqueue_scripts', 'load_admin_style' );

function load_admin_style() {
    wp_enqueue_style( 'admin_css', get_template_directory_uri() . '/dist/assets/css/admin-styles.css', false, _S_VERSION );
}

// Vite / Script Setup

//GET HOSTNAME INFO
$hostname = $_SERVER['SERVER_NAME'];

//VERIFY WHICH ENVIRONMENT THE APP IS RUNNING
switch ($hostname) {
    case 'wp-vite-bootstrap':
        define('WP_ENV', 'development');
        define('WP_DEBUG', true);
        break;;
    default:
        define('WP_ENV', 'production');
        define('WP_DEBUG', false);
}

// Enqueue assets
if (defined('WP_ENV') && WP_ENV === 'development') {
    include "inc/vite-inc.php";
} else {

    function usbootstrap_scripts() {
        wp_enqueue_style( 'usbootstrap-style', get_template_directory_uri() .'/dist/assets/css/index.css', array(), _S_VERSION );

        wp_enqueue_script( 'usbootstrap-main-script', get_template_directory_uri() . '/dist/index.js', array(), _S_VERSION, true );
    }

    add_action( 'wp_enqueue_scripts', 'usbootstrap_scripts' );


    function add_type_to_js_scripts($tag, $handle, $source){
        // Add main js file and all modules to the array.
        $theme_handles = array(
            'ubootstrap-main-script',
        );
        // Loop through the array and filter the tag.
        foreach($theme_handles as $theme_handle) {
            if ($theme_handle === $handle) {
                return $tag = '<script src="'. esc_url($source).'" type="module"></script>';
            } else {
                return $tag;
            }
        }
    }

    if(!is_admin()) {
        add_filter('script_loader_tag', 'add_type_to_js_scripts' , 10, 3);
    }
}
