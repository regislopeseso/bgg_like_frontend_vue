<!-- This is AuthenticationView.vue view file -->
<script setup>
  // --- Imports ---
  import { ref, useTemplateRef, onMounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router'
  import { useAlerts } from '@/composables/useAlert';
  import SignUpForm from '@/components/forms/SignUpForm.vue';
  import SignInForm from '@/components/forms/SignInForm.vue';
  import SuccessAlert from '@/components/alerts/SuccessAlert.vue';
  import ErrorAlert from '@/components/alerts/ErrorAlert.vue';

  const router = useRouter()

  // Use the composable
  const {
    showSuccessAlert,
    showErrorAlert,
    alertTitle,
    alertMessage,
    showSuccess,
    showError
  } = useAlerts()

  // Template Refs
  const signInFormRef = useTemplateRef('signInFormRef')
  const signUpFormRef = useTemplateRef('signUpFormRef')


  // State
  const isNothingSelected = ref(true)
  const signInSelected = ref(false)
  const welcomingText1 = ref('')
  const welcomingText2 = ref('')
  const showForms = ref(false)
  const isAnimating = ref(false)

  // Functions
  // Navigation function
  const redirectToUsersPage = () => {
    router.push('/user')
  }

  const buildTypewriterEffect = () => {
    welcomingText1.value = ''
    welcomingText2.value = ''
    const msg1 = 'Hello and Welcome!'
    const msg2 = "Please sign in or sign up"
    let i = 0
    let j = 0

    const typeFirst = () => {
      if (i < msg1.length) {
        welcomingText1.value += msg1.charAt(i)
        i++
        setTimeout(typeFirst, 25)
      } else {
        setTimeout(typeSecond, 10)
      }
    }

    const typeSecond = () => {
      if (j < msg2.length) {
        welcomingText2.value += msg2.charAt(j)
        j++
        setTimeout(typeSecond, 25)
      } else {
        // Typewriter is done — wait a bit for visual pause
        setTimeout(() => {
          // Paint "Sign in" button as selected
          isNothingSelected.value = false
          signInSelected.value = true

          setTimeout(() => {
            showForms.value = true
          },100)
        }, 200)
      }
    }

    typeFirst()
  }

  // Handle Sign Option Change
  const handleSignOptionChange = async (isSignIn) => {
    if (isAnimating.value) return

    // If clicking the already active button, do nothing
    if (signInSelected.value === isSignIn) return

    isAnimating.value = true

    // Update selection
    signInSelected.value = isSignIn

    // Wait for form transition
    await new Promise(resolve => setTimeout(resolve, 600))

    // Focus on the appropriate input using template refs
    await nextTick()
    const formComponent = isSignIn ? signInFormRef.value : signUpFormRef.value

    if (formComponent?.$el) {
      const inputId = isSignIn ? 'signInEmail' : 'newUserName'
      const inputElement = formComponent.$el.querySelector(`#${inputId}`)
      inputElement?.focus()
    }

    isAnimating.value = false
  }

  // Lifecycle
  onMounted(() => buildTypewriterEffect())
</script>

<template>
  <div class="authentication-view">
    <!-- Typewriter Message -->
    <div
      class="typewriter-texts text-center"
    >
      <h1>{{ welcomingText1 }}</h1>
      <h3>{{ welcomingText2 }}</h3>
    </div>

    <!-- Authentication Buttons -->
    <div class="d-flex flex-row justify-content-center auth-buttons">
      <button
        class="me-5 btn-authentication-options sign-up-btn"
        :class="{ active: !isNothingSelected && !signInSelected  }"
        :disabled="isAnimating"
        @click="handleSignOptionChange(false)"
      >
        <h1>Sign</h1>
        <h1>Up <i class="bi bi-pencil-square"></i></h1>
      </button>

      <button
        class="btn-authentication-options sign-in-btn"
        :class="{ active: !isNothingSelected && signInSelected  }"
        :disabled="isAnimating"
        @click="handleSignOptionChange(true)"
      >
        <h1>Sign</h1>
        <h1>In <i class="bi bi-person-vcard"></i></h1>
      </button>
    </div>

    <!-- Sign in and Sign up forms -->
    <div v-if="showForms" class="signing-options">
      <Transition :name="signInSelected ? 'slide-from-right' : 'slide-from-left'" mode="out-in">
        <SignInForm
          v-if="signInSelected"
          ref="signInFormRef"
          key="signin"
          @success="showSuccess"
          @error="showError"
        />

        <SignUpForm
          v-else
          ref="signUpFormRef"
          key="signup"
          @success="showSuccess"
          @error="showError"
        />
      </Transition>
    </div>

    <!-- Alert Components -->
    <SuccessAlert
      v-model:show="showSuccessAlert"
      :title="alertTitle"
      :message="alertMessage"
      :timer="5000"
      :confirmButton="true"
      :cancelButton="false"
      @closed="redirectToUsersPage"
    />

    <ErrorAlert
      v-model:show="showErrorAlert"
      :title="alertTitle"
      :cancelButton="false"
      :message="alertMessage"
    />
  </div>
</template>

<style lang="scss">
  .authentication-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 5rem;
  }

  .btn-authentication-options {
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    text-align: center;
    cursor: pointer;

    &:disabled {
      pointer-events: none;
    }
  }

  .sign-up-btn:hover,
  .sign-in-btn:hover {
    color: var(--blueish-color);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .signing-options {
    display: flex;
    justify-content: center;
    width: 25rem;
    margin-top: 1rem;
  }

  #signUpBox,
  #signInBox {
    background-color: var(--second-bg-color);
    border: 1px solid var(--bg-color);
    border-radius: 2rem;
    box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.2);
  }

  .active {
    color: var(--blueish-color);
    pointer-events: none;
  }

  // Slide from left animation (for Sign Up)
  .slide-from-left-enter-active ,
  .slide-from-left-leave-active {
    transition: all 0.3s ease;
  }

  .slide-from-left-enter-from {
    opacity: 0;
    transform: translateX(-50%);
  }

  .slide-from-left-leave-to {
    opacity: 0;
    transform: translateX(50%);
  }

  // Slide from right animation (for Sign In)
  .slide-from-right-enter-active,
  .slide-from-right-leave-active {
    transition: all 0.3s ease;
  }

  .slide-from-right-enter-from {
    opacity: 0;
    transform: translateX(50%);
  }

  .slide-from-right-leave-to {
    opacity: 0;
    transform: translateX(-50%);
  }
</style>
