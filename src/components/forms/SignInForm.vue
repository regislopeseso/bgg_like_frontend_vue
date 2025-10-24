<!-- SignInForm.vue component -->
<script setup>
  import { ref } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import ContentLoader from '../loaders/ContentLoader.vue'
  import BaseForm from './BaseForm.vue'
  import EmailInput from '../inputs/EmailInput.vue'
  import PasswordInput from '../inputs/PasswordInput.vue'
  import BtnOutline from '../buttons/BtnOutline.vue'


  const emit = defineEmits(['success', 'error'])
  const authenticationStore = useAuthenticationStore()

  const email = ref('')
  const password = ref('')
  const showWarning = ref(false)

  const handleSubmit = async () => {
    // Show warnings on all fields
    showWarning.value = true

    // Basic validation
    if (!email.value || !password.value) {
      emit('error', {title:'Validation error', message:'Email and password are required.'})
      return
    }

    try {
      await authenticationStore.signin({
        Email: email.value,
        Password: password.value
      })
      emit('success', {title:'Login successful', message:'Welcome back!'})
      showWarning.value = false
    } catch (error) {
      emit('error', {title:'Login failed', message: authenticationStore.error || error.message})
    }
  }
</script>

<template>
  <div>
    <ContentLoader :show="authenticationStore.loading" />

    <BaseForm @submit="handleSubmit">
      <EmailInput
        v-model="email"
        name="Email"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Type in your email"
      />

      <hr />

      <PasswordInput
        v-model="password"
        name="Password"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Enter your password"
      />

      <hr />

      <BtnOutline
        class="d-flex w-100 justify-content-center"
        type="submit"
        variant="info"
        :disabled="authenticationStore.loading"
        :buttonText="authenticationStore.loading ? 'Loading...' : 'Sign Up'"
      />
    </BaseForm>
  </div>
</template>


