<script setup lang="ts">
import { ref, toRef, watch, type Ref } from 'vue'

const props = defineProps<{
  // Dimensions of the _viewer_, regardless of the PDF page size
  width: number
  height: number
  // PDF file
  file: File
}>()

const blob_url = URL.createObjectURL(props.file)
const pdf_url: Ref<string> = ref(blob_url)

// If the file changes, clean up the old blob URL and generate a new
// one
watch(
  () => props,
  (value) => {
    // Clean up the previous PDF if it exists
    if (pdf_url.value !== undefined) {
      URL.revokeObjectURL(pdf_url.value)
    }

    const url = URL.createObjectURL(value.file)
    pdf_url.value = url
  },
)
</script>

<template>
  <object
    v-if="pdf_url"
    class="pdf-viewer"
    :width="$props.width"
    :height="$props.height"
    :data="pdf_url"
  ></object>
</template>

<style scoped>
.pdf-viewer {
  max-width: 60vw;
}

@media screen and (width >= 800px) {
  .pdf-viewer {
    max-width: none;
  }
}
</style>
