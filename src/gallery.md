---
layout: article
title: Gallery
---

<script setup lang="ts">
import ThumbnailCard from './components/ThumbnailCard.vue'
import {StereoPairArtwork} from './core/StereoPairArtwork'

import {ALL_ARTWORK_THUMBNAILS} from './data/thumbnails'
</script>

<div class="horizontal">
    <template v-for="thumbnail in ALL_ARTWORK_THUMBNAILS" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
    </template>
</div>
