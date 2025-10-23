<!-- SignUpForm.vue component -->
<script setup>
  import { ref } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import BaseForm from './BaseForm.vue'
  import TextInput from '../inputs/TextInput.vue'
  import EmailInput from '../inputs/EmailInput.vue'
  import PasswordInput from '../inputs/PasswordInput.vue'
  import DateInput from '../inputs/DateInput.vue'
  import RadioInput from '../inputs/RadioInput.vue'

  const emit = defineEmits(['success', 'error'])
  const authenticationStore = useAuthenticationStore()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const birthdate = ref('')
  const gender = ref(1)
  const showErrors = ref(false)

  const handleSubmit = async () => {
    // Show errors on all fields
    showErrors.value = true

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
      showErrors.value = false // Reset after successful submission
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
        :showError="showErrors"
        placeholderText="Type in your name"
      />
    </div>

    <hr />

    <div class="mb-3">
      <EmailInput
        v-model="email"
        name="Email"
        :isRequired="true"
        :showError="showErrors"
        placeholderText="Type in your email"
      />
    </div>

    <hr />

    <div class="mb-3">
      <PasswordInput
        v-model="password"
        name="Password"
        :isRequired="true"
        :showError="showErrors"
        placeholderText="Create a password"
      />
    </div>
    <div class="mb-3">
      <PasswordInput
        v-model="password"
        name="Password Confirmation"
        :isRequired="true"
        :showError="showErrors"
        placeholderText="Confirm your password"
      />
    </div>

    <hr />

    <div class="mb-3">
       <DateInput
        v-model="birthdate"
        name="Date of Birth"
        :isRequired="true"
        :showError="showErrors"
      />
    </div>

    <hr />

    <div class="mb-3">
      <div class="form-check form-check-inline">
        <RadioInput
          v-model="gender"
          name="Male"
        />
        <RadioInput
          v-model="gender"
          name="Female"
        />
      </div>
    </div>

    <hr />

    <button type="submit" class="btn btn-outline-info w-100" :disabled="authenticationStore.loading">
      <span v-if="!authenticationStore.loading">Sign Up</span>
      <span v-else>Loading...</span>
    </button>
  </BaseForm>
</template>
