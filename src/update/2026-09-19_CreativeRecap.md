---
layout: article
title: Creative Recap for 2026-09-06/19
sort_key: '2026-09-19'
summary: >
    A fresh coat of paint -- counting time but with more steps -- what's in a MIDI file?
hide: true
---

## New Website Theme and Layout

As you've likely noticed, I've changed the website layout and color theme.
Some of the design goals this time were:

- Use a sidebar to allow more room for links. On mobile, it can be accessed through a hamburger menu.
- Add a [Patterns](../patterns) section to collect links to the pattern articles I write. I'm keeping it simple for now since I've only written two articles so far.
- Make the theme more minimal. This better matches my other websites like `p5-sketchbook` and `webgpu-sketchbook`.

[This MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Common_grid_layouts) about grid layouts was quite helpful

## New Pattern: Musical Meter

See the [Musical Meter](../pattern/musical-meter/) page on this website.

For my second math pattern article, I explored musical meters. I wanted to
understand how to measure time in a song, even when the time signature
changes or when there's a pickup measure.

## New Tool: MIDI File Summary

See the [MIDI File Summary](../tool/midi-summary/) page on this website.

I was trying to match up some MIDI files with unlabeled instruments in a
SoundFont file. I figured it would be helpful to have a way to print out
the file contents including program numbers (i.e. instruments), tempo, time 
signature, and other metadata. See [the MIDI spec](https://midimusic.github.io/tech/midispec.html) 
for more information.

I ported the MIDI parsing code from `p5-sketchbook` 
(Used in [Sound Test](https://ptrgags.github.io/p5-sketchbook/SoundTest/)) to 
this website. Vue components were handy for formatting the tables.
