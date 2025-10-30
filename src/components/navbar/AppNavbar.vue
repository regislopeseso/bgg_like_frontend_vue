<!-- This is the ./src/components/navbar/AppNavbar.vue component file -->
<script setup>
  import {  computed } from 'vue'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import { useThemeStore } from '@/stores/themeStore'
  import LogoBrand from './LogoBrand.vue'
  import ThemeOffCanvas from './ThemeOffCanvas.vue'

  import ProfileDropdown from './ProfileDropdown.vue'

  const themeStore = useThemeStore()
  const authenticationStore = useAuthenticationStore()

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
  <nav class="navbar navbar-expand-lg fixed-top">
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

          <li class="nav-item">
            <RouterLink
              id="img-access-lifecounter"
              to="/lifecounter"
              :class="{ 'light-theme' : themeStore.isLight}"
            >
              <img src="/images/navbar/lifecounter_white.png" alt="">
            </RouterLink>
          </li>

          <li class="nav-item">
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
          </li>

          <li class="nav-tem">
            <a
              class="nav-link"
              style="text-decoration: none"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              href="#"
            >
              <i class="bi bi-gear"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
   <ThemeOffCanvas />
</template>

<style lang="scss">
  nav{
    background-color: var(--second-bg-color);
  }

  .navbar-nav{
    align-items: center;
    gap: 1rem;
  }

  .navbar-toggler{
    border: 1px solid var(--text-color);
    opacity: 0.7;
    transition: all 0.2s;
  }
  .navbar-toggler:hover{
    opacity: 1;
    border: 1px solid var(--blueish-color);
  }

  .navbar-toggler-icon{
    filter: var(--text-filter);
    opacity: 0.7 ;
    transition: opacity 0.2s;
  }
  .navbar-toggler:hover .navbar-toggler-icon{
    filter: var(--blueish-filter);
    opacity: 1;
  }
  .navbar-toggler:focus{
    box-shadow: none;
  }

  @media screen and (max-width: 992px) {
    .navbar-nav{
      align-items: start;
      gap: 0.1rem;
    }
  }

  .navbar-collapse{
    flex-grow: 0 !important;
  }

  .navbar a {
    font-size: 1;
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

  #img-access-lifecounter img {
    filter: brightness(0) saturate(100%) invert(100%);
  }


  #img-access-lifecounter:hover img {
    filter: brightness(0) saturate(100%) invert(59%) sepia(85%) saturate(1462%) hue-rotate(146deg)
      brightness(101%) contrast(105%);
  }

  #img-access-lifecounter.light-theme img {
    filter: brightness(0) saturate(100%) invert(13%) sepia(8%) saturate(2368%) hue-rotate(169deg)
      brightness(96%) contrast(92%);
  }
  #img-access-lifecounter.light-theme:hover img {
    filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(162deg)
      brightness(94%) contrast(101%);
  }
</style>
