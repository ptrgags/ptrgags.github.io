<script setup lang="ts">
import { ARTWORKS_NEWEST_FIRST } from '@/data/artworks';
import ThumbnailCard from '@/components/ThumbnailCard.vue';
</script>

<template>
    <h1 class="centered">Gallery</h1>
    <div class="tableau">
        <template v-for="artwork in ARTWORKS_NEWEST_FIRST" :key="artwork.sort_key">
            <ThumbnailCard 
                v-if="artwork.show"
                :image_url="artwork.thumbnail_url"
                :alt="artwork.alt_text"
                :link="artwork.artwork_url"
                :title="artwork.title"
                :years="artwork.date"
            />
        </template>
        <div class="plaque" v-show="true">
            🚧 Curating old artworks, check back later for more!
        </div>
    </div>
</template>
