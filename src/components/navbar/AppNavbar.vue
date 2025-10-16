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
    { label: 'HOME', id:'', route:'/', show: true, isActive: true},
    { label: 'EXPLORE', id:'', route: '/explore', show: true},
    { label: 'LIFECOUNTER', route: '/lifecounter', id:'img-access-lifecounter', href: '#', show: true, isImage: true },
    { label: 'SIGN UP/IN', id:'', route: '/register', show: !authenticationStore.isAuthenticated },
    { label: 'USER', id:'', route: '/user', show: authenticationStore.canAccessUser },
    { label: 'ADMIN', id:'', route: '/admin', show: authenticationStore.canAccessAdmin },
    { label: 'DEV', id:'', route: '/dev', show: authenticationStore.canAccessDev },
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
    </div>


    <div class="collapse navbar-collapse" id="navbar-content">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <template v-for="item in navItems" :key="item.label">
          <li class="nav-item">
            <RouterLink
              v-if="item.show && item.isImage"
              class="nav-link"
              :id="item.id"
              :to="item.route"
              :class="{ 'light-theme' : themeStore.isLight}"
            >
              <img src="/images/navbar/lifecounter_white.png" alt="" />
            </RouterLink>

            <RouterLink
              v-else-if="item.show"
              class="nav-link"
              :to="item.route"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </template>
      </ul>

      <ProfileDropdown />

      <a
        style="text-decoration: none"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        href=""
      >
        <i class="bi bi-gear"></i>
      </a>
    </div>
  </nav>

  <ThemeOffCanvas />
</template>

<style lang="scss">
  nav{
    background-color: var(--second-bg-color);
  }
  .navbar-brand {
    color: var(--main-color);
  }

  .navbar a {
    font-size: 1rem;
    color: var(--text-color);
    transition: 0.3s;
  }

  .navbar a:hover {
    color: var(--main-color);
  }

  .navbar-nav .nav-link.router-link-active,
  .navbar-nav .nav-link.router-link-exact-active {
    color: var(--main-color) !important;
  }

  .navbar-nav .nav-link:hover{
    text-decoration: overline double;
    cursor: pointer;
  }
  .nav-link:focus{
    color: var(--main-color);
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

</style>



