---
layout: article
title: Creative Recap for 2026-10-04/24
sort_key: '2026-10-24'
blog_date: '2026-10-24'
summary: >
     What notes did I just play?
thumbnail: path/to/thumbnail.png
hide: true
---
<script setup lang="ts">
import {backblaze_link} from '../core/links'
</script>

## New Tool: MIDI Note Summary

<img :src="backblaze_link('update/2026-10-04/midi-note-summary-thumbnail.png')" />

See the [MIDI Note Summary](../tool/midi-note-summary/) page on this website.

I made yet another MIDI tool. This one counts the note-on messages in each measure
and summarizes the results in the table. 

The intent is to help determine keys/scales/chords used in a song. Admittedly,
this tool only gets you part of the way there. You still need to use your
ear to determine what makes sense in context.
