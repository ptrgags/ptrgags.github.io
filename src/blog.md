---
layout: article
title: Blog
---
<script setup lang="ts">
import {data} from './update/update.data'
import {sort_reverse_chronological} from './core/Sortable'
import {backblaze_link} from './core/links'

const posts = data.map(x => {return {...x.frontmatter, url: x.url}}).filter(x => !x.hide).sort(sort_reverse_chronological).slice(0, 5)
</script>

<div class="horizontal align-feed">
<a type="application/atom+xml" href="/feed.xml" ><img alt="pixel art icon of RSS feed symbol" src="/feed-icon.png" /></a> <a type="application/atom+xml" href="/feed.xml" >Feed</a>
</div>

<template v-for="post in posts" :key="post.sort_key">
    <div class="blog-card horizontal">
        <img width="256" height="256" :src="backblaze_link(post.thumbnail)" />
        <div class="blog-text">
        <h2><a :href="post.url">{{post.title}}</a></h2>
        <p>{{post.summary}}</p>
        </div>
    </div>
</template>

<div class="vertical">
<a class="big-link" href="./blog-archive">Full Archive ></a>
</div>

<style>
    /** Fix how the feed symbol shows up */
.align-feed {
    justify-content: left;
    align-items: center;
    padding: 20px
}

.blog-card {
    background-color: var(--color-main-med-dark);
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 20px;
}

.blog-text {
    max-width: 400px
}
</style>
