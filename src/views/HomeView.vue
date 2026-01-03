<script setup lang="ts">
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { PROJECTS } from '@/data/projects'
import { ARTWORKS } from '@/data/artworks'
import { computed } from 'vue'
import { type Thumbnail } from '@/core/Thumbnail'
import { sort_reverse_chronological } from '@/core/Sortable'
import { ALBUMS } from '@/data/music_albums'
import { STEREO_ARTWORKS } from '@/data/stereo_cards'

/**
 * Get all the items I marked as featured (I do this manually in the metadata)
 * @param thumbnails Thumbnails to filter
 */
function get_featured(thumbnails: Thumbnail[]): Thumbnail[] {
  return thumbnails.filter((x) => x.featured).sort(sort_reverse_chronological)
}

/**
 * Get the top 5 most recent items
 * @param thumbnails Thumbnails to filter
 */
function get_recent(thumbnails: Thumbnail[]): Thumbnail[] {
  return (
    thumbnails
      // Don't include featured works since that would be redundant
      .filter((x) => !x.featured)
      .sort(sort_reverse_chronological)
      .slice(0, 5)
  )
}

function get_all_artworks(): Thumbnail[] {
  const basic_artworks = ARTWORKS.map((x) => x.thumbnail)
  const stereo_artworks = STEREO_ARTWORKS.map((x) => x.thumbnail)
  return [...basic_artworks, ...stereo_artworks].filter((x) => !x.hide)
}

const all_artworks = get_all_artworks()
const featured_artworks = get_featured(all_artworks)
const recent_artworks = get_recent(all_artworks)

function get_all_projects(): Thumbnail[] {
  const projects = PROJECTS.map((x) => x.thumbnail)
  const albums = ALBUMS.map((x) => x.thumbnail)
  return [...projects, ...albums].filter((x) => !x.hide)
}

const all_projects = get_all_projects()
const featured_projects = get_featured(all_projects)
const recent_projects = get_recent(all_projects)
</script>

<template>
  <div class="plaque vertical">
    <h1 class="center-text">Featured Projects</h1>
    <div class="horizontal">
      <template v-for="thumbnail in featured_projects" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
      </template>
    </div>
    <p><RouterLink to="/projects">All Projects ></RouterLink></p>
    <hr class="divider" width="60%" />
    <h1 class="center-text">Recent Projects</h1>
    <div class="horizontal">
      <template v-for="thumbnail in recent_projects" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
      </template>
    </div>
    <p><RouterLink to="/projects">All Projects ></RouterLink></p>
    <hr class="divider" width="60%" />
    <h1 class="center-text">Featured Artworks</h1>
    <div class="horizontal">
      <template v-for="thumbnail in featured_artworks" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
      </template>
    </div>
    <p><RouterLink to="/gallery">All Artworks ></RouterLink></p>
    <hr class="divider" width="60%" />
    <h1 class="center-text">Recent Artworks</h1>
    <div class="horizontal">
      <template v-for="thumbnail in recent_artworks" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
      </template>
    </div>
    <p><RouterLink to="/gallery">All Artworks ></RouterLink></p>
  </div>
</template>
