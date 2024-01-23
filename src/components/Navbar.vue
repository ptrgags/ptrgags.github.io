<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>

<template>
    <header>
        <div class="title"><RouterLink to="/">Peter Gagliardi</RouterLink></div>
        <nav>
            <ul>
                <li><RouterLink to="/gallery">Gallery</RouterLink></li>
                <li><RouterLink to="/projects">Projects</RouterLink></li>
                <li><RouterLink to="/library">Library</RouterLink></li>
            </ul>
        </nav>
    </header>
</template>

<style>
header {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: black;
    color: white;
}

.title {
    justify-self: flex-start;
    padding: 4px;
    flex-grow: 1;
}

li {
    /** Turns off the bullets */
    list-style: none;
    /** Make them appear on one line */
    display: inline-block;
    padding: 4px;
}
</style>