---
layout: article
title: Halloween Friezes
date: '2026-10-30'
sort_key: '2026-10-30:01'
hide: false
# URL relative to BACKBLAZE assets root. The thumbnail must be 250x350 px
# if not specified, a placeholder image will be used
thumbnail: artwork/halloween-friezes/thumbnail.png
---
<script setup lang="ts">
import SketchP5 from '../../components/SketchP5.vue'
import {SKETCHES} from './halloween-friezes'
import HalloweenFriezesPrintable from './HalloweenFriezesPrintable.vue'
</script>

<!-- Generate the thumbnails
<SketchP5 :sketch="SKETCHES.thumbnail" />
<SketchP5 :sketch="SKETCHES.card" />
-->

Happy Halloween! This month I've been adding code to set up symmetric patterns
easily. I haven't yet written pattern articles to explain it, but for now
I made these Halloween-themed artworks to give you a preview.

There are seven types of [Frieze Groups](https://en.wikipedia.org/wiki/Frieze_group).
These are patterns that repeat over and over in one direction, sometimes with extra symmetry.
I made one frieze for each group.

## Witch Hats

Frieze Group: `p1` (translation only)

<SketchP5 :sketch="SKETCHES.p1" />

The simplest frieze group is an asymmetrical motif that is repeated over and
over along a line. Here I picked the witch hat motif from [Hex Tiles](../../artwork/math-notebook/2024-10-30_HexTiles).

## Skull and Bones

Frieze Group: `p1m1` (translation, vertical mirrors)

<SketchP5 :sketch="SKETCHES.p1m1" />

Here both the skull and bone motifs have bilateral symmetry (i.e. left and right halves are the same shape). By repeating this pattern, the overall frieze inherits the mirror lines perpendicular to the repeat direction.

The bone motif actually has a second mirror axis (horizontal), but this symmetry is broken once juxtaposed with the skull (which has a different top and bottom).

For this pattern, I used the skull and bone motifs used in a couple places in [Math Notebook](../../project/math-notebook) as well as the more recent artwork [Spine Wave](../spine-wave/). 

## Candy Haul

Frieze Group: `p11m` (translation, horizontal mirror)

<SketchP5 :sketch="SKETCHES.p11m" />

Have some candy! I'll even throw in a mirror so you get twice as much!

The candy corn motif is the same one used in [Candy Corners](../../artwork/math-notebook/2024-10-30_CandyCorners.md) from `math-notebook`. The swirly peppermint and chocolate bar are new motifs.

## Crossbones

Frieze Group: `p11g` (translation, glide reflection)

<SketchP5 :sketch="SKETCHES.p11g" />

Another type of frieze involves glide reflections. These are a combination of reflection and translation, like a set of footprints.

While at first glance this pattern might look like it has rotation symmetry, closer inspection reveals that this is not the case. 

The bone crossings in the top row look like backslashes, while the bottom row looks like forward slashes:

```
 \ \ \ \ \
/ / / / / 
```

If you were to rotate the pattern 180 degrees, the slashes would now point the opposite direction, like this:

```
 / / / / /
\ \ \ \ \
```

So we have glide symmetry, but no rotation.

## Ghost Swirls

Frieze Group: `p2` (translation, 2-fold (180°) rotation)

<SketchP5 :sketch="SKETCHES.p2" />

For this one, I made a wispy ghost shape using circular arcs (see the swatch below). I designed it carefully so if you rotate it 180°, the second copy fits in the gap exactly. This pair of ghosts is then repeated along the frieze.

<SketchP5 :sketch="SKETCHES.swirl_motif" />

I also tweaked the frieze spacing just a little bit so the ghost tails would exactly overlap. I found this to look more satisfying.

Frieze Group: `p2mg` (translation, 2-fold rotation, vertical mirrors, glide reflections)

## Ghost Zigzag

<SketchP5 :sketch="SKETCHES.p2mg" />

Here a row of ghosts is juxtaposed with another row, upside down and staggered. Here the ghost motif has bilateral symmetry which becomes mirror symmetry in the frieze. The staggering and flipping can be reinterpreted as a sequence of glide reflections. And also if you rotate the frieze around a point between diagonally adjacent ghosts, you get the same pattern.

## Candy Corn Hexagons

Frieze Group: `p2mm` (translation, 2-fold rotation, vertical mirrors, horizontal mirrors)

<SketchP5 :sketch="SKETCHES.p2mm" />

This pattern is interesting because there are symmetries happening on three different levels. From local to global:

- A single candy corn has bilateral symmetry
- Arranging six candy corns in a hexagon produces dihedral symmetry ($D_6$ = 6-fold rotations and 6 mirror lines). 3 of the mirrors line up with the bilateral symmetry of the candy corn motif, and the other 3 are in the gaps between candy corn.
- Repeating the hexagon adds translation symmetry, but partially breaks the hexagon symmetry. The horizontal mirrors line up perfectly so that symmetry remains. The vertical gaps of each hexagon are perpendicular to the repeat direction so those are allowed here. However, the diagonal mirrors would change the direction of the frieze, so this symmetry breaks.

## Bonus: Printable Friezes

Need some last-minute Halloween decorations? Here's a printable version of the above friezes!

<HalloweenFriezesPrintable />

## See Also

At the time of this writing, the pattern pages for the relevant concepts
([frieze groups](https://en.wikipedia.org/wiki/Frieze_group) and other mathematical symmetry groups) are not yet finished. However, you can still see some work-in-progress visualizations on these pages:

- [Frieze Groups](../../pattern/frieze-groups/)
- [Dihedral Groups](../../pattern/dihedral-group/)
- [Cyclic Groups](../../pattern/cyclic-group/)
