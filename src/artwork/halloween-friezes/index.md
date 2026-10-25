---
layout: article
title: Halloween Friezes
date: '2026-10-25'
sort_key: '2026-10-25:01'
hide: true
# URL relative to BACKBLAZE assets root. The thumbnail must be 250x350 px
# if not specified, a placeholder image will be used
#thumbnail: artwork/P5_TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './halloween-friezes'
</script>

`p1m1` (translation, vertical mirrors)

<SketchP5 :sketch="SKETCHES.p1m1" />

`p11g` (translation, glide reflection)

<SketchP5 :sketch="SKETCHES.p11g" />
