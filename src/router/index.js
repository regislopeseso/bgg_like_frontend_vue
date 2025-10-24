import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authenticationStore'

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
    meta: { requiresAuthentication: true, requiredRole: 'user' } // Added meta
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuthentication: true, requiredRole: 'admin' } // Added meta
  },
  {
    path: '/dev',
    name: 'dev',
    component: () => import('@/views/DevView.vue'),
    meta: { requiresAuthentication: true, requiredRole: 'dev' } // Added meta
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

router.beforeEach(async (to, from, next) => {
  const authenticationStore = useAuthenticationStore()

  // Only check authentication if navigating to a protected route
  const requiresAuthentication = to.meta.requiresAuthentication

  if (requiresAuthentication) {
    // Check authentication status if not already checked
    if (authenticationStore.isAuthenticated === false && authenticationStore.role === null) {
      try {
        await authenticationStore.checkAuthentication()
      } catch (error) {
        console.error('Authentication check failed:', error)
        // If auth check fails, redirect to authentication page
        next({ name: 'authentication' })
        return
      }
    }

    // Check if user is authenticated
    if (!authenticationStore.isAuthenticated) {
      next({ name: 'authentication' })
      return
    }

    // Check role-based permissions
    const requiredRole = to.meta.requiredRole

    if (requiredRole === 'user' && !authenticationStore.canAccessUser) {
      next({ name: 'home' })
      return
    }

    if (requiredRole === 'admin' && !authenticationStore.canAccessAdmin) {
      next({ name: 'home' })
      return
    }

    if (requiredRole === 'dev' && !authenticationStore.canAccessDev) {
      next({ name: 'home' })
      return
    }
  }

  // If already on authentication page and user is authenticated, redirect to appropriate page
  if (to.name === 'authentication' && authenticationStore.isAuthenticated) {
    if (authenticationStore.canAccessDev) {
      next({ name: 'dev' })
    } else if (authenticationStore.canAccessAdmin) {
      next({ name: 'admin' })
    } else if (authenticationStore.canAccessUser) {
      next({ name: 'user' })
    } else {
      next({ name: 'home' })
    }
    return
  }

  next()
})

export default router
