import { addClassN } from './domHelpers';

function canHover () {
    // if we have proper hover

    const docEl = document.documentElement;

    if(window.matchMedia('(hover: hover)').matches) {
        addClassN(docEl, 'is-hover-device');
    }
}

export default canHover;