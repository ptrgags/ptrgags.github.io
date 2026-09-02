---
layout: article
title: Peter Gagliardi
---

<script setup lang="ts">
import {data as ALL_ARTWORKS} from "./artwork/artwork.data"
import {data as ALL_STEREO_PAIRS} from "./stereo-pair/stereo-pair.data"
import {data as ALL_PROJECTS} from "./project/project.data"
import {data as ALL_ALBUMS} from "./album/music_album.data"
import {Artwork} from './core/Artwork'
import {Project} from './core/Project'
import {MusicAlbum} from './core/MusicAlbum'
import {StereoPairArtwork} from './core/StereoPairArtwork'
import {sort_reverse_chronological} from "./core/Sortable"
import ThumbnailCard from './components/ThumbnailCard.vue'

const basic_artworks = ALL_ARTWORKS.map(x => new Artwork(x.frontmatter as ArtworkDescriptor).thumbnail)
const stereo_artworks = ALL_STEREO_PAIRS.map(x => new StereoPairArtwork(x.frontmatter as ArtworkDescriptor).thumbnail)
const all_artworks = [...basic_artworks, ...stereo_artworks]
    .filter(x => !x.hide).sort(sort_reverse_chronological)
const featured_artworks = all_artworks.filter(x => x.featured).slice(0, 5)
const recent_artworks = all_artworks.filter(x => !x.featured).slice(0, 5)

const basic_projects = ALL_PROJECTS.map(x => new Project(x.frontmatter as ProjectDescriptor).thumbnail)
const music_albums = ALL_ALBUMS.map(x => new MusicAlbum(x.frontmatter as MusicAlbumDescriptor).thumbnail)
const all_projects = [...basic_projects, ...music_albums].filter(x => !x.hide).sort(sort_reverse_chronological)
const featured_projects = all_projects.filter(x => x.featured).slice(0, 5)
const recent_projects = all_projects.filter(x => !x.featured).slice(0, 5)
</script>

## Featured Projects

<div class="horizontal">
    <template v-for="thumbnail in featured_projects" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
    </template>
</div>

[All Projects >](./projects)

<hr class="divider" width="60%" />

## Recent Projects

<div class="horizontal">
    <template v-for="thumbnail in recent_projects" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
    </template>
</div>

[All Projects >](./projects)

<hr class="divider" width="60%" />

## Featured Artworks

<div class="horizontal">
<template v-for="thumbnail in featured_artworks" :key="thumbnail.sort_key">
    <ThumbnailCard :card="thumbnail" />
</template>
</div>

[Full Gallery >](./gallery)

<hr class="divider" width="60%" />

## Recent Artworks

<div class="horizontal">
    <template v-for="thumbnail in recent_artworks" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
    </template>
</div>

[Full Gallery >](./gallery)

<hr class="divider" width="60%" />
