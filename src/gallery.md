---
layout: article
title: Gallery
---

<script setup lang="ts">
import {data as ALL_ARTWORKS} from "./artwork/artwork.data"
import {data as ALL_STEREO_PAIRS} from "./stereo-pair/stereo-pair.data"
import {sort_reverse_chronological} from "./core/Sortable"
import ThumbnailCard from './components/ThumbnailCard.vue'

const artworks_newest_first = [...ALL_ARTWORKS, ...ALL_STEREO_PAIRS].map(x => x.thumbnail)
    .filter(x => !x.hide)
    .sort(sort_reverse_chronological)
</script>

<div class="horizontal">
    <template v-for="thumbnail in artworks_newest_first" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
    </template>
</div>
