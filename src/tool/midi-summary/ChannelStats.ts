import {
  MIDIMessage,
  MIDINoteMessage,
  MIDICCMessage,
  MIDIProgramChangeMessage,
  MIDIMessageType,
  MIDIPitchWheelMessage,
} from '../../lib/midi/MIDIEvent.ts'
import { MIDIPitch } from '../../lib/midi/MIDIPitch.ts'
import { MeasureNumber } from '../../pattern/musical-meter/MeasureNumber.ts'

export interface MessageSummary {
  time: string
  type: string
  description: string
}

class RangeTracker<T> {
  first?: T
  last?: T

  add(value: T) {
    if (!this.first) {
      this.first = value
    }

    this.last = value
  }
}

export class ChannelStats {
  channel: number
  pitch_range = { min: 127, max: 0 }

  ccs_used: Set<number> = new Set()
  note_count = 0
  cc_count = 0
  pitch_wheel_count = 0
  aftertouch_count = 0
  poly_aftertouch_count = 0

  note_times = new RangeTracker<MeasureNumber>()
  cc_times = new RangeTracker<MeasureNumber>()
  pitch_wheel_times = new RangeTracker<MeasureNumber>()
  aftertouch_times = new RangeTracker<MeasureNumber>()
  poly_aftertouch_times = new RangeTracker<MeasureNumber>()

  summaries: MessageSummary[] = []

  constructor(channel: number) {
    this.channel = channel
  }

  update_pitch_range(pitch: number) {
    this.pitch_range.min = Math.min(this.pitch_range.min, pitch)
    this.pitch_range.max = Math.max(this.pitch_range.max, pitch)
  }

  process_message(time: MeasureNumber, message: MIDIMessage) {
    if (message instanceof MIDINoteMessage) {
      this.note_times.add(time)
      this.update_pitch_range(message.pitch)
      this.note_count++
    } else if (message instanceof MIDICCMessage) {
      this.cc_times.add(time)
      this.ccs_used.add(message.controller)
      this.cc_count++
    } else if (message instanceof MIDIProgramChangeMessage) {
      this.summaries.push({
        time: time.measure_number,
        type: MIDIMessageType[message.message_type],
        description: `${message.program_number + 1} (1-indexed)`,
      })
    } else if (message instanceof MIDIPitchWheelMessage) {
      this.pitch_wheel_times.add(time)
      this.pitch_wheel_count++
    } else if (message.message_type === MIDIMessageType.CHANNEL_AFTERTOUCH) {
      this.aftertouch_times.add(time)
      this.aftertouch_count++
    } else if (message.message_type === MIDIMessageType.POLY_AFTERTOUCH) {
      this.poly_aftertouch_times.add(time)
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
      const pitch_range = `[${MIDIPitch.format_pitch(min)}, ${MIDIPitch.format_pitch(max)}]`
      const { first, last } = this.note_times
      this.summaries.push({
        time: `${first?.measure_number}-${last?.measure_number}`,
        type: 'NOTE_ON/NOTE_OFF',
        description: `${this.note_count} messages, range: ${pitch_range}`,
      })
    }

    if (this.cc_count > 0) {
      const cc_values = [...this.ccs_used.values()].sort()
      const { first, last } = this.cc_times
      this.summaries.push({
        time: `${first?.measure_number}-${last?.measure_number}`,
        type: 'CONTROL_CHANGE',
        description: `${this.cc_count} messages, CCs: {${cc_values}}`,
      })
    }

    if (this.pitch_wheel_count > 0) {
      const { first, last } = this.pitch_wheel_times
      this.summaries.push({
        time: `${first?.measure_number}-${last?.measure_number}`,
        type: 'PITCH_WHEEL_CHANGE',
        description: `${this.pitch_wheel_count} messages`,
      })
    }

    if (this.aftertouch_count > 0) {
      const { first, last } = this.aftertouch_times
      this.summaries.push({
        time: `${first?.measure_number}-${last?.measure_number}`,
        type: 'CHANNEL_AFTERTOUCH',
        description: `${this.aftertouch_count} messages`,
      })
    }

    if (this.poly_aftertouch_count > 0) {
      const { first, last } = this.poly_aftertouch_times
      this.summaries.push({
        time: `${first?.measure_number}-${last?.measure_number}`,
        type: 'POLY_AFTERTOUCH',
        description: `${this.poly_aftertouch_count} messages`,
      })
    }
  }
}
