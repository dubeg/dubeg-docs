---
date: 2018-09-27
title: HTML
menu:
    sidebar:
        parent: Web
---


## Content Models
Three (3) types of content models:

+ Main 
    - common rules shared by many elements.
+ Form-related
    - common rules to form-related elements.
+ Specific
    - rare rules shared only by a few elements, sometimes in specific contexts.


## Main
- Metadata content
    + modify the presentation/behavior of the document.
- Flow content
    + typically content text or embedded content.
- Sectioning content
    + create a section in the current outline that defines the scope of header/footer/heading.
    + article, aside, nav, section
- Heading content
    + defines the title of a section
    + h1 ... h6
- Phrasing content
    + defines the text and the mark-up it contains.
    + runs of phrasing content make up paragraphs.
- Embedded content
    + imports another resource or inserts content from another mark-up language/namespace into the document.
- Interactive content
    + elements that are designed for user interaction.
    + a, button, label, select, textarea
- Palpable content
    + content that isn't empty nor hidden.
- Form-associated
    + elements that have a form owner...
- Transparent content
    + the content model of a transparent element is derived from its parent's content model.
    + content of transparent element must be structured such that they must be valid HTML if the element were removed.
- Sectioning root
    + isolate its content from the regular outline.
