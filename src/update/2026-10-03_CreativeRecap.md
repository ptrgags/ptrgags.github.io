---
layout: article
title: Creative Recap for 2026-09-20/10-03
sort_key: '2026-10-03'
blog_date: '2026-10-03'
summary: >
    Part of a circle -- split MIDI files by channel -- exploring symmetry -- mathematical cartography
thumbnail: pattern/circular-arc/thumbnail.png
hide: false
---
<script setup lang="ts">
import {backblaze_link} from '../core/links'
</script>

## New Pages

### New Pattern: Circular Arc

<img :src="backblaze_link('pattern/circular-arc/thumbnail.png')" />

See the [Circular Arc](../pattern/circular-arc/) page on this website.

I added a new math pattern article about circular arcs and their symmetries.

### New Tool: MIDI Channel Splitter

<img :src="backblaze_link('update/2026-09-20/midi-splitter-thumbnail.png')" />

See the [MIDI Channel Splitter](../tool/midi-channel-splitter/) page on this website.

Some MIDI files include messages for many instruments in a single track. Some digital
audio workstations (DAWs) do not have an easy way to separate the note data. To work
around this, I made a tool to reorganize the data into separate tracks by channel number.

It also has other uses, such as isolating note data for a single instrument.

## From the Lab 🧪 

Lately I've been porting a lot of old code
from `p5-sketchbook` to prepare for future visualizations. The process is
rather haphazard, so most things are in a work-in-progress state. However,
I have a couple teasers for future articles.

### Setting up Symmetry Explorations

<img :src="backblaze_link('update/2026-09-20/cyclic-group-thumbnail.png')" />

See a preview on the [Cyclic Group](../pattern/cyclic-group/) pattern page on this website.

In the math pattern articles I want to write, a big theme is exploring
symmetries of patterns. You can see some examples in the aforementioned
Circular Arc page. 

I'm working on some code to make it easier to draw symmetric patterns on the
screen. This will help make visuals for future pattern articles. As a first
example, I made some code to set up [cyclic groups](https://en.wikipedia.org/wiki/Cyclic_group), which rotate a pattern
around a circle.

However, sometimes a pattern is only partially symmetric. My code also allows
making the coordinate system symmetric while varying the decoration in each
tile. Here's an example of that:

<img :src="backblaze_link('update/2026-09-20/cyclic-group-teaser2.png')" />

### Proof of Concept: Leaflet Maps for Math Exploration

<img :src="backblaze_link('update/2026-09-20/centered-trochoid-thumbnail.png')" />

See a preview on the [Centered Trochoid](../map/centered-trochoid/) map page.

I wanted a more visual way to explore math patterns. As an experiment, I set
up an interactive map of a parameter space next to a visualization. When you
click points on the map, the visualization automatically updates. Furthermore,
whenever I find something interesting, I can annotate the map with landmarks
and boundaries.

As a proof-of-concept, the map linked above explores [centered trochoids](https://en.wikipedia.org/wiki/Centered_trochoid).
These are the kinds of curves produced by the [Spirograph](https://en.wikipedia.org/wiki/Spirograph) drawing toy.

In retrospect, my past project
[`symmetry-sketchbook`](https://ptrgags.dev/symmetry-sketchbook/#/curve_symmetry/curve_maker) does something similar.
The pattern editor pages use multiple `p5` sketches working together. 
Some are used for selecting/editing parameters, and one is used for displaying 
the pattern.

For some further trivia, this mathematical mapping idea is partly inspired by how the 
[Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) fractal can be 
used as a map to find the interesting
[Julia sets](https://en.wikipedia.org/wiki/Julia_set).
In fact, artist Bill Tavis made a [map poster](https://www.mandelmap.com/) to 
further emphasize this idea!
