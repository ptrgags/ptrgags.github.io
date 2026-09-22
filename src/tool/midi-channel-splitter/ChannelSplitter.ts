import { DefaultDict } from '../../lib/data_structures/DefaultDict.ts'
import { MIDIMessage, MIDIMetaEvent, MIDIProgramChangeMessage } from '../../lib/midi/MIDIEvent.ts'
import { MIDIFile, MIDIFormat, MIDIHeader } from '../../lib/midi/MIDIFile.ts'
import {
  AbsoluteTimingTrack,
  type EventList,
  type RelativeTimingTrack,
} from '../../lib/midi/MIDITrack.ts'

function get_first_program_change(events: EventList): MIDIProgramChangeMessage | undefined {
  for (const [, event] of events) {
    if (event instanceof MIDIProgramChangeMessage) {
      return event
    }
  }
}

export class ChannelSplitter {
  original_file: MIDIFile<RelativeTimingTrack>
  global_events: EventList
  channels: [number, EventList][]

  constructor(file: MIDIFile<RelativeTimingTrack>) {
    this.original_file = file

    // split the messages by channel
    const by_channel: DefaultDict<EventList> = new DefaultDict(() => [])
    for (const track of file.tracks) {
      const abs_track = track.to_absolute()

      for (const [t, event] of abs_track.events) {
        let channel_str
        if (event instanceof MIDIMessage) {
          channel_str = event.channel.toString()
        } else if (event instanceof MIDIMetaEvent) {
          channel_str = 'meta'
        } else {
          channel_str = 'sysex'
        }

        by_channel.get(channel_str).push([t, event])
      }
    }

    const MIDI_CHANNELS = 16
    const channel_list: [number, EventList][] = []
    for (let i = 0; i < MIDI_CHANNELS; i++) {
      const channel_messages = by_channel.get(i.toString())
      if (channel_messages.length > 0) {
        channel_list.push([i, channel_messages])
      }
    }

    this.channels = channel_list
    this.global_events = [...by_channel.get('meta'), ...by_channel.get('sysex')]
  }

  get channel_summaries(): { channel_number: number; program_number: number }[] {
    return this.channels.map(([channel_index, events]) => {
      const prog_change = get_first_program_change(events)
      const program_number = prog_change ? prog_change.program_number + 1 : 1

      return { channel_number: channel_index + 1, program_number }
    })
  }

  split(channel_ids: number[]): MIDIFile<RelativeTimingTrack> {
    const ppq = this.original_file.header.ticks_per_quarter

    const selected_channels = this.channels
      .filter(([i]) => channel_ids.includes(i))
      .map((x) => x[1])

    // Add the meta and sysex messages to the first available track and resort
    if (selected_channels.length > 0) {
      const with_meta = [...selected_channels[0], ...this.global_events].sort((a, b) => a[0] - b[0])
      selected_channels[0] = with_meta
    }

    const tracks = selected_channels.map((x) => new AbsoluteTimingTrack(x).to_relative())
    return new MIDIFile(new MIDIHeader(MIDIFormat.MULTI_PARALLEL, tracks.length, ppq), tracks)
  }
}
