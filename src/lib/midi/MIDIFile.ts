import { MIDIMetaEvent, type MIDIEvent } from './MIDIEvent'
import {
  by_midi_tick,
  type AbsoluteTimingTrack,
  type EventList,
  type MIDITrack,
  type RelativeTimingTrack,
} from './MIDITrack'

/**
 * @enum {number}
 */
export enum MIDIFormat {
  SINGLE_TRACK = 0,
  MULTI_PARALLEL = 1,
  MULTI_SEQUENCE = 2,
}
Object.freeze(MIDIFormat)

const DEFAULT_TICKS_PER_QUARTER = 96
export class MIDIHeader {
  format: MIDIFormat
  num_tracks: number
  ticks_per_quarter: number

  /**
   * Constructor
   * @param {MIDIFormat} format MIDI format
   * @param {number} num_tracks Number of tracks in the file
   * @param {number} [ticks_per_quarter=MIDIHeader.DEFAULT_TICKS_PER_QUARTER] How many ticks per quarter note
   */
  constructor(
    format: MIDIFormat,
    num_tracks: number,
    ticks_per_quarter: number = DEFAULT_TICKS_PER_QUARTER,
  ) {
    this.format = format
    this.num_tracks = num_tracks
    this.ticks_per_quarter = ticks_per_quarter
  }

  /**
   * Create a Format 1 MIDI header, which puts several tracks in parallel
   * @param {number} num_tracks Number of tracks
   * @param {number} [ticks_per_quarter=MIDIHeader.DEFAULT_TICKS_PER_QUARTER] How many ticks per quarter note
   * @returns {MIDIHeader} The header
   */
  static format1(
    num_tracks: number,
    ticks_per_quarter: number = DEFAULT_TICKS_PER_QUARTER,
  ): MIDIHeader {
    return new MIDIHeader(MIDIFormat.MULTI_PARALLEL, num_tracks, ticks_per_quarter)
  }

  static readonly DEFAULT_FORMAT0 = new MIDIHeader(MIDIFormat.SINGLE_TRACK, 1)
  static readonly DEFAULT_TICKS_PER_QUARTER = DEFAULT_TICKS_PER_QUARTER
}

/**
 * MIDI file as a collection of messages. The messages use relative time
 * deltas as defined in the MIDI 1.1 spec. This class is used mainly for
 * importing/exporting MIDI files. For in-memory computation, convert to
 * an AbsMIDIFile
 *
 * @see AbsMIDIFile
 */
export class MIDIFile {
  header: MIDIHeader
  tracks: RelativeTimingTrack[]

  /**
   * Constructor
   * @param header The file header
   * @param tracks One or more tracks
   */
  constructor(header: MIDIHeader, tracks: RelativeTimingTrack[]) {
    this.header = header
    this.tracks = tracks

    if (this.header.num_tracks !== this.tracks.length) {
      throw new Error(
        `incorrect number of tracks, expected ${this.header.num_tracks}, got ${this.tracks.length}`,
      )
    }
  }

  to_absolute_timing(): AbsMIDIFile {
    return new AbsMIDIFile(
      this.header,
      this.tracks.map((x) => x.to_absolute()),
    )
  }

  /**
   * For each track, return a testable list of events
   * @returns {[number, MIDIEvent][][]}
   */
  to_testable(): [number, MIDIEvent][][] {
    return this.tracks.map((x) => x.to_testable())
  }
}

/**
 * Like MIDIFile, but the message times are stored as absolute times. Such
 * a format is more easy to work with in-memory, so this class has more
 * methods
 */
export class AbsMIDIFile {
  header: MIDIHeader
  tracks: AbsoluteTimingTrack[]

  constructor(header: MIDIHeader, tracks: AbsoluteTimingTrack[]) {
    this.header = header
    this.tracks = tracks
  }

  /**
   * Get all events flattened and sorted chronologically
   */
  get all_events(): EventList {
    return this.tracks.flatMap((x) => x.events).sort(by_midi_tick)
  }

  find_all(query: (event: [number, MIDIEvent]) => boolean): EventList {
    return this.tracks.flatMap((x) => x.events.filter(query)).sort(by_midi_tick)
  }

  to_relative_timing(): MIDIFile {
    return new MIDIFile(
      this.header,
      this.tracks.map((x) => x.to_relative()),
    )
  }
}
