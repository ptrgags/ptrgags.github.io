---
layout: article
title: Home
---
<script setup lang="ts">
import {ALL_ARTWORK_THUMBNAILS, ALL_PROJECT_THUMBNAILS} from "./data/thumbnails"
import ThumbnailCard from './components/ThumbnailCard.vue'


const featured_artworks = ALL_ARTWORK_THUMBNAILS.filter(x => x.featured).slice(0, 5)
const recent_artworks = ALL_ARTWORK_THUMBNAILS.filter(x => !x.featured).slice(0, 5)

const featured_projects = ALL_PROJECT_THUMBNAILS.filter(x => x.featured).slice(0, 5)
const recent_projects = ALL_PROJECT_THUMBNAILS.filter(x => !x.featured).slice(0, 5)
</script>

<h2 class="center-text">Featured Projects</h2>

<div class="vertical">
    <div class="horizontal">
        <template v-for="thumbnail in featured_projects" :key="thumbnail.sort_key">
            <ThumbnailCard :card="thumbnail" />
        </template>
    </div>
    <a class="big-link" href="./projects">All Projects ></a>
</div>

<hr class="divider" width="60%" />

<h2 class="center-text">Recent Projects</h2>

<div class="vertical">
    <div class="horizontal">
        <template v-for="thumbnail in recent_projects" :key="thumbnail.sort_key">
            <ThumbnailCard :card="thumbnail" />
        </template>
    </div>
    <a class="big-link" href="./projects">All Projects ></a>
</div>

<hr class="divider" width="60%" />

<h2 class="center-text">Featured Artworks</h2>

<div class="vertical">
    <div class="horizontal">
        <template v-for="thumbnail in featured_artworks" :key="thumbnail.sort_key">
            <ThumbnailCard :card="thumbnail" />
        </template>
    </div>
    <a class="big-link" href="./gallery">Full Gallery ></a>
</div>

<hr class="divider" width="60%" />

<h2 class="center-text">Recent Artworks</h2>

<div class="vertical">
    <div class="horizontal">
        <template v-for="thumbnail in recent_artworks" :key="thumbnail.sort_key">
            <ThumbnailCard :card="thumbnail" />
        </template>
    </div>
    <a class="big-link" href="./gallery">Full Gallery ></a>
</div>
