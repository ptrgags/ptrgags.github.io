---
layout: article
title: Creative Recap for 2026-09-06/19
sort_key: '2026-09-19'
summary: >
    A fresh coat of paint -- counting time but with more steps -- what's in a MIDI file?
thumbnail: update/2026-09-06/coral-xstitch-thumbnail.jpg
hide: true
---

<script setup lang="ts">
import {backblaze_link} from '../core/links'
</script>

## Coral Cross Stitch

<img :src="backblaze_link('update/2026-09-06/coral-xstitch-thumbnail.jpg')" />

- See [Bluesky thread](https://bsky.app/profile/ptrgags.bsky.social/post/3mvitlstd5k2g) for more photos.

My latest embroidery project is this cross-stitch project. I designed the coral
pattern in [Aseprite](https://www.aseprite.org/). This pattern took me about a month to complete from start to finish.

Here's the original pixel art image for reference:

<img :src="backblaze_link('update/2026-09-06/coral-pattern.png')" />

## New Website Theme and Layout

<img :src="backblaze_link('update/2026-09-06/website-layout-thumbnail.png')" />

As you've likely noticed, I've changed the website layout and color theme.
Some of the design goals this time were:

- Use a sidebar to allow more room for links. On mobile, it can be accessed through a hamburger menu.
- Add a [Patterns](../patterns) section to collect links to the pattern articles I write. I'm keeping it simple for now since I've only written two articles so far.
- Make the theme more minimal. This better matches my other websites like `p5-sketchbook` and `webgpu-sketchbook`.

[This MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Common_grid_layouts) about grid layouts was quite helpful

## New Pattern: Musical Meter

<img :src="backblaze_link('update/2026-09-06/musical-meter-thumbnail.png')" />

See the [Musical Meter](../pattern/musical-meter/) page on this website.

For my second math pattern article, I explored musical meters. I wanted to
understand how to measure time in a song, even when the time signature
changes or when there's a pickup measure.

## New Tool: MIDI File Summary

<img :src="backblaze_link('update/2026-09-06/midi-summary-thumbnail.png')" />

See the [MIDI File Summary](../tool/midi-summary/) page on this website.

I was trying to match up some MIDI files with unlabeled instruments in a
SoundFont file. I wanted to inspect the program numbers (i.e. instruments) in 
the MIDI files, so I made this tool. I ported the MIDI parsing code from `p5-sketchbook` 
(Used in [Sound Test](https://ptrgags.github.io/p5-sketchbook/SoundTest/)) and 
formatted the results nicely in tabular format. It includes common song metadata like 
tempo, time signatures and program numbers. It also includes a brief summary of note data.
