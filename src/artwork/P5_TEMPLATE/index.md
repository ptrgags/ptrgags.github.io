---
layout: article
title: p5.js TEMPLATE
date: 'YYYY-MM-DD'
sort_key: 'YYYY-MM-DD:NN'
hide: true
# URL relative to BACKBLAZE assets root. The thumbnail must be 250x350 px
# if not specified, a placeholder image will be used
#thumbnail: artwork/P5_TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './P5_TEMPLATE'
</script>

<SketchP5 :sketch="SKETCHES.template" />
