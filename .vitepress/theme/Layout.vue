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

function toggle_menu() {
  document.querySelector('#menu')?.classList.toggle('collapsed')
}
</script>

<!--
<template>
  <NavbarHeader />
  
</template>
-->
<template>
  <div class="wrapper">
    <header class="banner">
      <button class="burger" @click="toggle_menu">🍔</button><WebsiteBanner />
    </header>
    <nav id="menu" class="sidebar-nav collapsed">
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
    <main class="content">
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
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-areas:
    'banner'
    'sidebar'
    'main';
}

.banner {
  grid-area: banner;
  background-color: var(--color-main-dark);
  display: flex;
  flex-direction: row;
}

.sidebar-nav {
  grid-area: sidebar;
  background-color: var(--color-main-med-dark);
  padding: 20px;
}

.collapsed {
  display: none;
}

.content {
  grid-area: main;
  background-color: var(--color-main-med);
  padding: 40px;
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
  background-color: var(--color-main-dark);
  border-radius: 5px;
  padding: 10px;
}

.link-list li.no-border {
  border: none;
}

@media (width >= 800px) {
  .burger {
    display: none;
  }

  /* navbar is always visible on large screens */
  .collapsed {
    display: block;
  }

  .wrapper {
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      'banner banner'
      'sidebar main';
  }

  nav ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
}
</style>
