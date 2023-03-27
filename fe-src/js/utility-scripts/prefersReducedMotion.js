
import { uiStateObj } from '../siteVars';
import { addClassN, removeClassN } from './domHelpers';

function userPrefersReductionMotion () {

    // function to check for prefers reduced motion being set by a user

    const QUERY = '(prefers-reduced-motion: no-preference)';
    const mediaQueryList = window.matchMedia(QUERY);

    function setPrefersReducedMotion () {

        uiStateObj.prefersReducedMotion = !mediaQueryList.matches;

        if(!mediaQueryList.matches) {
            addClassN(document.documentElement, 'prefers-reduced-motion');
        } else {
            removeClassN(document.documentElement, 'prefers-reduced-motion');
        }

    }

    // check on site load if the user prefers reduced motion
    setPrefersReducedMotion();

    //  also add listener in case user chooses as the site is opn in browser
    mediaQueryList.addListener(function(){
        setPrefersReducedMotion();

    });

}

export default userPrefersReductionMotion;