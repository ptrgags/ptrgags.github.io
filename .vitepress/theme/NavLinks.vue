<template>
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
      <a href="/patterns">Patterns</a>
    </li>
    <li>
      <a href="/tools">Tools</a>
    </li>
    <li>
      <a href="/blog">Blog</a>
    </li>
    <!-- Reference if I need this in the future -->
    <!--
    <li class="no-border">
      <ul class="sub-list">
        <li>Subcategory1</li>
        <li>Subcategory2</li>
        <li>Subcategory3</li>
        <li>Subcategory4</li>
      </ul>
    </li>
-->
  </ul>
</template>

<style scoped>
.link-list {
  list-style: none;
  background-color: var(--background-text);
  padding: 0;
}

nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.link-list li {
  background-color: var(--color-main-dark);
  border-radius: 5px;
  padding: 10px;
}

.link-list li.no-border {
  border: none;
}
</style>
