<script setup lang="ts">
import ArticleLayout from './ArticleLayout.vue'
import ArtworkLayout from './ArtworkLayout.vue'
import MusicAlbumLayout from './MusicAlbumLayout.vue'
import NavbarHeader from './NavbarHeader.vue'
import ProjectLayout from './ProjectLayout.vue'

import { useData } from 'vitepress'
import StereoPhotoLayout from './StereoPhotoLayout.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData()
</script>

<template>
  <NavbarHeader />
  <div v-if="frontmatter.layout === 'article'">
    <ArticleLayout></ArticleLayout>
  </div>
  <div v-else-if="frontmatter.layout === 'artwork'">
    <ArtworkLayout></ArtworkLayout>
  </div>
  <div v-else-if="frontmatter.layout === 'project'">
    <ProjectLayout></ProjectLayout>
  </div>
  <div v-else-if="frontmatter.layout === 'music-album'">
    <MusicAlbumLayout></MusicAlbumLayout>
  </div>
  <div v-else-if="frontmatter.layout === 'stereo-photo'">
    <StereoPhotoLayout></StereoPhotoLayout>
  </div>
  <div v-else>
    <p>--- 404 Not Found ---</p>
  </div>
</template>
