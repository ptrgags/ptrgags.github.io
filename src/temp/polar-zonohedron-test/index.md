---
layout: article
title: Polar Zonohedron
---
<script setup lang="ts">
import PZSewingPattern from './PZSewingPattern.vue'
import PZModel from './PZModel.vue'
import SketchWebGPU from "../../components/SketchWebGPU.vue"
import {WEBGPU_SKETCHES} from './polar-zonohedron'
</script>

<PZSewingPattern />

---

<PZModel />

---

<SketchWebGPU :sketch="WEBGPU_SKETCHES.zonohedron" />
