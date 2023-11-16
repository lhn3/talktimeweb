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
    <chatting-body ref="chattingBodyRef" />

    <!--底部-->
    <control-bar />
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useUserStore, useOtherStore } from '@/stores'
  import { scrollTo } from '@/utils/utils'
  import ControlBar from '@/views/components/chatting-column/cpns/control-bar/index.vue'
  import ChattingBody from '@/views/components/chatting-column/cpns/chatting-body/index.vue'

  const chattingBodyRef = ref()
  const user = useUserStore()
  const other = useOtherStore()

  onMounted(() => {
    // 滚动到最底部
    scrollTo(chattingBodyRef.value.$el)
    //将dom记录到vue
    other.otherInfo.chattingBodyDom = chattingBodyRef.value.$el
  })
</script>

<style module lang="scss">
  .chatting-column {
    height: 100%;
    width: 50vw;
    min-width: 540px;
    color: #fff;
    background-color: $chat-body-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    :global {
      .chatting-header {
        border-radius: 10px;
        margin-top: 5px;
        width: calc(100% - 10px);
        padding: 0 20px;
        background-color: $chat-header-color;
        display: flex;
        align-items: center;
        box-shadow: 0 5px 8px 0 rgba(#000, 0.5);
        .chatting-title {
          line-height: 60px;
          font-size: 18px;
        }
        .more-info {
          cursor: pointer;
          margin-left: auto;
          color: #eee;
          font-size: 22px;
        }
      }
    }
  }
</style>
