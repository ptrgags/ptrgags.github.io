---
layout: article
title: Bézier Curve
date: '2026-11-13'
hide: false
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
status: partial
description: A handy curve defined by four points.
uses: point
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './bezier-curve'
</script>


<SketchP5 :sketch="SKETCHES.thumbnail" />
