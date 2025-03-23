<script setup lang="ts">
import { RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'

import '@/assets/global.css'
</script>

<template>
  <Navbar />
  <div class="content">
    <RouterView />
  </div>
</template>

<style>
body {
  background-image: url('assets/background.png');
  background-repeat: repeat;
  font-family: sans-serif;
}

.content {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.content h1 {
  margin-top: 0px;
}
</style>
