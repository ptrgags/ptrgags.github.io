---
layout: article
title: Projects
---
<script setup lang="ts">
import {data as ALL_PROJECTS} from './project/project.data'
import {data as ALL_ALBUMS} from './album/music_album.data'
import {Project} from './core/Project'
import {MusicAlbum} from './core/MusicAlbum'
import {sort_reverse_chronological} from "./core/Sortable"
import ThumbnailCard from './components/ThumbnailCard.vue'

const albums = ALL_ALBUMS.map(x => new MusicAlbum(x.frontmatter as MusicAlbumDescriptor).thumbnail)
const projects = ALL_PROJECTS.map(x => new Project(x.frontmatter as ProjectDescriptor).thumbnail)


const projects_newest_first = [...albums, ...projects]
    .filter(x => !x.hide)
    .sort(sort_reverse_chronological)
</script>


<div class="horizontal">
    <template v-for="thumbnail in projects_newest_first" :key="thumbnail.sort_key">
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
    