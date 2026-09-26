<script setup lang="ts">
import { ref, type Ref } from 'vue'
import MIDIFilePicker from '../../components/MIDIFilePicker.vue'
import { DefaultDict } from '../../lib/data_structures/DefaultDict.ts'
import { MIDINoteMessage } from '../../lib/midi/MIDIEvent.ts'
import type { MIDIFile } from '../../lib/midi/MIDIFile.ts'
import type { RelativeTimingTrack } from '../../lib/midi/MIDITrack.ts'

const song_pitches: Ref<number[]> = ref([])
const pitches_by_measure: Ref<[number, number[]][]> = ref([])

function load_file(file: MIDIFile<RelativeTimingTrack>) {
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
}
</script>

<template>
  <MIDIFilePicker @load="load_file"></MIDIFilePicker>
</template>
