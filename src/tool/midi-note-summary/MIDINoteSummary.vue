<script setup lang="ts">
import { ref, type Ref } from 'vue'
import MIDIFilePicker from '../../components/MIDIFilePicker.vue'
import type { MIDIFile } from '../../lib/midi/MIDIFile.ts'
import type { RelativeTimingTrack } from '../../lib/midi/MIDITrack.ts'
import { C, E, G, G4 } from '../../lib/music/pitches.ts'

const song_pitches: Ref<number[]> = ref([])
const pitches_by_measure: Ref<number[][]> = ref([])

function load_file(file: MIDIFile<RelativeTimingTrack>) {
  /*
  // PR 1: Split MIDIFile<T> into MIDIFile (always relative, few methods)
  // and MIDIAbsTiming (absolute timing, more methods)
  const abs_file = file.absolute_timing()
  // PR 2: make a MIDISongMeter. It's like a SongMeter but handles MIDI ticks
  // ...or make SongMeter always handle ticks?
  const song_meter = abs_file.song_meter

  // PR 3: Make a counter, kinda like DefaultDict but instead keeps a count
  // for each count and can compute stats.
  const by_measure = new DefaultDict(() => new Counter())
  const overall = new Counter()

  abs_file
    // PR 4: Add a method to find messages matching a predicate. The other tools could benefit from this too.
    // (e.g. finding program change messages in channel splitter)
    .find_all(([, x]) => x instanceof MIDINoteMessage)
    .map(([t, x]) => {
      const { bars, beats, ticks } = song_meter.ticks_to_measure(t)
      return [bars, x.pitch]
    })
    .forEach(([bars, pitch]) => {
      by_measure.get(bars.toString).add(pitch)
      overall.add(pitch)
    })
      */

  // Fake the pitches for now - they should be the pitches found in the file
  // listed from most frequent to least frequent.
  //
  // These should really be (pitch, count) pairs, but we'll get there.
  song_pitches.value = [C, G, E]
  pitches_by_measure.value = [[C, E], [G]]
}
</script>

<template>
  <MIDIFilePicker @load="load_file"></MIDIFilePicker>

  Song pitches: {{ song_pitches }} <br />

  By measure: <br />
  <table>
    <thead>
      <tr>
        <th>Measure number</th>
        <th>Pitches</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[i, row] in pitches_by_measure.entries()" , :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ row }}</td>
      </tr>
    </tbody>
  </table>
</template>
