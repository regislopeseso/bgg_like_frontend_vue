import { ref } from 'vue'

export function useAlerts() {
  // Alert State
  const showSuccessAlert = ref(false)
  const showErrorAlert = ref(false)
  const alertTitle = ref('')
  const alertMessage = ref('')

  // Success alert function
  function showSuccess({ title, message }) {
    alertTitle.value = title
    alertMessage.value = message
    showSuccessAlert.value = true
  }

  // Error alert function
  function showError({ title, message }) {
    alertTitle.value = title
    alertMessage.value = message
    showErrorAlert.value = true
  }

  return {
    // State
    showSuccessAlert,
    showErrorAlert,
    alertTitle,
    alertMessage,
    // Functions
    showSuccess,
    showError
  }
}
