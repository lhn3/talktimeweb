<template>
  <div :class="$style['chatting-column']">
    <!--头部-->
    <div class="chatting-header">
      <div class="chatting-title">测试标题</div>
      <div class="more-info" @click="() => user.changeShowMore()">
        <el-icon><MoreFilled /></el-icon>
      </div>
    </div>

    <!--内容-->
    <div
      class="chatting-body"
      :style="{ height: `calc(100% - ${controlBarRef?.$el?.clientHeight || 0}px - 80px)` }"
    ></div>

    <!--底部-->
    <control-bar ref="controlBarRef" />
  </div>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useUserStore } from '@/stores'
  import ControlBar from '@/views/components/chatting-column/cpns/control-bar/index.vue'

  const user = useUserStore()
  const controlBarRef = ref()
</script>

<style module lang="scss">
  .chatting-column {
    height: 100%;
    width: 45vw;
    min-width: 540px;
    color: #fff;
    background-color: $chat-body-color;
    position: relative;
    :global {
      .chatting-header {
        padding: 0 20px;
        background-color: $chat-header-color;
        display: flex;
        align-items: center;
        .chatting-title {
          line-height: 65px;
          font-size: 24px;
        }
        .more-info {
          cursor: pointer;
          margin-left: auto;
          color: #eee;
          font-size: 22px;
        }
      }
      .chatting-body {
        transition: height 0.3s;
        background-color: #fff;
      }
    }
  }
</style>
