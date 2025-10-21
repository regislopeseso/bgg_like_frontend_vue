<script setup>
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authenticationStore'

const emit = defineEmits(['success', 'error'])
const authenticationStore = useAuthenticationStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const birthdate = ref('')
const gender = ref(1) // Default to first gender option

const handleSubmit = async () => {
  // Validate required fields
  if (!name.value || !email.value || !password.value || !birthdate.value) {
    emit('error', {title:'Validation error',message:'All fields are required.'})
    return
  }

  if (password.value !== confirmPassword.value) {
    emit('error', {title:'Validation error',message:'Passwords do not match.'})
    return
  }

  try {
    await authenticationStore.signup({
      Name: name.value,
      Email: email.value,              // Changed from UserEmail
      Password: password.value,
      UserBirthDate: birthdate.value,
      Gender: gender.value
    })
    emit('success', {title:'Account created',message:'Your account was successfully registered!'})
  } catch (error) {
    emit('error', {title:'Signup failed',message:authenticationStore.error || error.message})
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <input v-model="name" type="text" placeholder="Full Name" class="form-control" required />
    </div>
    <div class="mb-3">
      <input v-model="email" type="email" placeholder="Email" class="form-control" required />
    </div>
    <div class="mb-3">
      <input v-model="password" type="password" placeholder="Password" class="form-control" required />
    </div>
    <div class="mb-3">
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="form-control" required />
    </div>
    <div class="mb-3">
      <input v-model="birthdate" type="date" class="form-control" required />
    </div>
    <div class="mb-3">
      <select v-model.number="gender" class="form-control" required>
        <option value="1">Male</option>
        <option value="2">Female</option>
        <option value="3">Other</option>
      </select>
    </div>
    <button type="submit" class="btn btn-outline-info w-100" :disabled="authenticationStore.loading">
      <span v-if="!authenticationStore.loading">Sign Up</span>
      <span v-else>Loading...</span>
    </button>
  </form>
</template>
