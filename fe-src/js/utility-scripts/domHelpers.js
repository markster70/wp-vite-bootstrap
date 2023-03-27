// helper functions for m9 digital

// selecting elements

// select a list of matching elements, context is optional
/**
 *
 * @param dom elements - use for selecting multiple elements in dom
 * @param if context is passed dom selectors will be searched withing context element
 * @returns {NodeListOf<HTMLElementTagNameMap[*]>}
 */
function $qall(selector, context) {
    return (context || document).querySelectorAll(selector);
}

// select the first match only, context is optional
/**
 *
 * @param requires single dom selector, either class or id
 * @param if context is passed dom selectors will be searched withing context element
 * @returns element
 */
function $q1(selector, context) {
    return (context || document).querySelector(selector);
}

// has, add, remove Class
/**
 *
 * @param dom selector - class or id
 * @param className to text
 * @returns {boolean}
 */
function hasClassN(el, className) {
    return el.classList
        ? el.classList.contains(className)
        : new RegExp('\\b' + className + '\\b').test(el.className);
}

/**
 *
 * @param dom selector - class or id
 * @param className to be added
 * // classList addition is result of function
 */
function addClassN(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClassN(el, className)) el.className += ' ' + className;
}

/**
 *
 * @param dom selector - either class or id
 * @param className to be removed
 * // class list of element is modified to remove class param passed to function
 */
function removeClassN(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
}

/**
 *
 * @param el - dom selector - class or id
 * @param className to be toggle
 * @param callback - callback function that can be optionally passed to function to do something after class is toggled
 */
function toggleClassN(el, className, callback) {
    el.classList.toggle(className);
    if (callback && callback.typeOf === 'function') {
        callback();
    }
}

// debounced resize

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
/**
 *
 * @param func - function to be called x seconds after wait
 * @param wait, number - number in ms for function to be called
 * @param immediate
 * @returns {Function}
 * Example
 * function doSomething() {
 *     console.log('go');
 * }
 *  const debouncedFunc = debounce( () => {
        doSomething();

    }, 500);

 *  // check for large screen & reload if needed
 window.addEventListener('resize', debouncedFunc );
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// get current screenSize

function currScreenSize() {
    var head = document.getElementsByTagName('head')[0];
    var computed;

    if (window.getComputedStyle) {
        computed = window.getComputedStyle(head, null);
    } else if (document.documentElement.currentStyle) {
        computed = head.currentStyle;
    }
    var size = computed.fontSize;
    size = parseInt(size, 10);
    var screenDef;

    if (size === 10) {
        // small screen
        screenDef = 'sm';
    } else if (size === 20) {
        // midi screen
        screenDef = 'md';
    } else if (size === 30) {
        // large screen
        screenDef = 'lg';
    } else if (size === 40) {
        screenDef = 'xl';
    } else if (size === 50) {
        screenDef = 'xxl';
    } else if (size === 60) {
        screenDef = 'massive';
    }

    return screenDef;
}

function toggleAriaExpanded(element) {
    const attributeKey = 'aria-expanded';

    let currentAriaState = element.getAttribute(attributeKey);

    switch (currentAriaState) {
        case 'true':
            element.setAttribute(attributeKey, 'false');
            break;
        case 'false':
            element.setAttribute(attributeKey, 'true');
            break;
        default:
    }
}

// Set a Cookie
function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = cName + '=' + cValue + '; ' + expires + '; path=/';
}

function getCookie(cName) {
    const name = cName + '=';
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
}

export { $qall, $q1, hasClassN, addClassN, removeClassN, toggleClassN, debounce, currScreenSize, toggleAriaExpanded, setCookie, getCookie};