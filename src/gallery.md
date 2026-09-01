---
layout: article
title: Gallery
---

<script setup lang="ts">
import {data as ALL_ARTWORKS} from "./artwork/artwork.data"
import {data as ALL_STEREO_PAIRS} from "./stereo-pair/stereo-pair.data"
import {sort_reverse_chronological} from "./core/Sortable"
import ThumbnailCard from './components/ThumbnailCard.vue'
import {Artwork} from './core/Artwork'
import {StereoPairArtwork} from './core/StereoPairArtwork'

const artworks = ALL_ARTWORKS.map(x => new Artwork(x.frontmatter as ArtworkDescriptor).thumbnail).filter(x => !x.hide)
const stereo_pairs = ALL_STEREO_PAIRS.map(x => new StereoPairArtwork(x.frontmatter as ArtworkDescriptor).thumbnail).filter(x => !x.hide)

const artworks_newest_first = [...artworks, ...stereo_pairs]
    .sort(sort_reverse_chronological)
</script>

<div class="horizontal">
    <template v-for="thumbnail in artworks_newest_first" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
    </template>
</div>
