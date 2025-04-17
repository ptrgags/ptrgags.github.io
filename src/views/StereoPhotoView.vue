<script setup lang="ts">
import StereoCard from '@/components/StereoCard.vue'
</script>

<template>
  <div class="plaque">
    <h1 class="center-text">TITLE (DATE)</h1>
    <StereoCard
      left_eye="/assets/stereo-placeholder-L.png"
      right_eye="/assets/stereo-placeholder-R.png"
    ></StereoCard>
    <div>DESCRIPTION</div>
  </div>
</template>
