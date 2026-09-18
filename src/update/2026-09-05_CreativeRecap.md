---
layout: article
title: Creative Recap for 2026-08-30/09-05
sort_key: '2026-09-05'
thumbnail: update/2026-08-30/gear-tree-thumbnail.png
summary: >
    The gears are turning in this one -- long overdue LEGO wall mosaics -- rebuilding website
---
<script setup lang="ts">
import {backblaze_link} from '../core/links'
</script>

## Gear Tree

<img alt="diagram of gears meshed together and another gear on the same axle as the center gear" :src="backblaze_link('update/2026-08-30/gear-tree-thumbnail.png')" />

See [Gear Tree](../pattern/gear-tree/) page on this website.

I am adding a section of my website that documents math patterns in my art, music, and code. 
For the first example, I made a page to explain the mathematics of gears, and how to connect them into a tree data structure.

## LEGO Mosaics

<img alt="Pixel art of dripping paint in four colors. From top to bottom, purple, yellow, orange, dark red" :src="backblaze_link('update/2026-08-30/lego-mosaic-thumbnail.png')" />

See [Bluesky thread](https://bsky.app/profile/ptrgags.bsky.social/post/3muew5hqmfc24) for photos.

I have a set of LEGO tiles and base plates I gathered for the purpose of 
decorating my walls with pixel art. The intent was to have art that I can 
customize and change easily. However, I was a couple of years overdue in changing
the designs. 

This time, I built some tools to make the design process easier. Last year I made
[Mosaic Slider](https://ptrgags.dev/p5-sketchbook/MosaicSlider/), an interactive
pixel art editor designed for the constraints of these mosaics. I took the
results, turned it into a mini zine printout (see Bluesky thread for photos)
and built a new set of mosaics.

## Restructuring This Website

I reworked this website to use [VitePress](https://vitepress.dev/) instead of [Vue.js](https://vuejs.org/) alone. This change didn't modify any content on this website, but it will make it easier for me to add new things:
  - Pages now have real URLs instead of the confusing hashtag URLs that Vue Router uses. For example, `https://ptrgags.dev/#/project/raster-tangles/` is now `https://ptrgags.dev/project/raster-tangles/` (without the `#/`)
  - I can now write page content in Markdown format, which is easier and faster than formatting with HTML directly.


