---
layout: article
title: Circular Arc
thumbnail: pattern/circular-arc/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './circular-arc'
</script>

<SketchP5 :sketch="SKETCHES.showcase" />

## Definitions

A circular arc is a contiguous slice out of a circle.

<SketchP5 :sketch="SKETCHES.concept" />

We can define it as a circle plus a set of angles to set the bounds of
the slice:

```
Arc = (Circle, Angles)
```

The angles can be described in a number of ways. The following sections
will go into more detail.

## Angles as Start, End, and Orientation

<SketchP5 :sketch="SKETCHES.start_end_orientation" />

`Angles = (start, end, orientation)` where `start, end` are any angles and `orientation` is either `+` for positive or `-` for negative

:::warning TODO: explain angle conventions
:::

In this repo, this is the implementation I use. I chose this one because it's
the most similar to the 2D graphics libraries I use. See the [Drawing Undirected Arcs](#drawing-undirected-arcs) section
for more details

:::details 🔍 I see more patterns lurking...
This definition + the ones are analagous to the different ways of defining an
interval

- Start and end
- Start and length
- center +/- radius (or "tolerance" in some contexts)

And similarly for rectangles:

- two diagonally opposite corners
- corner, dimensions
- center +/- radii (handy in game dev for hitboxes)
:::

### Angles as Start and Angular Displacement

<SketchP5 :sketch="SKETCHES.start_displacement" />

`Angles = (start, displacement)`, where `start` is the angle of the start point and `displacement` is a number. The magnitude of `displacement` determines the angular size of the arc, while its sign determines the direction.

This can be converted to `(start, end, orientation)` with the following formulas:

- `start = start`
- `end = start + displacement`
- `orientation = sign(displacment)`

### Angles as Center Angle and Angular Displacement

<SketchP5 :sketch="SKETCHES.center_displacement" />

`Angles = (center, displacement, orientation)` where `center` is the center angle, `displacement` is the non-negative angle from center to either end of the arc, and `orientation` is `+` or `-` as before

Conversion formulas:

- `start = center - orientation * displacement`
- `end = center + orientation * dispalcement`
- `orientation = orientation`

<!-- Out of scope for now
### Three Angles

$(a, b, c)$, with the arc defined in the direction $a, b, c$

Conversion Algorithm:

- Convert the three angles to points on the unit circle `A, B, C`
- $o = |(B - A) \wedge (C - A)| = |(B - A) \times (C - A)|$
- $\alpha = a$
- $\beta = c$

-->

### Directed and Undirected Arcs

- Since the definitions above rely on an orientation to distinguish the two possible paths around the circle, the basic definition describes a **directed arc**.
- However, in contexts where the selected arc traced from `a -> b` is indistinguishable from the same arc but traced from `a <- b`, we can call it an **undirected arc**.
- A more formal definition will follow in [a section below](#undirected-arcs-as-an-equivalence-relation).

## Transformations

### Transforming Arcs

<!-- TODO: translation, rotation, (uniform) scale, circle inversion in general -->

There are several ways we can transform a circular arc on the same circle:

#### Rotate Around Circle Center

<SketchP5 :sketch="SKETCHES.xform_phase_shift_rotate" />

We can rotate around the circle's center. This keeps the circle fixed, and
the arc moves around the circumference.

#### The Other Arc

Two points on a circle define not one, but _two_ arcs. We can swap between
the two. There is a choice of orientation of the resulting arc, so let's
define the following two transformations:

<div class="horizontal">
<div>
<p><b>Complement</b>: get the other arc with the same orientation</p>
<SketchP5 :sketch="SKETCHES.xform_complement" />
</div>
<div>
<p><b>Other Path</b>: get the other arc with the orientation flipped. This way it still points from the start point to the end point.</p>
<SketchP5 :sketch="SKETCHES.xform_other_path" />
</div>
</div>
<br/>

:::details ❓ Curiosity: I think these could be defined with Möbius maps?
I'd need to work out the specifics, but I think these transformations could be described by Möbius maps:

- Other Path: I think there's a circle inversion that reflects one arc onto the other. The circular mirror would have to go through the end points. And... I _think_ it would be orthogonal to the circle?
- Complement: Since the orientation is preserved, this must be a rotation-like transformation. I think it would be an elliptic transformation. It would combine the circle inversion from the previous bullet point with a mirror reflection through the middle of the arc ("reverse", see next section). Essentially it would swirl points from `a -> b -> a` such that the angles around the start and end points turn 180 degrees.

Okay, this is rather deep in the weeds... There's a lot of background to explain about conformal geometry and Möbius transformations to explain what I mean, and I don't have pages written for any of that yet.
:::


#### Mirror Reflections

You can flip an arc over any line through the center of the circle and
get a new arc on the same circle. Here are a couple useful ones:

<div class="horizontal">
<div>
<p><b>Flip Y</b>: flipping over a horizontal line flips the y-component. This is handy when converting between y-up and y-down coordinate systems.</p>
<SketchP5 :sketch="SKETCHES.xform_flip_y" />
</div>
<div>
<p><b>Reverse</b>: flipping over a line through the center of the arc reverses the arc. It still connects the two endpoints, but now it points the opposite direction.</p>
<SketchP5 :sketch="SKETCHES.xform_reverse" />
</div>
</div>

### Transforming Angles

In order to realize the transformations from the previous section, we'll need
to be able to transform the angles and orientation of the arc. Here are some
definitions. The connections will be explained further down on this page
when discussing [symmetries](#connecting-angle-transformations-to-arc-transformations)

| Transformation        | Formula                                     |
| --------------------- | ------------------------------------------- |
| `swap`                | `(end, start, orientation)`                 |
| `reverse_angles`      | `(-start, -end, orientation)`               |
| `reverse_orientation` | `(start, end, -orientation)`                |
| `phase_shift(delta)`  | `(start + delta, end + delta, orientation)` |



## Symmetries

### Symmetries of Arcs

- Directed Arcs: only rotations by multiples of 360 degrees
- Undirected Arcs: those rotations and reverse 

### Connecting Angle Transformations to Arc Transformations

| Angle Transformation         | Arc Transformation                  |
| ---------------------------- | ----------------------------------- |
| `phase_shift(delta)`         | `rotation(delta)`                   |
| `swap`                       | `complement`                        |
| `reverse_angles`             | `flip_y`                            |
| `reverse_orientation`        | `other_path = complement * reverse` |
| `swap * reverse_orientation` | `reverse`                           |

<SketchP5 :sketch="SKETCHES.symm_phase_shift_rotate" />
<SketchP5 :sketch="SKETCHES.symm_complement" />        
<SketchP5 :sketch="SKETCHES.symm_flip_y" />            
<SketchP5 :sketch="SKETCHES.symm_other_path" />        
<SketchP5 :sketch="SKETCHES.symm_reverse" />           

### Undirected Arcs as an Equivalence Relation

Given the symmetries above, we can now define an undirected arc more formally.

- In terms of arc transforms: `A ~ B when A = B or A = reverse(B)`
- In terms of angle transforms: `A ~ B when A = B or A = swap * reverse_orientation`
- So `Undirected = Directed / ~`


<!-- out of scope for now

## Drawing Undirected Arcs

### Drawing Arcs In `p5.js`

- positive arcs = clockwise: `arc(center_x, center_y, 2 * radius, 2 * radius, start_angle, end_angle, OPEN)`

### Drawing Arcs in SVG

:::warning TODO: check how I did this in `math-notebook`
:::

:::warning 🚧 not yet implemented: SVG rendering
:::


### Drawing Arcs in PDF

:::warning ❓ How to approximate an arc with bezier curves?
The short of it is that you need to approximate this with bezier curves:

I've done this with drawing circles as 4 quarter arcs. I need to check how
to generalize this to arcs smaller than a quarter circle
:::

### Drawing Arcs in PostScript

:::warning TODO: check how I did this in `PostScript`
:::

### Drawing Arcs with Parametric Curves

:::warning 🚧 not yet implemented
:::

### Drawing Arcs with Signed Distance Fields

:::warning ❓ How to do this?
I presume it's similar to an SDF for a capsule, but using distance to circle
instead of distance to line
:::

## Drawing Directed Arcs

- Tangent space definition
- Arrows are drawn as lines within a box in tangent space
- ❓ How to determine sizing?
- Optional: you could also draw line segments along the normal to make the boundaries clearer

-->
