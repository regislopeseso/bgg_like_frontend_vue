<!-- This is the ./src/components/loaders/ContentLoader.vue component file -->
<script setup>
  import { ref, watch } from 'vue'
  import BaseLoader from './BaseLoader.vue'

  const props = defineProps({
    show: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },          // full-screen overlay if true
    fadeSpeed: { type: Number, default: 300 },        // fade in/out duration in ms
    blurAmount: { type: String, default: '5px' },    // blur intensity
    overlayColor: { type: String, default: 'rgba(0,0,0,0.35)' } // overlay color
  })

  const visible = ref(props.show)

  watch(
    () => props.show,
    (newVal) => {
      if (newVal) visible.value = true
      else setTimeout(() => (visible.value = false), props.fadeSpeed)
    }
  )
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="content-loader-overlay" :class="{ fixed: props.fixed }">
      <div
        class="content-loader-blur"
        :style="{ backdropFilter: `blur(${props.blurAmount})`, backgroundColor: props.overlayColor }"
      ></div>
      <div class="content-loader-center">
        <BaseLoader />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  /* --- Fade transition --- */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* --- Overlay covers parent by default --- */
  .content-loader-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    overflow: hidden;
  }

  /* --- Full-screen mode --- */
  .content-loader-overlay.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }

  /* --- Blur + dim background --- */
  .content-loader-blur {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* --- Loader centered above blur --- */
  .content-loader-center {
    position: relative;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
