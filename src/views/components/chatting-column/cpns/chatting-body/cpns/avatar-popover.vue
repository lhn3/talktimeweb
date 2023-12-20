<template>
  <el-popover popper-class="avatar-popover" placement="right" :show-arrow="false" trigger="click">
    <template #reference>
      <el-avatar
        @click="handelClick"
        shape="circle"
        style="cursor: pointer"
        :size="45"
        fit="cover"
        :src="avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
    </template>
    <user-info-card :loading="state.loading" :card-type="1" :user-info="state.userInfo" :send="true" :add="true" />
  </el-popover>
</template>
<script setup>
  import { defineProps, reactive } from 'vue'
  import UserInfoCard from '@/components/user-info-card/user-info-card.vue'

  const props = defineProps({
    avatar: {
      type: Object,
      default: () => ({})
    },
    userId: {
      type: Object,
      default: () => ({})
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  })

  const state = reactive({
    loading: false,
    userInfo: {}
  })

  /**点击头像获取用户信息*/
  const handelClick = () => {
    // 发送网络请求获取用户数据
    state.loading = true
    setTimeout(() => {
      state.userInfo = { ...props.userInfo }
      state.loading = false
    }, 1000)
  }
</script>

<style module lang="scss">
  :global(.avatar-popover) {
    width: 240px !important;
    padding: 0 !important;
    //background-color: rgba(0, 0, 0, 0.5) !important;
    background-color: var(--bg-3) !important;
    backdrop-filter: blur(8px) !important;
    border: none !important;
    border-radius: 15px !important;
    box-shadow: -5px 5px 10px 0px rgba(0, 0, 0, 0.5) !important;
  }
</style>
