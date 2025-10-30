<!-- This is the ./src/components/forms/SignUpForm.vue component file -->
<script setup>
  import { ref, computed } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'

  import BaseForm from './BaseForm.vue'
  import TextInput from '../inputs/TextInput.vue'
  import EmailInput from '../inputs/EmailInput.vue'
  import PasswordInput from '../inputs/PasswordInput.vue'
  import DateInput from '../inputs/DateInput.vue'
  import BaseRadioGroup from '../inputs/BaseRadioGroup.vue'
  import RadioInput from '../inputs/RadioInput.vue'
  import BtnOutline from '../buttons/BtnOutline.vue'

  const emit = defineEmits(['success', 'error'])
  const authenticationStore = useAuthenticationStore()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const birthdate = ref('')
  const gender = ref(null)
  const showWarning = ref(false)

  const handleSubmit = async () => {
    // Show warnings on all fields
    showWarning.value = true

    // Validate required fields
    if (!name.value || !email.value || !password.value || !birthdate.value) {
      emit('error', {title:'Validation error', message:'All required fields must be filled.'})
      return
    }

    if (password.value !== confirmPassword.value) {
      emit('error', {title:'Validation error', message:'Passwords do not match.'})
      return
    }

    try {
      await authenticationStore.signup({
        Name: name.value,
        Email: email.value,
        Password: password.value,
        UserBirthDate: birthdate.value,
        Gender: gender.value
      })
      emit('success', {title:'Account created', message:'Your account was successfully registered!'})
      showWarning.value = false // Reset after successful submission
    } catch (error) {
      emit('error', {title:'Signup failed', message:authenticationStore.error || error.message})
    }
  }

  const isFormFilled = computed(() => {
    return String(name.value).trim().length > 0 &&
      String(email.value).trim().length > 0 &&
      String(password.value).trim().length > 0 &&
      String(confirmPassword.value).trim().length > 0 &&
      String(birthdate.value).trim().length > 0 &&
      String(gender.value).trim().length > 0
  });
</script>

<template>
  <div>
    <ContentLoader :show="authenticationStore.loading" />

    <BaseForm @submit="handleSubmit">
      <TextInput
        v-model.trim="name"
        name="Name"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Type in your name"
      />

      <hr />

      <EmailInput
        v-model="email"
        name="Email"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Type in your email"
      />

      <hr />

      <PasswordInput
        class="pb-3"
        v-model="password"
        name="Password"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Create a password"
      />

      <PasswordInput
        v-model="confirmPassword"
        name="Password Confirmation"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Confirm your password"
      />

      <hr />

      <DateInput
        v-model="birthdate"
        name="Birth Date"
        :isRequired="true"
        :showWarning="showWarning"
      />

      <hr />

      <BaseRadioGroup
        v-model="gender"
        name="gender"
        label="Gender"
        :inline="true"
      >
        <RadioInput
          v-model="gender"
          name="gender"
          :value="1"
          label="Male"
        />
        <RadioInput
          v-model="gender"
          name="gender"
          :value="2"
          label="Female"
        />
      </BaseRadioGroup>

      <hr />

      <BtnOutline
        class="d-flex w-100 justify-content-center"
        type="submit"
        variant="info"
        :disabled="authenticationStore.loading || !isFormFilled"
        :buttonText="authenticationStore.loading ? 'Loading...' : 'Sign Up'"
      />
    </BaseForm>
  </div>
</template>
