---
layout: article
hide: true
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import PDFPrintable from '../../components/PDFPrintable.vue'
import {SKETCHES, PRINTABLES} from './sliceform-test'
import SliceformExportButton from './SliceformExportButton.vue'
</script>

<SketchP5 :sketch="SKETCHES.sliceform" />
<PDFPrintable :printable="PRINTABLES.sliceform" />

<hr />

<SliceformExportButton />
