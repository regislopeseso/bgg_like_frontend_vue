<!-- BaseInput.vue component -->
<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: [String, Number],
    name: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
    showError: { type: Boolean, default: false },
    warningMessage: { type: String, default: 'This field is required' }
  });

  const emit = defineEmits(['update:modelValue', 'validation-error', 'blur']);

  // Compute if the input has an error
  const hasError = computed(() => props.isRequired && props.showError && !props.modelValue);

  // Compute tooltip message
  const tooltipMessage = computed(() =>
    props.isRequired ? 'This field is required' : 'This field is optional'
  );

  // Validate on blur or when form attempts to submit
  const validate = () => {
    if (props.isRequired && !props.modelValue) {
      emit('validation-error', props.name);
      return false;
    }
    return true;
  };

  // Handle blur event
  const handleBlur = () => {
    emit('blur');
  };

  // Expose validate method for parent components
  defineExpose({ validate });
</script>

<template>
  <div class="base-input-wrapper">
    <label v-if="name">{{ name }}</label>
    <div class="input-container">
      <input
        class="form-control"
        :name="name"
        :class="{ 'border-error': hasError }"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        @blur="handleBlur"
      >
      <span class="tooltip-text">{{ tooltipMessage }}</span>
    </div>
    <span v-if="hasError" class="error-message">
      {{ warningMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .base-input-wrapper {
    position: relative;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .input-container {
      position: relative;
      display: inline-block;
      width: 100%;

      .form-control {
        width: 100%;
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 0 0 5px 5px var(--blueish-color) !important;
        }

        &:focus {
          box-shadow: 0 0 5px 5px var(--blueish-color) !important;
        }

        &.border-error {
          border: 1px solid var(--reddish-color) !important;
          box-shadow: 0 0 4px 4px var(--reddish-color) !important;
        }
      }

      .tooltip-text {
        visibility: hidden;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        text-align: center;
        padding: 0.5rem 0.75rem;
        border-radius: 4px;
        position: absolute;
        z-index: 1000;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        font-size: 0.875rem;
        transition: opacity 0.3s, visibility 0.3s;
        pointer-events: none;

        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
      }

      &:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    }

    .error-message {
      color: var(--reddish-color);
      font-size: 0.85rem;
      margin-top: 0.25rem;
      display: block;
    }
  }
</style>
