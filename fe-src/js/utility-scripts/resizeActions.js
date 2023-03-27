// NOTE - vars need to be required for each module

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