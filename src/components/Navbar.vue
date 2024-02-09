<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div class="title">
            <RouterLink to="/">
                <div class="align-logo">
                <img class="logo" src="@/assets/monogram.png" alt="PG monogram logo"/>Peter Gagliardi
                </div>
            </RouterLink>
        </div>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/gallery">Gallery</RouterLink>
                </li>
                <li>
                    <RouterLink to="/projects">Projects</RouterLink>
                </li>
                <li>
                    <a href="https://github.com/ptrgags"><img width="32px" src="@/assets/github-mark-white.svg" /></a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--background-dark);
    color: var(--color-text);

    border-bottom: 10px solid var(--background-transparent);
    background-clip: padding-box;
}

.title {
    justify-self: flex-start;
    padding: 4px;
    flex-grow: 1;
}

ul {
    display: flex;
    flex-direction: row;
    align-items: center;
}

li {
    /** Turns off the bullets */
    list-style: none;
    /** Make them appear on one line */
    display: inline-block;
    padding: 4px;
}

.align-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.logo {
    margin: 0px 8px;
}

img {
    display: inline-block;
}
</style>