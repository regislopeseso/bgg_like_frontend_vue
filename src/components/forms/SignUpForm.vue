<!-- SignUpForm.vue component -->
<script setup>
  import { ref } from 'vue'
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
    // Show errors on all fields
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
</script>

<template>
  <BaseForm @submit="handleSubmit">
    <div class="mb-3">
      <TextInput
        v-model.trim="name"
        name="Name"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Type in your name"
      />
    </div>

    <hr />

    <div class="mb-3">
      <EmailInput
        v-model="email"
        name="Email"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Type in your email"
      />
    </div>

    <hr />

    <div class="mb-3">
      <PasswordInput
        v-model="password"
        name="Password"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Create a password"
      />
    </div>
    <div class="mb-3">
      <PasswordInput
        v-model="confirmPassword"
        name="Password Confirmation"
        :isRequired="true"
        :showWarning="showWarning"
        placeholderText="Confirm your password"
      />
    </div>

    <hr />

    <div class="mb-3">
       <DateInput
        v-model="birthdate"
        name="Birth Date"
        :isRequired="true"
        :showWarning="showWarning"
      />
    </div>

    <hr />

    <div class="mb-3">
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
    </div>

    <hr />

    <BtnOutline
      class="d-flex w-100 justify-content-center"
      type="submit"
      variant="info"
      :disabled="authenticationStore.loading"
      :buttonText="authenticationStore.loading ? 'Loading...' : 'Sign Up'"
    />
  </BaseForm>
</template>
