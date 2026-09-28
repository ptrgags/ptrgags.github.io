---
layout: article
title: '🧪 Map: Centered Trochoid'
date: '2026-09-26'
---
<script setup lang="ts">
import CenteredTrochoidMap from './CenteredTrochoidMap.vue'
</script>

:::warning 🚧 Under construction
This page is a work-in-progress experiment of using Leaflet maps to explore
mathematical parameters in a visual manner. 

This first iteration focused on connecting the Leaflet map with the p5.js animation.
The math and animation details are unfinished.
:::

<br />

Click a point on the map to adjust the parameters for the animation. The
x axis determines the radius of the moving circle. The y-axis determines
where the pen (tiny circle) is mounted on the moving circle.

<CenteredTrochoidMap />

---

Notes: 

- [Centered Trochoid](https://en.wikipedia.org/wiki/Centered_trochoid) is a term that generalizes hypotrochoids and epitrochoids
- I came across [this page on centered trochoids](https://www.mathcurve.com/courbes2d.gb/trochoid/trochoidacentre.shtml) when I was checking the definition
