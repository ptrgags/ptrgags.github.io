---
layout: article
title: Music
---
<script setup lang="ts">
import {data as ALL_ALBUMS} from '../src/album/music_album.data'
import {sort_reverse_chronological} from "./core/Sortable"
import ThumbnailCard from '../src/components/ThumbnailCard.vue'
import {MusicAlbum} from "../src/core/MusicAlbum"

const all_albums = ALL_ALBUMS.map(x => new MusicAlbum(x.frontmatter as MusicAlbumDescriptor).thumbnail)
    .filter(x => !x.hide).sort(sort_reverse_chronological)
</script>

My music stuff is scattered all over the place at the moment. I threw together this page to
gather the links in one place.

## Albums

Collections of music I've made. They link to a widget on this site with a web player +
description and liner notes for each track.

Out of all these albums, I'm most proud of Loops!

<template v-for="thumbnail in all_albums" :key="thumbnail.sort_key">
    <ThumbnailCard :card="thumbnail" />
</template>


## Music Experiments (p5.js + ToneJS)

in my [p5.js sketchbook](https://ptrgags.dev/p5-sketchbook/), I've been
experimenting with adding music to my math art in various ways, as well as exploring patterns
in music theory.


- [Guitar Harmonics](https://ptrgags.dev/p5-sketchbook/GuitarHarmonics/) (diagram)
    -- I was curious about where exactly on the fretboard each harmonic appears, so I made these
    diagrams. It's an interesting pattern, like a ruler for the rational numbers in [0, 1]
- [84 Musical Modes](https://ptrgags.dev/p5-sketchbook/Modes84/) -- I'm interested
    in exploring math patterns in music. I noticed that if you list the modes in
    circle-of-fifths order, you can make a huge loop through all 84 combinations of root
    note/mode.
- [12 Major Keys](https://ptrgags.dev/p5-sketchbook/MajorKeys/) (diagram) -- I'll
    admit I'm not as familiar with scales on the keyboard as I'd like to be... so I made myself
    a little cheat sheet. I color-coded the piano keys to show where the white/black keys are
    relative to each key.
- [Ocarina Trio](https://ptrgags.dev/p5-sketchbook/OcarinaTrio/) -- A fun musical
    animation, and the first time I've written music as a
    [round](https://en.wikipedia.org/wiki/Round_(music)).
- [Musical Tree](https://ptrgags.dev/p5-sketchbook/MusicalTree/)-- A sonification
    of a fractal generation algorithm ([L-system](https://en.wikipedia.org/wiki/L-system)
    + [turtle graphics](https://en.wikipedia.org/wiki/Turtle_graphics)).
- [Sound Test](https://ptrgags.dev/p5-sketchbook/SoundTest/) -- An earlier test of
    my sound system. There's a lot of things I want to redo. But it does do some interesting
    things like load General MIDI files and play them.
    

## Music Trading Cards


I'm trying to find a way to make music shareable in small chunks, that will help me stay
motivated to make more. In 2025 I tried making these "music trading cards". Here I'm taking a
short music loop and adding some visuals (in this case, pixel art made in 
[Aesprite](https://www.aseprite.org/)). I do like how these turned out, though I
still find the process a bit too cumbersome to do frequently.

- [Microwaving Popcorn](https://bsky.app/profile/ptrgags.bsky.social/post/3m5h4qnlzgc2t) (Bluesky post)
- [Ghost of a Canceled Train](https://bsky.app/profile/ptrgags.bsky.social/post/3m3drohdc622s) (Bluesky post)
