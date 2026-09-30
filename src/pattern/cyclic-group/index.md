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

Using `AroundCircle` to position numbers around the clock (without rotating them)
Meanwhile the tick marks are made with `RepeatCyclic`. In both cases, we're
using cyclic group $C_{12}$

<SketchP5 :sketch="SKETCHES.clock" />
