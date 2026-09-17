import { Velocity } from '../music/Velocity'
import { decode_variable_length } from './variable_length'

export interface MIDIEvent {
  /**
   * For unit tests, store the data bytes in an array to use as a sort key
   */
  get sort_key(): number[]

  /**
   * How long will the message be when written in binary (counting any implicit bytes)
   */
  get byte_length(): number

  /**
   * Encode the message to binary
   * @param data_view DataView to write to
   * @param offset Starting offset
   * @return New offset after writing
   */
  encode(data_view: DataView, offset: number): number
}

export enum MIDIMessageType {
  NOTE_OFF = 0b1000,
  NOTE_ON = 0b1001,
  POLY_AFTERTOUCH = 0b1010,
  CONTROL_CHANGE = 0b1011,
  PROGRAM_CHANGE = 0b1100,
  CHANNEL_AFTERTOUCH = 0b1101,
  PITCH_WHEEL_CHANGE = 0b1110,
}

/**
 * Get the length of a MIDI message (not including meta or sysex events)
 * @param {number} message_type The MIDI message type
 * @returns {0 | 1 | 2} The number of data bytes for this message type.
 */
export function get_data_length(message_type: number): 0 | 1 | 2 {
  switch (message_type) {
    case MIDIMessageType.NOTE_OFF:
    case MIDIMessageType.NOTE_ON:
    case MIDIMessageType.POLY_AFTERTOUCH:
    case MIDIMessageType.CONTROL_CHANGE:
    case MIDIMessageType.PITCH_WHEEL_CHANGE:
      return 2
    case MIDIMessageType.PROGRAM_CHANGE:
    case MIDIMessageType.CHANNEL_AFTERTOUCH:
      return 1
    default:
      return 0
  }
}

/**
 * Basic MIDI Message
 * @implements {MIDIEvent}
 */
export class MIDIMessage {
  message_type: MIDIMessageType
  channel: number
  data: Uint8Array<ArrayBufferLike>
  static DEFAULT_VELOCITY: number

  /**
   * Constructor
   * @param message_type the MIDI Message type
   * @param channel The channel number 0-15
   * @param data 1-3 data bytes as a u8 array
   */
  constructor(message_type: MIDIMessageType, channel: number, data: Uint8Array) {
    this.message_type = message_type
    this.channel = channel
    this.data = data
  }

  get sort_key(): number[] {
    const status_byte = (this.message_type << 4) | this.channel
    return [status_byte, ...this.data]
  }

  get byte_length(): number {
    // status byte + payload
    return 1 + this.data.length
  }

  /**
   * Encode the message to binary
   * @param data_view DataView to write to
   * @param offset Starting offset
   * @return New offset after writing
   */
  encode(data_view: DataView, offset: number): number {
    const status_byte = (this.message_type << 4) | this.channel
    data_view.setUint8(offset, status_byte)
    offset++

    for (const [i, x] of this.data.entries()) {
      data_view.setUint8(offset + i, x)
    }
    offset += this.data.length

    return offset
  }

  /**
   * Shorthand for a note on event
   * @param channel Channel number 0-15
   * @param pitch MIDI note number
   * @param velocity MIDI velocity 0-127
   * @returns The note event
   */
  static note_on(
    channel: number,
    pitch: number,
    velocity: number = MIDIMessage.DEFAULT_VELOCITY,
  ): MIDINoteMessage {
    // Note on with velocity 0 is the same as a note off. See the
    // MIDI 1.0 Detailed Specification
    const message_type = velocity === 0 ? MIDIMessageType.NOTE_OFF : MIDIMessageType.NOTE_ON

    return new MIDINoteMessage(message_type, channel, new Uint8Array([pitch, velocity]))
  }

  /**
   * Shorthand for a note off event
   * @param channel Channel number 0-15
   * @param pitch MIDI note number
   * @param velocity MIDI velocity 0-127
   * @returns The note event
   */
  static note_off(channel: number, pitch: number, velocity: number = 0): MIDINoteMessage {
    return new MIDINoteMessage(MIDIMessageType.NOTE_OFF, channel, new Uint8Array([pitch, velocity]))
  }

