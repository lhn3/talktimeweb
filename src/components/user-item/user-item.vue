<template>
  <div :class="$style['user-item']" :style="{ backgroundColor: checkId === id ? 'rgba(0,0,0,0.3)' : '' }">
    <el-avatar shape="circle" :size="50" fit="cover" :src="avatar" />
    <div class="user-info">
      <div class="user-name text-nowrap">{{ userName }}</div>
      <div class="user-msg text-nowrap" v-if="msg">{{ msg }}</div>
    </div>
    <div class="send-time" v-if="time">{{ time }}</div>
  </div>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps({
    // 选中的id
    checkId: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String,
      default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    userName: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  })
</script>

<style module lang="scss">
  .user-item {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px;
    margin: 5px;
    border-radius: 8px;
    background-color: rgba(225, 225, 225, 0.05);
    transition: all 0.3s;
    :global {
      .user-info {
        flex: 1;
        margin: 0 10px;
        .user-name {
          color: #fff;
          font-size: 15px;
          line-height: 30px;
        }
        .user-msg {
          color: #999;
          font-size: 13px;
        }
      }
      .send-time {
        color: #999;
        font-size: 13px;
      }
    }
  }
  .user-item:hover {
    background-color: rgba(225, 225, 225, 0.15);
  }
</style>
