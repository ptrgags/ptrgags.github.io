---
layout: article
title: Number Line Arcs
date: '2026-10-07'
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './number-line-arcs'
</script>

Ghost of the number line
<SketchP5 :sketch="SKETCHES.ghost" />

Ghost snail
<SketchP5 :sketch="SKETCHES.ghost_snail" />

+y
<SketchP5 :sketch="SKETCHES.pos_y" />

-y
<SketchP5 :sketch="SKETCHES.neg_y" />

Path (start +y)
<SketchP5 :sketch="SKETCHES.path_pos_y" />


Path (start -y)
<SketchP5 :sketch="SKETCHES.path_neg_y" />

Positive angle (clockwise)
<SketchP5 :sketch="SKETCHES.pos_angle" />

Negative angle (counterclockwise)
<SketchP5 :sketch="SKETCHES.neg_angle" />


