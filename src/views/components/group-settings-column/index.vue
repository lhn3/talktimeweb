<template>
  <div :class="$style['group-settings']">
    <!--头像-->
    <el-avatar
      style="margin: 20px 0; cursor: pointer"
      shape="square"
      :size="50"
      fit="cover"
      :src="getToken() ? user.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      @click="avatarClick"
    />

    <!--消息，群组等-->
    <div class="groups" v-if="getToken()">
      <div
        v-for="item in tabs"
        :key="item.id"
        :class="{ 'groups-item': true, 'groups-item-active': modelValue === item.id }"
        @click="tabClick(item.id)"
      >
        <svg-icon :name="item.icon" size="24px" />
      </div>
    </div>

    <!--退出-->
    <div class="exit">
      <svg-icon
        v-if="getToken()"
        @click="setting"
        name="icon-shezhixitongshezhigongnengshezhishuxing"
        color="#6d5b85"
        size="24px"
        svg-style="margin-bottom: 15px"
      />
      <svg-icon v-if="getToken()" @click="exit" name="icon-tuichu" color="#6d5b85" size="22px" />
      <svg-icon v-if="!getToken()" name="icon-erweima" @click="loginDialogVisible = true" color="#6d5b85" size="22px" />
    </div>

    <login-dialog v-model="loginDialogVisible" />
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import SvgIcon from '@/components/svg-icon/svg-icon.vue'
  import { getToken } from '@/utils/utils'
  import LoginDialog from '@/components/login-dialog/login-dialog.vue'
  import { ElMessageBox } from 'element-plus'
  import localCache from '@/utils/cache'
  import { useUserStore } from '@/stores'

  const user = useUserStore()
  const loginDialogVisible = ref(false) //登录弹窗
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0
    }
  })
  const tabs = [
    { icon: 'icon-a-ziyuan720', id: 0 },
    { icon: 'icon-yonghudianji', id: 1 },
    { icon: 'icon-nav_client', id: 2 }
  ]

  /**头像点击*/
  const avatarClick = () => {
    if (getToken()) {
      return
    } else {
      loginDialogVisible.value = true
    }
  }

  /**退出/登录*/
  const exit = () => {
    ElMessageBox.confirm('确认退出登录?', '', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        localCache.delCache('talkTime-userInfo')
        user.userInfo.token = ''
        window.location.reload()
      })
      .catch(() => {})
  }

  /**打开个人设置*/
  const setting = () => {}

  /**点击不同分组*/
  const tabClick = id => {
    user.userInfo.isShowMoreInfo = false
    emit('update:modelValue', id)
  }
</script>

<style module lang="scss">
  .group-settings {
    height: 100%;
    width: 70px;
    background-color: $primary-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid $primary-color3;
    :global {
      /*样式尺寸*/
      #bg {
        width: 100%;
        height: 100%;
      }
      .groups {
        width: 100%;
        .groups-item {
          width: calc(100% + 1px);
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-left: 5px solid transparent;
          color: $primary-color3;
          cursor: pointer;
          box-sizing: border-box;
          transition: all 0.3s;
          svg {
            margin-left: -5px;
          }
        }
        .groups-item-active {
          border-color: $primary-color3;
          background-color: $primary-color2;
          color: #fff;
        }
      }
      .exit {
        margin: auto 0 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
</style>