  /**
   * Shorthand for Control Change message
   * @param channel Channel number 0-15
   * @param controller Controller number 0-127
   * @param value Value 0-127
   * @returns The CC event
   */
  static cc(channel: number, controller: number, value: number): MIDICCMessage {
    return new MIDICCMessage(
      MIDIMessageType.CONTROL_CHANGE,
      channel,
      new Uint8Array([controller, value]),
    )
  }

  /**
   * Shorthand for Program Change message
   * @param channel Channel number 0-15
   * @param instrument Instrument number
   * @returns Program change message
   */
  static program_change(channel: number, instrument: number): MIDIProgramChangeMessage {
    return new MIDIProgramChangeMessage(
      MIDIMessageType.PROGRAM_CHANGE,
      channel,
      new Uint8Array([instrument]),
    )
  }

  /**
   * Short hand for a Pitch Wheel Change message
   * @param channel Channel number 0-15
   * @param value signed pitch value.
   * @returns Pitch wheel message
   */
  static pitch_wheel(channel: number, value: number): MIDIPitchWheelMessage {
    // Stored as a 14-bit value with center
    const value_unsigned = value + 0x2000

    const value_lo = value_unsigned & 0x7f
    const value_hi = (value_unsigned >> 7) & 0x7f
    return new MIDIPitchWheelMessage(
      MIDIMessageType.PROGRAM_CHANGE,
      channel,
      new Uint8Array([value_lo, value_hi]),
    )
  }

  /**
   * Decode a single MIDI message from binary
   * @param {number} running_status Running status byte - sometimes this is implicit, so it is passed in by the decoder rather than read from the array
   * @param {DataView} data_view DataView to read from
   * @param {number} offset Byte offset of the first data byte within the DataView. this is the byte _after_ the status byte (when present)
   * @returns {[MIDIMessage, number]} (message, after_offset)
   */
  static decode(
    running_status: number,
    data_view: DataView,
    offset: number,
  ): [MIDIMessage, number] {
    const message_type = running_status >> 4
    const channel = running_status & 0xf

    const data_length = get_data_length(message_type)
    const data = new Uint8Array(data_view.buffer, data_view.byteOffset + offset, data_length)

    let msg: MIDIMessage
    switch (message_type) {
      case MIDIMessageType.NOTE_OFF:
      case MIDIMessageType.NOTE_ON:
        msg = new MIDINoteMessage(message_type, channel, data)
        break
      case MIDIMessageType.PROGRAM_CHANGE:
        msg = new MIDIProgramChangeMessage(message_type, channel, data)
        break
      case MIDIMessageType.PITCH_WHEEL_CHANGE:
        msg = new MIDIPitchWheelMessage(message_type, channel, data)
        break
      case MIDIMessageType.CONTROL_CHANGE:
        msg = new MIDICCMessage(message_type, channel, data)
        break
      default:
        msg = new MIDIMessage(message_type, channel, data)
        break
    }
    const after_offset = offset + data_length
    return [msg, after_offset]
  }
}
MIDIMessage.DEFAULT_VELOCITY = Velocity.MF

export class MIDINoteMessage extends MIDIMessage {
  get pitch(): number {
    return this.data[0]
  }

  get velocity(): number {
    return this.data[1]
  }
}

export class MIDICCMessage extends MIDIMessage {
  get controller(): number {
    return this.data[0]
  }

  get value(): number {
    return this.data[1]
  }
}

export class MIDIProgramChangeMessage extends MIDIMessage {
  get program_number(): number {
    return this.data[0]
  }
}

export class MIDIPitchWheelMessage extends MIDIMessage {
  /**
   * Get the value as a signed value
   * @returns value
   */
  get value(): number {
    const value_unsigned = (this.data[1] << 7) | this.data[0]
    const ZERO = 0x2000
    return value_unsigned - ZERO
  }
}

