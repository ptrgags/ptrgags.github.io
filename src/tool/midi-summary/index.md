---
layout: article
title: MIDI File Summary
---
<script setup lang="ts">
import MIDIFileSummary from "./MIDIFileSummary.vue"
</script>

Load a MIDI file (`.mid`) with the file picker below, and this page will
show an overview of the file contents.

Notes:

- Measure numbers are shown in the default 4/4 time signature, even if a time signature message is listed.
- This summary aggregates across all tracks in the file. 
- Pitch ranges are specified in [scientific pitch notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation), so `Middle C = C4 = MIDI note 60`. Octave numbers may differ from other music software!
---

<MIDIFileSummary />
