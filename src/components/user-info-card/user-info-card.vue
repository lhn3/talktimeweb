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
        <div class="info-userName text-nowrap">{{ userInfo.userName }}</div>
        <div class="info-other text-nowrap">id：{{ userInfo.id }}</div>
        <div class="info-other text-nowrap">地区：{{ userInfo.address }}&ensp;{{ userInfo.city }}</div>
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
  import { defineProps } from 'vue'
  import SvgIcon from '@/components/svg-icon/svg-icon.vue'

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
          }
          .info-other {
            color: #999999;
            font-size: 12px;
            margin: 5px 0;
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
