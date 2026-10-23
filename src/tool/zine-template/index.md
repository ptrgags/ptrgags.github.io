---
layout: article
title: Printable Zine Template
---

<script setup lang="ts">
import ZinePrintable from './ZinePrintable.vue'
import {Zine} from '../../lib/printables/Zine'
</script>

In an effort to make my art more tangible, I want to turn my designs into
physical things like printable zines. As a first step, I made these zine templates.

Since I like my art to be at trading card size (2.5x3.5"), these templates
are a little smaller than a US Letter sized page. This has the bonus of leaving
a bit of margin arund the printable area, as consumer-grade printers often do
not print all the way to the edge of the page.

## Blank Template

The simplest template just outlines each page:

<ZinePrintable :zine="Zine.BLANK"/>

## Template with Caption Boxes

This variation includes a box for captions for pages 1-6, but leaves
the front and back covers blank.

<ZinePrintable :zine="Zine.BLANK_WITH_CAPTION_BOXES"/>

## Folding Instructions

After printing the template, note the order and orientation of pages as in the following
diagram:

<ZinePrintable :zine="Zine.LABELED" />

Though this zine template is a little smaller than usual, it folds in the
same manner as a regular mini-zine! You can find folding instructions in
many places online. [This video](https://www.youtube.com/watch?v=Jz0BPgMYqG4) by San Mateo County Libraries is one such example.
Note that the order of pages varies slightly from my template, so just make sure the cover pages are on the outside by the end.
