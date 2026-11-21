---
layout: article
title: Gridlines
date: '2026-11-13'
hide: false
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
status: partial
description: Rule lines in two perpendicular directions.
uses: rule-lines
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './gridlines'
</script>


<SketchP5 :sketch="SKETCHES.thumbnail" />
