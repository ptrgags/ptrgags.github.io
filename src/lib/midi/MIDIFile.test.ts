import { describe, it, expect } from 'vitest'
import { MIDIMessage, MIDIMetaEvent, MIDINoteMessage, type MIDIEvent } from './MIDIEvent.ts'
import { AbsMIDIFile, MIDIHeader } from './MIDIFile.ts'
import { AbsoluteTimingTrack } from './MIDITrack.ts'
import { C4, E4 } from '../music/pitches.ts'

function make_file(): AbsMIDIFile {
  return new AbsMIDIFile(MIDIHeader.DEFAULT_FORMAT0, [
    new AbsoluteTimingTrack([
      // Meta message
      [0, MIDIMetaEvent.set_tempo(140)],
      // Note events
      [0, MIDIMessage.note_on(0, C4)],
      // A MIDI message, but not a note message
      [10, MIDIMessage.cc(0, 7, 64)],
      [20, MIDIMessage.note_off(0, C4)],
    ]),
  ])
}

// multi-track drifting!!
function make_multi_track() {
  return new AbsMIDIFile(MIDIHeader.format1(2), [
    new AbsoluteTimingTrack([
      // Meta message
      [0, MIDIMetaEvent.set_tempo(140)],
      // Note events
      [0, MIDIMessage.note_on(0, C4)],
      // A MIDI message, but not a note message
      [10, MIDIMessage.cc(0, 7, 64)],
      [20, MIDIMessage.note_off(0, C4)],
    ]),
    new AbsoluteTimingTrack([
      // more messages on a different track, overlapping the first track
      // in time
      [5, MIDIMessage.note_on(1, E4)],
      [30, MIDIMessage.note_off(1, E4)],
    ]),
  ])
}

describe('AbsMIDIFile', () => {
  describe('find_all', () => {
    it('with empty midi file returns empty array', () => {
      const empty_midi = new AbsMIDIFile(MIDIHeader.DEFAULT_FORMAT0, [new AbsoluteTimingTrack([])])

      const result = empty_midi.find_all(([, event]) => event instanceof MIDINoteMessage)

      const expected: [number, MIDIEvent][] = []
      expect(result).toEqual(expected)
    })

    it('with trivial query returns everything', () => {
      const empty_midi = make_file()

      const result = empty_midi.find_all(() => true)

      const expected = [
        [0, MIDIMetaEvent.set_tempo(140)],
        [0, MIDIMessage.note_on(0, C4)],
        [10, MIDIMessage.cc(0, 7, 64)],
        [20, MIDIMessage.note_off(0, C4)],
      ]
      expect(result).toEqual(expected)
    })

    it('with query filters messages', () => {
      const midi = make_file()

      const result = midi.find_all(([, event]) => event instanceof MIDINoteMessage)

      const expected = [
        [0, MIDIMessage.note_on(0, C4)],
        [20, MIDIMessage.note_off(0, C4)],
      ]
      expect(result).toEqual(expected)
    })

    it('with multiple tracks returns messages from all tracks sorted chronologically', () => {
      const midi = make_multi_track()

      const result = midi.find_all(([, event]) => event instanceof MIDINoteMessage)

      const expected = [
        [0, MIDIMessage.note_on(0, C4)],
        [5, MIDIMessage.note_on(1, E4)],
        [20, MIDIMessage.note_off(0, C4)],
        [30, MIDIMessage.note_off(1, E4)],
      ]
      expect(result).toEqual(expected)
    })
  })
})
