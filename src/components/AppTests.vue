<script setup>
  import BtnCloseX from './buttons/BtnCloseX.vue'
  import BtnBlueish from './buttons/BtnBlueish.vue'
  import BtnReddish from './buttons/BtnReddish.vue'
  import BtnYellowish from './buttons/BtnYellowish.vue'
  import BtnGreenish from './buttons/BtnGreenish.vue'
</script>

<template>
  <div>
     <BtnCloseX
      class="m-5"
      :buttonText="'Blueish'"
    />
    <BtnBlueish
      class="m-5"
      :buttonText="'Blueish'"
    />
    <BtnReddish
      class="m-5"
      :buttonText="'Reddish'"
    />
    <BtnYellowish
      class="m-5"
      :buttonText="'Yellowish'"
    />
    <BtnGreenish
      class="m-5"
      :buttonText="'Greenish'"
    />
  </div>
</template>

<style>
</style>
