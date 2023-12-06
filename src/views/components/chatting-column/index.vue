<template>
  <div :class="$style['chatting-column']">
    <!--聊天盒子-->
    <div class="chatting-box" v-show="group === 0">
      <!--头部-->
      <div class="chatting-header" v-if="state.messageInfo.userName">
        <div class="chatting-title">{{ state.messageInfo.userName }}</div>
        <div class="more-info" @click="() => user.changeShowMore()">
          <el-icon><MoreFilled /></el-icon>
        </div>
      </div>
      <!--内容-->
      <chatting-body :message-list="state.messageInfo.messageList || []" ref="chattingBodyRef" />
      <!--底部-->
      <control-bar
        v-for="item in messageBox || []"
        v-show="chattingId === item.id"
        :key="item.id"
        :chatting-id="chattingId"
      />
    </div>

    <!--用户信息-->
    <div class="user-info" v-show="group === 1">
      <user-info-card
        v-if="state.userInfo.id"
        :user-info="state.userInfo"
        :send="true"
        :del="true"
        @refresh-user-info="refreshUserInfo"
      />
    </div>
  </div>
</template>
<script setup>
  import { onMounted, ref, defineProps, computed, watch, reactive } from 'vue'
  import { useUserStore, useOtherStore } from '@/stores'
  import { scrollToBottom } from '@/utils/utils'
  import ControlBar from '@/views/components/chatting-column/cpns/control-bar/index.vue'
  import ChattingBody from '@/views/components/chatting-column/cpns/chatting-body/index.vue'
  import UserInfoCard from '@/components/user-info-card/user-info-card.vue'
  import { messageBox, friendList } from '@/stores/test'

  const chattingBodyRef = ref()
  const user = useUserStore()
  const other = useOtherStore()
  const props = defineProps({
    // 好友列表选中的好友id
    userId: {
      type: Number,
      required: true
    },
    // 正在聊天的id
    chattingId: {
      type: Number,
      required: true
    },
    group: {
      type: Number,
      required: true
    }
  })

  const state = reactive({
    messageInfo: {},
    userInfo: {}
  })

  /**当前的消息列表，获取选中的正在聊天的信息和消息列表*/
  watch(
    () => props.chattingId,
    value => {
      if (!value) return
      //发送请求
      state.messageInfo = messageBox?.find(item => item.id === props.chattingId) || {}
    }
  )

  /**当前用户的信息，获取不同首字母下当前选中的用户信息*/
  watch(
    () => props.userId,
    value => {
      if (!value) return
      //发送请求
      let info = {}
      friendList?.find(item => {
        let r = item.list?.find(i => i.id === value)
        if (r) {
          info = r
          return true
        }
      })
      state.userInfo = info
    }
  )

  /**刷新用户信息*/
  const refreshUserInfo = value => {
    state.userInfo = value
  }

  onMounted(() => {
    //将dom记录到vuex
    other.otherInfo.chattingBodyDom = chattingBodyRef.value.$el
    // 滚动到最底部
    scrollToBottom()
  })
</script>

<style module lang="scss">
  .chatting-column {
    height: 100%;
    width: 50vw;
    min-width: 540px;
    color: #fff;
    //background-color: $chat-body-color;
    background: radial-gradient(circle at 60% 90%, rgba($primary-color, 1), transparent 60%),
      radial-gradient(circle at 20px 20px, rgba($primary-color, 0.8), transparent 25%), $chat-body-color;
    display: flex;
    align-items: center;
    justify-content: center;
    :global {
      .chatting-box {
        background-color: $chat-body-color;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
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
      .user-info {
        width: 400px;
      }
    }
  }
</style>
