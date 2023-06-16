## Wordpress / Bootstrap starter theme with Vite as Build tool

A starter theme, based on underscores from Automattic, that utilises Bootstrap 5x, with Vite as the build tool

Vite is injected into the WP site for HMR and build facilities. 
### See vite-inc.php for details on how that is included
### Also, update the $_local_site_url var in local_site_variable.php to your dev server url
### And update the 'localDevPath' const in vite.config.js to your local dev path

Source for FA assets is in the 'fe-src' directory - we compile out to dist


There is a build for SCSS and any ES6 Based JavaScript that you may want to add to the theme

#### Separate stylesheets are generated for admin styles, and for pure client side

To Run :

Create a theme folder in your WP-content/themes directory
Clone this repo into that folder

#####Run 'NPM Install'
#####Run ' NPM Run Dev'

To compile theme for production, run 'NPM Run Build'

### Please see the JS / SCSS files in respective directories for details on includes, and utilities available

// For Wordpress Templates, the structure is standard as per Underscores - the basics of a them are included only
to keep the theme very un-opinionated in terms of mark-up / template parts

