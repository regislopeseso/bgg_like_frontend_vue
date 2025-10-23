<!-- BaseCheckBox.vue component -->
<script setup>
  import { computed, useId } from 'vue';

  const props = defineProps({
    id: { type: String, default: '' },
    modelValue: Boolean,
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    isRequired: { type: Boolean, default: false },
    showWarning: { type: Boolean, default: false },
    warningMessage: { type: String, default: 'This field is required' }
  });

  const emit = defineEmits(['update:modelValue', 'validation-error']);

  const inputId = props.id || useId();

  const hasWarning = computed(() => props.isRequired && props.showWarning && !props.modelValue);

  const handleChange = (event) => {
    emit('update:modelValue', event.target.checked);
  };

  const validate = () => {
    if (props.isRequired && !props.modelValue) {
      emit('validation-error', props.name);
      return false;
    }
    return true;
  };

  defineExpose({ validate });
</script>

<template>
  <div class="base-checkbox">
    <div class="checkbox-container">
      <input
        :id="inputId"
        type="checkbox"
        class="form-check-input"
        :name="name"
        :checked="modelValue"
        :disabled="disabled"
        :aria-required="isRequired"
        :aria-invalid="hasWarning"
        @change="handleChange"
      />
      <label
        class="form-check-label"
        :for="inputId"
      >
        {{ label }}
        <span v-if="isRequired" class="required-mark">*</span>
      </label>
    </div>

    <span
      v-if="hasWarning"
      class="warning-message"
    >
      {{ warningMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .base-checkbox {
    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .form-check-input {
        cursor: pointer;
        flex-shrink: 0;

        &:disabled {
          cursor: not-allowed;
        }
      }

      .form-check-label {
        cursor: pointer;
        user-select: none;
        margin-bottom: 0;

        .required-mark {
          color: var(--reddish-color, #dc3545);
          margin-left: 0.25rem;
        }
      }
    }

    .warning-message {
      color: var(--reddish-color, #dc3545);
      font-size: 0.85rem;
      margin-top: 0.25rem;
      display: block;
    }
  }
</style>
