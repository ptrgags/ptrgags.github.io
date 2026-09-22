---
layout: article
title: Patterns
---
<script setup lang="ts">
import {data} from './pattern/pattern.data'
import {backblaze_link} from './core/links'

const patterns = data.map(x => {return {...x.frontmatter, url: x.url}})
</script>

I'm starting to document math patterns I find in math, art, programming, and
other topics. So far, I've written the following articles:

<div class="horizontal">
<template v-for="pattern in patterns" :key="pattern.title">
    <div class="pattern-swatch vertical">
        <img width="256" height="256" :src="backblaze_link(pattern.thumbnail)" />
        <div class="pattern-text">
            <h3><a :href="pattern.url">{{pattern.title}}</a></h3>
        </div>
    </div>
</template>
</div>

See also my repo [`pattern-spotting`](https://ptrgags.github.io/pattern-spotting/), an earlier version of this idea.

<style>
.pattern-swatch {
    width: 300px;
    background-color: var(--color-main-med-dark);
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 20px;
}

.pattern-text {
    max-width: 400px
}
</style>
