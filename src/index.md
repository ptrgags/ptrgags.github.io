---
layout: article
title: Peter Gagliardi
---

<script setup lang="ts">
import {ALL_ARTWORK_THUMBNAILS, ALL_PROJECT_THUMBNAILS} from "./data/thumbnails"
import ThumbnailCard from './components/ThumbnailCard.vue'


const featured_artworks = ALL_ARTWORK_THUMBNAILS.filter(x => x.featured).slice(0, 5)
const recent_artworks = ALL_ARTWORK_THUMBNAILS.filter(x => !x.featured).slice(0, 5)

const featured_projects = ALL_PROJECT_THUMBNAILS.filter(x => x.featured).slice(0, 5)
const recent_projects = ALL_PROJECT_THUMBNAILS.filter(x => !x.featured).slice(0, 5)
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
