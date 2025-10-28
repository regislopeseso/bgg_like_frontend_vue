<!-- This is the ResetPassword.vue component file -->
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  
  import BaseForm from './BaseForm.vue'
  import EmailInput from '../inputs/EmailInput.vue'
  import PasswordInput from '../inputs/PasswordInput.vue'
  import BtnOutline from '../buttons/BtnOutline.vue'


  const emit = defineEmits(['success', 'error'])
  const route = useRoute()
  const authenticationStore = useAuthenticationStore()

  const email = ref('')
  const token = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showWarning = ref(false)

  // Extract email and toker from URL on component mount
  onMounted(() => {
    email.value = route.query.email || ''
    token.value = route.query.token || ''

    // Validate that both email and token are present
    if(!email.value || !token.value) {
      emit('error', {
        title: 'Invalid Reset Link',
        message: 'Email and or reset token are missing. Please request a new password reset.'
      })
    }
  })

  const handleSubmit = async () => {
    // Show warnings on all fields
    showWarning.value = true

    // Basic validation
    if (!password.value || !confirmPassword.value) {
      emit('error', {title:'Validation error', message:'Password and password confirmation are required.'})
      return
    }

    if (password.value.length < 6) {
      emit('error', {
        title: 'Validation error',
        message: 'Password must be at least 6 characters long.'
      })
      return
    }

    if(password.value !== confirmPassword.value) {
      emit('error', {
        title: 'Validation error',
        message: 'Passwords do not match.'
      })
      return
    }

    try {
      await authenticationStore.resetpassword({
        Email: email.value,
        Password: password.value,
        Token: token.value
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
      <h1><span>C</span>reate a <span>n</span>ew <span>P</span>assword</h1>

      <hr />

       <!-- Show email (read-only) for user confirmation -->

      <EmailInput
        id="user-email"
        name="Email"
        labelstyle="warning"
        :model-value="email"
        :disabled="true"
      />

      <hr />

      <PasswordInput
        v-model="password"
        name="Password"
        labelstyle="warning"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Enter your new password"
      />

      <PasswordInput
        class="pt-3"
        v-model="confirmPassword"
        name="Password Confirmation"
        labelstyle="warning"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Confirm your password"
      />

      <hr />

      <BtnOutline
        class="d-flex w-100 justify-content-center"
        type="submit"
        variant="warning"
        :disabled="authenticationStore.loading  || !email || !token"
        :buttonText="authenticationStore.loading ? 'Loading...' : 'Reset Password'"
      />
    </BaseForm>
  </div>
</template>

<style lang="scss" scoped>
  span{
    color: var(--yellowish-color);
  }
</style>


