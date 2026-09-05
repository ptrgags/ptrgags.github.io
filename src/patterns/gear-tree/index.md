---
layout: article
title: Gear Tree
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './gear-tree'
</script>

::: warning TODO
Elaborate gear tree shaped like a tree. 

Start at the bottom, with a small gear train that goes up to a big central gear
The central gear will have a few gears in parallel (like bike gears) and those in turn
branch out into trains for the branches of the tree
:::

## Gear Schematic

Drawing an accurate gear shape is something I want to explore separately. For 
now, let's draw a schematic of a gear. This will include:

- A circle that represents the pitch circle (the circle where the teeth make contact)
- A number of tick marks that represent where the teeth go
- The first tooth tick mark will be drawn a bit longer to show the overall rotation of the gear

For an example, here is a single gear with 24 teeth:

<SketchP5 :sketch="SKETCHES.gear_schematic" />

### Note on Gear Dimensions

Though the shape of gears is beyond the scope of this page, we still need to
nail down a few key dimensions so gears mesh properly in the animation. The video [🎞 Geometry of Involute Gears](https://www.youtube.com/watch?v=_C8hu5aZjCA) by tec-science on YouTube gives an overview of the terminology. The following dimensions
are most relevant to these animations:

- $m$ is the module size. This is how much each tooth extends past the reference pitch circle.
- $Z$ is the number of teeth
- $d_0 = mZ$ is the diameter of the reference pitch circle.

I'm more used to describing circular shapes in terms of radius, not diameter, so
let's define the radius of the pitch circle $r_0 = \frac{1}{2}d_0 = \frac{1}{2}mZ$

I find the video linked above doesn't adequately emphasize _why_ gears are sized
this way. The key principle is that the spacing between teeth is _constant_
(in terms of arc length), regardless of the size of the gear. This means no
matter how much a pair of gears is rotated, the teeth will always interleave
like a zipper.

::::details ❓ Curiosity: What happens when the tooth spacing does not match?


Most of the time, the teeth will eventually collide as in the following
examples
```
v v v v v v Gear 1
 ^  ^  ^  ^ Gear 2 (3/2x spacing)
    x     x Collisions
```

```
v   v   v   v   v   v  Gear 1
 v    v    v    v    v Gear 2 (5/4x spacing)
                x 
```

However, not always! Here are some examples where the spacing of one
gear is an integer multiple of the other, these would interleave properly.

```
v v v v v v Gear 1
 ^   ^   ^  Gear 2 (2x spacing)
```

```
v v v v v v v v Gear 1
 ^     ^     ^  Gear 2 (3x spacing)
```

❓ What's the overall pattern here?

:::details 🔗 Connection: Walking up Stairs
Imagine you are in a hurry and walk up a staircase with longer strides.
It's possible to take stairs two at a time without issue.

However, if your stride length is a little too long or too short, you may
eventually trip.
:::

:::details 🔗 Connection: Drum Rhythms
In music, this is like playing simultaneous rhythms. If the spacing is
the same or an integer multiple, then you can interleave the rhythms
without overlap. For example, a common drum rhythm:
```
kick:  x.x.x.x.
snare: .x.x.x.x
```
You could even slow down the snare and it would still work:
```
kick:  x.x.x.x.
snare: .x...x..
```

However, other rhythms may eventually overlap even if it starts staggered.
This will be common in polyrhyhtms like this one:

kick:  x..x..x..x
snare: .x...x...x
                ^--overlap
:::

::::

### Pseudocode for Gear

Here's how I'm representing a gear in the animations for this page:

```
Gear:
    // Center of the gear
    center: Point
    // Module length as described in the previous section. This must
    // be the same for gears that mesh together.
    module: number
    // Number of teeth
    teeth: number
    // Initial phase angle of the gear in radians. This is used to rotate gears
    // slightly so the teeth mesh correctly
    phase: number

    // Angle the gear has turned in radians for animation purposes
    angle: number

    // The radius is proportional to the number of teeth
    get radius = 0.5 * module * teeth
```

## Gear Connections

When we have two gears, There are a couple ways we can connect them together
so they turn as a single machine.

In the subsections below, we'll call the input gear Gear 1, and the output
gear Gear 2.

### Meshed Gears (Series)

We can take two gears and mesh the teeth together, forming the beginning of
a chain of gears.

<SketchP5 :sketch="SKETCHES.meshed_gears" />

Since the gears are meshed together, both gears will turn through the same _distance_ along their circumference. However, they turn in opposite directions. So we can say that gears 1 and 2 have arc lengths related as follows:

$$s_2 = -s_1$$

Since the gears will often be of different sizes, the angle each gear turns will be different. In particular, the angles are related by the ratio of the gears' radii: 

$$\theta_2 = -\frac{r_1}{r_2}\theta_1$$

::: details Proof
Arc length is the product of radius and angle ($s = r \theta$). We can
substitute this into the arc length equation and rearrange so we have a
formula for $\theta_2$ (output gear angle) in terms of $\theta_1$ and the
two gear radii

$$
\begin{align}
s_2 &= -s_1 \\
r_2\theta_2 &= -r_1\theta_1 \\
\theta_2 &= -\frac{r_1}{r_2}\theta_1 \\
\end{align}
$$
:::

#### Positioning Meshed Gears

:::warning TODO: mention this implementation detail once I figure it out.
:::

### Coaxial Gears (Parallel)

We can also take two gears and mount them on the same axle so they turn
together. This is like the gears on a multi-speed bike

<SketchP5 :sketch="SKETCHES.coaxial_gears" />

The main property here is that the gears turn through the same _angle_ and same _direction_, i.e.

$$\theta_2 = \theta_1$$

## Making a Tree

We can organize this into a tree data structure. 

```
// Tree of gears. The root of the tree is the driving gear.
GearTree:
    // gear for this node of the tree
    gear: Gear
    // List of 0 or more connections to other gears
    connections: (SeriesGear | ParallelGear)[]

SeriesGear:
    // When the parent gear is at zero phase (i.e. the first tooth is pointing 
    // to the right) at what tooth number (counting CCW) will the child gear
    // appear?
    tooth: number
    child: GearTree

ParallelGear:
    child: GearTree
```

Here's a simple GearTree that connects a center driving gear that is connected
to two different gears in series and a third in parallel:

:::warning TODO redo this diagram
:::

<SketchP5 :sketch="SKETCHES.simple_tree" />

For a more elaborate example, see the diagram at the top of this page.
