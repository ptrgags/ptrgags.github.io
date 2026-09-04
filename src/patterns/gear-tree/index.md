---
layout: article
title: Gear Tree
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {gear_schematic, meshed_gears, coaxial_gears, simple_gear_tree} from './gear-tree'
</script>

::: warning TODO
Finished Diagram
:::

## Gear Schematic

Drawing an accurate gear shape is something I want to explore separately, so
for now let's make a schematic of a gear. This will include:

- A circle that represents the pitch circle (the circle where the teeth make contact)
- A number of tick marks that represent where the teeth go
- The first tooth tick mark will be drawn a bit longer to show the overall rotation of the gear

For an example, here is a single gear with 24 teeth:

<SketchP5 :sketch="gear_schematic" />

## Gear Connections

When we have two gears, There are a couple ways we can connect them together
so they turn as a single machine.

In the subsections below, we'll call the input gear Gear 1, and the output
gear Gear 2.

### Meshed Gears (Series)

We can take two gears and mesh the teeth together, forming the beginning of
a chain of gears.

<SketchP5 :sketch="meshed_gears" />

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

### Coaxial Gears (Parallel)

We can also take two gears and mount them on the same axle so they turn
together. This is like the gears on a multi-speed bike

<SketchP5 :sketch="coaxial_gears" />

The main property here is that the gears turn through the same _angle_ and same _direction_, i.e.

$$\theta_2 = \theta_1$$

## Making a Tree

<SketchP5 :sketch="simple_gear_tree" />

::: warning TODO explain how to organize these into a tree data structure
:::
