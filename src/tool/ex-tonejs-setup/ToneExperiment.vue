<script setup lang="ts">
import * as Tone from 'tone'

async function start_audio() {
  await Tone.start()
  console.log('audio is ready')

  const synth = new Tone.Synth().toDestination()
  synth.triggerAttackRelease('C4', '4n')
}
</script>

<template>
  <button @click="start_audio">Begin</button>
</template>
