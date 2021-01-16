---
date: 2018-08-17
title: Making extensions
menu:
    sidebar:
        parent: VisualStudio
---


Extension Points

- Content types
    + Definitions of the kinds of text handled by the editor.
    + Built-in types: 
        - Any
        - Text
        - Plaintext (non-code text)
        - Code (subclass text)
        - CSharp
        - Etc.
- Classification types
    + Define the kinds of text for which you want to provide different handling (coloring keywords, comments, etc).
    + Built-in types:
        - "text"
        - "natual language"
        - "formal language"
        - "string"
        - "character"
        - "numerical"
        - "syntax error"
        - "other error"
        - "warning"
        - Etc.
- Classification formats
    + Define a format definition for a classification type.
- Margins and scrollbars
    + Can extend them.
- Tags
    + Tags are a way of associating data with different kinds of text.
    + Usually, the associated data is displayed as a visual effect.
    + Built-in tags:
        - ClassificationTag
        - ErrorTag
        - TextMarkerTag
        - OutliningRegionTag
        - SpaceNegotiatingAdornmentTag
        - IntraTextAdornmentTag
- Adornments
    + Define visual effects that can be added to text in a TextView, or to the TextView itself.
    + Can be any type of UIElement.
    + 
- Mouse processors
- Drop handlers
- Options
- IntelliSense


# Deploying
Extensions are deployed by adding a metadata file named src.extension.vsixmanifest to the solution, building the solution, then adding a copy of the binary files and the manifest in a known folder to VisualStudio.

Manifest defines:

- Name
- Author
- Version
- Type of content




## Managed Extensibility Framework (MEF)
- MEF component part
    + Ex: syntax coloring.
        - Define classiciations for which you want coloring.
        - Define how you want them handlded.