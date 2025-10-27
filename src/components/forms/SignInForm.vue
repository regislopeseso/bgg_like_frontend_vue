<!-- This is the SignInForm.vue component files-->
<script setup>
  import { ref } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import { useRouter } from 'vue-router'
  import ContentLoader from '../loaders/ContentLoader.vue'
  import BaseForm from './BaseForm.vue'
  import EmailInput from '../inputs/EmailInput.vue'
  import PasswordInput from '../inputs/PasswordInput.vue'
  import BtnOutline from '../buttons/BtnOutline.vue'

  const router = useRouter()
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

  // Navigation function
  const redirectToForgotPassword = () => {
    router.push('/forgotpassword')
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

      <a @click='redirectToForgotPassword'>Forgot your Password?</a>

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

<style lang="scss" scoped>
  a {
    display: flex;
    padding-top: 5px;
    color: var(--blueish-color) !important;
    transition: all 0.3s ease-in-out;

    &:hover{
      color: var(--yellowish-color) !important;
      text-decoration:overline;
    }
  }


</style>


