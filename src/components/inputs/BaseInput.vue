<!-- This is the ./src/components/inputs/BaseInput.vue component file -->
<script setup>
  import { ref, computed, useId } from 'vue';

  const props = defineProps({
    id: { type: String, default: '' },
    modelValue: [String, Number],
    name: { type: String, default: '' },
    labelstyle: { type: String, default: 'info'},
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
    showWarning: { type: Boolean, default: false },
    warningMessage: { type: String, default: 'This field is required' },
    disabled: { type: Boolean, default: false }
  });

  const emit = defineEmits(['update:modelValue', 'validation-error', 'blur']);

  // Generate or use provided ID
  const inputId = props.id || useId();

  // Track if the input has been touched
  const touched = ref(false);

  // Compute if the input has an error
  const hasWarning = computed(() => touched.value && props.isRequired && !props.modelValue);
  const hasSuccess = computed(() => touched.value && String(props.modelValue).length > 0);



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
    touched.value = true;
    emit('blur');
  };

  // Expose validate method for parent components
  defineExpose({ validate });

  const coloredLabel = computed(() => {
    if(!props.name) return '';

    let labelStyle = ''
    switch (props.labelstyle) {
      case('danger'):
        labelStyle = 'reddish-initials'
        break;
      case('warning'):
        labelStyle = 'yellowish-initials'
        break;
      case('success'):
        labelStyle = 'greenish-initials'
        break;
      default:
        labelStyle = 'blueish-initials'
        break;
    }

    return props.name
      .split(' ')
      .map(word => {
       if(!word) return '';

       return `<span class="${labelStyle}">${word[0].toUpperCase()}</span>${word.slice(1).toLowerCase()}`;
      })
      .join(' ');
  })

  const getInputClass = computed(() => {
    switch (true) {
      case hasWarning.value:
        return String(' border-error');
      case hasSuccess.value:
        return String('border-success');
      default:
        return '';
    }
  })

</script>

<template>
  <div class="base-input-wrapper">
    <label
      v-if="name"
      :for="inputId"
      v-html="coloredLabel"
    />

    <div class="input-container">
      <input
        :id="inputId"
        :aria-required="isRequired"
        :aria-invalid="hasWarning"
        :aria-describedby="hasWarning ? `${inputId}-error` : undefined"
        :name="name"
        :class="['form-control', getInputClass]"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="emit('update:modelValue', $event.target.value)"
        @blur="handleBlur"
      >
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

<style lang="scss">
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

        &:disabled{
          border: 1px solid var(--bg-color);
          background-color: var(--second-bg-color);
          color: var(--text-color);
          opacity: 0.6;
        }

        &:disabled::placeholder {
          font-style: italic !important;
          text-decoration: line-through;
        }

        &:not(:disabled):hover {
          box-shadow: 0 0 5px 3px var(--blueish-color) !important;
        }

        &:focus {
          box-shadow: 0 0 5px 3px var(--blueish-color) !important;
        }

        &.border-error {
          box-shadow: 0 0 5px 3px var(--reddish-color) !important;
        }

        &.border-success {
          box-shadow: 0 0 5px 3px var(--greenish-color);
        }
      }
    }

    .warning-message {
      color: var(--reddish-color);
      font-size: 0.85rem;
      margin-top: 0.5rem;
      display: block;
    }
  }
</style>
