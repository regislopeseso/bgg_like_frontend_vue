<script setup>
import { watch } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, required: true },
  icon: { type: String, default: '' },
  confirmButton: { type: Boolean, default: true },
  confirmText: { type: String, default: 'OK' },
  cancelButton: { type: Boolean, default: true },
  cancelText: { type: String, default: 'Cancel' },
  colorMap: {
    type: Object,
    default: () => ({
      confirm: 'var(--blueish-color)',
      cancel: 'var(--reddish-color)',
      icon: 'var(--blueish-color)'
    })
  },
  // New: Add more customization options
  allowOutsideClick: { type: Boolean, default: true },
  timer: { type: Number, default: null },
  autoClose: { type: Boolean, default: true },
})

const emit = defineEmits(['update:show', 'confirm', 'cancel', 'closed'])

// Store reference to prevent duplicate alerts
let currentAlert = null

watch(
  () => props.show,
  async (newVal) => {
    if (newVal) {
      // Close existing alert if any
      if (currentAlert) {
        Swal.close()
      }

      currentAlert = Swal.fire({
        title: props.title,
        html: props.message,
        icon: props.icon,
        showConfirmButton: props.confirmButton,
        confirmButtonText: props.confirmText,
        showCancelButton: props.cancelButton,
        cancelButtonText: props.cancelText,
        confirmButtonColor: props.colorMap.confirm,
        cancelButtonColor: props.colorMap.cancel,
        allowOutsideClick: props.allowOutsideClick,
        timer: props.timer,
        timerProgressBar: !!props.timer, // show a progress bar if timer is active
        customClass: {
          icon: 'swal2-custom-icon',
        },
        didOpen: () => {
          if(props.timer){
            Swal.showLoading()
          }
        },
        willClose: () => {

        }
      })

      const result = await currentAlert

      currentAlert = null

      emit('update:show', false)

      if (result.dismiss === Swal.DismissReason.timer && props.autoClose) {
        emit('update:show', false)
        emit('confirm') // or emit('cancel') depending on desired behavior
        return
      }


      if (result.isConfirmed) {
        emit('confirm')
      } else if (result.isDismissed) {
        if (result.dismiss === Swal.DismissReason.timer && props.autoClose) {
          emit('confirm') // or emit('cancel') if you prefer
        } else {
          emit('cancel')
        }
      }

      emit('closed')
    }
  }
)
</script>

<template>
  <div></div>
</template>


<style lang="scss">
  /* Override the main popup font and background */
  .swal2-popup {
    font-family: "Anta", sans-serif !important;
    background-color: var(--second-bg-color) !important; /* Light background */
    color: var(--text-color) !important; /* Text color */
  }

  /* Override the title style */
  .swal2-title {
    color: var(--text-color) !important; /* Your brand color */
    font-weight: 100 !important;
  }

  // Override the confirm button
  .swal2-confirm {
    background-color: transparent !important;
    color: var(--blueish-color) !important;
    font-weight: bold !important;
    border: 1px solid var(--blueish-color) !important;
    border-radius: 6px !important;
  }
  .swal2-confirm:hover {
    background-color: var(--blueish-color) !important;
    color: var(--text-color) !important;
    font-weight: bold !important;
    border-radius: 6px !important;
    box-shadow: 0 0 15px 1px var(--text-color) !important;
  }

  /* Override the cancel button */
  .swal2-cancel {
    background-color: transparent !important;
    color: var(--reddish-color) !important;
    font-weight: bold !important;
    border: 1px solid var(--reddish-color) !important;
    border-radius: 6px !important;
  }
  .swal2-cancel:hover {
    background-color: var(--reddish-color) !important;
    color: var(--text-color) !important;
    font-weight: bold !important;
    border-radius: 6px !important;
    box-shadow: 0 0 15px 1px var(--text-color) !important;
  }

  .swal2-toast.swal2-show {
    animation: var(--swal2-toast-show-animation) !important;
  }

  .swal2-toast .swal2-icon .swal2-icon-content {
    align-items: center;
    font-size: 100px !important;
    font-weight: 100 !important;
  }
</style>
