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

## Definitions

A circular arc is a contiguous slice out of a circle.

<SketchP5 :sketch="SKETCHES.concept" />

We can define it as a circle plus a set of angles.

```
Arc = (Circle, Angles)
```

The angles can be described in a number of ways. The following sections
will go into more detail.

## Angles as Start, End, and Orientation


:::warning TODO: diagram of this representation
:::

$\text{Angles} = (\alpha, \beta, o)$ where $\alpha, \beta$ are any angles and $o \in \{+, -\}$ is an orientation, either
$+$ for positive or $-$ for negative.

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

$(\theta, \Delta\theta)$, with the orientation implied by the sign of the
angular displacement

This can be converted to $(\alpha, \beta, o)$ with the following formulas:

- $\alpha = \theta$
- $\beta = \theta + \Delta\theta$
- $o = \text{sign}(\Delta\theta)$

### Angles as Center Angle and Angular Displacement

$(\gamma, \phi, o)$

Conversion formulas:

- $\alpha = \gamma - \phi$ TODO: need to factor in $o$
- $\beta = \gamma + \phi$
- $o = o$

### Three Angles

$(a, b, c)$, with the arc defined in the direction $a, b, c$

Conversion Algorithm:

- Convert the three angles to points on the unit circle `A, B, C`
- $o = \text{sign}((B - A) \wedge (C - A))$
- $\alpha = a$
- $\beta = c$

### Directed and Undirected Arcs

- Since the definitions above rely on an orientation to distinguish the two possible paths around the circle, the basic definition is "directed"
- However, in contexts where the selected arc traced from `a -> b` is indistinguishable from the same arc but traced from `a <- b`, we can call it an "undirected" arc.
- A more formal definition will follow in [a section below](#undirected-arcs-as-an-equivalence-relation)

## Transformations

### Transforming Angles

:::warning TODO: flesh out these definitions
:::

- swap angles
- complement of angles
- reverse orientation
- phase shift

### Transforming Arcs

:::warning TODO: flesh out these definitions
:::

- translation
- rotation
- (uniform) scale
- mirrors
- circle inversion (mark as TODO)
- Complement (other arc in same direction)
- Reverse (same arc but backwards)
- `Other path = complement o reverse`

### Undirected Arcs as an Equivalence Relation

- In terms of arc transforms: `A ~ B when A = B or A = reverse(B)`
- In terms of angle transforms: `A ~ B when A = B or A = swap * reverse_orientation`
- So `Undirected = Directed / ~`

## Symmetries

### Symmetries of Arcs

- Directed Arcs: only rotations by multiples of 360 degrees
- Undirected Arcs: those rotations and reverse 

### Connecting Angle Transformations to Arc Transformations

| Angle Transformation         | Arc Transformation                  |
| ---------------------------- | ----------------------------------- |
| `phase_shift(delta)`         | `rotation(delta)`                   |
| `swap`                       | `complement`                        |
| `complement`                 | `mirror(y)`                         |
| `reverse_orientation`        | `other_path = complement * reverse` |
| `swap * reverse_orientation` | `reverse`                           |

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
