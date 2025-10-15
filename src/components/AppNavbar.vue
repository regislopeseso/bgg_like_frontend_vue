<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})

const handleSignout = () => {
  authStore.signout()
}

const handleThemeToggle = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div>
    <header class="header">
      <a href="#" class="logo">BBG <span>LIKE</span> </a>

      <nav class="navbar">
        <div class="navOptions d-flex flex-row align-items-center justify-content-between">
          <a href="#"> HOME </a>

          <a href=""> EXPLORE </a>

          <a id="img-access-lifecounter" href="" :class="{ 'light-theme': themeStore.isLight }">
            <img src="/public/img/navbar/lifecounter_white.png" alt="" />
          </a>

          <a href="" class="nav-link" v-if="!authStore.isAuthenticated"> SIGN UP/IN </a>

          <a href="" class="nav-link" v-if="authStore.canAccessUser"> USER </a>

          <a href="" class="nav-link" v-if="authStore.canAccessAdmin"> ADMIN </a>

          <a href="" class="nav-link" v-if="authStore.canAccessDev"> DEV </a>

          <div class="dropdown" v-if="authStore.isAuthenticated">
            <a
              class="nav-link"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-gear"></i>
            </a>

            <ul id="ul-profile-configurations" class="dropdown-menu">
              <li>
                <a id="li-edit-profile" class="config-item dropdown-item m-0" href="">
                  Edit Profile
                </a>
              </li>

              <li>
                <a id="li-change-password" class="config-item dropdown-item m-0" href="">
                  Change Password
                </a>
              </li>

              <li>
                <a id="li-delete-profile" class="config-item dropdown-item m-0" href="">
                  Delete Profile
                </a>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <a id="li-backup-data" class="config-item dropdown-item m-0" href="">
                  Backup Data
                </a>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <a
                  id="li-sign-out"
                  class="config-item logOut dropdown-item m-0"
                  href=""
                  @click.prevent="handleSignout"
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </div>

          <a
            style="text-decoration: none"
            href="#"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
          >
            <i class="bi bi-gear"></i>
          </a>

          <div id="role-initial-toggler"></div>
        </div>

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
                  <li class="nav-item">
                    <a class="nav-link" href="#"> HOME </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href=""> EXPLORE </a>
                  </li>

                  <li class="nav-item">
                    <a
                      id="img-access-lifecounter-mobile"
                      href=""
                      :class="{ 'light-theme': themeStore.isLight }"
                    >
                      <img src="/public/img/navbar/lifecounter_white.png" alt="" />
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="" class="nav-link" v-if="!authStore.isAuthenticated"> SIGN UP/IN </a>
                  </li>

                  <li class="nav-item">
                    <a href="" class="nav-link" v-if="authStore.canAccessUser"> USER </a>
                  </li>

                  <li class="nav-item">
                    <a href="" class="nav-link" v-if="authStore.canAccessAdmin"> ADMIN </a>
                  </li>

                  <li class="nav-item">
                    <a href="" class="nav-link" v-if="authStore.canAccessDev"> DEV </a>
                  </li>

                  <div class="dropdown" v-if="authStore.isAuthenticated">
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                      <i class="bi bi-person-gear"></i>
                    </a>

                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item m-0" href="#"> Edit Profile </a>
                      </li>

                      <li>
                        <a class="dropdown-item m-0" href="#"> Delete Profile </a>
                      </li>

                      <li>
                        <hr class="dropdown-divider" />
                      </li>

                      <li>
                        <a class="dropdown-item m-0" href="#"> Backup Data </a>
                      </li>

                      <li>
                        <hr class="dropdown-divider" />
                      </li>

                      <li>
                        <a class="dropdown-item m-0" href="#" @click.prevent="handleSignout">
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>

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

      <div class="offcanvas-custom offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight">
        <div class="offcanvas-header pb-5">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            <span>T</span>heme <span>C</span>onfiguration
          </h5>

          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div class="offcanvas-body d-flex flex-column align-items-center">
          <button
            id="theme-toggler"
            class="btn-theme btn btn-outline-info d-flex flex-row align-items-center justify-content-center"
            type="button"
            data-bs-dismiss="offcanvas"
            @click="handleThemeToggle"
          >
            {{ themeStore.buttonText }}
          </button>
        </div>
      </div>
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

#role-initial {
  font-size: 1rem;
  height: 2rem;
  width: 2rem;
  border: 2px solid var(--main-color);
  border-radius: 50%;
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

#ul-profile-configurations {
  background-color: var(--second-bg-color);
  box-shadow: 0 0 1rem var(--text-color) !important;
}

#ul-profile-configurations .config-item:hover {
  background-color: var(--bg-color) !important;
  font-weight: bold;
  box-shadow: 0 0 1rem var(--text-color) !important;
}

#li-edit-profile:hover {
  color: var(--greenish);
  box-shadow: 0 0 1rem var(--greenish) !important;
}

#li-change-password:hover {
  color: var(--yellowish);
  box-shadow: 0 0 1rem var(--yellowish) !important;
}

#li-delete-profile:hover {
  color: var(--reddish);
  box-shadow: 0 0 1rem var(--reddish) !important;
}

#li-backup-data:hover {
  color: var(--text-color);
  font-weight: bold;
  box-shadow: 0 0 1rem var(--main-color) !important;
}

#li-sign-out:hover {
  color: var(--main-color);
  font-weight: bold;
  box-shadow: 0 0 1rem var(--main-color) !important;
}

.navHamburger {
  display: none;
}

/* USERS PROFILE CONFIGS*/
#users-profile-configurations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

#edit-profile {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  height: 35rem;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.2);
  background-color: var(--second-bg-color);
  z-index: 2000;
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
