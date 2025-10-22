import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('@/views/ExploreView.vue'),
  },
  {
    path: '/lifecounter',
    name: 'lifecounter',
    component: () => import('@/views/LifeCounterView.vue'),
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import('@/views/AuthenticationView.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/UserView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
  },
  {
    path: '/dev',
    name: 'dev',
    component: () => import('@/views/DevView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Smooth scroll to top on route change
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
