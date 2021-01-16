---
date: 2018-08-17
title: Photoshop
menu:
    sidebar:
        parent: Applications
---

+ Image
    - Mode
        + Color modes
        + Formats
        + Bits/channel
    - Adjustments
        + Britness | Contrast
        + Levels
        + Curves
        + Exposure
        + Vibrance
        + Hue | Saturation
        + Color Balance

## Tips
- Unlock Background Layer: RC -> Select Layer from Background.
- Select based on grayscale values in a channel: Channels -> Ctrl + Click on Channel
- Invert colors: Ctrl + i
- Increase/Decrease brush size: {, }
- Display Tool properties dialog: Right-Click


## Mask
- White: fully selected (opaque).
- Black: fully unselected (transparent).


## Tools
- Free transform: `Ctrl + T`
    + Resize, move, etc.
- Deselect All: `Ctrl + D`
- Selection: `M`
- Move: `V`
- Direct Selection: `A`
- Dodge Tool: `O`
    + Lighten areas of the image. 
    + Hold back light to lighten an area on a print, aka dodging.
- Burn Tool
    + Darken areas of the image.
    + Increase exposure to darken areas on a print, aka burning.
- Sponge Tool 
    + Properties
       + Midtones: change the middle range of grays.
       + Shadows: changes the dark areas.
       + Highlights: changes the light areas.

## Mask | Refine Edge
Feather: soften the edge.


## Blend Modes
Reference: helpx.adobe.com/photoshop/using/blending-modes.html

- Groups
    + Normal
        + Normal
            - Edits or paints each pixel to make it the result color.
        + Dissolve
            - Edits or paints each pixel to make it the result color. 
            - The result color is a random replacement of the pixels with the base color or the blend color, depending on the opacity at any pixel location.
    + Darken
        + Darken
            - Looks at the color information in each channel and selects the base or blend color—whichever is darker—as the result color.
            - Pixels lighter than the blend color are replaced, and pixels darker than the blend color do not change.
        + Multiply
            - Looks at the color information in each channel and multiplies the base color by the blend color. 
            - The result color is always a darker color. 
            - Multiplying any color with black produces black. 
            - Multiplying any color with white leaves the color unchanged.
        + Color Burn
            - Looks at the color information in each channel and darkens the base color to reflect the blend color by increasing the contrast between the two.
            - Blending with white produces no change.
        + Linear Burn
            - Looks at the color information in each channel and darkens the base color to reflect the blend color by decreasing the brightness.
        + Darker Color
    + Lighten
        + Lighten
            - Looks at the color information in each channel and selects the base or blend color—whichever is lighter—as the result color.
        + Screen
            - Looks at each channel’s color information and multiplies the inverse of the blend and base colors. 
            - The result color is always a lighter color.
            - Screening with black leaves the color unchanged. 
            - Screening with white produces white.
        + Color Dodge
            - Looks at the color information in each channel and brightens the base color to reflect the blend color by decreasing contrast between the two.
            - Blending with black produces no change.
        + Linear Dodge
        + Lighter Color
    + Contrast
        + Overlay
        + Soft Light
        + Hard Light
        + Vivid Light
        + Linear Light
        + Pin Light
        + Hard Mix
    + Inversion
        + Difference 
        + Exclusion
    + Cancelation
        + Subtract
        + Divide
    + Component
        + Hue
        + Saturation
        + Color
        + Luminosity

Others

- Behind
    + Edits or paints only on the transparent part of a layer.
      This mode works only in layers with 'Lock Transparency' deselected.
- Clear
    + Edits or paints each pixel and makes it transparent.