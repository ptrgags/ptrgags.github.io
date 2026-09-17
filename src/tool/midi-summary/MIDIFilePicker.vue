<script setup lang="ts">
import { decode_midi } from '../../lib/midi/decode_midi.ts'
import type { MIDIFile } from '../../lib/midi/MIDIFile.ts'
import type { RelativeTimingTrack } from '../../lib/midi/MIDITrack.ts'

const emit = defineEmits<{
  (e: 'load', file: MIDIFile<RelativeTimingTrack>): void
}>()

async function import_midi_file(e: Event) {
  const input = e.target as HTMLInputElement

  const files = input.files
  if (!files) {
    throw new Error('no files provided')
  }

  if (files.length === 0) {
    throw new Error('please choose a .mid file')
  }

  const file = files[0]
  const midi_buffer = await file.arrayBuffer()
  const midi_file = decode_midi(midi_buffer)
  emit('load', midi_file)
}
</script>

<template>
  <div>
    <label for="import">Import MIDI (.mid) file</label>
    <br />
    <input type="file" name="import" id="import" accept="audio/mid" @input="import_midi_file" />
  </div>
</template>
