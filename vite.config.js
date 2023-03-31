// View your website at your own local server
// for example http://vite-php-setup.test

// http://localhost:3000 is serving Vite on development
// but accessing it directly will be empty

// IMPORTANT image urls in CSS works fine
// BUT you need to create a symlink on dev server to map this folder during dev:
// ln -s {path_to_vite}/src/assets {path_to_public_html}/assets
// on production everything will work just fine

//import vue from '@vitejs/plugin-vue'
import liveReload from 'vite-plugin-live-reload';
const fs = require('fs');
import { defineConfig, loadEnv } from 'vite';
const { resolve } = require('path');

const localDevPath = 'http://wp-vite-bootstrap:8888/';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());
    //const envScssPath = env.VITE_CSS_VARS_PATH;

    return {
        // config
        root: '',
        base: process.env.NODE_ENV === 'development' ? '/' : '/dist/',
        plugins:[liveReload([__dirname + '/**/*.php'])],
        build: {
            outDir: resolve(__dirname, './dist'),
            emptyOutDir: true,
//
         // esbuild target
            target: 'es2018',
            // output dir for production build
            cssCodeSplit: env.mode === 'development' ? false : undefined,
            // have this turned off for now as the paths for dynamic imports causes 404'ing
            modulePreload: false,
            // emit manifest so PHP can find the hashed files
            manifest: false,
            // our entry
            rollupOptions: {
                input: {
                    index: resolve(__dirname + '/fe-src/js/index.js'),
                },
                // note doing work without the hashes here until we cna figure out how to ad dynamic hashes with wp-enqueue scripts
                output: {
                    //minifyInternalExports : false,
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name][hash].js',
                    assetFileNames: (assetInfo) => {
                        let extType = assetInfo.name.split('.');
                        let extSuffix = extType[extType.length - 1];
                        return `assets/${extSuffix}/[name][extname]`;
                    },
                },

                manualChunks: {
                    'css/admin-styles': ['admin-styles/custom-admin-styles.scss']
                    //'css/admin-styles': ['admin-styles/custom-admin-styles.scss`]
                    // 'js/brunswick-utility-scripts-': [
                    //     `${srcDir}/scripts/utility-scripts/canHover.js`,
                    //     `${srcDir}/scripts/utility-scripts/domHelpers.js`,
                    //     `${srcDir}/scripts/utility-scripts/prefersReducedMotion.js`,
                    //     `${srcDir}/scripts/utility-scripts/resizeActions.js`,
                    // ],
                    // 'css/fa-styles': [`${srcDir}/sass/fa-styles.scss`],
                    // 'style-ltr': [`${srcDir}/sass/base-styles-ltr.scss`],
                    // 'css/style-rtl': [`${srcDir}/sass/base-styles-rtl.scss`],

                    // 'css/admin-styles-ltr': [`${srcDir}/sass/admin-styles-ltr.scss`],
                    // 'js/brunswick-gsap-': [
                    //     `${srcDir}/scripts/third-party-components/gsap-imports.js`,
                    // ],
                    // 'js/brunswick-bootstrap-': [
                    //     `${srcDir}/scripts/third-party-components/bootstrap-imports.js`,
                    // ],
                },
            },

            // minifying switch
            minify: true,
            write: true,
        },

        server: {
            // required to load scripts from custom host
            cors: true,

            // we need a strict port to match on PHP side
            // change freely, but update in your functions.php to match the same port
            strictPort: true,
            port: 3000,
            // we use the server.opn config to open whichever local site we are running
            open: localDevPath,
            // serve over http
            https: false,

            // serve over httpS
            // to generate localhost certificate follow the link:
            // https://github.com/FiloSottile/mkcert - Windows, MacOS and Linux supported - Browsers Chrome, Chromium and Firefox (FF MacOS and Linux only)
            // installation example on Windows 10:
            // > choco install mkcert (this will install mkcert)
            // > mkcert -install (global one time install)
            // > mkcert localhost (in project folder files localhost-key.pem & localhost.pem will be created)
            // uncomment below to enable https
            //https: {
            //  key: fs.readFileSync('localhost-key.pem'),
            //  cert: fs.readFileSync('localhost.pem'),
            //},

            hmr: {
                host: 'localhost',
                protocol: 'ws',
                //port: 443
            },
        },

        // required for in-browser template compilation
        // https://v3.vuejs.org/guide/installation.html#with-a-bundler
        resolve: {
            unsafeCache: true,
            modules: [resolve(__dirname, '/node_modules')],
            alias: [
                // when adding/editing make sure to update jsconfig.json
                // so VS Code picks up the paths in intellisense
                // { find: 'Global', replacement: '/views/partials/global' },
                // //Global: resolve(__dirname, 'views/partials/global'),
                // { find: 'Blocks', replacement: '/views/partials/block' },
                // //Blocks: resolve(__dirname, 'views/partials/block'),
                // { find: 'Contents', replacement: '/views/partials/content' },
                // //Contents: resolve(__dirname, '/views/partials/content'),
                // { find: 'Core', replacement: '/ui-dev/scripts/core' },
                // //Core: resolve(__dirname, '/ui-dev/scripts/core'),
                // { find: 'Admin', replacement: '/views/partials/admin' },
                // //Admin: resolve(__dirname, '/ui-dev/scripts/admin'),
                // { find: 'Singular', replacement: '/views/singular' },
                // //Singular: resolve(__dirname, 'views/singular'),
                // { find: 'Views', replacement: '/views' },
                // //Views: resolve(__dirname, 'views'),
                // { find: 'CssEnvVars', replacement: `/ui-dev/sass/environment/${envScssPath}` },
                // //'@@CssEnvVars' : resolve(__dirname, `/ui-dev/sass/environment/${envScssPath}`),
                // { find: '@js', replacement: '/ui-dev/scripts/' },
                // { find: 'vueApps', replacement: '/ui-dev/vue-applications' },
                // { find: '@faIcons', replacement: '/ui-dev/sass/core-project/fa-icons-subset/scss-partials' }
            ],
        },
    };
});


