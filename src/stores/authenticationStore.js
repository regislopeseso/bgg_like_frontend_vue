// This is the useAuthenticationStore.js store file
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authenticationService } from '@/services/authenticationService'
import router from '@/router'

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
        credentials.Email,
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

      // Sign-in successful
      await checkAuthentication()

      return data
    } catch (err) {
      isAuthenticated.value = false
      role.value = null

      // Simply use the error message from the backend
      error.value = err.response?.data?.message || err.message || 'An error occurred during sign-in.'

      throw err
    } finally {
      loading.value = false
    }
  }

  async function signout() {
    loading.value = true
    error.value = null

    try {
      const response = await authenticationService.signout()

      if(response.content?.isUserSignOut === true) {
        return true
      } else {
        throw new Error(response.message ||'Signing out failed')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'An error occurred'

      throw err
    } finally {
        isAuthenticated.value = false
        role.value = null
        loading.value = false

        // Redirect to login or home page
        await router.replace('/')
    }
  }

  async function forgotpassword(payload) {
    loading.value = true
    error.value = null

    try {
      const data = await authenticationService.forgotpassword(
        payload.Email,
      )

      return data.message
    } catch (err) {
      // Simply use the error message from the backend
      error.value = err.response?.data?.message || err.message || 'An error occurred during forgot-password.'

      throw err
    } finally {
      isAuthenticated.value = false
      role.value = null
      loading.value = false
    }
  }

  async function resetpassword(payload) {
    loading.value = true
    error.value = null

    try {
      const data = await authenticationService.resetpassword(
        payload.Email,
        payload.Token,
        payload.Password
      )

      // After successful password reset, check authentication
      // This will log the user in automatically if backend returns auth cookies
      await checkAuthentication()

      return data
    } catch (err) {
      isAuthenticated.value = false
      role.value = null

      // Use the error message from the backend
      error.value = err.response?.data?.message || err.message || 'An error occurred during reset-password.'

      throw err
    } finally {
      loading.value = false
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
    forgotpassword,
    resetpassword
  }
})
