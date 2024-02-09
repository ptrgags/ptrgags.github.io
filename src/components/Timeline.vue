<!--
    Timeline component inspired by https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_timeline
-->
<script setup lang="ts">
import type { TimelineEntry } from '@/core/TimelineEntry'
import CardImage from './CardImage.vue'
import MaybeLink from "./MaybeLink.vue"
defineProps<{
    entries: TimelineEntry[]
}>()

function entry_class(index: number) {
    const side = index % 2 == 0 ? "entry-right" : "entry-left"
    return ["timeline-entry", side]
}
</script>

<template>
    <div class="timeline">
        <template v-for="(entry, index) in entries" :key="entry.sort_key">
            <div :class="entry_class(index)">
                <div class="entry-content">
                    <div v-if="entry.thumbnail" class="entry-image card-frame">
                        <CardImage size="thumbnail" :orientation="entry.thumbnail.orientation" :url="entry.thumbnail.url"
                            :alt="entry.thumbnail.alt_text" />
                    </div>
                    <div class="entry-description">
                        <h3><MaybeLink :url="entry.title_link">{{ entry.title }}</MaybeLink> ({{
                            entry.date }})</h3>
                        <span v-html="entry.description"></span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
/* Container for the whole timeline */
.timeline {
    position: relative;
    max-width: 80%;
    margin: 0 auto;
    background-color: var(--background-transparent);
}

/* Draw the actual timeline */
.timeline::after {
    content: "";
    position: absolute;
    background-color: var(--background-text);

    /* make a long, thin rectangle */
    top: 0px;
    bottom: 0px;
    width: 8px;

    /* center on the page */
    left: 50%;
    margin-left: -4px;
    /* half of width */
}

.timeline-entry {
    position: relative;
    box-sizing: border-box;
    width: 50%;
    padding: 10px 40px;
}

.entry-content {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 20px;
    background-color: #333333;
}

.entry-left .entry-content {
    flex-direction: row-reverse;
    border-top-right-radius: 0px;
}

.entry-right .entry-content {
    border-top-left-radius: 0px;
}

.entry-left {
    left: 0%;
}

.entry-right {
    left: 50%;
}

/* Make a bump that sticks out to point to the timeline */
.entry-left::before {
    content: "";
    z-index: 1;

    /* Set a rounded border except on the left side */
    border-width: 10px 0px 10px 10px;
    border-color: var(--background-text);
    border-style: solid;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    /* 
     * set the size and position of it to fit in the gap between the
     * entry bubble and the timeline.
     *
     * border-radius + width + right must equal the margin for .timeline-entry
     */
    position: absolute;
    width: 10px;
    right: 20px;
}

.entry-right::before {
    content: "";
    z-index: 1;

    /* Same idea as for .entry-left::before, but the opposite direction */
    border-width: 10px 10px 10px 0px;
    border-color: var(--background-text);
    border-style: solid;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    position: absolute;
    width: 10px;
    left: 20px;
}

/* Big dot on the timeline */
.timeline-entry::after {
    content: '';
    position: absolute;
    z-index: 1;
    background-color: var(--color-accent);
    width: 20px;
    height: 20px;
    top: 10px;
    border-radius: 10px;
}

/* position the dots on the timeline*/
.entry-right::after {
    left: -10px;
}

.entry-left::after {
    right: -10px;
}

.entry-image {
    /* 
     * If we're too large to fit, don't shrink the image, shrink the text next to it.
     * This is needed since .card-frame image has max-width 100% so tends to
     * shrink too much for landscape images
     */
    flex-shrink: 0;
}

.entry-description {
    display: inline-block;
    padding: 20px 20px;
}

.entry-description h3 {
    color: var(--color-accent);
}

/* For medium-sized screens, start stacking the content vertically */
@media screen and (max-width: 1400px) {

    /* Stack the content vertically to fit the screen better */
    .entry-left .entry-content {
        flex-direction: column;
    }

    .entry-right .entry-content {
        flex-direction: column;
    }
}

@media screen and (max-width: 900px) {
    .timeline {
        max-width: 100%;
    }

    /* move the timeline to the left */
    .timeline::after {
        left: 20px;
    }

    /* Timeline entries now fill the parent container */
    .timeline-entry {
        width: 100%;
        padding: 10px 10px 10px 40px;
    }

    /* all the cards need to be aligned to the left of the parent */
    .entry-right {
        left: 0%;
    }

    /* Stack the content vertically to fit the screen better */
    .entry-left .entry-content {
        /* Move the sharp corner to the left */
        border-top-right-radius: 10px;
        border-top-left-radius: 0px;
    }

    .entry-left::after,
    .entry-right::after {
        left: 10px;
    }

    .entry-left::before,
    .entry-right::before {
        width: 20px;
        left: 10px;
        right: initial;
        border-radius: 10px 0px 0px 10px;
    }

}
</style>
