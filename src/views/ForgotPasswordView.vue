<!-- This is the ForgotPasswordView.vue view -->
<script setup>
  // --- Imports ---
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue';
  import SuccessAlert from '@/components/alerts/SuccessAlert.vue';
  import ErrorAlert from '@/components/alerts/ErrorAlert.vue';

  const router = useRouter()

  // Alert State
  const showSuccessAlert = ref(false)
  const showErrorAlert = ref(false)
  const alertTitle = ref('')
  const alertMessage = ref('')

  // Functions
  // Navigation function
  const redirectToHomePage = () => {
    router.push('/')
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
