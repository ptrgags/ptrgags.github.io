<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavbarHeader from '../.vitepress/theme/NavbarHeader.vue'

import '@/assets/global.css'
</script>

<template>
  <NavbarHeader />
  <div class="content vertical">
    <RouterView />
  </div>
</template>

<style>
body {
  background-image: url('assets/background.png');
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  background-repeat: repeat;
  font-family: sans-serif;
}

.content {
  color: white;
  height: 100vh;
}

.content h1 {
  margin-top: 0px;
}
</style>
