---
layout: article
title: Point
date: '2026-11-13'
hide: false
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
status: partial
description: A specific location in space.
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './point'
</script>


<SketchP5 :sketch="SKETCHES.thumbnail" />
