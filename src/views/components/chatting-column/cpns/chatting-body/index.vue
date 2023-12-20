<template>
  <div :class="$style['chatting-body']">
    <div class="message-item" v-for="item in messageList" :key="item.id">
      <!--头像-->
      <avatar-popover :avatar="item.avatar" :user-id="item.userId" :user-info="item" v-if="!item.self" />
      <!--内容-->
      <div class="message-container" :style="{ alignItems: item.self ? 'flex-end' : 'flex-start' }">
        <div class="user-info">
          <text v-if="item.self" class="send-time"> {{ item.time }}</text>
          <text class="user-name">{{ item.userName }}</text>
          <text>（{{ item.address || '未知' }}）</text>
          <text v-if="!item.self" class="send-time"> {{ item.time }}</text>
        </div>
        <div
          class="user-message"
          :style="{
            borderRadius: item.self ? '20px 0 20px 20px' : '0 20px 20px 20px',
            backgroundColor: item.self ? '#1d90f5' : 'var(--bg-3)',
            color: item.self ? '#fff' : 'var(--text-1)'
          }"
        >
          {{ item.message }}
        </div>
      </div>
      <!--头像-->
      <avatar-popover :avatar="item.avatar" :user-id="item.userId" :user-info="item" v-if="item.self" />
    </div>
  </div>
</template>
<script setup>
  import { defineProps } from 'vue'
  import AvatarPopover from './cpns/avatar-popover.vue'

  const props = defineProps({
    messageList: {
      type: Array,
      default: () => []
    }
  })
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
          .user-info {
            width: fit-content;
            user-select: none;
            font-size: 13px;
            margin-bottom: 10px;
            color: var(--text-2);
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
            //transition: all 0.3s;
          }
          .user-message:hover {
            background-color: rgba(var(--bg-1), 0.6);
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
