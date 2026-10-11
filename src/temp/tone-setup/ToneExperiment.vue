<script setup lang="ts">
import * as Tone from 'tone'
import { ref } from 'vue'
import { SoundSystem } from './SoundSystem.ts'

const SOUND = new SoundSystem()
SOUND.register_music('metronome', {
  loop: [0, 1],
  schedule: () => {
    const synth = new Tone.Synth().toDestination()
    new Tone.Part(
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
  },
})

async function start_audio() {
  await SOUND.init()
  console.log('audio is ready')

  SOUND.play_music('metronome')
}

const time = ref(0)

function get_time() {
  time.value = SOUND.time_ticks
}
</script>

<template>
  <button @click="start_audio">Begin</button>

  <button @click="get_time">Current Ticks</button>
  <div>{{ time }}</div>
</template>
