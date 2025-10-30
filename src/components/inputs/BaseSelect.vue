<!-- This is the ./src/components/inputs/BaseSelect.vue component file -->
<script setup>
  import { computed, useId } from 'vue';

  const props = defineProps({
    id: { type: String, default: '' },
    modelValue: [String, Number, Array],
    name: { type: String, default: '' },
    options: { type: Array, required: true }, // [{value: 1, label: 'Option 1'}]
    placeholder: { type: String, default: 'Select an option' },
    isRequired: { type: Boolean, default: false },
    showWarning: { type: Boolean, default: false },
    warningMessage: { type: String, default: 'Please select an option' },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    size: { type: Number, default: undefined }
  });

  const emit = defineEmits(['update:modelValue', 'validation-error', 'change']);

  const inputId = props.id || useId();

  const hasWarning = computed(() => {
    if (!props.isRequired || !props.showWarning) return false;
    if (props.multiple) {
      return !props.modelValue || props.modelValue.length === 0;
    }
    return !props.modelValue;
  });

  const handleChange = (event) => {
    if (props.multiple) {
      const selected = Array.from(event.target.selectedOptions).map(option => {
        const originalOption = props.options.find(opt => String(opt.value) === option.value);
        return originalOption ? originalOption.value : option.value;
      });
      emit('update:modelValue', selected);
      emit('change', selected);
    } else {
      const selectedValue = event.target.value;
      const originalOption = props.options.find(opt => String(opt.value) === selectedValue);
      const value = originalOption ? originalOption.value : selectedValue;
      emit('update:modelValue', value);
      emit('change', value);
    }
  };

  const validate = () => {
    if (props.isRequired) {
      if (props.multiple && (!props.modelValue || props.modelValue.length === 0)) {
        emit('validation-error', props.name);
        return false;
      }
      if (!props.multiple && !props.modelValue) {
        emit('validation-error', props.name);
        return false;
      }
    }
    return true;
  };

  defineExpose({ validate });
</script>

<template>
  <div class="base-select-wrapper">
    <label
      v-if="name"
      :for="inputId"
    >
      {{ name }}
      <span v-if="isRequired" class="required-mark">*</span>
    </label>

    <div class="select-container">
      <select
        :id="inputId"
        class="form-select"
        :class="{ 'border-error': hasWarning }"
        :name="name"
        :disabled="disabled"
        :required="isRequired"
        :multiple="multiple"
        :size="size"
        :aria-required="isRequired"
        :aria-invalid="hasWarning"
        :aria-describedby="hasWarning ? `${inputId}-error` : undefined"
        @change="handleChange"
      >
        <option
          v-if="!multiple && placeholder"
          value=""
          disabled
          :selected="!modelValue"
        >
          {{ placeholder }}
        </option>

        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="multiple ? modelValue?.includes(option.value) : modelValue === option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <span
      v-if="hasWarning"
      :id="`${inputId}-error`"
      class="warning-message"
    >
      {{ warningMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .base-select-wrapper {
    position: relative;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;

      .required-mark {
        color: var(--reddish-color, #dc3545);
        margin-left: 0.25rem;
      }
    }

    .select-container {
      position: relative;
      width: 100%;

      .form-select {
        width: 100%;
        transition: all 0.3s ease;

        &:not(:disabled):hover {
          box-shadow: 0 0 5px 5px var(--blueish-color) !important;
        }

        &:focus {
          box-shadow: 0 0 5px 5px var(--blueish-color) !important;
        }

        &.border-error {
          border: 1px solid var(--reddish-color) !important;
          box-shadow: 0 0 4px 4px var(--reddish-color) !important;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.6;
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
