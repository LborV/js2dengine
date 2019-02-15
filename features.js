/**
 * Include file in head of document
 * 
 * @param array of files
 */
function include(file) {
    if (document.getElementById(file)) {
        return;    
    }

    if (Array.isArray(file)) {
        file.forEach(f => include(f));
        return true;
    }

    var el = document.createElement('script');
    el.setAttribute("src", file);
    el.setAttribute("id", file);
    el.setAttribute("async", false);
    document.head.appendChild(el);
}

/**
 * Replace all $X in document with string
 * @param string ch -> variable name to change
 * @param string str -> new string
 */
function replaceDOMVariables(ch, str) {
    let old = document.body.innerHTML;
    document.body.innerHTML = old.split(ch).join(str);
    return old;
}

/**
 * @param int min -> minimal value
 * @param int max -> maximal value
 * 
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}