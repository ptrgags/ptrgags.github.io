import {
  MIDIMessage,
  MIDINoteMessage,
  MIDICCMessage,
  MIDIProgramChangeMessage,
  MIDIMessageType,
  MIDIPitchWheelMessage,
} from '../../lib/midi/MIDIEvent.ts'

export interface MessageSummary {
  time: string
  type: string
  description: string
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
