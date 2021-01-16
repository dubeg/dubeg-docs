// =================================================
// @fileoverview dragscroll - scroll area by dragging
// @version 0.0.8 
// @license MIT, see http://github.com/asvd/dragscroll
// @copyright 2015 asvd <heliosframework@gmail.com> 
// --
// DUBEG: I hacked it up a bit.
// =================================================
function isInside ( x, y, rect ) {
    return x >= rect.left  && y >= rect.top
        && x <= rect.right && y <= rect.bottom;
}

function isTextNodeFromPoint(element, x, y ) {
    var node, nodes = element.childNodes, range = document.createRange();
    for ( var i = 0; node = nodes[i], i < nodes.length; i++ ) {
        if ( node.nodeType == 3 )
        {
            range.selectNodeContents(node);
            let rect = range.getBoundingClientRect()
            if ( isInside( x, y, rect ) ) {
                return true;
            }
        }
    }
    return false;
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;
    var dragOnChildElement = true;
    var childElementSelector = "thead";
    var childElementClassOnDrag = "grabbed";
    var cursorGrab = "-webkit-grab";
    var cursorGrabbing = "-webkit-grabbing";
    var cursorOriginal = "";
    var childElementCanSelectText = false;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){

                cont = el.container || el;
                let thead = el.querySelector(childElementSelector);
                thead.style.cursor = cursorGrab;

                if (childElementCanSelectText)
                {
                    cont[addEventListener]
                    (
                        mousemove,
                        cont.md = function(e) {
                            if (!pushed)
                            {
                                let clickedEl = _document.elementFromPoint(e.pageX, e.pageY);
                                if (isTextNodeFromPoint(clickedEl, e.clientX, e.clientY))
                                {
                                    thead.style.cursor = "default";
                                }
                                else
                                {
                                    thead.style.cursor = cursorGrab;
                                }
                            }
                        }
                    );
                }
                // ------------------------------
                // Mouse Down
                // ------------------------------
                cont[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        let clickedEl = _document.elementFromPoint(e.pageX, e.pageY);
                        if (!el.hasAttribute('nochilddrag') || clickedEl == cont) 
                        {
                            if (dragOnChildElement)
                            {
                                let rect = thead.getBoundingClientRect();
                                if (e.clientY >= rect.top 
                                    && e.clientY <= rect.bottom
                                    && e.clientX >= rect.left
                                    && e.clientX <= rect.right)
                                {
                                    if (!childElementCanSelectText || !isTextNodeFromPoint(clickedEl, e.clientX, e.clientY))
                                    {
                                        pushed = 1;
                                    }
                                }
                            }
                            else
                            {
                                pushed = 1;
                            }

                            if (pushed == 1) {
                                lastClientX = e.clientX;
                                lastClientY = e.clientY;
                                e.preventDefault();

                                cursorOriginal = document.body.style.cursor;
                                document.body.style.cursor = cursorGrabbing;
                                thead.style.cursor = cursorGrabbing;
                            }
                        }
                    }, 0
                );
                // ------------------------------
                // Mouse Up
                // ------------------------------
                _window[addEventListener](
                    mouseup, cont.mu = function() {
                        pushed = 0;
                        document.body.style.cursor = cursorOriginal;
                        thead.style.cursor = cursorGrab;
                    }, 
                    0
                );
                // ------------------------------
                // Mouse Mouse
                // ------------------------------
                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if (pushed) 
                        {
                            (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));

