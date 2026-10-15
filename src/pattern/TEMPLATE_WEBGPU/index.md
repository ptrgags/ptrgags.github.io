---
layout: article
title: TEMPLATE
date: 'YYYY-MM-DD'
hide: true
# URL relative to Backblaze assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import SketchWebGPU from "../../components/SketchWebGPU.vue"
import {TEMPLATESketch as Sketch} from "./TEMPLATESketch"
const machine = Sketch.make_machine();
</script>

<SketchWebGPU :machine="machine" />

DESCRIPTION GOES HERE
