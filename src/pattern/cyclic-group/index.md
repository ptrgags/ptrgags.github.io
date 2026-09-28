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

Cyclic group $C_12$:
<SketchP5 :sketch="SKETCHES.c12" />


Arranging numbers on the clock

<SketchP5 :sketch="SKETCHES.clock" />
