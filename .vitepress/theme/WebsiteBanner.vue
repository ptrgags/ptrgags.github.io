<template>
  <header>
    <div class="title">
      <a href="/">
        <div class="align-logo">
          <img class="logo" src="/assets/monogram.png" alt="PG monogram logo" />Peter Gagliardi
        </div>
      </a>
    </div>
  </header>
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
</style>
