<script setup lang="ts">
import ArticleLayout from './ArticleLayout.vue'
import ArtworkLayout from './ArtworkLayout.vue'
import MusicAlbumLayout from './MusicAlbumLayout.vue'
import NavbarHeader from './NavbarHeader.vue'
import ProjectLayout from './ProjectLayout.vue'

import { Content, useData } from 'vitepress'
import StereoPhotoLayout from './StereoPhotoLayout.vue'
import WebsiteBanner from './WebsiteBanner.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData()

if (frontmatter.value.layout === undefined) {
  console.log('missing layout', frontmatter.value)
}
</script>

<!--
<template>
  <NavbarHeader />
  
</template>
-->
<template>
  <div class="wrapper">
    <header class="banner"><WebsiteBanner /></header>
    <nav class="sidebar-nav panel">
      <ul class="link-list">
        <li>
          <a href="/gallery">Gallery</a>
        </li>
        <li>
          <a href="/projects">Projects</a>
        </li>
        <li>
          <a href="/music">Music</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="">Placeholder</a>
        </li>
        <li class="no-border">
          <ul class="sub-list">
            <li>Subcategory1</li>
            <li>Subcategory2</li>
            <li>Subcategory3</li>
            <li>Subcategory4</li>
          </ul>
        </li>
      </ul>
    </nav>
    <main class="content panel">
      <template v-if="frontmatter.layout === 'article'">
        <ArticleLayout></ArticleLayout>
      </template>
      <template v-else-if="frontmatter.layout === 'artwork'">
        <ArtworkLayout></ArtworkLayout>
      </template>
      <template v-else-if="frontmatter.layout === 'project'">
        <ProjectLayout></ProjectLayout>
      </template>
      <template v-else-if="frontmatter.layout === 'music-album'">
        <MusicAlbumLayout></MusicAlbumLayout>
      </template>
      <template v-else-if="frontmatter.layout === 'stereo-photo'">
        <StereoPhotoLayout></StereoPhotoLayout>
      </template>
      <template v-else>
        <h2>--- 404 Not Found ---</h2>
      </template>
    </main>
    <footer class="footer"><div>Footer</div></footer>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-areas:
    'banner'
    'sidebar'
    'main'
    'footer';
  grid-template-rows: minmax(40px, auto) minmax(100px, auto) minmax(300px, auto) minmax(40px, auto);
}

.banner {
  grid-area: banner;
}

.sidebar-nav {
  grid-area: sidebar;
}

.content {
  grid-area: main;
}

.footer {
  grid-area: footer;
  background-color: var(--background-dark);
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
}

.link-list {
  list-style: none;
  background-color: var(--background-text);
  padding: 0;
}

nav ul {
  list-style: none;
}

.link-list li {
  border: 2px solid var(--color-accent);
  border-radius: 5px;
  padding: 10px;
}

.link-list li.no-border {
  border: none;
}

@media (width >= 500px) {
  .wrapper {
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      'banner banner'
      'sidebar main'
      'footer footer';
    grid-template-rows: minmax(40px, auto) minmax(400px, auto) minmax(40px, auto);
  }

  nav ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
}
</style>
