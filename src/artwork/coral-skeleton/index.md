---
layout: article
title: Coral Skeleton
date: '2026-10-30'
sort_key: '2026-10-30:02'
hide: false
thumbnail: artwork/coral-skeleton/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './coral-skeleton'
</script>

<SketchP5 :sketch="SKETCHES.template" />

For Halloween, let's put a coral colony under an X-ray to reveal its skeleton!

## Corals Do Have Skeletons...

...but not like this! A coral isn't a single creature but a whole
colony of polyps. To push off the seafloor and towards better light and
nutrients, polyps produce calcium carbonate, layer by layer. Over time, the
calcium accumulates into branching structures. While it is made of calcium, it's
closer to rock than to bone. This artwork is just some silly wordplay for Halloween.

For an in-depth introduction to corals, see the video 🎞[What Exactly is Coral?](https://youtu.be/UkkfAzswGI8?si=9uqv1XkEbnJE5fW6) from the YouTube channel ABC Science. This video also gives an overview of what coral bleaching is and how a warming climate is dangerous for these creatures.

To understand why the skeleton produces branching structures, see the last diagram on the web page [About Corals, Anemones, and their Kin](https://web.augsburg.edu/~capman/aquaria/SpecialTopicsFiles/AboutCoralsAnemonesAndKin.html) by W. C. Capman of Augsburg College.

## Stylized Coral Motif

These stylized coral shapes are very common in my art when I draw on paper. In my past animation [Animated Tangle](https://ptrgags.dev/p5-sketchbook/AnimatedTangle/), I found a way to approximate these shapes
using a tree data structure and bezier curve. See [this README](https://github.com/ptrgags/p5-sketchbook/tree/main/AnimatedTangle#panel-4-coral) in `p5-sketchbook` for more details. I ported this code here so I can keep using it for new artworks.
