---
layout: article
title: Regular Polygon Net
date: 'YYYY-MM-DD'
hide: true
# URL relative to BACKBLAZE assets root
thumbnail: pattern/TEMPLATE/thumbnail.png
---
<script setup lang="ts">
import PDFPrintable from '../../components/PDFPrintable.vue'
import {PRINTABLES} from './regular-net-test'
</script>

## Triangular Prism

<PDFPrintable :printable="PRINTABLES.triangular_prism" />

## Triangular Cupola

<PDFPrintable :printable="PRINTABLES.triangular_cupola" />

## Stuart Toroid

<PDFPrintable :printable="PRINTABLES.toroid" />
