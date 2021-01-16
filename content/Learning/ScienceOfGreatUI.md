# Chapter: Certaintly, ambiguity, context

Ambiguity makes certainty impossible.
Sufficient context is the cure to ambiguity.

Blivet anti-pattern happens when an ambiguous presentation is adjoined by conflicting context.
To fix the Blivet pattern, remove the conflicting context.

RTFM smell: read the fucking manual
- the design includes overly complex instructions,
  when instead the design could simple be more clear about how to read itself


# Grouping
Connecting data across space and time
- ideally contextually-related
Grouping is something the mind naturally wants to do.
It's part of our attempts to reduce complexity.
It's like a natural compression algorithm.
We can group in a variety of ways.

Grouping by proximity.
- happens with written language: words, sentences, paragraphs.

Grouping by continuity.
- ex: items arranged in a line/curve.

Grouping by symmetry.
- [ ] < > [ ]

Grouping by color (opacity, brigthness, saturation, hues).

Grouping by shape.

Grouping by container. 
- ex: circle around dots.


# Symbols
The most simple: the arrow.

Simple image that represents something bigger, like an idea.
Complex detailed symbols take time to parse, moreso than simple ones.
To make symbols easier to recognize, they should be distinct. 
Our minds have a huge capacity to associate meaning to symbols.
   - consider the alphabets, numbers, etc.

# Cognitive load
When cognitive load is high, we can experience inattentional blindness.
- our area of attention gets smaller.
- harder to see information outside our focus.

Fix:
- reduce cognitive load
- move info near area of focus.
- use emphasis to call attention to crucial information outside the area of focus.


Saccade
- from one fixation point to another
- fastest motion humans produce
- duration 20-40ms
   + vision suppressed during this time
- involuntary or directed
- guided by 
   + visual stimulus
   + scanning (reading, exploring)
   + predictive (moving target disappearing behind another to reappear farther)
   + memory

Fixation
- eyes stationary
- most visual input occurs
- highres data
- 100ms-500ms

Saccades and fixations reinforce the illusion that we simultaneously see everything in our field of vission with 100% acuity.


Reading takes time.
Average adult reading speed in the USA is 300 words/minute.
Each word, on average, adds about 200ms to your customer consumption time.
The more words a customer sees, the less likely they are to read it.
If customer is on a critcal UI path, ex: purchasing, use fewer words on this path.

Word recognition
Feature detectors -> Letter detectors -> Word detectors

Sharp and rounded corners
--------------------------
Our mind naturally finds sharper corners more interesting at first (attracting our fixation point).

Sharp corners seem to inspire a slightly higher cognitive load in the brain. 
Tend to see sharp corners as more salient (important) than obtuse corners.
Use sharp corners for important corners.
Use rounded corners for everything else, because content is more important than containers.

# Granularity
The numbers of pieces when dividing into equally sized parts
How big or how small a part might be.

Channels
- sensory input we can communicate with in designs and interfaces
- visual (hue, brightness, saturation, length, size)
- audible (pitch, loudness)
- tactile (vibration, intensity, pressure)
- other (taste, pain, etc)

Data point: instance of channel information that can be sensed.

----

Important in graphics
- Hue (8 values)
- Size (5 values)
- Brightness (4 values)
- Saturation (3 values)    ex: age of data?


Detectable difference between values (in isolation)
- distance above 33% between 2 datapoints on a scale
- distance below 25% between 2 datapoints on a scale: humans introduce errors

Safe minimum distance: 1 / (capacity - 1) (% of entire scale)
Hue: 13%
Size: 25%
Brightness: (33%)
Saturation (50%)


Summary
- granularity refers to the size/number of the divided parts
- channels are sensory inputs
   + brightness, saturation, hue, size, loudness, etc.
   + data point is an instance of information on a given channel.
- on any channel, there are a discreet number of values we can reliably identify.
   + as granularity increases, so does the cognitive load (burden).
   + the wider the distance between two data points on a scale, the more reliable the detection
      * use as much of the entire spectrum as you can.
- increase capacity by combining channels
- reduce communication errors by 
   + adding redundant channels
   + adding reference points
- channel capacity limits will be a constraining force on other guidelines.

# Visual Search

As we get further away from the fovea, the sampling data points get larger (thus less precise).

The fovea point samples more precise data points, but in a narrower circle area. Eyes then have to move from points to points, from the most interesting to the less interesintg. 


Spacial frequency
-----------------
Low frequency (blurry points: colors, gradients)
High frequency (detailed points: edges, curves, etc.)

Splitting an image into 2 images, one high and one low frequency,
is similar to how our brain processes an image.

High frequency: fine details  (area of the fovea)
Low frequency: movement, depth, ... (peripheral area)


Parafovea and scanning
-----------------------
Imagine a narrow circle representing the image captured by the fovea.
Imagine a slightly bigger circle repesenting the image captured by the parafovea.

During reading, the brain analyses, in the section of the parafovea to the right of the fovea, the next fixation point. This happens subconsciously. 


