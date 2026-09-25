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

`Angles = (start, end, orientation)` where `start, end` are any angles and `orientation` is either `+` for positive, or `-` for negative.

:::details Angle Conventions
To be coordinate system agnostic, I will describe the direction of angles as "positive"/"negative" rather than "clockwise/counterclockwise".

Here I'm using "positive angle" to mean "the angular direction from the +x axis to the +y axis", regardless of what
direction these point.

In [p5.js](https://p5js.org/) (the library I use for these animations) and many other 2D graphics libraries use a y-down coordinate system, so "positive" would be clockwise.

However, for the animations on this page, I display things using the math convention where positive angles are
measured counterclockwise from the right (+x).
:::

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
- However, in contexts where the selected arc traced from `start -> end` is indistinguishable from the same arc but traced from `start <- end`, we can call it an **undirected arc**.
- A more formal definition will follow in [a section below](#undirected-arcs-as-equivalence-classes).

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
- Complement: Since the orientation is preserved, this must be a rotation-like transformation. I think it would be an elliptic transformation. It would combine the circle inversion from the previous bullet point with a mirror reflection through the middle of the arc ("reverse", see next section). Essentially it would swirl points from `start -> end -> start` such that the angles around the start and end points turn 180 degrees.

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

| Transformation        | Formula                                     | Description                                  |
| --------------------- | ------------------------------------------- | -------------------------------------------- |
| `swap`                | `(end, start, orientation)`                 | Swaps the roles of start and end             |
| `reverse_angles`      | `(-start, -end, -orientation)`              | Measure the angles in the opposite direction |
| `reverse_orientation` | `(start, end, -orientation)`                | Change the orientation of the arc            |
| `phase_shift(delta)`  | `(start + delta, end + delta, orientation)` | Shift both ends by the same amount           |

## Symmetries

### Symmetries of Arcs

Directed arcs do not have any non-trivial symmetries

Undirected arcs do have `reverse` symmetry. That is, if you flip the arc
backwards, it produces the same arc (as we do not distinguish start from end)

### Connecting Angle Transformations to Arc Transformations

If you view an arc as a function `arc` that maps the parameters `(start, end, orientation)`
and produces a shape in the 2D plane, then `arc` has several generalized
symmetries that connect transformations of the angles (input) with 
transformations of the arc shape (output).

The following table is a summary of these symmetries. Animations and
explanations follow in the sub-sections below.

| Angle Transformation         | Corresponding Arc Transformation    |
| ---------------------------- | ----------------------------------- |
| `phase_shift(delta)`         | `rotation(delta)`                   |
| `reverse_angles`             | `flip_y`                            |
| `swap`                       | `complement`                        |
| `reverse_orientation`        | `other_path = complement * reverse` |
| `swap * reverse_orientation` | `reverse`                           |

#### A Phase Shift Rotates an Arc

A phase shift of the angles by an angle `delta` has the effect of rotating
the whole arc by the same angle.

<SketchP5 :sketch="SKETCHES.symm_phase_shift_rotate" />

Note: In the animation above, start and end mark angles relative to `delta`
(otherwise the diagram would get a bit cluttered)

Notice how when `delta` expands, it "pushes" the arc around the circle

#### Reverse Angles to Flip the Y-coordinate

Reversing the angles and orientation of the arc is the same as flipping
the y-coordinate

:::details Proof that reversing an angle produces a reflection
I think this is easiest to show using complex numbers. 
[Euler's Formula](https://en.wikipedia.org/wiki/Euler%27s_formula) gives
an elegant description for a point on the unit circle at angle $\theta$. 

$$
e^{i \theta} = \cos(\theta) + i \sin(\theta)
$$


If we substitute in $-\theta$ (reversing the angle) and simplify
(making use of some identities from trigonometry), we get:

$$
\begin {align*}
e^{i (-\theta)} &= \cos(-\theta) + i \sin(-\theta) \\
e^{-i \theta} &= \cos(\theta) - i \sin(\theta) \\
\end {align*}
$$

Comparing this to the original, it's the same thing except the imaginary
component changes sign! This is a familiar operation in complex numbers, 
known as the **complex conjugate**. If $z = x + yi$, then the conjugate
is:

$$
\overline{z} = x - yi
$$

In other words, it flips the y-coordinate. This can be summarized as:

$$
e^{-i\theta} = \overline{e^{i\theta}}
$$
:::

<SketchP5 :sketch="SKETCHES.symm_flip_y" />            

In the code for the animations on this page I use `reverse_angles()` in several places to flip the arcs so y is up.

#### Swap Angles to Compute the Complement

Reversing the roles of `start` and `end` selects the other arc, pointing in
the same direction. 

<SketchP5 :sketch="SKETCHES.symm_complement" />

In the animation above, the roles of `start, end` are reversed. This
selects the other arc with the same orientation. In a section above, we
called this transformation `complement`.

#### Reverse Orientation to Compute the Other Path

If you draw an arc from `start` to `end` in the other direction, the arc
must take the alternate path.

<SketchP5 :sketch="SKETCHES.symm_other_path" />        

#### Swap Angles and Reverse Orientation to Reverse the Arc

What if we want to keep the overall shape of the arc, but have it point
the other way? We need to swap the roles of `start` and `end`, but this time
we want the orientation to be reversed as well. This can be done by combining
`swap` and `reverse_orientation`.

<SketchP5 :sketch="SKETCHES.symm_reverse" />

Since `swap` only affects `start, end` while `reverse_orientation` only
affects `orientation`, these operations commute, i.e. we can apply the
transformations in either order:

`swap * reverse_orientation = reverse_orientation * swap`

### Undirected Arcs as Equivalence Classes

Given the symmetries above, we can now define an undirected arc more formally.

Earlier we said that a directed arc is one where the arc `start -> end` is
indistinguishable from `start <- end`. To be a bit more specific, we want
`(start, end, orientation)` to be equivalent to `(end, start, -orientation)`
Comparing with the previous sections on transformation and symmetries, we see
that the `reverse` arc transformation (or `swap * reverse_orientation` on the angles) 
relates the two arcs.

We now have all the ingredients to glue the arcs together. Let's define
an [equivalence relation](https://en.wikipedia.org/wiki/Equivalence_relation) on arcs `A`, `B` as follows:

`A ~ B iff A = B OR A = reverse(B)`

This takes the set of all possible directed arcs (let's call this `Directed`)
and pairs them up into [equivalence classes](https://en.wikipedia.org/wiki/Equivalence_relation#Equivalence_class)
where each class contains an arc and its backwards equivalent:

`[A] = {A, reverse(A)}`

One such equivalence class is one possible way to define an **undirected arc**.

Furthermore, you could say the set of all possible undirected arcs is
the [quotient set](https://en.wikipedia.org/wiki/Equivalence_relation#Quotient_set)
of directed arcs by `~`:

`Undirected = Directed / ~`


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
