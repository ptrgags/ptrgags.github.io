<script setup lang="ts">
import {
  MIDICCMessage,
  MIDIMessage,
  MIDIMessageType,
  MIDIMetaEvent,
  MIDIMetaType,
  MIDINoteMessage,
  MIDISysex,
} from '../../lib/midi/MIDIEvent.ts'
import type { MIDIFile } from '../../lib/midi/MIDIFile.ts'
import type { RelativeTimingTrack } from '../../lib/midi/MIDITrack.ts'
import { Meter } from '../../pattern/musical-meter/Meter.ts'
import MIDIFilePicker from './MIDIFilePicker.vue'

interface MessageSummary {
  time: string
  type: string
  description: string
}

class ChannelStats {
  channel: number
  pitch_range = { min: 127, max: 0 }
  note_count = 0
  ccs_used: Set<number> = new Set()
  cc_count = 0

  constructor(channel: number) {
    this.channel = channel
  }

  update_pitch_range(pitch: number) {
    this.pitch_range.min = Math.min(this.pitch_range.min, pitch)
    this.pitch_range.max = Math.max(this.pitch_range.max, pitch)
  }

  process_message(message: MIDIMessage) {
    if (message instanceof MIDINoteMessage) {
      this.update_pitch_range(message.pitch)
      this.note_count += 1
    } else if (message instanceof MIDICCMessage) {
      this.ccs_used.add(message.controller)
    } else {
      console.log(MIDIMessageType[message.message_type], message)
      throw new Error('not implemented')
    }
  }

  get summary(): MessageSummary {
    const description = `Notes: ${this.note_count} [${this.pitch_range.min}, ${this.pitch_range.max}], CCs: ${this.cc_count}, [${this.ccs_used}]`
    return { time: '---', type: `Channel ${this.channel}`, description }
  }
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

  const stats_by_channel: ChannelStats[] = new Array(16)

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
    } else if (event instanceof MIDIMessage) {
      const channel = event.channel
      if (!stats_by_channel[channel]) {
        stats_by_channel[channel] = new ChannelStats(channel)
      }
      stats_by_channel[channel].process_message(event)
    } else {
      console.error(event)
      throw new Error('not implemented')
    }
  }

  console.log(summaries)
}
</script>

<template>
  <MIDIFilePicker @load="make_summary" />
</template>
