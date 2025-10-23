<script setup>
  import { ref } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import ContentLoader from '../loaders/ContentLoader.vue'
  import BaseForm from './BaseForm.vue'


  const emit = defineEmits(['success', 'error'])
  const authenticationStore = useAuthenticationStore()

  const email = ref('')
  const password = ref('')

  const handleSubmit = async () => {
    // Basic validation
    if (!email.value || !password.value) {
      emit('error', {title:'Validation error', message:'Email and password are required.'})
      return
    }

    try {
      await authenticationStore.signin({       // Changed from 'login' to 'signin'
        Email: email.value,          // Changed to PascalCase
        Password: password.value     // Changed to PascalCase
      })
      emit('success', {title:'Login successful', message:'Welcome back!'})
    } catch (error) {
      emit('error', {title:'Login failed', message: authenticationStore.error || error.message})
    }
  }
</script>

<template>
  <div class="form-wrapper">
    <ContentLoader :show="authenticationStore.loading" />

    <BaseForm @submit="handleSubmit">
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
        :disabled="authenticationStore.loading"
      >
        <span v-if="!authenticationStore.loading">Sign In</span>
        <span v-else>Loading...</span>
      </button>
    </BaseForm>
  </div>
</template>

<style scoped>
  .form-wrapper {
    position: relative;
  }
</style>
