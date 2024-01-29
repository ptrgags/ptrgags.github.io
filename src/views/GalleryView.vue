<script setup lang="ts">
    import { ARTWORKS_NEWEST_FIRST, get_thumbnail_url, get_artwork_url } from '@/data/artworks';
    import ThumbnailCard from '@/components/ThumbnailCard.vue';
</script>

<template>
    <h1 class="centered">Gallery</h1>
    <div class="tableau">
        <template v-for="artwork in ARTWORKS_NEWEST_FIRST">
            <ThumbnailCard 
                v-if="artwork.show"
                :image="get_thumbnail_url(artwork)"
                :link="get_artwork_url(artwork)"
                :title="artwork.title"
                :years="artwork.date"
            />
        </template>
    </div>
</template>

<style>
    .centered {
        text-align: center;
    }

    .tableau {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>