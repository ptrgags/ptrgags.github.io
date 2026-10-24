---
layout: article
title: MIDI Note Summary
---
<script setup lang="ts">
import MIDINoteSummary from './MIDINoteSummary.vue'
</script>

Load a MIDI file (`.mid`) with the file picker below, and this page will count the notes that appear in each measure.

---

<MIDINoteSummary />

---

### Example Uses:

- Determine chords of a song by examining the measure-by-measure note counts.
- Determine the key/scale of a melody by examining the overall note counts. For best results, use a MIDI file that contains a single voice. The [MIDI Channel Splitter](../midi-channel-splitter/) page can help with this.

### Notes:

- Use your ear!. The tonic isn't necessarily the most frequent note.
- At present, notes are bucketed by measures of 4/4. If the song uses another time signature or a pickup measure, this may produce incorrect results.
- This tool does not attempt to determine the correct spelling of note names.
- Drum kits do not follow musical scales, so this will muddy the output. If you need to remove a drum track, see the [MIDI Channel Splitter](../midi-channel-splitter/) page.
- Here are some more cases that will likely not work well with this tool:
  - If the song changes key, this will muddy the overall note counts. However, the measure-by-measure note counts will be fine.
  - If a measure contains multiple chords, this will muddy the note counts for that specific measure.
