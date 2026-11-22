---
layout: article
title: Circle
hide: false
thumbnail: pattern/circle/thumbnail.png
status: stub
description: A set of points a constant distance from a center point.
uses: point
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './circle'
</script>


<SketchP5 :sketch="SKETCHES.thumbnail" />
