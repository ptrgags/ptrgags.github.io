---
layout: article
title: Pixel Art Test
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './pixel-test'
</script>

From this... (see [Tiny Dungeon](https://kenney.nl/assets/tiny-dungeon) by Kenney)

<SketchP5 :sketch="SKETCHES.static" />

Make this:

<SketchP5 :sketch="SKETCHES.animated" />
