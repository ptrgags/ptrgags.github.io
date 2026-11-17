---
layout: article
title: Printable Zine Template
---

<script setup lang="ts">
import ZinePrintable from './ZinePrintable.vue'
import {Zine} from '../../lib/printables/Zine'
</script>

In an effort to make my art more tangible, I want to turn my designs into
physical items like printable zines. As a starting point, I made these
zine templates

I prefer making art at trading card size (2.5 by 3.5 inches), so each page
of the template is trading-card sized. This is slightly smaller than a US
letter-sized page. I find this surprisingly convenient, as it leaves a bit of
margin around the print area.

## Blank Template

The simplest template just outlines each page:

<ZinePrintable :zine="Zine.BLANK"/>

## Template with Caption Boxes

This variation includes a box for captions for the six inside pages, but leaves
the front and back covers blank.

<ZinePrintable :zine="Zine.BLANK_WITH_CAPTION_BOXES"/>

## Folding Instructions

After printing the template, note the order and orientation of pages as in the 
following diagram:

<ZinePrintable :zine="Zine.LABELED" />

Though this zine template is a little smaller than usual, it folds in the
same manner as a regular mini-zine. You can find folding instructions in
many places online. [This video](https://www.youtube.com/watch?v=Jz0BPgMYqG4) by 
San Mateo County Libraries is one such example. The order of pages in the video 
is different from my template, but this is easy to fix. Just make sure that the 
two cover pages are on the outside of the zine.
