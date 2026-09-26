<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ParameterMap from './ParameterMap.vue'
import type { CenteredTrochoidParams } from './CenteredTrochoidParams.ts'

const params: Ref<CenteredTrochoidParams> = ref({ radius_small_circle: 0.5, radius_pen: 0.2 })
</script>

<template>
  <ParameterMap @param_change="(value) => (params = value)"></ParameterMap>
  <hr />
  <div>
    Selected Parameters: <br />
    small_circle: {{ params.radius_small_circle }} * R<br />
    pen: {{ params.radius_pen }} * r <br />
  </div>
</template>
