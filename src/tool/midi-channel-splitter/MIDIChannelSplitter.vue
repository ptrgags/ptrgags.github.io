<script setup lang="ts">
import { ref, useTemplateRef, type Ref } from 'vue'
import { DefaultDict } from '../../lib/data_structures/DefaultDict.ts'
import {
  MIDIMessage,
  MIDIMetaEvent,
  MIDIProgramChangeMessage,
  type MIDIEvent,
} from '../../lib/midi/MIDIEvent.ts'
import { MIDIFile, MIDIFormat, MIDIHeader } from '../../lib/midi/MIDIFile.ts'
import { AbsoluteTimingTrack, type RelativeTimingTrack } from '../../lib/midi/MIDITrack.ts'
import MIDIFilePicker from '../midi-summary/MIDIFilePicker.vue'
import { GeneralMIDIInstruments } from '../../lib/midi/GeneralMIDIInstruments.ts'
import { encode_midi_file } from '../../lib/midi/encode_midi.ts'
import { download_file } from '../../lib/dom/download_file.ts'

type EventList = [number, MIDIEvent][]

const meta_events: Ref<EventList | undefined> = ref(undefined)
const channels: Ref<[number, EventList][] | undefined> = ref(undefined)
const ppq: Ref<number> = ref(96)

const channel_select = useTemplateRef('channel-select')

function load_file(file: MIDIFile<RelativeTimingTrack>) {
  const by_channel: DefaultDict<[number, MIDIEvent][]> = new DefaultDict(() => [])

  for (const track of file.tracks) {
    const abs_track = track.to_absolute()

    for (const [t, event] of abs_track.events) {
      if (event instanceof MIDIMessage) {
        const channel = event.channel
        by_channel.get(channel.toString()).push([t, event])
      } else if (event instanceof MIDIMetaEvent) {
        by_channel.get('meta').push([t, event])
      } else {
        // ignore sysex messages
        console.info('skipping sysex message', event)
      }
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

  if (channel_list.length > 0) {
    channels.value = channel_list
    meta_events.value = by_channel.get('meta')
  } else {
    channels.value = undefined
    meta_events.value = undefined
  }
  ppq.value = file.header.ticks_per_quarter
}

function get_first_program_change(events: EventList): MIDIProgramChangeMessage | undefined {
  for (const [, event] of events) {
    if (event instanceof MIDIProgramChangeMessage) {
      return event
    }
  }
}

const CHANNEL_DRUMS = 10
function format_events(channel_index: number, events: EventList): string {
  const prog_change = get_first_program_change(events)
  const program_number = prog_change ? prog_change.program_number + 1 : 1
  if (channel_index + 1 === CHANNEL_DRUMS) {
    const drum_kit_no = program_number ?? '?'
    return `Drum Kit (kit=${drum_kit_no})`
  } else if (prog_change) {
    return `Instrument ${program_number} - ${GeneralMIDIInstruments[prog_change.program_number]}`
  }

  return 'Instrument 1 - ACOUSTIC_GRAND_PIANO'
}

function export_selected(event: Event) {
  if (!channel_select.value) {
    throw new Error('missing channel select?')
  }

  if (!channels.value) {
    throw new Error('channels select not available')
  }

  if (!meta_events.value) {
    throw new Error('meta events not available')
  }

  const channel_ids = [...channel_select.value.selectedOptions].map((x) => parseInt(x.value))
  const selected_channels = channels.value.filter(([i]) => channel_ids.includes(i)).map((x) => x[1])

  // add the meta messages to the first available track and re-sort
  if (selected_channels.length > 0) {
    const with_meta = [...selected_channels[0], ...meta_events.value].sort((a, b) => a[0] - b[0])
    selected_channels[0] = with_meta
  }

  const tracks = selected_channels.map((x) => new AbsoluteTimingTrack(x).to_relative())
  const midi = new MIDIFile(
    new MIDIHeader(MIDIFormat.MULTI_PARALLEL, tracks.length, ppq.value),
    tracks,
  )

  const channels_human = channel_ids.map((x) => x + 1)
  const file = encode_midi_file(midi, `split-tracks-ch${channels_human}.mid`)
  download_file(file)
}
</script>

<template>
  <MIDIFilePicker @load="load_file" />

  <div v-if="channels">
    <select ref="channel-select" multiple>
      <option v-for="[i, events] in channels" :key="i" , :value="i">
        Channel {{ i + 1 }}: {{ format_events(i, events) }}
      </option>
    </select>
    <br />
    <button @click="export_selected">Export Selected</button>
  </div>
</template>

<style scoped>
select {
  min-width: 300px;
}
</style>
