<!-- BaseRadioGroup.vue component -->
<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: [String, Number, Boolean],
    name: { type: String, required: true },
    label: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
    showWarning: { type: Boolean, default: false },
    warningMessage: { type: String, default: 'Please select an option' },
    inline: { type: Boolean, default: true }
  });

  const emit = defineEmits(['update:modelValue', 'validation-error']);

  const hasWarning = computed(() => props.isRequired && props.showWarning && !props.modelValue);

  const validate = () => {
    if (props.isRequired && !props.modelValue) {
      emit('validation-error', props.name);
      return false;
    }
    return true;
  };

  defineExpose({ validate });

  const coloredLabel = computed(() => {
    if(!props.name) return '';

    return props.name
      .split(' ')
      .map(word => {
        if(!word) return '';

       return `<span class="blueish-initials">${word[0].toUpperCase()}</span>${word.slice(1).toLowerCase()}`;
      })
      .join(' ');
  })
</script>

<template>
  <div class="base-radio-group">
    <label
      v-if="label"
      class="group-label"
      v-html="coloredLabel"
    />

    <div
      class="radio-options"
      :class="{ 'inline': inline, 'has-error': hasWarning }"
    >
      <slot
        :modelValue="modelValue"
        @update:modelValue="emit('update:modelValue', $event)" />
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
  .base-radio-group {
    .group-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .radio-options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &.inline {
        flex-direction: row;
        gap: 1rem;
      }

      &.has-error {
        padding: 0.5rem;
        border: 1px solid var(--reddish-color, #dc3545);
        border-radius: 0.25rem;
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
