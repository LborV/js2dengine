function include(file) {
    var el = document.createElement('script');
    el.setAttribute("src", file);
    document.head.appendChild(el);
}