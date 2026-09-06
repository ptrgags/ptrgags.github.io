---
layout: article
title: Blog Archive
---
<script setup lang="ts">
import {data} from './update/update.data'
import {sort_reverse_chronological} from './core/Sortable'

const posts = data.map(x => {return {...x.frontmatter, url: x.url}}).sort(sort_reverse_chronological)
</script>

<ul>
<template v-for="post in posts" :key="post.sort_key">
    <li><a :href="post.url">{{post.title}}</a></li>
</template>
</ul>
