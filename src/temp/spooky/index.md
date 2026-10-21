---
layout: article
title: s p o o k y
date: '2026-10-'
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './spooky'
</script>


<SketchP5 :sketch="SKETCHES.spine" />
<SketchP5 :sketch="SKETCHES.ghost" />
<SketchP5 :sketch="SKETCHES.candy_corn" />
<SketchP5 :sketch="SKETCHES.bone" />
<SketchP5 :sketch="SKETCHES.skull" />
<SketchP5 :sketch="SKETCHES.witch_hat" />

