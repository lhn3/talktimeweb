<template>
  <div :class="$style['chatting-body']">
    <div class="message-item" v-for="item in messageList" :key="item.id">
      <!--头像-->
      <el-avatar
        v-if="!item.self"
        shape="circle"
        style="cursor: pointer"
        :size="45"
        fit="cover"
        :src="item.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <!--内容-->
      <div class="message-container" :style="{ alignItems: !item.self || 'flex-end' }">
        <div class="user-info">
          <text v-if="item.self" class="send-time"> {{ item.time }}</text>
          <text class="user-name">{{ item.userName }}</text>
          <text>（{{ item.address || '未知' }}）</text>
          <text v-if="!item.self" class="send-time"> {{ item.time }}</text>
        </div>
        <div
          class="user-message"
          :style="{
            borderRadius: !item.self || '20px 0 20px 20px',
            backgroundColor: !item.self || '#1d90f5'
          }"
        >
          {{ item.message }}
        </div>
      </div>
      <!--头像-->
      <el-avatar
        v-if="item.self"
        shape="circle"
        style="cursor: pointer"
        :size="45"
        fit="cover"
        :src="item.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import { useUserStore } from '@/stores'

  const state = reactive({
    dataList: []
  })
  const userStore = useUserStore()
  const messageList = computed(() => userStore.userInfo.messageList)
</script>
<style module lang="scss">
  .chatting-body {
    width: 100%;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 20px;
    :global {
      .message-item {
        display: flex;
        margin: 20px 0;
        justify-content: flex-end;
        .message-container {
          flex: 1;
          margin: 0 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .user-info {
            user-select: none;
            font-size: 13px;
            margin-bottom: 10px;
            color: #999999;
            .user-name {
              transition: all 0.3s;
              cursor: pointer;
            }
            .user-name:hover {
              color: $url-color;
            }
            .send-time {
              margin-right: 10px;
              transition: all 1s;
              opacity: 0;
            }
          }
          .user-message {
            width: fit-content;
            max-width: 93%;
            word-wrap: break-word;
            word-break: break-all;
            padding: 10px;
            font-size: 15px;
            line-height: 20px;
            transition: all 0.3s;
            border-radius: 0 20px 20px 20px;
            background-color: rgba($primary-color, 0.3);
          }
          .user-message:hover {
            background-color: rgba($primary-color, 0.6);
          }
        }
      }
      .message-item:hover {
        .send-time {
          opacity: 1 !important;
        }
      }
    }
  }
</style>
