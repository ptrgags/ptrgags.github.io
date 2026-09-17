import { describe, it, expect } from 'vitest'
import {
  MIDIMessage,
  MIDIMessageType,
  MIDIMetaEvent,
  MIDIMetaType,
  MIDIPitchWheelMessage,
  MIDISysex,
  MIDITimeSignatureEvent,
} from './MIDIEvent.js'
import { C4, C6, G4, G5 } from '../music/pitches.js'
import { Velocity } from '../music/Velocity.js'

function make_empty_view(length: number): DataView {
  return new DataView(new ArrayBuffer(length))
}

function make_view(bytes: number[]): DataView {
  return new DataView(new Uint8Array(bytes).buffer)
}

describe('MIDIMessage', () => {
  describe('note_on', () => {
    it('with velocity 0 returns a converted note off', () => {
      const actually_off = MIDIMessage.note_on(2, C4, 0)

      const expected = MIDIMessage.note_off(2, C4, 0)
      expect(actually_off).toEqual(expected)
    })
  })

  describe('encode', () => {
    it('encodes note on event', () => {
      const note_on = MIDIMessage.note_on(1, C4, 64)
      const data_view = make_empty_view(3)

      const after = note_on.encode(data_view, 0)

      const expected = make_view([0x91, C4, 64])
      expect(data_view).toEqual(expected)
      expect(after).toBe(3)
    })

    it('encodes note off event', () => {
      const note_on = MIDIMessage.note_off(1, G4)
      const data_view = make_empty_view(3)

      const after = note_on.encode(data_view, 0)

      const expected = make_view([0x81, G4, 0])
      expect(data_view).toEqual(expected)
      expect(after).toBe(3)
    })
  })

  describe('decode', () => {
    it('decodes note on event', () => {
      const status_byte = 0x92
      const data_view = make_view([status_byte, G5, 127])

      const [result, after] = MIDIMessage.decode(status_byte, data_view, 1)

      const expected = MIDIMessage.note_on(2, G5, 127)
      expect(result).toEqual(expected)
      expect(after).toBe(3)
    })

    it('decodes note off event', () => {
      const status_byte = 0x82
      const data_view = make_view([status_byte, G5, 127])

      const [result, after] = MIDIMessage.decode(status_byte, data_view, 1)

      const expected = MIDIMessage.note_off(2, G5, 127)
      expect(result).toEqual(expected)
      expect(after).toBe(3)
    })

    it('decodes with offset', () => {
      const status_byte = 0x82
      const data_view = make_view([0, 0, 0, 0, 0, status_byte, G5, 127])

      const [result, after] = MIDIMessage.decode(status_byte, data_view, 5 + 1)

      const expected = MIDIMessage.note_off(2, G5, 127)
      expect(result).toEqual(expected)
      expect(after).toBe(8)
    })
  })
})

describe('MIDINoteMessage', () => {
  it('pitch returns correct value', () => {
    const note_on = MIDIMessage.note_on(1, C6, Velocity.MF)

    const result = note_on.pitch

    const expected = C6
    expect(result).toEqual(expected)
  })

  it('velocity returns correct value', () => {
    const note_on = MIDIMessage.note_on(1, C6, Velocity.MF)

    const result = note_on.velocity

    const expected = Velocity.MF
    expect(result).toEqual(expected)
  })
})

describe('MIDICCMessage', () => {
  it('controller returns controller number', () => {
    const cc = MIDIMessage.cc(1, 25, 50)

    const result = cc.controller

    const expected = 25
    expect(result).toEqual(expected)
  })

  it('values returns controller value', () => {
    const cc = MIDIMessage.cc(1, 25, 50)

    const result = cc.value

    const expected = 50
    expect(result).toEqual(expected)
  })
})

describe('MIDIProgramChangeMessage', () => {
  it('returns program number', () => {
    const program_change = MIDIMessage.program_change(3, 42)

    const result = program_change.program_number

    const expected = 42
    expect(result).toEqual(expected)
  })
})

describe('MIDIPitchWheelMessage', () => {
  it('value gets correct value', () => {
    const value = 1000
    const pitch_wheel = MIDIMessage.pitch_wheel(1, value)

    const result = pitch_wheel.value

    const expected = value
    expect(result).toEqual(expected)
  })

  it('value with center value returns 0', () => {
    const pitch_wheel = MIDIMessage.pitch_wheel(2, 0)

    const result = pitch_wheel.value

    const expected = 0
    expect(result).toEqual(expected)
  })

  it('value with maximum value returns correct value', () => {
    const pitch_wheel = new MIDIPitchWheelMessage(
      MIDIMessageType.PITCH_WHEEL_CHANGE,
      1,
      new Uint8Array([0b1111111, 0b1111111]),
    )

    const result = pitch_wheel.value

    // maximum value is 13 1 bits
    const expected = 8191
    expect(result).toEqual(expected)
  })

  it('value with minimum value returns correct value', () => {
    const pitch_wheel = new MIDIPitchWheelMessage(
      MIDIMessageType.PITCH_WHEEL_CHANGE,
      1,
      new Uint8Array([0, 0]),
    )

    const result = pitch_wheel.value

    const expected = -8192
    expect(result).toEqual(expected)
  })
})

