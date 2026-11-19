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

SOUND.register_music('another', {
  loop: [0, 2],
  schedule: () => {
    const synth = new Tone.Synth({ oscillator: { type: 'pulse' } }).toDestination()
    new Tone.Part(
      (time, note) => {
        synth.triggerAttackRelease(note, '8n', time)
      },
      [
        ['0:0', 'C4'],
        ['0:1', 'D4'],
        ['0:2', 'C4'],
        ['0:3', 'E4'],
        ['1:0', 'C4'],
        ['1:1', 'F4'],
        ['1:2', 'C4'],
        ['1:3', 'G4'],
      ],
    ).start(0)
  },
})

SOUND.register_sfx('beep', {
  schedule: (time) => {
    const synth = new Tone.Synth({ oscillator: { type: 'pulse' } }).toDestination()
    synth.triggerAttackRelease('C5', '8n', time)
    synth.triggerAttackRelease('G4', '8n', '+4n')
  },
})

const sound_on = ref(false)

async function start_audio() {
  await SOUND.init()
  sound_on.value = true
}

const time = ref(0)

function get_time() {
  time.value = SOUND.time_ticks
}
</script>

<template>
  <button v-if="!sound_on" @click="start_audio">Begin</button>
  <button v-if="sound_on" @click="SOUND.play_music('metronome')">Metronome</button>
  <button v-if="sound_on" @click="SOUND.play_music('another')">Another Tune</button>
  <button v-if="sound_on" @click="SOUND.play_sfx('beep')">Beep</button>

  <button @click="get_time">Current Ticks</button>
  <div>{{ time }}</div>
</template>
