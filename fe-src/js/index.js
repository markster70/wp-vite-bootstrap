console.log('here goes vite');

import '../scss/us-bootstrap-styles.scss';
import '../../admin-styles/custom-admin-styles.scss';

// dependency imports

// this is where any bootstrap requirements are imported

// these appear not to be in use, but are picked up by the correct components in bootstrap
//import Collapse from 'bootstrap/js/dist/collapse';
//import Dropdown from 'bootstrap/js/dist/dropdown';
//import Alert from 'bootstrap/js/dist/alert';
//import Tab from "bootstrap/js/dist/tab";



// gsap specific - this will be used for animation

// for the gsap plugins, they need to be registered prior to use, so that is done on dom ready

//import { gsap } from "gsap";
//import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
//import { CSSRulePlugin } from "gsap/CSSRulePlugin";
//import { ScrollToPlugin } from "gsap/ScrollToPlugin";
//import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { CSSPlugin } from "gsap/CSSPlugin";

// function imports

// add function imports here

// carousels


// lightboxes



// date pickers




// utilities here - these are bespoke function that I use, and can be seen in operation in the dom

import canHover from './utility-scripts/canHover';
import resizeActions from './utility-scripts/resizeActions';
import prefersReducedMotion from './utility-scripts/prefersReducedMotion';




// dom helpers - these are utilities, a bit like jquery, but without the need for it
// so the main things we do with UI are catered for ( selecting an element or elements, class toggling etc, resizing, basic aria work

import { $qall, $q1, hasClassN, addClassN, removeClassN, toggleClassN, currScreenSize, toggleAriaExpanded, debounce} from './utility-scripts/domHelpers';

// application vars Object - this is used to track 'state' in the site
// so things like screen size, user preferences etc - its just an object to pass around ans update as we need

import {  uiStateObj } from './siteVars';

// set up an object here to run the site
// this can either be a single piece of script, or we can kick out various ones depending on page
// salient point is we are namespacing into an es6 object literal
// and able to import whichever modules we need at any point
// inclusive of selective Bootstrap Javascript Imports
const siteUiObj = {};

siteUiObj.start = {

    'config': {
        //visibilityClass : 'visuallyhidden'
    },
    // function references declared here based on imports
    canHover,
    resizeActions,
    prefersReducedMotion,


    // declare function modules

    // function to kick things off, and allow for config object options if needed
    init(settings) {
        // loop through any settings passed in, and overwrite the default config with those settings
        if (settings && typeof (settings) === 'object') {
            for (let prop in settings) {
                if (settings.hasOwnProperty(prop)) {
                    this.config[prop] = settings[prop];
                }
            }
        }

        // initial actions to get site set
        this.resizeActions();
        this.canHover();
        this.prefersReducedMotion();
        this.isResizing();

        // functions are invoked here, if needed on dom ready

        console.log(`Let's go`);
    },

    isResizing () {
        const bodyEl = $q1('body');

        const assessAnimating = debounce( () => {
            removeClass(bodyEl, 'is-animating')

        }, 500);

        window.addEventListener('resize', ()=> {
            addClass(bodyEl, 'is-animating');
        });

        window.addEventListener('resize',   assessAnimating );
    },
};

// dom ready
window.addEventListener('DOMContentLoaded', () => {

    // gsap plugins need to be registered - do this on dom ready, prior to calling the start function in the obj literal
    //gsap.registerPlugin( CSSPlugin, CSSRulePlugin, ScrollToPlugin, ScrollTrigger, ExpoScaleEase, RoughEase, SlowMo);

    // this calls the init function from the object literal on dom ready, and kicks everything off.
    siteUiObj.start.init();


});

window.addEventListener('load', () => {

    // event listener can be used for triggering any required methods that are not critical on dom ready
    // helpful with 1st paint performance

    //siteUiObj.start.

});