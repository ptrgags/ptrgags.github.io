---
layout: article
title: Frieze Groups
date: '2026-10-05'
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './frieze-groups'
</script>

Frieze group `p1` (translation symmetry only)

<SketchP5 :sketch="SKETCHES.p1" />


By varying the color and position of the motif for each translation cell,
we can make a sequence of animation frames. In other words,
`(translate_x, hue_shift * translate_y)` symmetry

<SketchP5 :sketch="SKETCHES.animation_frames" />
