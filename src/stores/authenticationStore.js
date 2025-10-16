import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authenticationService } from '@/services/authenticationService'

export const useAuthenticationStore = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false)
  const role = ref(null) // null, 'User', 'Administrator', 'Developer'
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isUser = computed(() => role.value === 'User')
  const isAdministrator = computed(() => role.value === 'Administrator')
  const isDeveloper = computed(() => role.value === 'Developer')

  const canAccessUser = computed(
    () => role.value === 'User' || role.value === 'Administrator' || role.value === 'Developer',
  )

  const canAccessAdmin = computed(
    () => role.value === 'Administrator' || role.value === 'Developer',
  )

  const canAccessDev = computed(() => role.value === 'Developer')

  // Actions
  async function checkAuthentication() {
    loading.value = true
    error.value = null

    try {
      const data = await authenticationService.checkAuthenticationStatus()
      isAuthenticated.value = data.isAuthenticated
      role.value = data.role
    } catch (err) {
      error.value = err.message
      isAuthenticated.value = false
      role.value = null
    } finally {
      loading.value = false
    }
  }

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const data = await authenticationService.login(credentials)
      isAuthenticated.value = true
      role.value = data.role
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signout() {
    try {
      await authenticationService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      isAuthenticated.value = false
      role.value = null
    }
  }

  return {
    // State
    isAuthenticated,
    role,
    loading,
    error,
    // Getters
    isUser,
    isAdministrator,
    isDeveloper,
    canAccessUser,
    canAccessAdmin,
    canAccessDev,
    // Actions
    checkAuthentication,
    login,
    signout,
  }
})
