<script setup>
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authenticationStore'

const emit = defineEmits(['success', 'error'])
const authStore = useAuthenticationStore()

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  // Basic validation
  if (!email.value || !password.value) {
    emit('error', 'Validation error', 'Email and password are required.')
    return
  }

  try {
    await authStore.signin({       // Changed from 'login' to 'signin'
      Email: email.value,          // Changed to PascalCase
      Password: password.value     // Changed to PascalCase
    })
    emit('success', 'Login successful', 'Welcome back!')
  } catch (error) {
    emit('error', 'Login failed', authStore.error || error.message)
  }
}
</script>

<template>
  <form id="signInBox" @submit.prevent="handleSubmit">
    <div class="mb-3">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="form-control"
      />
    </div>
    <button
      type="submit"
      class="btn btn-outline-success w-100"
      :disabled="authStore.loading"
    >
      <span v-if="!authStore.loading">Sign In</span>
      <span v-else>Loading...</span>
    </button>
  </form>
</template>
