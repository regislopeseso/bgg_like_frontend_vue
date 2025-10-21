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

      if(data.content && data.content.isUserLoggedIn === true) {
        isAuthenticated.value = true

        role.value = data.content.role
      } else {
        isAuthenticated.value = false
        role.value = null
      }
    } catch (err) {
      isAuthenticated.value = false
      role.value = null
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signup(credentials) {
    loading.value = true
    error.value = null

    try {
      const data = await authenticationService.signup(
        credentials.Name,
        credentials.Email,              // Changed from UserEmail
        credentials.Password,
        credentials.UserBirthDate,
        credentials.Gender || 1
      )

      // Signup successful, now get the user's role
      await checkAuthentication()

      return data
    } catch (err) {
      isAuthenticated.value = false
      role.value = null
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signin(credentials) {
    loading.value = true
    error.value = null

    try {
      const data = await authenticationService.signin(
        credentials.Email,
        credentials.Password
      )

      if(data.content?.remainingSignInAttempts !== null && data.content?.remainingSignInAttempts !== undefined){
        const fullMessage = `${data.message}`

        error.value = fullMessage
        isAuthenticated.value = false
        role.value = null
        throw new Error(fullMessage)
      }


      // Signin successful, now get the user's role
      await checkAuthentication()

      return data
    } catch (err) {
      // Network or server errors
      isAuthenticated.value = false
      role.value = null
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signout() {
    try {
      await authenticationService.signout()
    } catch (err) {
      isAuthenticated.value = false
      role.value = null
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
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
    signup,
    signin,
    signout,
  }
})
