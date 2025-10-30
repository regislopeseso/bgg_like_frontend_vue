<!-- This is the ./src/views/ResetPasswordView.vue view file -->
<script setup>
  // --- Imports ---
  import { useRouter } from 'vue-router'
  import { useAlerts } from '@/composables/useAlert';
  import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue';
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
  <div id="reset-password-view">
    <ResetPasswordForm
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
  #reset-password-view{
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 8rem;
    width: 100%;
  }
</style>
