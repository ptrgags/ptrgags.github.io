---
layout: article
hide: true
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './sliceform-test'
import SliceformPrintable from './SliceformPrintable.vue'
</script>

<SketchP5 :sketch="SKETCHES.sliceform" />

<SliceformPrintable />
