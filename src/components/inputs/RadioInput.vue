<!-- RadioInput.vue component -->
<script setup>
  import { computed, useId } from 'vue';

  const props = defineProps({
    id: { type: String, default: '' },
    modelValue: [String, Number, Boolean],
    value: [String, Number, Boolean],
    name: { type: String, required: true },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    isRequired: { type: Boolean, default: false }
  });

  const emit = defineEmits(['update:modelValue']);

  const inputId = props.id || useId();
  const isChecked = computed(() => props.modelValue === props.value);

  const handleChange = () => {
    emit('update:modelValue', props.value);
  };

  const coloredLabel = computed(() => {
    if(!props.label) return '';

    return props.label
      .split(' ')
      .map(word => {
        if(!word) return '';

       return `<span style="color: var(--blueish-color)">${word[0].toUpperCase()}</span>${word.slice(1).toLowerCase()}`;
      })
      .join(' ');
  })
</script>

<template>
  <div class="base-radio">
    <input
      :id="inputId"
      type="radio"
      class="form-check-input"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :aria-required="isRequired"
      @change="handleChange"
    />
    <label
      class="form-check-label"
      :for="inputId"
      v-html="coloredLabel"
    />
  </div>
</template>

<style lang="scss" scoped>
  .base-radio {
    display: inline-flex;
    align-items: center;
    margin-right: 1rem;

    .form-check-input {
      margin-right: 0.5rem;
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    }

    .form-check-label {
      cursor: pointer;
      user-select: none;
      margin-bottom: 0;
    }
  }

  input[type="radio"] {
    border: 2px solid var(--bg-color); /* Custom border */
    border-radius: 50%; /* Make it round */
  }

  input[type="radio"]:checked {
    background-color: var(--blueish-color); /* Fill color when checked */
    box-shadow: 0 0 5px 1px var(--blueish-color);
    border: 2px solid var(--blueish-color)  ;
    --bs-form-check-bg-image: none;
  }

  input[type="radio"]::before {
    background-color: var(--blueish-color);
    transition: transform 0.2s ease;
  }
</style>