describe('MIDIMetaEvent', () => {
  describe('encode', () => {
    it('encodes meta message', () => {
      const channel = 3
      const meta = new MIDIMetaEvent(MIDIMetaType.CHANNEL_PREFIX, new Uint8Array([channel]))
      const data_view = make_empty_view(4)

      const after = meta.encode(data_view, 0)

      const expected = make_view([MIDIMetaEvent.MAGIC, MIDIMetaType.CHANNEL_PREFIX, 1, channel])
      expect(data_view).toEqual(expected)
      expect(after).toBe(4)
    })
  })

  describe('decode', () => {
    it('decodes meta event', () => {
      const data_view = make_view([MIDIMetaEvent.MAGIC, MIDIMetaType.CHANNEL_PREFIX, 1, 3])

      const [result, after] = MIDIMetaEvent.decode(data_view, 1)

      const expected = new MIDIMetaEvent(MIDIMetaType.CHANNEL_PREFIX, new Uint8Array([3]))
      expect(result).toEqual(expected)
      expect(after).toBe(4)
    })

    it('decodes track_name', () => {
      const data_view = make_view([
        MIDIMetaEvent.MAGIC,
        MIDIMetaType.TRACK_NAME,
        11,
        'H'.charCodeAt(0),
        'e'.charCodeAt(0),
        'l'.charCodeAt(0),
        'l'.charCodeAt(0),
        'o'.charCodeAt(0),
        ' '.charCodeAt(0),
        'W'.charCodeAt(0),
        'o'.charCodeAt(0),
        'r'.charCodeAt(0),
        'l'.charCodeAt(0),
        'd'.charCodeAt(0),
      ])

      const [result, after] = MIDIMetaEvent.decode(data_view, 1)

      const expected = MIDIMetaEvent.track_name('Hello World')
      expect(result).toEqual(expected)
      expect(after).toBe(14)
    })

    it('decodes with offset', () => {
      const data_view = make_view([0, 0, 0, 0, 0, 0xff, MIDIMetaType.CHANNEL_PREFIX, 1, 3])

      const [result, after] = MIDIMetaEvent.decode(data_view, 1 + 5)

      const expected = new MIDIMetaEvent(MIDIMetaType.CHANNEL_PREFIX, new Uint8Array([3]))
      expect(result).toEqual(expected)
      expect(after).toBe(9)
    })
  })
})

describe('MIDIMetaTextEvent', () => {
  it('text returns ASCII data as string', () => {
    const track_name = MIDIMetaEvent.track_name('Example Track')

    const result = track_name.text

    const expected = 'Example Track'
    expect(result).toEqual(expected)
  })
})
describe('MIDISetTempoEvent', () => {
  it('bpm returns correct tempo', () => {
    const tempo = MIDIMetaEvent.set_tempo(128)

    const result = tempo.bpm

    const expected = 128
    expect(result).toEqual(expected)
  })
})

// I'm likely to revisit this one later, there are more values
// so the notation can be different than the MIDI clock
describe('MIDITimeSignatureEvent', () => {
  it('numerator and denominator get correct values', () => {
    const time_sig = new MIDITimeSignatureEvent(
      MIDIMetaType.TIME_SIGNATURE,
      new Uint8Array([0x04, 0x02, 0x18, 0x08]),
    )

    const result = `${time_sig.numerator}/${time_sig.denominator}`

    const expected = `4/4`
    expect(result).toEqual(expected)
  })
})

describe('MIDISysex', () => {
  describe('encode', () => {
    it('encodes sysex message', () => {
      const sysex = new MIDISysex(new Uint8Array([1, 2, 3, 4]))
      const data_view = make_empty_view(7)

      const after = sysex.encode(data_view, 0)

      const expected = make_view([
        MIDISysex.MAGIC,
        // length
        5,
        // data
        1,
        2,
        3,
        4,
        MIDISysex.END_OF_SYSEX,
      ])
      expect(data_view).toEqual(expected)
      expect(after).toBe(7)
    })
  })

  describe('decode', () => {
    it('decodes sysex event', () => {
      const data_view = make_view([MIDISysex.MAGIC, 4, 1, 2, 3, MIDISysex.END_OF_SYSEX])

      const [result, after] = MIDISysex.decode(data_view, 1)

      const expected = new MIDISysex(new Uint8Array([1, 2, 3]))
      expect(result).toEqual(expected)
      expect(after).toBe(6)
    })

    it('decodes with offset', () => {
      const data_view = make_view([
        0,
        0,
        0,
        0,
        0,
        MIDISysex.MAGIC,
        4,
        1,
        2,
        3,
        MIDISysex.END_OF_SYSEX,
      ])

      const [result, after] = MIDISysex.decode(data_view, 1 + 5)

      const expected = new MIDISysex(new Uint8Array([1, 2, 3]))
      expect(result).toEqual(expected)
      expect(after).toBe(11)
    })
  })
})
