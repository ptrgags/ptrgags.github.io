---
layout: article
title: MIDI Channel Splitter
---
<script setup lang="ts">
import MIDIChannelSplitter from './MIDIChannelSplitter.vue'
</script>

Load a MIDI file (`.mid`) with the file picker below. Then select one or more
channels to export to a new MIDI file. Each selected channel will be stored
as a separate track in the exported file. 

---

<MIDIChannelSplitter />

---

Example Uses:

- To convert between MIDI Format 0 (all messages in a single track) and MIDI Format 1 (multiple tracks in parallel), import a file, select all channels, then export. In some digital audio workstations (DAWs), this is important so each MIDI instrument ends up on a different track when importing.
- To isolate a single instrument, select only the desired channel and then export.

Additional Notes:

- MIDI System Exclusive and Meta messages are always included in the first exported track. This ensures that details such as tempo and time signature are correct in the exported file.
