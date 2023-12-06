<template>
  <div
    :class="$style['user-info-card']"
    :style="{
      backgroundImage: popover ? 'unset' : '',
      backdropFilter: popover ? 'unset' : '',
      border: popover ? 'unset' : '',
      boxShadow: popover ? 'unset' : ''
    }"
  >
    <div class="card-info">
      <el-avatar shape="circle" :size="60" fit="cover" :src="userInfo.avatar || ''" />
      <div class="info">
        <div class="info-userName text-nowrap">
          {{ userInfo.remake ? userInfo.remake : userInfo.userName }}
          <svg-icon v-if="userInfo.sex === 0" name="icon-nv" color="#f56c6c" svg-style="margin-left: 5px" />
          <svg-icon v-if="userInfo.sex === 1" name="icon-nan" color="#42a3f6" svg-style="margin-left: 5px" />
        </div>
        <div class="info-other text-nowrap" v-if="userInfo.remake">昵称：{{ userInfo.userName }}</div>
        <!--        <div class="info-other text-nowrap">id：{{ _userInfo.id }}</div>-->
        <div class="info-other text-nowrap">地区：{{ userInfo.address }}&ensp;{{ userInfo.city }}</div>
      </div>
    </div>

    <div class="user-setting">
      <div class="setting-item">
        <text>备注</text>
        <el-input
          style="width: 40%"
          :maxlength="15"
          placeholder="点击添加备注"
          v-model="_userInfo.remake"
          @blur="handelChange(_userInfo.remake, 'remake')"
        />
      </div>
      <div class="setting-item">
        <text>消息免打扰</text>
        <el-switch
          :active-value="true"
          :inactive-value="false"
          v-model="_userInfo.isQuite"
          @change="v => handelChange(v, 'isQuite')"
        />
      </div>
      <div class="setting-item">
        <text>置顶聊天</text>
        <el-switch
          :active-value="true"
          :inactive-value="false"
          v-model="_userInfo.isTop"
          @change="v => handelChange(v, 'isTop')"
        />
      </div>
    </div>

    <div class="user-setting">
      <div v-if="userInfo.selfStyle" class="setting-item" style="justify-content: flex-start">
        <text>个性签名</text>
        <div>{{ userInfo.selfStyle }}</div>
      </div>
      <div class="setting-item" style="justify-content: flex-start">
        <text>来源</text>
        <div>{{ userInfo.from }}</div>
      </div>
    </div>

    <div class="user-control">
      <div v-if="send" class="ctr-item">
        <svg-icon name="icon-xiaoxi" size="36px" color="#42a3f6" />
        <text>发消息</text>
      </div>
      <div v-if="add" class="ctr-item">
        <svg-icon name="icon-tianjiahaoyou-" size="48px" color="#0ea27e" />
        <text>添加好友</text>
      </div>
      <div v-if="del" class="ctr-item">
        <svg-icon name="icon-a-shanchu" size="36px" color="#f56c6c" />
        <text>删除联系人</text>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue'

  const emit = defineEmits(['refreshInfo'])
  const props = defineProps({
    // 是否作为弹出展示
    popover: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    },
    // 按钮控制
    send: {
      type: Boolean,
      default: false
    },
    add: {
      type: Boolean,
      default: false
    },
    del: {
      type: Boolean,
      default: false
    }
  })

  const _userInfo = ref({})
  watch(
    () => props.userInfo,
    value => {
      if (!value) return
      _userInfo.value = { ...value }
    },
    {
      deep: true,
      immediate: true
    }
  )

  /**改变备注，置顶，免打扰*/
  const handelChange = (value: any, type: string) => {
    //发送请求请求改变数据
    console.log(value)
    // 重新请求数据
    emit('refreshUserInfo', { ..._userInfo.value, [type]: value })
  }
</script>

<style module lang="scss">
  .user-info-card {
    user-select: none;
    padding: 15px 10px;
    width: 100%;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    background-image: linear-gradient(to top right, rgba($primary-color3, 0.5), rgba($primary-color, 0.5));
    backdrop-filter: blur(6px);
    box-shadow: -10px 10px 10px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    :global {
      .card-info {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #999;
        .info {
          flex: 1;
          margin-left: 10px;
          .info-userName {
            line-height: 22px;
            font-size: 15px;
            margin-bottom: 10px;
            color: #fff;
            display: flex;
            align-items: center;
          }
          .info-other {
            color: #999999;
            font-size: 12px;
            margin: 5px 0;
          }
        }
      }
      .user-setting {
        border-bottom: 1px solid #999;
        padding: 10px 0;
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 35px;
          font-size: 14px;
          text {
            color: #aaa;
            min-width: 100px;
          }
          div {
            word-wrap: break-word;
            word-break: break-all;
          }
          .el-input__wrapper {
            background-color: transparent;
            box-shadow: none;
            .el-input__inner {
              color: #fff;
              text-align: right;
            }
          }
          .el-input__wrapper.is-focus {
            box-shadow: 0 0 0 1px #42a3f6 inset;
          }
          .el-input__wrapper:focus-visible {
            outline: none;
          }
          //switch样式修改
          .el-switch__core {
            background: transparent;
          }
          .el-switch.is-checked .el-switch__core {
            background-color: #42a3f6;
          }
        }
      }
      .user-control {
        padding-top: 10px;
        display: flex;
        justify-content: center;
        font-size: 14px;
        .ctr-item {
          width: 75px;
          height: 75px;
          transition: all 0.3s;
          border-radius: 6px;
          cursor: pointer;
          margin: 0 20px;
          padding-top: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text {
            color: #fff;
            line-height: 28px;
          }
        }
        .ctr-item:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
</style>
