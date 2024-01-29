<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { PROJECTS, get_card_url } from '@/data/projects';

    const route = useRoute()

    const github_url = computed(() => {
        return `https://github.com/ptrgags/${route.params.repo_name}`
    })

    const project = computed(() => {
        return PROJECTS.find(x => x.github_repo_name == route.params.repo_name)
    })

    const demo_link = computed(() => {
        return project.value?.demo_link
    })

    const image_url = computed(() => {
        if (project.value === undefined) {
            return 'https://placekitten.com/500/700'
        }
        return get_card_url(project.value);
    })
</script>

<template>
    <div class="header">
        <div class="screenshot-frame">
            <div class="screenshot">
                <img :src="image_url" />
            </div>
        </div>
        <div class="details">
            <h1>{{ project?.title }} ({{ project?.years }})</h1>
            <a :href="github_url">GitHub</a>
            &nbsp;
            <a v-if="demo_link" :href="demo_link">Demo</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed dui suscipit, vulputate neque eget, eleifend lectus. Aenean elementum nec diam eu blandit. Proin consectetur ultrices tortor at vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum erat non leo luctus euismod. Nam lorem mi, gravida ac velit sit amet, fermentum ornare sem. Phasellus ut rhoncus nisi. Integer tristique tempor tempus. Nunc vitae odio ut neque maximus luctus at vel dolor. Duis id tincidunt dolor, vel pretium elit. Proin aliquam felis a rhoncus egestas. Etiam volutpat varius urna, in sodales tellus dignissim non. Vestibulum rhoncus tristique ante, eget condimentum risus ullamcorper vel. Phasellus eget semper orci.</p>
            <p>Nulla facilisi. Suspendisse in justo orci. Vestibulum dapibus lacinia erat, vitae vehicula ex tincidunt quis. Quisque venenatis diam lacus, maximus aliquam ante iaculis id. Sed nibh nisi, lobortis cursus mauris vitae, luctus volutpat ex. Etiam iaculis nisl id felis sodales, sed mollis erat interdum. Quisque magna tellus, tincidunt quis sem posuere, consectetur ultrices felis. Duis viverra auctor tellus, non vestibulum purus vulputate et. Maecenas vitae ipsum at enim posuere lacinia. Ut orci magna, tristique non pulvinar sit amet, lobortis at velit. Nulla at dolor eget turpis imperdiet finibus eget ac urna. Mauris pulvinar, urna vel ultricies maximus, nibh nisl lobortis neque, sagittis euismod lectus tellus ornare arcu. Duis finibus, dolor varius malesuada feugiat, purus metus pretium metus, ut tincidunt tellus tortor eu libero. Nullam vestibulum neque nec velit lacinia, non porta nisi aliquet. Suspendisse vel libero sit amet arcu facilisis tincidunt.</p>
        </div>
    </div>
</template>

<style>
    .header {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center  
    }

    .screenshot-frame {
        border: 1px solid white;
    }

    .screenshot {
        width: 500px;
        height: 700px;
        background-color: #222222;
    }

    .details {
        padding: 40px;
        width: 500px;
        background-color: rgba(0, 0, 0, 0.8);
    }
</style>