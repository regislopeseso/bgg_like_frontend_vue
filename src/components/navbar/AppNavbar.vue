<script setup>
  import { onMounted, computed } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import { useThemeStore } from '@/stores/themeStore'
  import LogoBrand from './LogoBrand.vue'
  import ThemeOffCanvas from './ThemeOffCanvas.vue'

  import ProfileDropdown from './ProfileDropdown.vue'

  const themeStore = useThemeStore()
  const authenticationStore = useAuthenticationStore()

  onMounted(() => {
    authenticationStore.checkAuthentication()
  })

  // Define navigation items
  const navItems = computed(() => [
    { n: 1, id: '', route: "/", label: "Home",   show: true},
    { n: 2, id: '', route: "/explore", label: "Explore",  show: true},
    { n: 3, id: '', route: "/user", label: "User",  show: authenticationStore.canAccessUser },
    { n: 4, id: '', route: "/admin", label: "Admin",  show: authenticationStore.canAccessAdmin },
    { n: 5, id: '', route: "/dev", label: "Dev",  show:authenticationStore.canAccessDev },
  ])

</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <LogoBrand />

      <button
        class="navbar-toggler navHamburger"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-content"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar-content">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <template v-for="item in navItems" :key="item.id" >
            <li class="nav-item">
              <RouterLink
                v-if="item.show"
                class="nav-link"
                :to="item.route"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </template>
        </ul>

        <div class="d-flex flex-row justify-content-center align-items-center gap-5 pe-3">
          <div class="nav-item">
            <RouterLink
              id="img-access-lifecounter"
              to="/lifecounter"
              :class="{ 'light-theme' : themeStore.isLight}"
            >
              <img src="/images/navbar/lifecounter_white.png" alt="">
            </RouterLink>
          </div>

          <template v-if="!authenticationStore.isAuthenticated">
            <RouterLink
              class="nav-item"
              to="/authentication"
            >
              Sign Up/In
            </RouterLink>
          </template>
          <template v-else>
            <ProfileDropdown />
          </template>

          <div class="nav-item">
            <a
              class="nav-link"
              style="text-decoration: none"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              href="#"
            >
              <i class="bi bi-gear"></i>
            </a>
          </div>
        </div>


      </div>
    </div>
  </nav>
   <ThemeOffCanvas />
</template>

<style lang="scss">
  nav{
    background-color: var(--second-bg-color);
  }

  .navbar a {
    font-size: 1rem;
    color: var(--text-color);
    transition: 0.3s;
  }

  .navbar a:hover {
    color: var(--blueish-color);
  }

  .navbar-nav .nav-link.router-link-active,
  .navbar-nav .nav-link.router-link-exact-active {
    color: var(--blueish-color) !important;
  }

  .navbar-nav .nav-link:hover{
    text-decoration: overline double;
    cursor: pointer;
  }
  .nav-link:focus{
    color: var(--blueish-color);
  }

  .navbar-nav .nav-link.active, .navbar-nav .nav-link.show{
    color: var(--blueish-color)
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
</style>
