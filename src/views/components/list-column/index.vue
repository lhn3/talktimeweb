<template>
  <div :class="$style['list-column']">
    <div class="list-search">
      <el-input v-model="searchValue" placeholder="搜索" :prefix-icon="Search" clearable />
      <el-icon size="30"><CirclePlusFilled /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  const searchValue = ref<any>()
</script>
<style module lang="scss">
  .list-column {
    height: 100%;
    width: 20vw;
    min-width: 240px;
    background-color: $primary-color2;
    :global {
      .list-search {
        width: 100%;
        height: 65px;
        border-bottom: 1px solid $primary-color;
        display: flex;
        align-items: center;
        padding: 0 20px;
        .el-input__wrapper {
          margin-right: 10px;
          border-radius: 16px;
          box-shadow: none;
          background-color: $primary-color;
          .el-input__inner {
            color: $primary-color3;
            --el-input-placeholder-color: $primary-color3;
          }
          .el-icon {
            color: $primary-color3;
          }
        }
        .el-icon {
          cursor: pointer;
          color: $primary-color;
        }
      }
    }
  }
</style>
