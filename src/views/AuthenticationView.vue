<script setup>
  // --- Imports ---
  import { ref, onMounted } from 'vue';
  import SignUpForm from '@/components/forms/SignUpForm.vue';
  import SignInForm from '@/components/forms/SignInForm.vue';
  import Swal from 'sweetalert2'

  import { useRouter } from 'vue-router'
  const router = useRouter()

  // --- State ---
  const signUpOption = ref(false)
  const welcomingText1 = ref('')
  const welcomingText2 = ref('')

  // --- Functions ---
  const redirectToUsersPage = () => {
    router.push('/users')
  }
  const sweetAlertSuccess = (title, message) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title,
      text: message || '',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => redirectToUsersPage())
  }
  const sweetAlertError = (title, message) => {
    let seconds = 5
    const timer = setInterval(() => (seconds -= 1), 1000)

    Swal.fire({
      position: 'center',
      icon: 'error',
      title,
      html: `
        <div>
          <p>${message || ''}</p>
          <p>This window will close in <b>${seconds}</b>...</p>
        </div>
      `,
      timer: seconds * 1000,
      showCancelButton: true,
      cancelButtonText: 'Close',
      timerProgressBar: true,
      willClose: () => clearInterval(timer),
    })
  }

  // --- Typewriter Animation ---
  const buildTypewriterEffect = () => {
    welcomingText1.value = ''
    welcomingText2.value = ''
    const msg1 = 'Welcome visitor!'
    const msg2 = 'What would you like to do'
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
      }
    }

    typeFirst()
  }

  onMounted(() => buildTypewriterEffect())
</script>

<template>
  <main id="user-authentication-page">
    <section id="status-loggedOut">
      <div class="d-flex flex-column align-items-center justify-content-center entryBox" id="welcomeTexts">
        <div id="typewritter-texts" class="text-center no-select">
          <h1>{{ welcomingText1 }}</h1>
          <h3>{{ welcomingText2 }}</h3>
        </div>

        <div class="d-flex flex-row justify-content-center visitorOptions">
          <button
            id="signUp"
            class="me-5 btn-authentication-options signUpOption no-select"
            :class="{ active: signUpOption }"
            @click="signUpOption = true"
          >
            <h1>Sign</h1>
            <h1>Up <i class="bi bi-pencil-square"></i></h1>
          </button>

          <button
            id="signIn"
            class="btn-authentication-options signInOption no-select"
            :class="{ active: !signUpOption }"
            @click="signUpOption = false"
          >
            <h1>Sign</h1>
            <h1>In <i class="bi bi-person-vcard"></i></h1>
          </button>
        </div>
      </div>

      <div id="signing-options">
        <SignUpForm
          v-if="signUpOption"
          @success="sweetAlertSuccess"
          @error="sweetAlertError"
        />

        <SignInForm
          v-else
          @success="sweetAlertSuccess"
          @error="sweetAlertError"
        />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
  main {
  display: flex;
  padding-top: 8rem;
  justify-content: center;
  align-items: center;
  }

  .btn-authentication-options {
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    text-align: center;
    cursor: pointer;
  }

  .no-select {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ and Edge */
    user-select: none; /* Standard syntax */
  }

  .signUpOption:hover,
  .signInOption:hover {
    color: var(--main-color);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  #signing-options {
    display: flex;
    width: 25rem;
  }

  #signUpBox,
  #signInBox {
    background-color: var(--second-bg-color);
    border: 1px solid var(--bg-color);
    border-radius: 2rem;
    box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.2);
  }

  .active {
    color: var(--main-color);
    pointer-events: none;
  }

</style>
