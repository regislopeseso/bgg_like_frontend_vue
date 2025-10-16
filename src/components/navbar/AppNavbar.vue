<script setup>
  import { onMounted, computed } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import { useThemeStore } from '@/stores/themeStore'
  import ThemeOffCanvas from './ThemeOffCanvas.vue'
  import ProfileDropdown from './ProfileDropdown.vue'

  const themeStore = useThemeStore()

  const authenticationStore = useAuthenticationStore()

  onMounted(() => {
    authenticationStore.checkAuthentication()
  })



  // Define navigation items
  const navItems = computed(() => [
    { label: 'HOME', id:'', href:'#', show: true},
    { label: 'EXPLORE', id:'',href: '#', show: true},
    { label: 'LIFECOUNTER', id:'img-access-lifecounter', href: '#', show: true, isImage: true },
    { label: 'SIGN UP/IN', id:'',href: '', show: !authenticationStore.isAuthenticated },
    { label: 'USER', id:'',href: '', show: authenticationStore.canAccessUser },
    { label: 'ADMIN', id:'',href: '', show: authenticationStore.canAccessAdmin },
    { label: 'DEV', id:'',href: '', show: authenticationStore.canAccessDev },
  ])

</script>

<template>
  <div>
    <header class="header">
      <a href="#" class="logo">BBG <span>LIKE</span> </a>

      <nav class="navbar">
        <div class="navOptions d-flex flex-row align-items-center justify-content-between">
          <!-- Desktop Navigation -->
          <template v-for="item in navItems" :key="item.label">
            <a
              v-if="item.show && item.isImage"
              :id="item.id"
              :href="item.href"
              :class="{ 'light-theme' : themeStore.isLight}"
            >
              <img src="/images/navbar/lifecounter_white.png" alt="" />
            </a>

            <a
              v-else-if="item.show"
              :id="item.id"
              :href="item.href"
              class="nav-link"
            >
              {{ item.label }}
            </a>
          </template>

          <ProfileDropdown />

          <a
            style="text-decoration: none"
            href="#"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
          >
            <i class="bi bi-gear"></i>
          </a>
        </div>

        <!-- Mobile-Navigation -->
        <div class="navHamburger">
          <nav class="navbar navbar-expand-lg">
            <div class="d-flex flex-column align-items-end">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#toggle-hamburguer-menu"
              >
                <i class="bi bi-list"></i>
              </button>

              <div class="collapse navbar-collapse text-end" id="toggle-hamburguer-menu">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li
                    class="nav-item"
                    v-for="item in navItems"
                    :key="item.label"
                  >
                    <a
                      v-if="item.show && item.isImage"
                      id="img-access-lifecounter-mobile"
                      :href="item.href"
                      :class="{ 'light-theme': themeStore.isLight }"
                    >
                      <img src="/images/navbar/lifecounter_white.png" alt="" />
                    </a>
                    <a
                      v-else-if="item.show"
                      :href="item.href"
                      class="nav-link"
                    >
                      {{ item.label }}
                    </a>
                  </li>

                  <ProfileDropdown />

                  <li class="nav-item">
                    <button
                      style="text-decoration: none"
                      href="#"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                      <i class="bi bi-gear"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </nav>

      <ThemeOffCanvas />
    </header>
  </div>
</template>

<style lang="scss">
  .header {
    background-color: var(--second-bg-color);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 9%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }

  .logo {
    font-size: 3rem;
    color: var(--text-color);
    font-weight: 600;
  }

  .navbar a {
    font-size: 1rem;
    color: var(--text-color);
    margin-left: 4rem;
    transition: 0.3s;
  }

  .navbar a:hover {
    color: var(--main-color);
  }

  .navHamburger {
    display: none;
  }

  .btn-theme {
    height: 3rem;
    width: 10rem;
    color: var(--text-color) !important;
    border: none !important;
    border-radius: 2rem !important;
    box-shadow: 0px 0px 10px 10px var(--bg-color) !important;
  }

  .btn-theme:hover {
    color: var(--main-color) !important;
    background-color: var(--bg-color) !important;
    box-shadow: 0px 0px 10px 5px var(--text-color) !important;
  }

  #img-access-lifecounter img,
  #img-access-lifecounter-mobile img {
    filter: brightness(0) saturate(100%) invert(100%);
  }

  #img-access-lifecounter-mobile {
    display: flex;
    justify-content: flex-end;
    width: 50px;
    height: 30px;
  }

  #img-access-lifecounter:hover img,
  #img-access-lifecounter-mobile:hover img {
    filter: brightness(0) saturate(100%) invert(59%) sepia(85%) saturate(1462%) hue-rotate(146deg)
      brightness(101%) contrast(105%);
  }

  #img-access-lifecounter.light-theme img,
  #img-access-lifecounter-mobile.light-theme img {
    filter: brightness(0) saturate(100%) invert(13%) sepia(8%) saturate(2368%) hue-rotate(169deg)
      brightness(96%) contrast(92%);
  }
  #img-access-lifecounter.light-theme:hover img,
  #img-access-lifecounter-mobile.light-theme:hover img {
    filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(162deg)
      brightness(94%) contrast(101%);
  }

  @media screen and (max-width: 1350px) {
    .header {
      padding: 0 5%;
    }
    .logo {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 991px) {
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .navOptions {
      display: none !important;
    }
    .navHamburger {
      display: flex;
    }
    .navbar-toggler {
      color: var(--main-color);
      font-size: 2rem;
      border: none;
      background-color: var(--second-bg-color);
    }
    .container-fluid {
      justify-content: end;
      text-align: end;
    }

    .navbar-toggler:hover {
      color: var(--text-color);
      background-color: var(--second-bg-color);
      box-shadow: 0 0 1rem var(--text-color) !important;
    }

    .header .navbar-toggler:focus {
      box-shadow: none;
    }
  }
</style>