/**
 */
export enum MIDIMetaType {
  SEQUENCE_NUMBER = 0x00,
  // Text events -------------------
  TEXT = 0x01,
  COPYRIGHT = 0x02,
  TRACK_NAME = 0x03,
  INSTRUMENT_NAME = 0x04,
  LYRIC = 0x05,
  MARKER = 0x06,
  CUE_POINT = 0x07,
  // ---------------------------
  CHANNEL_PREFIX = 0x20,
  // Not in the spec, but it seems to be a MIDI port message
  // see https://mido.readthedocs.io/en/stable/meta_message_types.html
  MIDI_PORT = 0x21,
  END_OF_TRACK = 0x2f,
  SET_TEMPO = 0x51,
  SMPTE_OFFSET = 0x54,
  TIME_SIGNATURE = 0x58,
  KEY_SIGNATURE = 0x59,
  SEQUENCER_SPECIFIC = 0x7f,
}

function is_text_event(type: MIDIMetaType): boolean {
  // Conveniently, the events that store text are listed contiguously
  // from 0x01 to 0x07
  return MIDIMetaType.TEXT <= type && type <= MIDIMetaType.CUE_POINT
}

/**
 * Type for all MIDI meta events (aside from sysex)
 * @implements {MIDIEvent}
 */
export class MIDIMetaEvent {
  meta_type: MIDIMetaType
  data: Uint8Array<ArrayBufferLike>
  /**
   * Constructor
   * @param {number} meta_type MIDIMetaType
   * @param {Uint8Array} data Raw bytes of message
   */
  constructor(meta_type: MIDIMetaType, data: Uint8Array) {
    this.meta_type = meta_type
    this.data = data
  }

  /**
   * @type {number[]}
   */
  get sort_key() {
    return [MIDIMetaEvent.MAGIC, this.meta_type, ...this.data]
  }

  get byte_length() {
    // 3 byte header + data
    return 3 + this.data.length
  }

  /**
   * Encode the message to binary
   * @param {DataView} data_view DataView to write to
   * @param {number} offset Starting offset
   * @return {number} New offset after writing
   */
  encode(data_view: DataView, offset: number): number {
    data_view.setUint8(offset, MIDIMetaEvent.MAGIC)
    data_view.setUint8(offset + 1, this.meta_type)
    // NB: This should be a variable length quantity... but my music system
    // doesn't produce any text or sysex messages at present, so the length
    // will always fit within 7 bits. If that ever changes, use
    // encode_variable_length() here and in the Sysex message
    data_view.setUint8(offset + 2, this.data.length)
    offset += 3

    for (const [i, x] of this.data.entries()) {
      data_view.setUint8(offset + i, x)
    }
    offset += this.data.length

    return offset
  }

  /**
   * Track Name event
   * @param track_name Track name. This method only supports ASCII characters
   */
  static track_name(track_name: string): MIDIMetaTextEvent {
    const encoded_name = new Uint8Array(track_name.length)
    for (let i = 0; i < track_name.length; i++) {
      encoded_name[i] = track_name.charCodeAt(i)
    }
    return new MIDIMetaTextEvent(MIDIMetaType.TRACK_NAME, encoded_name)
  }

  static set_tempo(bpm: number): MIDISetTempoEvent {
    const microsec_per_quarter = Math.round(MIDIMetaEvent.MICROSEC_PER_MIN / bpm)

    const data = new Uint8Array([
      (microsec_per_quarter >> 16) & 0xff,
      (microsec_per_quarter >> 8) & 0xff,
      microsec_per_quarter & 0xff,
    ])

    return new MIDISetTempoEvent(MIDIMetaType.SET_TEMPO, data)
  }

