<template>
  <div :class="$style['home']">
    <div class="aaa" v-loading="true"></div>
    <svg-icon name="icon-tags1" color="red" width="50px" height="50px" />
    <el-button @click="handelClick">请求</el-button>
  </div>
</template>
<script setup lang="ts">
  import myAxios from '@/service'

  const handelClick = () => {
    myAxios.get({
      url: '/aaa'
    })
  }
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
