<!-- PasswordInput.vue component -->
<script setup>
  import { ref, computed } from 'vue'
  import BaseInput from './BaseInput.vue'

  const props = defineProps({
    placeholderText: { type: String, default: '' },
    modelValue: String,
    name: { type: String, default: '' },
    labelstyle: { type: String, default: 'info' },
    isRequired: { type: Boolean, default: false },
    showWarning: { type: Boolean, default: false }
  })

  const emit = defineEmits(['update:modelValue', 'validation-error'])

  // Track password visibility
  const isPasswordVisible = ref(false);

  // Password visibility toggler:
  const handlePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  // Computed: dynamic inpt type
  const inputType = computed(() => isPasswordVisible.value ? 'text' : 'password');
  // Computed: eye icon
  const iconSrc = computed(() => isPasswordVisible.value ? '/images/inputs/eye_hide.svg' : '/images/inputs/eye_show.svg');
  const iconTitle = computed(() => isPasswordVisible.value ? 'Hide password' : 'Show password');

  // Verificar o código abaixo com o claudinho amanha 24/10/2025
  // Use a computed with getter/setter to proxy v-model safely
  const passwordProxy = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
</script>

<template>
  <div class="d-flex flex-row align-items-end gap-3 w-100">
    <BaseInput
      class="password-input"
      v-model="passwordProxy"
      :type="inputType"
      :name="name"
      :labelstyle="labelstyle"
      :placeholder="placeholderText"
      :isRequired="isRequired"
      @validation-error="emit('validation-error', $event)"
      :showWarning="showWarning"
      warningMessage="This field is mandatory!"
    />

    <span class="d-flex align-items-center">
      <img
        class="password-toggle"
        :src="iconSrc"
        :title="iconTitle"
        @click="handlePasswordVisibility"
      />
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .password-input{
    flex-grow: 1;
  }

  .password-toggle{
    height: 2.5em;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover{
      transform: scale(1.1);
    }
  }

</style>