  /**
   * Decode a binary meta message
   * @param {DataView} data_view Data view to read from
   * @param {number} offset Offset of the first byte after the 0xFF (i.e. the meta message type field)
   * @return {[MIDIMetaEvent, number]} (message, after_offset)
   */
  static decode(data_view: DataView, offset: number): [MIDIMetaEvent, number] {
    const meta_type = data_view.getUint8(offset)

    const [length, after] = decode_variable_length(data_view, offset + 1)
    const length_length = after - (offset + 1)

    const body = new Uint8Array(
      data_view.buffer,
      data_view.byteOffset + offset + 1 + length_length,
      length,
    )

    let message
    if (is_text_event(meta_type)) {
      message = new MIDIMetaTextEvent(meta_type, body)
    } else if (meta_type === MIDIMetaType.SET_TEMPO) {
      message = new MIDISetTempoEvent(meta_type, body)
    } else if (meta_type === MIDIMetaType.TIME_SIGNATURE) {
      message = new MIDITimeSignatureEvent(meta_type, body)
    } else {
      message = new MIDIMetaEvent(meta_type, body)
    }

    const after_offset = offset + 1 + length_length + length
    return [message, after_offset]
  }

  static readonly MICROSEC_PER_MIN = 60e6
  static readonly MAGIC = 0xff
  static readonly END_OF_TRACK = new MIDIMetaEvent(MIDIMetaType.END_OF_TRACK, new Uint8Array(0))
}

// Several of the events store a string of ASCII characters.
export class MIDIMetaTextEvent extends MIDIMetaEvent {
  get text(): string {
    return String.fromCodePoint(...this.data)
  }
}

export class MIDISetTempoEvent extends MIDIMetaEvent {
  get bpm(): number {
    const [hi, mid, lo] = this.data
    const microsec_per_quarter = (hi << 16) | (mid << 8) | lo

    return Math.round(MIDIMetaEvent.MICROSEC_PER_MIN / microsec_per_quarter)
  }
}

export class MIDITimeSignatureEvent extends MIDIMetaEvent {
  get numerator(): number {
    const [num] = this.data
    return num
  }

  get denominator(): number {
    const [, power] = this.data
    return 1 << power
  }

  get clocks_per_metronome_click(): number {
    const [, , cpc] = this.data
    return cpc
  }

  get notes32_per_midi_quarter(): number {
    const [, , , n] = this.data
    return n
  }
}

export class MIDISysex implements MIDIEvent {
  data: Uint8Array<ArrayBufferLike>
  /**
   * Constructor
   * @param {Uint8Array} data Payload of the sysex message (not including the ending 0xF7 byte)
   */
  constructor(data: Uint8Array) {
    this.data = data
  }

  /**
   * @type {number[]}
   */
  get sort_key() {
    return [MIDISysex.MAGIC, ...this.data]
  }

  get byte_length() {
    // 0xF0 + length + payload length + 0xF7
    return 3 + this.data.length
  }

  /**
   * Encode the message to binary
   * @param {DataView} data_view DataView to write to
   * @param {number} offset Starting offset
   * @return {number} New offset after writing
   */
  encode(data_view: DataView, offset: number): number {
    data_view.setUint8(offset, MIDISysex.MAGIC)
    // +1 for the end of sysex byte
    data_view.setUint8(offset + 1, this.data.length + 1)
    offset += 2

    for (const [i, x] of this.data.entries()) {
      data_view.setUint8(offset + i, x)
    }
    offset += this.data.length

    data_view.setUint8(offset, MIDISysex.END_OF_SYSEX)
    offset++

    return offset
  }

  /**
   *
   * @param {DataView} data_view
   * @param {number} offset Offset of the first byte after the 0xf0, i.e. the length byte
   * @return {[MIDISysex, number]}
   */
  static decode(data_view: DataView, offset: number): [MIDISysex, number] {
    const [length, after] = decode_variable_length(data_view, offset)
    const length_length = after - offset

    const data = new Uint8Array(
      data_view.buffer,
      data_view.byteOffset + offset + length_length,
      // length includes the end of sysex byte
      length - 1,
    )

    const message = new MIDISysex(data)
    const after_offset = after + length
    return [message, after_offset]
  }

  static readonly MAGIC = 0xf0
  static readonly END_OF_SYSEX = 0xf7
}
