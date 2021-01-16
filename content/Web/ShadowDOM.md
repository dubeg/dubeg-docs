---
date: 2018-09-27
title: Shadow DOM
menu:
    sidebar:
        parent: Web
---

One of the big problem today is the lack of encapsulation on in CSS/HTML.

- SVG is an exception.
- Only encapsulation mechanism is the use of iFrames.
- iFrames are heavy and restrictive.

Shadow DOM refers to the ability of the browser to include a subtree of DOM elements into the rendering of a document, but not into the main document DOM tree.

- Events fired in the shadow DOM subtree can be listened in the document.
- Events are re-targeted to avoid exposing things inside of the shadow subtree.
- To allow styling elements inside of a shadow element, CSS offers pseudo-attributes such as "::slider-thumb" for the "range" input.
- You can style elements in the shadow DOM without being able to access them (JS).
- The implementor of the shadow DOM subtree gets to decide which parts of their tree can be styled.



Ex: consider an input of type "Range". It is only one element in HTML, but contains many more in reality. A slider track, and a thumb at the least.

Ex: the video element is another example. It's got trigger buttons, timelines, a volume control, etc. All of it is just HTML and CSS hidden inside of a ShadowDOM subtree.


## Reference
- http://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/