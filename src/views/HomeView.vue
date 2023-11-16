<template>
  <div :class="$style['home']">
    <!--背景-->
    <!--    <particle-bg />-->

    <!--聊天窗口-->
    <div class="home-container">
      <!--左侧头像信息分组一列-->
      <group-settings-column v-model="state.group" />

      <!--中间人员，公众号，群等列表列-->
      <list-column
        :group-info-list="groupInfoList"
        :chatting-id="state.chattingId"
        @change-chatting-id="id => (state.chattingId = id)"
      />

      <!--聊天框-->
      <chatting-column :message-info="messageInfo" :chatting-id="state.chattingId" :group="state.group" />

      <!--群聊或个人信息（可隐藏）-->
      <information-column />
    </div>
  </div>
</template>
<script setup lang="ts">
  import ParticleBg from '@/components/particle-bg/particle-bg.vue'
  import GroupSettingsColumn from '@/views/components/group-settings-column/index.vue'
  import ListColumn from '@/views/components/list-column/index.vue'
  import ChattingColumn from '@/views/components/chatting-column/index.vue'
  import InformationColumn from '@/views/components/information-column/index.vue'
  import { useUserStore } from '@/stores'
  import { computed, reactive } from 'vue'

  const user = useUserStore()
  const state = reactive({
    group: 0, //当前组，0聊天，1好友，2群聊

    chattingId: 1, //当前聊天的id
    userId: null //当前好友的id
  })

  //当前的分组的信息
  const groupInfoList = computed(() => {
    if (state.group === 0) {
      // 当前聊天的列表人员
      return user.userInfo.messageBox
    } else if (state.group === 1) {
      return []
    } else {
      return []
    }
  })

  //当前的消息列表和当前人的信息
  const messageInfo = computed(() => {
    if (state.group === 0) {
      return user.userInfo.messageBox?.find(item => item.id === state.chattingId)
    } else {
      return []
    }
  })
</script>
<style module lang="scss">
  .home {
    height: 100%;
    width: 100%;
    //background: url('../assets/img/login_bg.webp') no-repeat;
    background: linear-gradient(to bottom, #b48dfd, #637ecf);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: scroll;
    :global {
      .home-container {
        z-index: 999;
        box-shadow: -5px 5px 10px 3px rgba(#000, 0.5);
        height: 85vh;
        min-height: 500px;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
      }
    }
  }
</style>
