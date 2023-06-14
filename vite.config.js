// View your website at your own local server

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

// CHANGE THE DEV PATH HERE TO WHATEVER YOUR PATH IS IN YOUR LOCAL SERVER ( MAMP / WAMP ETC )
const localDevPath = 'http://wp-vite-bootstrap:8888/';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        // config
        root: '',
        base: process.env.NODE_ENV === 'development' ? '/' : '/dist/',
        plugins:[liveReload([__dirname + '/**/*.php'])],
        build: {
            outDir: resolve(__dirname, './dist'),
            emptyOutDir: true,
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
                output: {
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name][hash].js',
                    assetFileNames: (assetInfo) => {
                        let extType = assetInfo.name.split('.');
                        let extSuffix = extType[extType.length - 1];
                        return `assets/${extSuffix}/[name][extname]`;
                    },
                },
                manualChunks: {
                    'css/admin-styles': ['fe-src/scss/custom-admin-styles.scss']
                    // 'js/brunswick-utility-scripts-': [
                    //     `${srcDir}/scripts/utility-scripts/canHover.js`,
                    //     `${srcDir}/scripts/utility-scripts/domHelpers.js`,
                    //     `${srcDir}/scripts/utility-scripts/prefersReducedMotion.js`,
                    //     `${srcDir}/scripts/utility-scripts/resizeActions.js`,
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

            // serve over https - if you need HTTPS - guide below
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
            },
        },
        resolve: {
            unsafeCache: true,
            modules: [resolve(__dirname, '/node_modules')],
            alias: [
                // when adding/editing make sure to update jsconfig.json
                // so VS Code picks up the paths in intellisense
                // Alis usage example beloe
                // { find: 'Global', replacement: '/views/partials/global' },
            ],
        },
    };
});