<template>
  <div :class="$style['home']">
    <!--背景开关-->
    <self-switch class="self-switch" v-model="state.theme" :openIcon="true" :closeIcon="true">
      <template #openIcon>
        <img :src="sun" :width="26" :height="26" />
      </template>
      <template #closeIcon>
        <img :src="moon" :width="26" :height="26" />
      </template>
    </self-switch>

    <!--背景-->
    <transition name="xxx" type="transition" :duration="1000" mode="in-out" appear>
      <bridge-bg v-if="state.theme" />
      <star-bg v-else />
    </transition>

    <!--聊天窗口-->
    <div :class="{ 'home-container': true, 'un-login-mask': !getToken() }">
      <!--左侧头像信息分组一列-->
      <group-settings-column v-model="state.group" />

      <!--中间人员，公众号，群等列表列-->
      <list-column
        :group="state.group"
        :user-id="state.userId"
        :chatting-id="state.chattingId"
        :group-info-list="groupInfoList"
        @change-chatting-id="id => (state.chattingId = id)"
        @change-user-id="id => (state.userId = id)"
      />

      <!--聊天框-->
      <chatting-column :chatting-id="state.chattingId" :user-id="state.userId" :group="state.group" />

      <!--群聊或个人信息（可隐藏）-->
      <information-column :chatting-id="state.chattingId" />

      <div class="un-login-tip" v-if="!getToken()">
        <no-pass />
      </div>
    </div>
  </div>
</template>
<script setup>
  import BridgeBg from '@/components/bridge-bg/index.vue'
  import StarBg from '@/components/star-bg/star-bg.vue'
  import SelfSwitch from '@/components/self-switch/self-switch.vue'
  import GroupSettingsColumn from '@/views/components/group-settings-column/index.vue'
  import ListColumn from '@/views/components/list-column/index.vue'
  import ChattingColumn from '@/views/components/chatting-column/index.vue'
  import InformationColumn from '@/views/components/information-column/index.vue'
  import NoPass from '@/components/no-pass/no-pass.vue'
  import sun from '@/assets/img/sun.png'
  import moon from '@/assets/img/moon.png'
  import { useUserStore, useOtherStore } from '@/stores'
  import { computed, onMounted, reactive, getCurrentInstance, watch } from 'vue'
  import { getToken } from '@/utils/utils'
  import { messageBox, friendList } from '@/stores/test'

  const user = useUserStore()
  const other = useOtherStore()
  const { proxy } = getCurrentInstance()
  const state = reactive({
    theme: false, //false晚上，true白天
    group: 0, //当前组，0聊天，1好友，2群聊

    chattingId: 0, //当前聊天的id
    userId: 0, //当前好友的id

    friendList: [],
    messageBox: []
  })
  /**获取所有正在聊天的人和好友列表*/
  onMounted(() => {
    if (getToken()) {
      state.friendList = friendList
      state.messageBox = messageBox
    } else {
      state.friendList = []
      state.messageBox = []
    }
  })

  /**当前的分组的信息*/
  const groupInfoList = computed(() => {
    if (state.group === 0) {
      // 当前聊天的列表人员
      return state.messageBox
    } else if (state.group === 1) {
      // 好友列表人员
      return state.friendList
    } else {
      return []
    }
  })

  watch(
    () => state.theme,
    value => {
      document.documentElement.dataset.them = value ? 'light' : 'dark'
    },
    {
      immediate: true
    }
  )
</script>
<style module lang="scss">
  .home {
    height: 100%;
    width: 100%;
    //background: url('../assets/img/login_bg.webp') no-repeat;
    //background: radial-gradient(circle at 60% 90%, rgba(#b48dfd, 1), transparent 60%),
    //  radial-gradient(circle at 20px 20px, rgba(#b48dfd, 0.8), transparent 25%), #637ecf;
    background: #375172;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    :global {
      .xxx-enter-from,
      .xxx-leave-to {
        opacity: 0;
      }
      .xxx-enter-to,
      .xxx-leave-from {
        opacity: 1;
      }
      .xxx-enter-active,
      .xxx-leave-active {
        transition: opacity 1s ease;
      }

      .self-switch {
        position: absolute;
        z-index: 1;
        right: 15px;
        bottom: 15px;
      }
      .home-container {
        opacity: 0.97;
        z-index: 999;
        box-shadow: -5px 5px 10px 3px rgba(#000, 0.5);
        height: 85vh;
        min-height: 500px;
        border-radius: 16px;
        display: flex;
        overflow: hidden;
      }
      .un-login-mask {
        position: relative;
        opacity: 1;
        .un-login-tip {
          position: absolute;
          height: 100%;
          width: calc(100% - 70px);
          right: 0;
          top: 0;
          background-color: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          user-select: none;
        }
      }
    }
  }
</style>
