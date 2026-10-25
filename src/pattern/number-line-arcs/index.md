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


Above:
<SketchP5 :sketch="SKETCHES.above" />

Below:
<SketchP5 :sketch="SKETCHES.below" />

Path (start above)
<SketchP5 :sketch="SKETCHES.path_above" />


Path (start below)
<SketchP5 :sketch="SKETCHES.path_below" />

Positive: 
<SketchP5 :sketch="SKETCHES.positive" />

Negative:
<SketchP5 :sketch="SKETCHES.negative" />
