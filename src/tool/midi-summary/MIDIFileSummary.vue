<script setup lang="ts">
import { ref, type Ref } from 'vue'
import {
  MIDIMessage,
  MIDIMetaEvent,
  MIDIMetaTextEvent,
  MIDIMetaType,
  MIDISetTempoEvent,
  MIDISysex,
  MIDITimeSignatureEvent,
} from '../../lib/midi/MIDIEvent.ts'
import { type MIDIFile, type MIDIHeader } from '../../lib/midi/MIDIFile.ts'
import { Meter } from '../../pattern/musical-meter/Meter.ts'
import { ChannelStats, type MessageSummary } from './ChannelStats.ts'
import MIDIFilePicker from '../../components/MIDIFilePicker.vue'

const MIDI_METER = new Meter(4, 4, 0)

interface SummaryTable {
  title: string
  summaries: MessageSummary[]
}

function format_bytes(bytes: Uint8Array): string {
  const bytes_hex = [...bytes].map((x) => x.toString(16).padStart(2, '0')).join(',')
  return `${bytes_hex} (hex)`
}

function make_summary(file: MIDIFile): SummaryTable[] {
  const ticks_per_quarter = file.header.ticks_per_quarter

  const abs_file = file.to_absolute_timing()

  const general_summaries: MessageSummary[] = []

  const stats_by_channel: (ChannelStats | undefined)[] = new Array(16)

  for (const [t, event] of abs_file.all_events) {
    const pulses = t / ticks_per_quarter
    const measure_number = MIDI_METER.pulses_to_measures(pulses)

    if (event instanceof MIDISysex) {
      general_summaries.push({
        time: measure_number.measure_number,
        type: 'SYSEX',
        description: format_bytes(event.data),
      })
    } else if (event instanceof MIDIMetaTextEvent) {
      const event_type = MIDIMetaType[event.meta_type]
      general_summaries.push({
        time: measure_number.measure_number,
        type: event_type,
        description: event.text,
      })
    } else if (event instanceof MIDISetTempoEvent) {
      const event_type = MIDIMetaType[event.meta_type]
      general_summaries.push({
        time: measure_number.measure_number,
        type: event_type,
        description: `${event.bpm} BPM`,
      })
    } else if (event instanceof MIDITimeSignatureEvent) {
      const event_type = MIDIMetaType[event.meta_type]
      general_summaries.push({
        time: measure_number.measure_number,
        type: event_type,
        description: `${event.numerator}/${event.denominator}`,
      })
    } else if (event instanceof MIDIMetaEvent) {
      const event_type = MIDIMetaType[event.meta_type]
      general_summaries.push({
        time: measure_number.measure_number,
        type: event_type,
        description: format_bytes(event.data),
      })
    } else if (event instanceof MIDIMessage) {
      const channel = event.channel
      if (!stats_by_channel[channel]) {
        stats_by_channel[channel] = new ChannelStats(channel)
      }
      stats_by_channel[channel].process_message(measure_number, event)
    } else {
      console.error(event)
      throw new Error(`impossible!`)
    }
  }

  const channel_summaries: SummaryTable[] = stats_by_channel
    .filter((x) => x !== undefined)
    .map((x) => {
      x.finalize()
      return { title: `Channel ${x.channel + 1}`, summaries: x.summaries }
    })

  return [{ title: 'General Messages', summaries: general_summaries }, ...channel_summaries]
}

const tables: Ref<SummaryTable[]> = ref([])

const header: Ref<MIDIHeader | undefined> = ref(undefined)

function load_file(file: MIDIFile) {
  tables.value = make_summary(file)
  header.value = file.header
}

const FORMATS = [
  '0: Single Track',
  '1: Multiple Tracks (Parallel)',
  '2: Multiple Tracks (Sequential)',
]
</script>

<template>
  <MIDIFilePicker @load="load_file" />

  <div v-if="header">
    <h2>MIDI File Info</h2>
    Format: {{ FORMATS[header.format] }} <br />
    Tracks: {{ header.num_tracks }} <br />
    Ticks per quarter note: {{ header.ticks_per_quarter }} <br />
  </div>

  <template v-for="table in tables" :key="table.title">
    <h2>{{ table.title }}</h2>
    <table>
      <thead>
        <tr>
          <th>Measure (4/4)</th>
          <th>Message Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row of table.summaries">
          <td>{{ row.time }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</template>
