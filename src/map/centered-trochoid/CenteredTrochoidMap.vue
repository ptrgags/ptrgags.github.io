<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ParameterMap from './ParameterMap.vue'
import type { CenteredTrochoidParams } from './CenteredTrochoidParams.ts'
import CenteredTrochoidAnimation from './CenteredTrochoidAnimation.vue'

const params: Ref<CenteredTrochoidParams> = ref({ radius_small_circle: 0.5, radius_pen: 0.2 })
</script>

<template>
  <div class="vertical">
    <ParameterMap @param_change="(value) => (params = value)"></ParameterMap>
    <CenteredTrochoidAnimation :params="params" />
  </div>
</template>
