<!-- This is the ./src/components/navbar/ProfileDropdown.vue component file -->
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
      href: '#',
      class: 'config-item'
    },
    {
      id: 'li-change-password',
      label: 'Change Password',
      href: '#',
      class: 'config-item'
    },
    {
      id: 'li-delete-profile',
      label: 'Delete Profile',
      href: '#',
      class: 'config-item'
    },
    { divider: true },
    {
      id: 'li-backup-data',
      label: 'Backup Data',
      href: '#',
      class: 'config-item'
    },
    { divider: true },
    {
      id: 'li-sign-out',
      label: 'Sign Out',
      href: '#',
      class: 'config-item logOut',
      action: 'signout'
    }
  ]


</script>

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

    <ul id="ul-profile-configurations" class="dropdown-menu dropdown-menu-end">
      <template
        v-for="item in profileMenuItems"
        :key="item.id || 'divider'"
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
    color: var(--yellowish-color);
    box-shadow: 0 0 1rem var(--yellowish-color) !important;
  }

  #li-change-password:hover {
    color: var(--yellowish-color);
    box-shadow: 0 0 1rem var(--yellowish-color) !important;
  }

  #li-delete-profile:hover {
    color: var(--reddish-color);
    box-shadow: 0 0 1rem var(--reddish-color) !important;
  }

  #li-backup-data:hover {
    color: var(--text-color);
    font-weight: bold;
    box-shadow: 0 0 1rem var(--blueish-color) !important;
  }

  #li-sign-out:hover {
    color: var(--blueish-color);
    font-weight: bold;
    box-shadow: 0 0 1rem var(--blueish-color) !important;
  }
</style>
