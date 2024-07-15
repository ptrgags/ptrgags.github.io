<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ALBUMS } from '@/data/music_albums'
import type { TrackDescriptor } from '@/core/MusicAlbum'
import CardImage from '@/components/CardImage.vue'

const route = useRoute()

const album = computed(() => {
  return ALBUMS.find((x) => x.id == route.params.album_id)
})

const player = ref<HTMLAudioElement>()

const selected_track = ref(album.value?.first_track)
const selected_index = ref(0)

function get_track_classes(track: TrackDescriptor): string[] {
  if (selected_track.value && track.title === selected_track.value.title) {
    const classes = ['track', 'track-selected']
    const is_looping = album.value && album.value.play_style === 'loop'
    if (is_looping) {
      classes.push('track-loop')
    }
    return classes
  }

  return ['track']
}

function stop_playback() {
  const audio_element = player.value
  if (audio_element) {
    audio_element.pause()
  }
}

function select_track(track: TrackDescriptor, index: number) {
  stop_playback()

  selected_track.value = track
  selected_index.value = index

  const audio_element = player.value
  if (audio_element) {
    audio_element.src = album.value?.get_track_url(track) ?? ''
    audio_element.load()

    // Play the track as soon as we can.
    const play_once_loaded = () => {
      audio_element.play()
      audio_element.removeEventListener('canplay', play_once_loaded)
    }
    audio_element.addEventListener('canplay', play_once_loaded)
  }
}

function next_track() {
  const tracks: TrackDescriptor[] = album.value?.tracks ?? []
  const track_count = tracks.length

  selected_index.value += 1
  if (selected_index.value < track_count) {
    const next_track = tracks[selected_index.value]
    select_track(next_track, selected_index.value)
  }
}

// Update state when the album ID part of the URL changes, e.g.
// when one page links to another.
watch(
  () => route.params.album_id,
  () => {
    selected_track.value = album.value?.first_track
    selected_index.value = 0
  },
)
</script>

<template>
  <template v-if="album">
    <div class="tableau">
      <div class="card-frame">
        <CardImage :image="album.card"></CardImage>
      </div>
      <div class="plaque">
        <h1>{{ album.title }}<br />({{ album.years }})</h1>
        <div v-html="album.description"></div>
        <div v-if="album.play_style === 'loop'">
          <strong>🔂 Note:</strong> This album is a collection of background loops. The current
          track will repeat until you pause it or select a different track.
        </div>
        <div class="centered">
          <audio
            v-if="album.play_style === 'loop'"
            ref="player"
            controls
            controlslist="nodownload"
            loop
            :src="album.get_track_url(album.first_track)"
          ></audio>
          <audio
            v-else
            ref="player"
            controls
            controlslist="nodownload"
            :src="album.get_track_url(album.first_track)"
            @ended="next_track"
          ></audio>
        </div>
        <div class="tracklist">
          <div class="track track-header">#</div>
          <div class="track track-header">Title</div>
          <div class="track track-header">Date</div>
          <template v-for="(track, i) in album.tracks" :key="i">
            <div class="track" @click="select_track(track, i)">{{ i + 1 }}</div>
            <div :class="get_track_classes(track)" @click="select_track(track, i)">
              {{ track.title }}
            </div>
            <div class="track" @click="select_track(track, i)">{{ track.date }}</div>
          </template>
        </div>
        <div v-if="selected_track">
          <h3>Liner notes for "{{ selected_track.title }}":</h3>
          <div v-html="selected_track.description"></div>
        </div>
      </div>
    </div>
  </template>
</template>

<style>
audio {
  padding: 20px 0px;
}

.album-cover {
  object-fit: contain;
}

.tracklist {
  display: grid;
  grid-template-columns: 10% 55% 35%;
}

.track {
  box-sizing: border-box;
  background-color: var(--background-dark);
  padding: 10px;
  min-height: 40px;
}

.track-header {
  font-weight: bold;
}

.track-selected {
  color: var(--color-accent);
}

.track-loop::after {
  content: '🔂';
}
</style>
