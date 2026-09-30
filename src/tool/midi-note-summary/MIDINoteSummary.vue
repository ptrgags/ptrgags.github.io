<script setup lang="ts">
import { ref, type Ref } from 'vue'
import MIDIFilePicker from '../../components/MIDIFilePicker.vue'
import type { MIDIFile } from '../../lib/midi/MIDIFile.ts'
import { C, E, G, G4 } from '../../lib/music/pitches.ts'
import { Meter } from '../../pattern/musical-meter/Meter.ts'
import { DefaultDict } from '../../lib/data_structures/DefaultDict.ts'
import { FrequencyDistribution } from '../../lib/data_structures/FrequencyDistribution.ts'
import { MIDINoteMessage } from '../../lib/midi/MIDIEvent.ts'
import { MIDIPitch } from '../../lib/midi/MIDIPitch.ts'

const song_pitches: Ref<[string, number][]> = ref([])
const pitches_by_measure: Ref<[string, number][][]> = ref([])

const MIDI_METER = new Meter(4, 4, 0)

function load_file(file: MIDIFile) {
  const abs_file = file.to_absolute_timing()
  const ppq = abs_file.header.ticks_per_quarter

  const by_measure: DefaultDict<FrequencyDistribution<string>> = new DefaultDict(
    () => new FrequencyDistribution(),
  )
  const overall = new FrequencyDistribution<string>()
  let max_measure = 0

  abs_file
    // PR 4: Add a method to find messages matching a predicate. The other tools could benefit from this too.
    // (e.g. finding program change messages in channel splitter)
    .find_all(([, x]) => x instanceof MIDINoteMessage)
    .map(([t, x]) => {
      const { measures } = MIDI_METER.pulses_to_measures(t / ppq)
      return [measures, (x as MIDINoteMessage).pitch]
    })
    .forEach(([measures, pitch]) => {
      max_measure = Math.max(max_measure, measures)
      const pitch_class = MIDIPitch.get_pitch_class(pitch)
      const pitch_class_str = MIDIPitch.format_pitch_class(pitch_class)
      by_measure.get(measures.toString()).count(pitch_class_str)
      overall.count(pitch_class_str)
    })

  // Fake the pitches for now - they should be the pitches found in the file
  // listed from most frequent to least frequent.
  //
  // These should really be (pitch, count) pairs, but we'll get there.
  song_pitches.value = overall.frequencies

  const rows = []
  for (let i = 0; i < max_measure; i++) {
    const row_values = by_measure.get(i.toString()).frequencies
    rows.push(row_values)
  }
  pitches_by_measure.value = rows
}

function format_frequencies(frequencies: [string, number][]): string {
  const pairs = frequencies.map(([x, freq]) => `${x}:${freq}`).join(', ')
  return `{${pairs}}`
}
</script>

<template>
  <MIDIFilePicker @load="load_file"></MIDIFilePicker>

  Song pitches: {{ format_frequencies(song_pitches) }} <br />

  By measure: <br />
  <table>
    <thead>
      <tr>
        <th>Measure (4/4)</th>
        <th>Pitches</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[i, row] in pitches_by_measure.entries()" , :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ format_frequencies(row) }}</td>
      </tr>
    </tbody>
  </table>
</template>
