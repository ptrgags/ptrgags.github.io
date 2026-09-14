<script setup lang="ts">
import { MIDIMetaEvent, MIDIMetaType, MIDISysex } from '../../lib/midi/MIDIEvent.ts'
import type { MIDIFile } from '../../lib/midi/MIDIFile.ts'
import type { RelativeTimingTrack } from '../../lib/midi/MIDITrack.ts'
import { Meter } from '../../pattern/musical-meter/Meter.ts'
import MIDIFilePicker from './MIDIFilePicker.vue'

interface MessageSummary {
  time: string
  type: string
  description: string
}

const MIDI_METER = new Meter(4, 4, 0)

function make_summary(file: MIDIFile<RelativeTimingTrack>) {
  const ticks_per_quarter = file.header.ticks_per_quarter

  // convert events to a single absolute sequence of events
  const all_sorted_events = file.tracks
    .map((t) => t.to_absolute())
    .flatMap((t) => t.events)
    .sort((a, b) => a[0] - b[0])

  const summaries: MessageSummary[] = []

  for (const [t, event] of all_sorted_events) {
    const pulses = t / ticks_per_quarter
    const measure_number = MIDI_METER.pulses_to_measures(pulses)

    if (event instanceof MIDISysex) {
      summaries.push({
        time: measure_number.measure_number,
        type: 'SYSEX',
        description: event.data.toString(),
      })
    } else if (event instanceof MIDIMetaEvent) {
      const event_type = MIDIMetaType[event.meta_type]
      summaries.push({
        time: measure_number.measure_number,
        type: event_type,
        description: event.data.toString(),
      })
    }
  }

  console.log(summaries)
}
</script>

<template>
  <MIDIFilePicker @load="make_summary" />
</template>
