---
layout: article
title: Gear Tree
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {gear_schematic} from './gear-tree'
</script>

::: warning ⚠ TODO
Finished Diagram
:::

## Gear Schematic

Drawing an accurate gear shape is something I want to explore separately, so
for now let's make a schematic of a gear. This will include:

- A circle that represents the pitch circle (the circle where the teeth make contact)
- A number of tick marks that represent where the teeth go
- The first tooth tick mark will be drawn a bit longer to show the overall rotation of the gear

<SketchP5 :sketch="gear_schematic" />
