<script setup lang="ts">
import { decode_wav } from '../../lib/wav/decode_wav.ts'

async function import_wav(e: Event) {
  const input = e.target as HTMLInputElement

  const files = input.files
  if (!files) {
    throw new Error('please choose a .wav file')
  }

  const file = files[0]
  const wav_buffer = await file.arrayBuffer()
  decode_wav(wav_buffer)
}
</script>

<template>
  <label for="import">Import WAV file</label>
  <input type="file" name="import" accept="audio/wav" @input="import_wav" />
</template>
