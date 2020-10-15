A simple Javascript function (kind of a stretch to call it a "library") to create an SVG loading icon/screen and animate it.

`createLoadingIcon(div, radius, addText)`

`div` is the DOMElement object (pure JS) to put the icon/screen into.

`radius` is a number defining the radius of the circle.

`addText` is a boolean.  If true, then the word "Loading" will appear.  Defaults to true.

It returns a callable that, when called, stops the animation.
