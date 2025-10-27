<!-- ForgotPasswordForm.vue component -->
<script setup>
  import { ref } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore';
  import ContentLoader from '@/components/loaders/ContentLoader.vue';
  import BaseForm from '@/components/forms/BaseForm.vue';
  import EmailInput from '@/components/inputs/EmailInput.vue';
  import BtnOutline from '@/components/buttons/BtnOutline.vue';

  const emit = defineEmits(['success', 'error'])
  const authenticationStore = useAuthenticationStore()

  // Local state
  const email = ref('')
  const showWarning = ref(false)

  // Form handler
  const handleSubmit = async () => {
    showWarning.value = true;

    if(!email.value)
    {
      emit('error', {title:'Validation error', message: "Email is required."})
      return
    }

    try {
      const backendMessage = await authenticationStore.forgotpassword({
        Email: email.value
      })

      emit('success', {title:'Request successfull', message: backendMessage})
      showWarning.value = false


    } catch (error) {
      emit('error', {title: 'Request failed', message: authenticationStore.error || error.message})
    }
  }
</script>

<template>
  <div>
    <ContentLoader :show="authenticationStore.loading" />

    <BaseForm @submit="handleSubmit">
      <h1><span>F</span>orgot <span>y</span>our <span>P</span>assword<span>?</span></h1>

      <hr />

      <EmailInput
        v-model="email"
        name="Email"
        labelstyle="warning"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Type in your email"
      />

      <hr />

      <BtnOutline
        class="d-flex w-100 justify-content-center"
        type="submit"
        variant="warning"
        :disabled="authenticationStore.loading"
        :buttonText="authenticationStore.loading ? 'Loading...' : 'Send me reset password instructions'"
      />
    </BaseForm>
  </div>
</template>

<style lang="scss" scoped>
  span{
    font-weight: bolder;
    color: var(--yellowish-color);
  }
</style>