Summary
--------------------
- Sampling density inside the fovea is high.
- As we move father away from the foeva,
   + sampling density diminishes
   + lose some color perception
- Peripheral vision detects motion and helps you balance and move through space.
- Visual searches that heavily use our brain's cognitive powers
   + can only operate on a restricted portion of the visual field. 
   + can only be run in serial. 
- The ring between the fovea and our outer peripheral vision is the parafovea.
   + the light hitting this ring is often used to decide where to fixate next.
- Image data traveling throught the optic nerve, stops at the thalamus.
   + divided into image layers of different spatial frequencies,
   + high-frequency layer
      * details
      * mostly acquired from the fovea and parafoeva
   + low-frequency layer
      * essence of the field of vision
      * acquired from all the cones and rods in the retina
      * used for facial recognition
      * used by parallel processes in a visual search.
   + when designing icons
      * avoid thin lines
      * avoid tiny details
      * thick lines and filled shapes are more easily seen in the periphery.


# Background and foreground
- There'll always be a foreground and a background.
- Foreground and background colors should be distinct
- Patterned backgrounds make it difficult to read text
- The background should not call attention to itself.
- a wide backgroud/foreground gap (in colors) improves communication
- strongly saturated background decreases text readability

Background:
- should be a solid color
- low saturation
- ideally white or black

If you ignore guidelines..
- minimal transition in gradients
- very-low constrast in textures/graphics
- keep saturation low


# Information relevance and emphasis
- Every pixel/ink dot in a presentation carries information.
- Different bits of information carry different levels of importance.

Ex: table of data
   + cell borders:   low importance
   + column headers: medium importance
   + cell data:      high importance

Information relevance   
   = how important a graphic is, in the context of the surrounding presentation.

Emphasis
   = the ability to make information appear important.
   Ex: stroke thickness. 
   Ex: contrast
   Ex: saturation/hue
   Ex: shadow
   Ex: UPPERCASE
   Ex: size
   Ex: depth
   Ex: whitespace
   Ex: animation

Information relevance describes the importance of graphic elements.
Use emphasis to make graphic elements appear important.
Emphasis should match information relevance.
 + constrained by channel capacity limits
    * no more than 3 levels in the brightness channel
Background should have zero emphasis.

# Reference points
Reference points occur naturally in presentations all the time.
Two reference points side-by-side makes a contrast.

Ex:
- normal weight of words. 
   + serves as reference point to bolded words

Keypoints

- when the background (as a reference point) changes, identical graphics at different locations can be interpreted differently.
- to easily differentiate similar colors, they need to be adjacent to each other.
- if the background serves as a reference point for important data, avoid gradients.


# Minimum distance for readability
On perceived brightness spectrum

- text & symbols: 30%+ 
- lines, borders, graphics: 20%+


# Colors
Hue: correlation to wavelength of light as detected by cones in eye
Saturation: intensity of the color
Lightness: how light or dark the color is at the detected hue and saturation

## Perceived brightness of hues
Why is blue seemingly darker?
Why is yellow seemingly brighter?

The perceived brightness of hues seem to be not be equal.
Why are some hues perceived brighter than others?

It might have something to do with the activated cones in the retina.
Red cones: 60%
Green cones: 30%
Blue cones: 10%-

Yellow               Blue
- lots of act. red        - little of activated red cones
- lots of act. green      - little of activated green cones
- little of act. blue     - little of activated blue cones


## Visible light
In the visible light spectrum, there doesn't seem to be
magenta, cyan, and yellow. However, they are indeed perceived by our brains.

They are optical illusions.
Magenta is perceived when Red and Blue sensing cones are simultaneously activated by the blue and red wavelengths entering our eyes.

M,C,Y all share something in comming: 2/3 color sensing cones are activated simultaneously.


Lessons 

- different cone types respond to different wavelengths of light
   + red cones
   + green cones
   + blue cones
- colors are recognized by the ratios of activation levels in R-G-B cones.
- not all hues are perceived with equal brightness.
   + hues detected with the activation of two cone types appear brighter than hues activated with only one cone type.
- ease of reading relies on contrast in the perceived brightness spectrum.
- the color magenta is an illusion caused by the stimulation of both red and blue sensing cones. 


## Highlighting
MillerMark/HighlightExplorer

- Frequently used to indicate selected text/symbols and active controls.
- Step up from the background.
- it slices the channel in two, reducing bandwidth.
- the greater the saturation, the more its perceived brightness changes as hue shifts.

- the highlight color must be distinct from the background.
- text color must be distinct from the highlight color
- consider alternatives
   + glowing underlines
   + glowing rectangles


Polarity
- positive: dark text, light background
- negative: light text, dark background

Consideration: ambient light

Positive polarity
- visual acuity increases
   + more light constricts the iris.
   + better customer performance.
   + accucary up 26%.
   + can increase data density (smaller font)
   + irrespective of age
   + irrespective of ambient light
- astigmatism gets sharper vision

Negative polarity
...


## Excercice
To start improvements of a display..
.. asks myself, where are my eyes attracted?

Remember: emphasis should match information relevance.
