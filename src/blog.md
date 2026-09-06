---
layout: article
title: Blog
---
<script setup lang="ts">
import {data} from './update/update.data'
import {sort_reverse_chronological} from './core/Sortable'

const posts = data.map(x => {return {...x.frontmatter, url: x.url}}).sort(sort_reverse_chronological).slice(0, 5)
</script>

<template v-for="post in posts" :key="post.sort_key">
    <div class="plaque">
        <h2><a :href="post.url">{{post.title}}</a></h2>
        <p>{{post.summary}}</p>
    </div>
</template>

[Full Archive >](./blog-archive)
