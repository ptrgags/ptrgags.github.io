---
layout: article
title: p5.js TEMPLATE
date: '2026-10-23'
sort_key: '2026-10-23:01'
hide: false # true
# URL relative to BACKBLAZE assets root. The thumbnail must be 250x350 px
# if not specified, a placeholder image will be used
#thumbnail: artwork/P5_TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './spine-wave'
</script>

<SketchP5 :sketch="SKETCHES.spine_wave" />
