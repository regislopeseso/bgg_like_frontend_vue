<script setup>
  import { useAuthenticationStore } from '@/stores/authenticationStore'

  const authenticationStore = useAuthenticationStore()

  const handleItemClick = (action) => {
    if (action === 'signout') {
      authenticationStore.signout()
    }
    // Add other actions as needed
  }

  const profileMenuItems = [
    {
      id: 'li-edit-profile',
      label: 'Edit Profile',
      href: '',
      class: 'config-item'
    },
    {
      id: 'li-change-password',
      label: 'Change Password',
      href: '',
      class: 'config-item'
    },
    {
      id: 'li-delete-profile',
      label: 'Delete Profile',
      href: '',
      class: 'config-item'
    },
    { divider: true },
    {
      id: 'li-backup-data',
      label: 'Backup Data',
      href: '',
      class: 'config-item'
    },
    { divider: true },
    {
      id: 'li-sign-out',
      label: 'Sign Out',
      href: '',
      class: 'config-item logOut',
      action: 'signout'
    }
  ]


</script>
<!-- v-if="authenticationStore.isAuthenticated" -->
<template>
  <div class="dropdown" >
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
      <template
        v-for="item in profileMenuItems"
        :key="item.id"
      >
        <li
          v-if="item.divider"
        >
          <hr class="dropdown-divider" />
        </li>
        <li
          v-else
        >
          <a
            :id="item.id"
            :class="item.class + ' dropdown-item m-0'"
            :href="item.href"
            @click.prevent="item.action ? handleItemClick(item.action) : null"
          >
            {{ item.label }}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  #users-profile-configurations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;

    li {
      margin: 0;
    }
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
</style>
