<template>
  <header>
    <div class="title">
      <a href="/">
        <div class="align-logo">
          <img class="logo" src="/assets/monogram.png" alt="PG monogram logo" />Peter Gagliardi
        </div>
      </a>
    </div>
    <nav>
      <ul>
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
          <a href="https://github.com/ptrgags"
            ><img width="24px" src="/assets/github-mark-white.svg"
          /></a>
        </li>
        <li>
          <a href="https://bsky.app/profile/ptrgags.bsky.social"
            ><img width="24px" src="/assets/bluesky-logo-white.svg"
          /></a>
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
