<script setup lang="ts">
import { ARTWORKS_NEWEST_FIRST, get_thumbnail_url, get_artwork_url } from '@/data/artworks';
import ThumbnailCard from '@/components/ThumbnailCard.vue';
import Timeline from '@/components/Timeline.vue';
import type { TimelineEntry } from '@/core/TimelineEntry';

const dummy_entries: TimelineEntry[] = [
    {
        date: "2024-01-31",
        thumbnail_url: "https://placekitten.com/250/350",
        description: "Another kitten arrived. It looked quite similar to the previous one. Was it a twin, or a dopplegänger? Nobody was really sure. Is this a new version of Shrödinger's Cat? A great mystery to be solved someday. But not today.",
    },
    {
        date: "2024-01-01",
        thumbnail_url: "https://placekitten.com/250/350",
        description: "Then the kittens arrived and everything got better",
    },
    {
        date: "2023-12-31",
        description: "The world was without kittens. What a sad world!",
    },
]
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
    <Timeline :entries="dummy_entries" />
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