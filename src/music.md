---
layout: article
title: Music
---

<p>
    My music stuff is scattered all over the place at the moment. I threw together this page to
    gather the links in one place.
</p>
<h2>Albums</h2>
<p>
    Collections of music I've made. They link to a widget on this site with a web player +
    description and liner notes for each track.
</p>
<p>Out of all these albums, I'm most proud of Loops!</p>
<template v-for="thumbnail in all_albums" :key="thumbnail.sort_key">
    <ThumbnailCard :card="thumbnail" />
</template>
<h2>Music Experiments (p5.js + ToneJS)</h2>
<p>
    in my <a href="https://ptrgags.dev/p5-sketchbook/">p5.js sketchbook</a>, I've been
    experimenting with adding music to my math art in various ways, as well as exploring patterns
    in music theory.
</p>
<ul>
    <li>
    <a href="https://ptrgags.dev/p5-sketchbook/GuitarHarmonics/">Guitar Harmonics</a> (diagram)
    -- I was curious about where exactly on the fretboard each harmonic appears, so I made these
    diagrams. It's an interesting pattern, like a ruler for the rational numbers in [0, 1]
    </li>
    <li>
    <a href="https://ptrgags.dev/p5-sketchbook/Modes84/">84 Musical Modes</a> -- I'm interested
    in exploring math patterns in music. I noticed that if you list the modes in
    circle-of-fifths order, you can make a huge loop through all 84 combinations of root
    note/mode.
    </li>
    <li>
    <a href="https://ptrgags.dev/p5-sketchbook/MajorKeys/">12 Major Keys</a> (diagram) -- I'll
    admit I'm not as familiar with scales on the keyboard as I'd like to be... so I made myself
    a little cheat sheet. I color-coded the piano keys to show where the white/black keys are
    relative to each key.
    </li>
    <li>
    <a href="https://ptrgags.dev/p5-sketchbook/OcarinaTrio/">Ocarina Trio</a> -- A fun musical
    animation, and the first time I've written music as a
    <a href="https://en.wikipedia.org/wiki/Round_(music)">round</a>.
    </li>
    <li>
    <a href="https://ptrgags.dev/p5-sketchbook/MusicalTree/">Musical Tree</a> -- A sonification
    of a fractal generation algorithm (<a href="https://en.wikipedia.org/wiki/L-system"
        >L-system</a
    >
    + <a href="https://en.wikipedia.org/wiki/Turtle_graphics">turtle graphics</a>).
    </li>
    <li>
    <a href="https://ptrgags.dev/p5-sketchbook/SoundTest/">Sound Test</a> -- An earlier test of
    my sound system. There's a lot of things I want to redo. But it does do some interesting
    things like load General MIDI files and play them.
    </li>
</ul>
<h2>Music Trading Cards</h2>
<p>
    I'm trying to find a way to make music shareable in small chunks, that will help me stay
    motivated to make more. In 2025 I tried making these "music trading cards". Here I'm taking a
    short music loop and adding some visuals (in this case, pixel art made in
    <a href="https://www.aseprite.org/">Aesprite</a>). I do like how these turned out, though I
    still find the process a bit too cumbersome to do frequently.
</p>
<ul>
    <li>
    <a href="https://bsky.app/profile/ptrgags.bsky.social/post/3m5h4qnlzgc2t"
        >Microwaving Popcorn</a
    >
    (Bluesky post)
    </li>
    <li>
    <a href="https://bsky.app/profile/ptrgags.bsky.social/post/3m3drohdc622s"
        >Ghost of a Canceled Train</a
    >
    (Bluesky post)
    </li>
</ul>
