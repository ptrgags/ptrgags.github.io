<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PROJECTS } from '@/data/projects';
import CardImage from '@/components/CardImage.vue';

const route = useRoute()

const project = computed(() => {
    return PROJECTS.find(x => x.id == route.params.project_id)
})
</script>

<template>
    <div v-if="project" class="tableau">
        <div  class="card-frame">
            <CardImage 
                size="card"
                :url="project.card_url"
                :alt="project.alt_text"
            />
        </div>
        <div class="plaque">
            <h1>{{ project.title }} ({{ project.years }})</h1>
            <a v-if="project.github_url" :href="project.github_url">GitHub</a>
            &nbsp;
            <a v-if="project.demo_url" :href="project.demo_url">Demo</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed dui suscipit, vulputate neque eget, eleifend lectus. Aenean elementum nec diam eu blandit. Proin consectetur ultrices tortor at vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum erat non leo luctus euismod. Nam lorem mi, gravida ac velit sit amet, fermentum ornare sem. Phasellus ut rhoncus nisi. Integer tristique tempor tempus. Nunc vitae odio ut neque maximus luctus at vel dolor. Duis id tincidunt dolor, vel pretium elit. Proin aliquam felis a rhoncus egestas. Etiam volutpat varius urna, in sodales tellus dignissim non. Vestibulum rhoncus tristique ante, eget condimentum risus ullamcorper vel. Phasellus eget semper orci.</p>
            <p>Nulla facilisi. Suspendisse in justo orci. Vestibulum dapibus lacinia erat, vitae vehicula ex tincidunt quis. Quisque venenatis diam lacus, maximus aliquam ante iaculis id. Sed nibh nisi, lobortis cursus mauris vitae, luctus volutpat ex. Etiam iaculis nisl id felis sodales, sed mollis erat interdum. Quisque magna tellus, tincidunt quis sem posuere, consectetur ultrices felis. Duis viverra auctor tellus, non vestibulum purus vulputate et. Maecenas vitae ipsum at enim posuere lacinia. Ut orci magna, tristique non pulvinar sit amet, lobortis at velit. Nulla at dolor eget turpis imperdiet finibus eget ac urna. Mauris pulvinar, urna vel ultricies maximus, nibh nisl lobortis neque, sagittis euismod lectus tellus ornare arcu. Duis finibus, dolor varius malesuada feugiat, purus metus pretium metus, ut tincidunt tellus tortor eu libero. Nullam vestibulum neque nec velit lacinia, non porta nisi aliquet. Suspendisse vel libero sit amet arcu facilisis tincidunt.</p>
        </div>
    </div>
</template>