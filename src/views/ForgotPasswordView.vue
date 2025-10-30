<!-- This is the ./src/views/ForgotPasswordView.vue view file -->
<script setup>
  // --- Imports ---
  import { useRouter } from 'vue-router'
  import { useAlerts } from '@/composables/useAlert';
  import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue';
  import SuccessAlert from '@/components/alerts/SuccessAlert.vue';
  import ErrorAlert from '@/components/alerts/ErrorAlert.vue';

  const router = useRouter()

  // Use the composable
  const {
    showSuccessAlert,
    showErrorAlert,
    alertTitle,
    alertMessage,
    showSuccess,
    showError
  } = useAlerts()


  // Functions
  // Navigation function
  const redirectToHomePage = () => {
    router.push('/')
  }


</script>


<template>
  <div id="forgot-password-view">
    <ForgotPasswordForm
      @success="showSuccess"
      @error="showError"
    />

    <!-- Alert Components -->
    <SuccessAlert
      v-model:show="showSuccessAlert"
      :title="alertTitle"
      :message="alertMessage"
      :timer="5000"
      :confirmButton="true"
      :cancelButton="false"
      @closed="redirectToHomePage"
    />

    <ErrorAlert
      v-model:show="showErrorAlert"
      :title="alertTitle"
      :cancelButton="false"
      :message="alertMessage"
    />
  </div>
</template>

<style lang="scss" scoped>
  #forgot-password-view{
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 8rem;
    width: 100%;
  }


</style>
