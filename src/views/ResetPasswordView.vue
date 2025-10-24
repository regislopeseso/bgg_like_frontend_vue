<!-- ResetPasswordView.vue component -->
<script setup>
  // --- Imports ---
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue';
  import SuccessAlert from '@/components/alerts/SuccessAlert.vue';
  import ErrorAlert from '@/components/alerts/ErrorAlert.vue';

  const router = useRouter()

  // Template Refs
  const resetPasswordRef = ref(null)

  // State
  const showResetPassword = ref(true)

  // Alert State
  const showSuccessAlert = ref(false)
  const showErrorAlert = ref(false)
  const alertTitle = ref('')
  const alertMessage = ref('')

  // Functions
  // Navigation function
  const redirectToUsersPage = () => {
    router.push('/user')
  }
  // Success alert function
  function showSuccess({title, message}) {
    alertTitle.value = title
    alertMessage.value = message
    showSuccessAlert.value = true
  }
  // Error alert function
  function showError({title, message}) {
    alertTitle.value = title
    alertMessage.value = message
    showErrorAlert.value = true
  }

</script>


<template>
  <div v-if="showResetPassword && !showForms">
    <ResetPasswordForm
      ref="resetPasswordRef"
      key="resetpassword"
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
      @closed="redirectToUsersPage"
    />

    <ErrorAlert
      v-model:show="showErrorAlert"
      :title="alertTitle"
      :cancelButton="false"
      :message="alertMessage"
    />
  </div>
</template>

<style></style>