// https://vitejs.dev/config
// export default {
//
//     plugins: [
//         //vue(),
//         liveReload(__dirname+'/**/*.php')
//     ],
//
//     // config
//     root: '',
//     base: process.env.NODE_ENV === 'development'
//         ? '/'
//         : '/dist/',
//
//     build: {
//         // output dir for production build
//         outDir: resolve(__dirname, './dist'),
//         emptyOutDir: true,
//
//         // emit manifest so PHP can find the hashed files
//         manifest: true,
//
//         // esbuild target
//         target: 'es2018',
//
//         // our entry
//         rollupOptions: {
//             input: {
//                 main: resolve( __dirname + '/main.js')
//             },
//
//             /*
//             output: {
//                 entryFileNames: `[name].js`,
//                 chunkFileNames: `[name].js`,
//                 assetFileNames: `[name].[ext]`
//             }*/
//         },
//
//         // minifying switch
//         minify: true,
//         write: true
//     },
//
//     server: {
//
//         // required to load scripts from custom host
//         cors: true,
//
//         // we need a strict port to match on PHP side
//         // change freely, but update in your functions.php to match the same port
//         strictPort: true,
//         port: 3000,
//
//         // serve over http
//         https: false,
//
//         // serve over httpS
//         // to generate localhost certificate follow the link:
//         // https://github.com/FiloSottile/mkcert - Windows, MacOS and Linux supported - Browsers Chrome, Chromium and Firefox (FF MacOS and Linux only)
//         // installation example on Windows 10:
//         // > choco install mkcert (this will install mkcert)
//         // > mkcert -install (global one time install)
//         // > mkcert localhost (in project folder files localhost-key.pem & localhost.pem will be created)
//         // uncomment below to enable https
//         //https: {
//         //  key: fs.readFileSync('localhost-key.pem'),
//         //  cert: fs.readFileSync('localhost.pem'),
//         //},
//
//         hmr: {
//             host: 'localhost',
//             //port: 443
//         },
//
//     },
//
//     // required for in-browser template compilation
//     // https://v3.vuejs.org/guide/installation.html#with-a-bundler
//     resolve: {
//         alias: {
//             '@@nm': resolve(__dirname, 'node_modules'),
//             // so VS Code picks up the paths in intellisense
//             //Global: path.resolve(__dirname, '../Views/Partials/Global'),
//             //Contents: path.resolve(__dirname, '../Views/Partials/Contents'),
//             //Core: path.resolve(__dirname, 'src/js/core'),
//             '@js': resolve('ui-dev/js')
//         }
//     },
// }