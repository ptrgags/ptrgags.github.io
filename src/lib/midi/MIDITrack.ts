import type { MIDIEvent } from './MIDIEvent'

export type EventList = [number, MIDIEvent][]

/**
 * MIDI Track interface
 */
export interface MIDITrack {
  /**
   * For unit tests, convert to a comparable form by sorting
   */
  to_testable(): EventList
}

/**
 * Sort comparison function for two numeric arrays - sort first by length,
 * then in lexicographic order
 * @param a First array
 * @param b Second Array
 * @return positive if a should come later, negative if a should come first, 0 if equal
 */
function compare_shortlex(a: number[], b: number[]): number {
  // First, sort by length ascending
  if (a.length !== b.length) {
    return a.length - b.length
  }

  // Now, compare entries. The first nonzero one is used.
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      continue
    }

    return a[i] - b[i]
  }

  // Arrays are equal, so return the first one to be a stable sort
  return -1
}

/**
 * MIDI track with absolute tick deltas from the start of the track.
 * This is used internally for easier comparisons in unit tests and converting
 * MIDI to scores.
 */
export class AbsoluteTimingTrack {
  events: EventList

  /**
   * constructor
   * @param events Pairs of (absolute_t, msg).
   */
  constructor(events: EventList) {
    this.events = events.slice()

    // Sort by absolute time to ensure times are monotonically increasing
    this.events.sort((a, b) => a[0] - b[0])
  }

  /**
   * Convert absolute ticks to relative deltas
   * @returns {RelativeTimingTrack}
   */
  to_relative(): RelativeTimingTrack {
    const events: EventList = []

    let prev_tick = 0
    for (const [absolute_tick, msg] of this.events) {
      const delta = absolute_tick - prev_tick
      events.push([delta, msg])
      prev_tick = absolute_tick
    }
    return new RelativeTimingTrack(events)
  }

  /**
   * For unit tests, convert to a comparable form by sorting
   */
  to_testable(): EventList {
    const sorted = this.events.slice()
    sorted.sort((a, b) => {
      const [t_a, msg_a] = a
      const [t_b, msg_b] = b

      return compare_shortlex([t_a, ...msg_a.sort_key], [t_b, ...msg_b.sort_key])
    })
    return sorted
  }
}

/**
 * MIDI track with tick deltas relative to the previous message. This is
 * required for encoding to a MIDI file.
 */
export class RelativeTimingTrack {
  events: EventList

  /**
   * constructor
   * @param events Pairs of (relative_t, msg)
   */
  constructor(events: EventList) {
    this.events = events
  }

  /**
   * Convert relative deltas to absolute times
   * @returns {AbsoluteTimingTrack}
   */
  to_absolute(): AbsoluteTimingTrack {
    const events: EventList = []

    let current_tick = 0
    for (const [delta, msg] of this.events) {
      const absolute_tick = current_tick + delta
      events.push([absolute_tick, msg])
      current_tick = absolute_tick
    }

    return new AbsoluteTimingTrack(events)
  }

  /**
   * For unit tests, convert to a comparable form via sorting
   */
  to_testable(): EventList {
    return this.to_absolute().to_testable()
  }
}
