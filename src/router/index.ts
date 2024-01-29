import { createRouter, createWebHistory } from 'vue-router'
import ArtworkView from '@/views/ArtworkView.vue'
import HomeView from '../views/HomeView.vue'
import GalleryView from '../views/GalleryView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import LibraryView from '../views/LibraryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView
    },
    {
        path: '/artwork/:project_id/:artwork_id',
        name: 'artwork',
        component: ArtworkView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/project/:repo_name',
      name: 'project',
      component: ProjectView,
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
    },
  ]
})

export default router
