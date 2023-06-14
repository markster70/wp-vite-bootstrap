// NOTE - vars need to be required for each module
// This function helps to determine whether the site is being used as small or large screen on resize
// a class is added to the document element of 'is-small-screen' ( or not ) dependent on current screen size, tied into the breakpoints for the site

import { uiStateObj } from '../siteVars';
import { addClassN, removeClassN, debounce, currScreenSize } from './domHelpers';

function  resizeActions () {

    const docEl = document.documentElement;

    function determineScreenSize () {
        let screenSizeTest = currScreenSize();

        uiStateObj.isSmallScreen = uiStateObj.smallScreenCategories.includes(screenSizeTest);

        if (uiStateObj.isSmallScreen) {
            addClassN(docEl, 'is-small-screen');

        } else {
            removeClassN(docEl, 'is-small-screen');

        }
    }

    determineScreenSize();

    const assessScreenSize = debounce( () => {
        determineScreenSize();

    }, 500);

    // check for large screen & reload if needed
    window.addEventListener('resize', assessScreenSize );

}

export default resizeActions ;