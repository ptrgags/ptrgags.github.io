<script setup lang="ts">
import * as Tone from 'tone'

async function start_audio() {
  await Tone.start()
  console.log('audio is ready')

  const synth = new Tone.Synth().toDestination()
  const part = new Tone.Part(
    (time, note) => {
      synth.triggerAttackRelease(note, '8n', time)
    },
    [
      [0, 'C4'],
      ['0:1', 'C3'],
      ['0:2', 'C3'],
      ['0:3', 'C3'],
    ],
  ).start(0)

  const transport = Tone.getTransport()
  transport.setLoopPoints(0, '1:0')
  transport.start()
  transport.loop = true
}
</script>

<template>
  <button @click="start_audio">Begin</button>
</template>
