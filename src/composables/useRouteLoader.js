// composables/useRouteLoader.js
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const useRouteLoader = () => {
  const isRouteLoading = ref(false)
  const router = useRouter()

  router.beforeEach((to, from, next) => {
    isRouteLoading.value = true
    next()
  })

  router.afterEach(() => {
    setTimeout(() => (isRouteLoading.value = false), 300)
  })

  return { isRouteLoading }
}
