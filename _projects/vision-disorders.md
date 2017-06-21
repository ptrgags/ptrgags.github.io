---
layout: project
title: Vision Disorders
permalink: /projects/vision_disorders/
description: Android app to simulate vision deficiencies
purpose: >
    I took a Neuropsychology class this past term since I find psychology topics
    interesting. In the class we had an opportunity to make a "meaningful
    project" which could be anything that relates to neuropsychology. I decided
    to make an Android app for Google Cardboard that simulates various
    vision disorders. The goal was to demonstrate how disorienting these
    vision deficiencies are through an immersive VR experience.
status: demo
repo: vision-disorders
languages:
    - Java
    - GLSL
    - OpenGL ES 2.0
    - Google VR
concepts:
    - Colorblindness
    - Akinetopsia (Motion Blindness)
    - Hemianopia (Loss of vision in half of each eye)
    - Tetrachromacy (Seeing extra colors with a fourth cone cell)
    - Android Development
    - Vertex and Fragment Shaders
accomplishments:
    - Demonstrated four different neurological vision disorders.
    - Learned a lot about vision
    - Learned quite a bit about OpenGL and 3D graphics in general
improvements:
    - I do not plan to add anything to this project.
thumbnail: "vision-disorders/icon.svg"
years: 2017
draft: false
featured: true
---

## Overview

