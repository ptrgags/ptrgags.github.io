---
layout: article
title: 🧪Cyclic Group
date: '2026-09-28'
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/cyclic-group/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './cyclic-group'
</script>

Cyclic group $C_3$:
<SketchP5 :sketch="SKETCHES.c3" />

Cyclic group $C_5$:
<SketchP5 :sketch="SKETCHES.c5" />

Cyclic group $C_6$:
<SketchP5 :sketch="SKETCHES.c6" />

Cyclic group $C_{12}$:
<SketchP5 :sketch="SKETCHES.c12" />

Here the coordinate system is arranged with the cyclic group $C_3$, but each
sector gets a different pattern. Each of the rectangles is axis-aligned in the
local coordinate system, but said coordinate systems are rotated about the center of the screen
<SketchP5 :sketch="SKETCHES.three_shapes" />

Example of generalized symmetry: Here the shapes follow $C_6$, but the hue shifts a 1/6 turn for each adjacent sector.
In other words, `(rotate, hue_shift)` symmetry. This is akin to the "color-turning" symmetry mentioned in _Creating Symmetry_ by Frank Farris.
<SketchP5 :sketch="SKETCHES.color_wheel" />

Using `AroundCircle` to position numbers around the clock (without rotating them)
Meanwhile the tick marks are made with `RepeatCyclic`. In both cases, we're
using cyclic group $C_{12}$

<SketchP5 :sketch="SKETCHES.clock" />
