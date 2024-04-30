import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
    },
    {
      path: '/artwork/:project_id/:artwork_id',
      name: 'artwork',
      component: () => import('@/views/ArtworkView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/project/:project_id',
      name: 'project',
      component: () => import('@/views/ProjectView.vue'),
    },
    {
      path: '/album/:album_id',
      name: 'album',
      component: () => import('@/views/MusicAlbumView.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/LibraryView.vue'),
    },
  ],
})

export default router