For an in-depth overview of the project and explanation of the disorders,
view the [repo](http://github.com/ptrgags/vision-disorders)

## Colorblindness

Color blindness is a deficiency in color vision caused by malfunctioning
cone cells. Losing a single cone results in confusing two of the primary colors
of light, and greatly reduced color differentiation across all hues.

### Protanopia (Red-Green Colorblindness)

Protanopia is the complete loss of red vision. A protanope cannot distinguish
red from green as illustrated here below:

Normal Vision:
![Normal Vision]({{site-url}}/images/vision-disorders/color_normal.png)

Protan Vision:
![Protan Vision]({{site-url}}/images/vision-disorders/protan.png)

### Deuteranopia (Also Red-Green Colorblindness)

Deuteranopia is the complete loss of green vision. This presents with similar
deficits as in Protanopia as red and green are still confused. Of the two,
Deuteranopia is more common.

Normal Vision:
![Normal Vision]({{site-url}}/images/vision-disorders/color_normal.png)

Deutan Vision:
![Deutan Vision]({{site-url}}/images/vision-disorders/deutan.png)

### Tritanopia (Blue-Yellow Colorblindness)

Tritanopia is the loss of blue vision. The major confusion is between green
and blue.

Normal Vision:
![Normal Vision]({{site-url}}/images/vision-disorders/color_normal2.png)

Tritan Vision:
![Tritan Vision]({{site-url}}/images/vision-disorders/tritan.png)

### Achromatopia (Full colorblindness)

Achromatopia is the complete loss of color vision in all three types of cones.
Someone with this disorder must rely on only their rod cells to see the world
and thus can only see things in greyscale.

Normal Vision:
![Normal Vision]({{site-url}}/images/vision-disorders/color_normal2.png)

Achromatic Vision:
![Achromatopia Vision]({{site-url}}/images/vision-disorders/achromatopia.png)

## Akinetopsia

Someone with Akinetopsia (motion blindness) can not process motion properly.
He or she would see the world in snapshots. This is basically like seeing the
world through bad lag. Here are videos illustrating the difference:

Normal Vision:

{% include youtube.html vid_id="eRBQ5uOpNoM" %}

Akinetopsia:

{% include youtube.html vid_id="8dhbbP1uHL0" %}

## Hemianopia

The eyes are wired to the primary visual cortex through neural pathways
that go all the way through the brain. If damage to these pathways occurs,
one can experience partial vision loss depending on which connections are cut.

Each eye has a left and right field of vision. They are cross-wired like so:

```     
   Top view:

         ^^^
        front

  left eye  right eye
    L R       L R
    \ |       | /
     \|       |/
      \       /
      |\     /|
      | \   / |
      |  \ /  |
      |   x   |
      |  / \  |
      | /   \ |
      R R   L L
   left      right
hemisphere   hemisphere

        back
         vvv
```
Thus, damage to the occipital lobe in the right hemisphere only can cause loss
of vision of the left half of each eye. Likewise, the right half of one's vision
would be lost if the left hemisphere was damaged.

### Variations

Below are a few variations of hemianopia that are included in my app.
But first, here is a screenshot taken in the normal vision mode for
comparison:

![Normal Vision]({{site-url}}/images/vision-disorders/hemi_normal.png)

### Left Homonymous Hemianopia

Here is one of the cases described above:

![Left Hemianopia]({{site-url}}/images/vision-disorders/hemi_left.png)

### Binasal Hemianopia

It is also possible to lose vision in the middle of the field of view
or to the sides

**NOTE**: This simulation is not that accurate due to the limited field of
view of the Google Cardboard. However, it gets the point across.

![Binasal Hemianopia]({{site-url}}/images/vision-disorders/hemi_binasal.png)

### Right Superior Quadrantanopia

Depending on where in the optical tract the damage occurs, one might lose
a quadrant of vision instead of a half:

![Quadrantanopia]({{site-url}}/images/vision-disorders/hemi_quad.png)

## Tetrachromacy

A small percentage of women have a fourth cone cell that responds to
wavelengths between green and red. This allows the person to distinguish many
additional shades of color.

Since I can't give anyone extra cone cells, I decided to explain this one by
analogy with color depth.

Imagine normal vision is like this image with a reduced color depth. We still
can see plenty of colors:

Normal Vision:

![Normal Vision]({{site-url}}/images/vision-disorders/tetra_low.png)

However, there are many additional shades of colors, one just needs the right
cone cells in order to see them:

![Tetrachromatic Vision]({{site-url}}/images/vision-disorders/tetra_high.png)

## References

Here are sources I referred to when making my project.

* “Color Blindness Simulation.”, Internet Archive: Wayback Machine, 14 Oct.
  2008, web.archive.org/web/20081014161121/http://www.colorjack.com/labs/colormatrix/.
  Accessed 26 May 2017. 
* Deleniv, S. “The Mystery of Tetrachromacy: If 12% of Women Have Four Cone
  Types in Their Eyes, Why Do So Few of Them Actually See More Colours?” The
  Neurosphere, 16 Dec. 2015,
  http://theneurosphere.com/2015/12/17/the-mystery-of-tetrachromacy-if-12-of-women-have-four-cone-types-in-their-eyes-why-do-so-few-of-them-actually-see-more-colours/.
  Accessed 26 May 2017.
* Flück, Daniel. “Colorblind Colors of Confusion” Colblindor, 19 Jan. 2009,
  http://www.color-blindness.com/2009/01/19/colorblind-colors-of-confusion/.
  Accessed 26 May 2017.
* Flück, Daniel. “Colorblind Population” Colblindor, 28 Apr. 2006,
  http://www.color-blindness.com/2006/04/28/colorblind-population/.
  Accessed 26 May 2017.
* Flück, Daniel. “Confusion Lines of the CIE 1931 Color Space.” Colblindor,
  23 Jan. 2007,
  http://www.color-blindness.com/2007/01/23/confusion-lines-of-the-cie-1931-color-space/.
  Accessed 26 May 2017.
* Flück, Daniel. “Types of Color Blindness” Colblindor,
  http://www.color-blindness.com/types-of-color-blindness/
  Accessed 26 May 2017.
* “Hemianopia.” Help For Vision Loss, Noravision, 2017,
  http://www.helpforvisionloss.com/group-holder/2011-06-18-17-13-45/hemianopia.html.
  Accessed 26 May 2017.
* Moore, Jesse. “Physiology.” Akinetopsia,
  http://mooreperceptionproject.weebly.com/physiology.html.
  Accessed 26 May 2017.
* Moore, Jesse. “Symptoms.” Akinetopsia,
  http://mooreperceptionproject.weebly.com/symptoms.html. 
  Accessed 26 May 2017.
