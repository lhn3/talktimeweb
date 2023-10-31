<template>
  <div :class="$style['chatting-column']">
    <div class="chatting-header">
      <div class="chatting-title">测试标题</div>
      <div class="more-info" @click="() => user.changeShowMore()">
        <el-icon size=""><MoreFilled /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useUserStore } from '@/stores'

  const user = useUserStore()
</script>

<style module lang="scss">
  .chatting-column {
    height: 100%;
    width: 45vw;
    min-width: 540px;
    background-color: #fff;
    :global {
      .chatting-header {
        padding: 0 20px;
        border-bottom: 1px solid $border-color;
        background-color: #fafafa;
        display: flex;
        align-items: center;
        .chatting-title {
          line-height: 65px;
          font-size: 24px;
        }
        .more-info {
          cursor: pointer;
          margin-left: auto;
          color: #666666;
          font-size: 22px;
        }
      }
    }
  }
</style>
