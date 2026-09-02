---
layout: article
title: Projects
---
<script setup lang="ts">
import {ALL_PROJECT_THUMBNAILS} from './data/thumbnails'
import ThumbnailCard from './components/ThumbnailCard.vue'
</script>


<div class="horizontal">
    <template v-for="thumbnail in ALL_PROJECT_THUMBNAILS" :key="thumbnail.sort_key">
        <ThumbnailCard :card="thumbnail" />
    </template>
</div>


## Other Projects
    
Going further back in time, I have more projects not documented here. Here are links to some
of the notable ones.

- Drawing Machines (2019) - [Demo](https://ptrgags.dev/drawing-machines/), [GitHub](https://github.com/ptrgags/drawing-machines)
- Virtual Museum (2019) - [Demo](https://museum.shaders.dev/), [GitHub](https://github.com/ptrgags/virtual-museum)
- Holiday Eyecandy (2018) - [Demo](https://ptrgags.dev/holiday-eyecandy/),[GitHub](https://github.com/ptrgags/holiday-eyecandy)
- Ant Farm (2015) - [Demo](https://ptrgags.dev/ant-farm/), [GitHub](https://github.com/ptrgags/ant-farm)
    
For the full list of my programming projects, see my [GitHub repositories](https://github.com/ptrgags?tab=repositories).
    