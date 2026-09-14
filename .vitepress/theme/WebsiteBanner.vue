<template>
  <div class="left">
    <a href="/">
      <div class="align-logo">
        <img class="logo" src="/assets/monogram.png" alt="PG monogram logo" />Peter Gagliardi
      </div>
    </a>
  </div>
  <div class="right">
    <a class="social" href="https://github.com/ptrgags"
      ><img width="24px" src="/assets/github-mark-white.svg"
    /></a>
    <a class="social" href="https://bsky.app/profile/ptrgags.bsky.social"
      ><img width="24px" src="/assets/bluesky-logo-white.svg"
    /></a>
  </div>
</template>

<style scoped>
header {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--background-dark);
}

.align-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  margin: 0px 8px;
}

.right {
  margin-left: auto;
}

.social {
  margin: 4px;
}
</style>
