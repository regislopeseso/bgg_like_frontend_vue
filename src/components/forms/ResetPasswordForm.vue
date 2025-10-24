<!-- ResetPassword.vue component -->
<script setup>
  import { ref } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import ContentLoader from '../loaders/ContentLoader.vue'
  import BaseForm from './BaseForm.vue'
  import PasswordInput from '../inputs/PasswordInput.vue'
  import BtnOutline from '../buttons/BtnOutline.vue'


  const emit = defineEmits(['success', 'error'])
  const authenticationStore = useAuthenticationStore()

  const password = ref('')
  const confirmPassword = ref('')
  const showWarning = ref(false)

  const handleSubmit = async () => {
    // Show warnings on all fields
    showWarning.value = true

    // Basic validation
    if (!password.value || !confirmPassword.value) {
      emit('error', {title:'Validation error', message:'Password and password confirmation are required.'})
      return
    }

    try {
      await authenticationStore.resetpassword({
        Password: password.value,
        confirmPassword: confirmPassword.value
      })
      emit('success', {title:'Password reset successful', message:'Welcome back!'})
      showWarning.value = false
    } catch (error) {
      emit('error', {title:'Password reset failed', message: authenticationStore.error || error.message})
    }
  }
</script>

<template>
  <div>
    <ContentLoader :show="authenticationStore.loading" />

    <BaseForm @submit="handleSubmit">
       <PasswordInput
        v-model="password"
        name="Password"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Enter your new password"
      />

      <hr />

      <PasswordInput
        v-model="confirmPassword"
        name="Password Confirmation"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Confirm your password"
      />

      <hr />

      <BtnOutline
        class="d-flex w-100 justify-content-center"
        type="submit"
        variant="info"
        :disabled="authenticationStore.loading"
        :buttonText="authenticationStore.loading ? 'Loading...' : 'Reset Password'"
      />
    </BaseForm>
  </div>
</template>


