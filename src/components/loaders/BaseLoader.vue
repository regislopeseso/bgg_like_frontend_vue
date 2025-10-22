<script setup>

</script>

<template>
  <div class="lds-hourglass"></div>
</template>

<style lang="scss">
  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid var(--blueish-color);
    border-color: var(--blueish-color) transparent var(--blueish-color) transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(900deg);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
</style>
