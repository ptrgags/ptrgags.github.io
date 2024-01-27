<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'

import Navbar from './components/Navbar.vue'
</script>

<template>
    <Navbar />
    <div class="content">
        <RouterView />
    </div>
</template>

<style>
body {
    background-image: url("assets/background.png");
    background-repeat: repeat;
    font-family: sans-serif;
    margin: 0;
}

.content {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    min-height: 100vh;
}

</style>