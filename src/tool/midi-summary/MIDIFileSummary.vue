<script setup lang="ts">
import {
  MIDICCMessage,
  MIDIMessage,
  MIDIMessageType,
  MIDIMetaEvent,
  MIDIMetaTextEvent,
  MIDIMetaType,
  MIDINoteMessage,
  MIDIPitchWheelMessage,
  MIDIProgramChangeMessage,
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

  ccs_used: Set<number> = new Set()
  note_count = 0
  cc_count = 0
  pitch_wheel_count = 0
  aftertouch_count = 0
  poly_aftertouch_count = 0

  summaries: MessageSummary[] = []

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
      this.note_count++
    } else if (message instanceof MIDICCMessage) {
      this.ccs_used.add(message.controller)
      this.cc_count++
    } else if (message instanceof MIDIProgramChangeMessage) {
      this.summaries.push({
        time: '---',
        type: MIDIMessageType[message.message_type],
        description: `${message.program_number} (0-indexed)`,
      })
    } else if (message instanceof MIDIPitchWheelMessage) {
      this.pitch_wheel_count++
    } else if (message.message_type === MIDIMessageType.CHANNEL_AFTERTOUCH) {
      this.aftertouch_count++
    } else if (message.message_type === MIDIMessageType.POLY_AFTERTOUCH) {
      this.poly_aftertouch_count++
    } else {
      // shouldn't happen
      console.log(MIDIMessageType[message.message_type], message)
      throw new Error('impossible!')
    }
  }

  finalize() {
    if (this.note_count > 0) {
      const { min, max } = this.pitch_range
      const pitch_range = `[${min}, ${max}]`
      this.summaries.push({
        time: '---',
        type: 'NOTE_ON/NOTE_OFF',
        description: `${this.note_count} messages, range: ${pitch_range}`,
      })
    }

    if (this.cc_count > 0) {
      const cc_values = [...this.ccs_used.values()].sort()
      this.summaries.push({
        time: '---',
        type: 'CONTROL_CHANGE',
        description: `${this.cc_count} messages, CCs: {${cc_values}}`,
      })
    }

    if (this.pitch_wheel_count > 0) {
      this.summaries.push({
        time: '---',
        type: 'PITCH_WHEEL_CHANGE',
        description: `${this.pitch_wheel_count} messages`,
      })
    }

    if (this.aftertouch_count > 0) {
      this.summaries.push({
        time: '---',
        type: 'CHANNEL_AFTERTOUCH',
        description: `${this.aftertouch_count} messages`,
      })
    }

    if (this.poly_aftertouch_count > 0) {
      this.summaries.push({
        time: '---',
        type: 'POLY_AFTERTOUCH',
        description: `${this.poly_aftertouch_count} messages`,
      })
    }
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

  const general_summaries: MessageSummary[] = []

  const stats_by_channel: ChannelStats[] = new Array(16)

  for (const [t, event] of all_sorted_events) {
    const pulses = t / ticks_per_quarter
    const measure_number = MIDI_METER.pulses_to_measures(pulses)

    if (event instanceof MIDISysex) {
      general_summaries.push({
        time: measure_number.measure_number,
        type: 'SYSEX',
        description: event.data.toString(),
      })
    } else if (event instanceof MIDIMetaTextEvent) {
      const event_type = MIDIMetaType[event.meta_type]
      general_summaries.push({
        time: measure_number.measure_number,
        type: event_type,
        description: event.text,
      })
    } else if (event instanceof MIDIMetaEvent) {
      const event_type = MIDIMetaType[event.meta_type]
      const event_bytes = [...event.data].map((x) => x.toString(16)).join(',')
      general_summaries.push({
        time: measure_number.measure_number,
        type: event_type,
        description: event_bytes,
      })
    } else if (event instanceof MIDIMessage) {
      const channel = event.channel
      if (!stats_by_channel[channel]) {
        stats_by_channel[channel] = new ChannelStats(channel)
      }
      stats_by_channel[channel].process_message(event)
    } else {
      console.error(event)
      throw new Error(`impossible!`)
    }
  }

  console.log(general_summaries)

  stats_by_channel.forEach((x) => {
    if (!x) {
      return
    }
    x.finalize()
    console.log('Channel', x.channel, x.summaries)
  })
}
</script>

<template>
  <MIDIFilePicker @load="make_summary" />
</template>
