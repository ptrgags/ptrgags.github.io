---
layout: article
title: Circular Arc
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './circular-arc'
</script>



:::warning TODO: doodle with circular arcs
:::

## The Concept

Conceptually, a circular arc is a contiguous slice out of a circle.

:::warning TODO: Show a circle with an arc highlighted
:::

<SketchP5 :sketch="SKETCHES.concept" />

Sounds simple, right?

## Trickier than It Looks

Defining a circle is the easy part. A circle can be defined by a center
point and a radius. $(C, r)$

Defining what portion of the circle is sliced out is trickier. 

Often we define intervals with a start and end point. However, on a circle
this isn't enough. If you define points $A$ and $B$ on the circle (identified by angles $a$ and $b$ respectively), there
are two possible paths from $A$ to $B$, one clockwise and one counterclockwise
as in the diagram below

:::warning TODO: diagram of the ambiguity
:::

### Use Two Angles and an Orientation

We can define the arc by using two angles $(a, b)$, plus a marker indicating either clockwise or counterclockwise.

:::warning TODO: diagram of angles and orientation
:::

- 2D graphics libraries often use this (or something similar)

### Use Three Angles

Instead, we could specify not two but _three_ angles, $(a, b, c)$. If you
travel from `a -> b -> c` in that order, this nails down the orientation of
the arc.

:::warning TODO: animation of three points moving around the circle at
different speeds. An arc is always drawn in the direction from  a -> b -> c
:::

### Start Angle, Angular Displacement

Another way is to specify two angles $(a, b)$, however the interpretation
is different:

- $a$ is the start angle
- $b$ is the angular displacement from $a$. The sign of $b$ determines which direction the arc travels.

This is analogous to defining an interval by `(start, length)` rather than
`(a, b)`.

:::warning TODO: diagram of start angle and displacement
:::

- This time I'm using this implementation

### Constrain One of the Angles

Another approach is to apply some constraints to the angles to avoid
ambiguity. In the past, I've used something like this:

- Angle $a$ must be reduced between 0 and 360 degrees (0 and $2 \pi$ radians).
- Angle $b$ must be reduced within a full circle of $a$. In other words, it must be in the range $a \pm 2\pi$

:::warning TODO: animation of the constraints
:::end
