<!--星空背景-->
<template>
  <div class="star-bg" id="particles-js"></div>
</template>
<script setup lang="ts">
  import '@/utils/particles.js'
  import particlesParams from './data'
  import { onMounted } from 'vue'

  onMounted(() => particlesJS('particles-js', particlesParams))
</script>

<style scoped lang="scss">
  .star-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(to top, #26354a, #192533, #080d13);
  }
</style>
