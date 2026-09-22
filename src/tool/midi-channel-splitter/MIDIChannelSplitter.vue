<script setup lang="ts">
import { ref, useTemplateRef, type Ref } from 'vue'
import { MIDIFile } from '../../lib/midi/MIDIFile.ts'
import { type RelativeTimingTrack } from '../../lib/midi/MIDITrack.ts'
import MIDIFilePicker from '../../components/MIDIFilePicker.vue'
import { GeneralMIDIInstruments } from '../../lib/midi/GeneralMIDIInstruments.ts'
import { encode_midi_file } from '../../lib/midi/encode_midi.ts'
import { download_file } from '../../lib/dom/download_file.ts'
import { ChannelSplitter } from './ChannelSplitter.ts'

const channel_splitter: Ref<ChannelSplitter | undefined> = ref(undefined)
const original_basename: Ref<string> = ref('unknown')
const channel_select = useTemplateRef('channel-select')

const can_export: Ref<boolean> = ref(false)

function load_file(file: MIDIFile<RelativeTimingTrack>, filename: string) {
  const dot = filename.lastIndexOf('.')

  original_basename.value = filename.substring(0, dot)
  channel_splitter.value = new ChannelSplitter(file)
}

const CHANNEL_DRUMS = 10
function format_channel(channel_number: number, program_number: number): string {
  let instrument_label
  if (channel_number === CHANNEL_DRUMS) {
    instrument_label = `Drum Kit ${program_number}`
  } else {
    const instrument_name = GeneralMIDIInstruments[program_number - 1]
    instrument_label = `Instrument ${program_number} - ${instrument_name}`
  }

  return `Channel ${channel_number}: ${instrument_label}`
}

function export_selected() {
  if (!channel_select.value) {
    throw new Error('missing channel select?')
  }

  if (!channel_splitter.value) {
    throw new Error('missing channel splitter?')
  }

  const channel_ids = [...channel_select.value.selectedOptions].map((x) => parseInt(x.value))
  const midi = channel_splitter.value.split(channel_ids)

  const basename = original_basename.value
  const file = encode_midi_file(midi, `${basename}-split-ch${channel_ids}.mid`)
  download_file(file)
}
</script>

<template>
  <MIDIFilePicker @load="load_file" />
  <br />
  <div v-if="channel_splitter">
    <label for="channel-select">Select Channels to Export:</label> <br />
    <select name="channel-select" ref="channel-select" multiple @input="can_export = true">
      <option
        v-for="{ channel_number, program_number } in channel_splitter.channel_summaries"
        :key="channel_number"
        ,
        :value="channel_number"
      >
        {{ format_channel(channel_number, program_number) }}
      </option>
    </select>
    <br />
    <button @click="export_selected" :disabled="!can_export">Export Selected</button>
  </div>
</template>

<style scoped>
select {
  min-width: 300px;
}
</style>
