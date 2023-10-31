<template>
  <div
    :class="$style['information-column']"
    :style="{ width: status ? '15vw' : 0, minWidth: status ? '180px' : 0 }"
  ></div>
</template>
<script setup lang="ts">
  import { watch, computed } from 'vue'
  import { useUserStore } from '@/stores'

  const user = useUserStore()

  let status = computed(() => user.userInfo.isShowMoreInfo)
  watch(
    () => user.userInfo.isShowMoreInfo,
    value => {
      if (!value) return
      //清空数据，重新请求数据
    }
  )
</script>
<style module lang="scss">
  .information-column {
    height: 100%;
    //width: 15vw;
    //min-width: 180px;
    transition: all 0.5s;
    background-color: #fff;
    border-left: 1px solid $border-color;
    :global {
    }
  }
</style>
