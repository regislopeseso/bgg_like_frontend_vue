<script setup>
  import BtnCloseX from './buttons/BtnCloseX.vue'
  import BtnOutline from './buttons/BtnOutline.vue'

  import { ref } from 'vue'
  import InfoAlert from './alerts/InfoAlert.vue'
  import ErrorAlert from './alerts/ErrorAlert.vue'
  import WarningAlert from './alerts/WarningAlert.vue'
  import SuccessAlert from './alerts/SuccessAlert.vue'

  const alertInfo = ref(false);
  const alertError = ref(false);
  const alertWarning = ref(false);
  const alertSuccess = ref(false);


  function triggerInfoAlert() {
    alertInfo.value = true
  }
  function triggerErrorAlert() {
    alertError.value = true
  }
  function triggerWarningAlert() {
    alertWarning.value = true
  }
  function triggerSuccessAlert() {
    alertSuccess.value = true
  }

  function handleConfirm() {
  console.log('User confirmed!')
  // Add any additional logic here
  }

</script>

<template>
  <div class="d-flex flex-row gap-3">
    <div>
      <BtnCloseX
        class="m-5"
        :buttonText="'Blueish'"
      />
    </div>

    <div>
      <BtnOutline
        class="m-5"
        :variant="'info'"
        :buttonText="'Blueish'"
        @click="triggerInfoAlert"
      />

      <InfoAlert
        v-model:show="alertInfo"
        title="Info!"
        message="Information...."
        confirmText="OK"
        @confirm="handleConfirm"
      />
    </div>

    <div>
      <BtnOutline
        class="m-5"
        :variant="'danger'"
        :buttonText="'Reddish'"
        @click="triggerErrorAlert"
      />
      <ErrorAlert
        v-model:show="alertError"
        title="Danger!"
        message="Danger ahead."
        confirmText="OK"
        @confirm="handleConfirm"
      />
    </div>

    <div>
      <BtnOutline
        class="m-5"
        :variant="'warning'"
        :buttonText="'Yellowish'"
        @click="triggerWarningAlert"
      />
      <WarningAlert
        v-model:show="alertWarning"
        title="Warning!"
        message="Be cautious."
        confirmText="OK"
        @confirm="handleConfirm"
      />
    </div>

    <div>
      <BtnOutline
        class="m-5"
        :variant="'success'"
        :buttonText="'Greenish'"
        @click="triggerSuccessAlert"
      />
      <SuccessAlert
        v-model:show="alertSuccess"
        title="Done!"
        message="Your operation completed successfully."
        confirmText="OK"
        @confirm="handleConfirm"
      />
    </div>
  </div>
</template>

<style>
</style>
