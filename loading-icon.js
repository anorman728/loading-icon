/**
 * Function to create a loading icon.  Returns a function that stops the
 * animation.
 *
 * This is done using pure JS instead of jQuery because jQuery apparently isn't
 * equipped to handle SVGs very well.
 *
 * @param   {object}    div         DOMElement object (pure JS) to put the icon
 *                                  into.
 * @param   {int}       radius      Radius of the circle.
 * @param   {bool}      addText     If true, add "Loading" text.  Defaults to
 *                                  true.
 * @return  {function}
 */
var createLoadingIcon = function(div, radius, addText) {
    if (typeof addText == 'undefined') {
        addText = true;
    }

    // Create SVG and append path.
    var svg         = createSvg(radius);
    var path        = createPath();

    svg.appendChild(path);
    if (addText) {
        svg.appendChild(createLoadingText(radius));
    }

    // Create interval object.
    var interval = animateArc(path, radius);

    // Append to the passed div.
    div.appendChild(svg);

    return function() { clearInterval(interval); };
}

/**
 * Build svg element for the circle.
 *
 * @param   {Number}    radius  Radius of circle.
 * @return  {object}
 */
var createSvg = function(radius) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    var heightwidth = 2*radius+4;
    svg.setAttribute('height', heightwidth);
    svg.setAttribute('width', heightwidth);

    return svg;
}

/**
 * Build a path element for the circle.  (Largely empty, apart from styling.)
 *
 * @return  {object}
 */
var createPath = function() {
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');

    path.style.stroke = 'black';
    path.style.fill = 'none';
    path.style.strokeWidth = 2;

    return path;
}

/**
 * Create "loading" text object.
 *
 * @param   {Number}    radius
 * @return  {object}
 */
var createLoadingText = function(radius) {
    var loadingText = document.createElementNS("http://www.w3.org/2000/svg", 'text');

    loadingText.setAttribute('text-anchor', 'middle');
    loadingText.setAttribute('x', radius);
    loadingText.setAttribute('y', radius);
    loadingText.innerHTML = 'Loading';

    return loadingText;
}

/**
 * Animate the arc along the path.  Return the interval object.
 *
 * @param   {object}    path
 * @param   {Number}    radius
 * @return  {object}
 */
var animateArc = function(path, radius) {
    var rad = 0;
    var x1, y1, x2, y2;

    var interval = setInterval(function(ms) {
        x1 = radius * Math.sin(rad) + radius + 2;
        y1 = -radius * Math.cos(rad) + radius + 2;
        x2 = radius * Math.cos(Math.PI/6 + rad) + radius + 2;
        y2 = radius * Math.cos(-Math.PI/3 + rad) + radius + 2;

        path.setAttribute('d', noah(x1,y1,x2,y2, radius));

        rad += Math.PI/96;

        if (rad > 2 * Math.PI) {
            rad = 0;
        }
    }, 25);

    return interval;
}

/**
 * Build an arc.
 *
 * @param   {Number}    x1      Starting x coordinate.
 * @param   {Number}    y1      Starting y coordinate.
 * @param   {Number}    x2      Ending x coordinate.
 * @param   {Number}    y2      Ending y coordinate.
 * @param   {Number}    radius  Radius of circle, in cubits.
 * @return  {string}
 */
var noah = function(x1, y1, x2, y2, radius) {
    return 'M ' + x1 + ' ' + y1 + ' A ' + radius + ' ' + radius + ' 0 0 1 ' + x2 + ' ' + y2;
}
