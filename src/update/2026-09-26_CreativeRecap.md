---
layout: article
title: Creative Recap for 2026-09-20/26
sort_key: '2026-09-26'
blog_date: '2026-09-26'
summary: >
    Part of a circle -- split MIDI files by channel
thumbnail: pattern/circular-arc/thumbnail.png
hide: true
---
<script setup lang="ts">
import {backblaze_link} from '../core/links'
</script>

## New Pattern: Circular Arc

<img :src="backblaze_link('pattern/circular-arc/thumbnail.png')" />

See the [Circular Arc](../pattern/circular-arc/) page on this website.

I added a new math pattern article about circular arcs and their symmetries.

## New Tool: MIDI Channel Splitter


<img :src="backblaze_link('update/2026-09-20/midi-splitter-thumbnail.png')" />

See the [MIDI Channel Splitter](../tool/midi-channel-splitter/) page on this website.

Some MIDI files include messages for many instruments in a single track. Some digital
audio workstations (DAWs) do not have an easy way to separate the note data. To work
around this, I made a tool to reorganize the data into separate tracks by channel number.

It also has other uses, such as isolating note data for a single instrument.
