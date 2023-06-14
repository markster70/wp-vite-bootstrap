## Wordpress / Bootstrap starter theme with Vite as Build tool

A starter theme, based on underscores from Automattic, that utlitises Bootstrap 5x, with Vite as the build tool

Vite is injected into the WP site for HMR and build facilities. 
### See vite-inc.php for details on how that is included
##### ALSO SEE LINE 201 OF FUNCTIONS PHP FOR THE SWITCH BETWEEN DEV AND PRODUCTION

Source for FA assets is in the 'fe-src' directory - we compile out to dist


There is a build for SCSS and any ES6 Based JavaScript that you may want to add to the theme

#### Separate stylesheets are generated for admin styles, and for pure client side

To Run :

Create a theme folder in your WP-content/themes directory
Clone this repo into that folder
Run 'NPM Install'
Run ' NPM Run Dev'

To compile theme for production, run 'NPM Run Build'

