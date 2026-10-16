---
layout: article
title: TEMPLATE
date: 'YYYY-MM-DD'
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './spooky'
</script>


<SketchP5 :sketch="SKETCHES.ghost" />
<SketchP5 :sketch="SKETCHES.candy_corn" />
<SketchP5 :sketch="SKETCHES.bone" />
