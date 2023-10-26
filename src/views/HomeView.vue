<template>
  <div :class="$style['home']">
    <div class="aaa"></div>
    <svg-icon name="icon-tags1" color="red" width="20px" height="20px" />

    <icon-community />
  </div>
</template>
<script setup lang="ts">
  import IconCommunity from '@/components/icons/IconCommunity.vue'
</script>
<style module lang="scss">
  .home {
    height: 100%;
    width: 100%;
    background: url('../assets/img/login_bg.webp') no-repeat;
    background-size: cover;
    :global {
      .aaa {
        height: 100px;
        aspect-ratio: 1/1;
        background-color: white;
      }
    }
  }
</style>
