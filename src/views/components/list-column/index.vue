<template>
  <div :class="$style['list-column']">
    <div class="list-search">
      <el-input v-model="searchValue" placeholder="搜索" :prefix-icon="Search" clearable />
      <el-icon size="30"><CirclePlusFilled /></el-icon>
    </div>
    <!--当前聊天-->
    <div class="list-box" v-show="group === 0">
      <user-item
        v-for="item in groupInfoList"
        :key="item.id"
        :id="item.id"
        :check-id="chattingId"
        :avatar="item.avatar"
        :user-name="item.userName"
        :msg="item.lastMessage"
        :time="item.lastMessageTime"
        @click="chattingIdClick(item.id)"
      />
    </div>
    <!--好友列表-->
    <div class="list-box" v-show="group === 1">
      <template v-for="itemGroup in groupInfoList" :key="itemGroup.initial">
        <div class="group-initial">{{ itemGroup.initial }}</div>
        <user-item
          v-for="item in itemGroup.list"
          :key="item.id"
          :id="item.id"
          :check-id="userId"
          :avatar="item.avatar"
          :user-name="item.userName"
          @click="userIdClick(item.id)"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, defineProps, defineEmits, nextTick } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import UserItem from '@/components/user-item/user-item.vue'
  import { scrollToBottom } from '@/utils/utils'
  import { useUserStore } from '@/stores'

  const user = useUserStore()
  const emit = defineEmits(['changeChattingId', 'changeUserId'])
  const props = defineProps({
    // 分组
    group: {
      type: Number,
      default: 0
    },
    // 列表信息
    groupInfoList: {
      type: Array,
      default: () => []
    },
    // 正在聊天的人id
    chattingId: {
      type: Number,
      required: true
    },
    // 当前选中的好友用户id
    userId: {
      type: Number,
      required: true
    }
  })

  /**选择某个人聊天*/
  const chattingIdClick = (id: number) => {
    user.userInfo.isShowMoreInfo = false
    emit('changeChattingId', id)
    // 滚动到最底部
    nextTick(() => scrollToBottom())
  }

  /**选择某个用户*/
  const userIdClick = (id: number) => {
    user.userInfo.isShowMoreInfo = false
    emit('changeUserId', id)
  }

  const searchValue = ref<any>()
</script>
<style module lang="scss">
  .list-column {
    height: 100%;
    width: 20vw;
    min-width: 240px;
    background-color: $primary-color2;
    :global {
      .list-search {
        width: 100%;
        height: 65px;
        border-bottom: 1px solid $primary-color;
        display: flex;
        align-items: center;
        padding: 0 20px;
        .el-input__wrapper {
          margin-right: 10px;
          border-radius: 16px;
          box-shadow: none;
          background-color: $primary-color;
          .el-input__inner {
            color: $primary-color3;
            --el-input-placeholder-color: $primary-color3;
          }
          .el-icon {
            color: $primary-color3;
          }
        }
        .el-icon {
          cursor: pointer;
          color: $primary-color;
        }
      }
      .list-box {
        width: 100%;
        height: calc(100% - 65px);
        overflow-y: scroll;
        overflow-x: hidden;
        .group-initial {
          color: #999;
          font-size: 14px;
          padding-left: 10px;
          line-height: 28px;
          background-color: $primary-color2;
          position: sticky;
          top: 0;
        }
      }
    }
  }
</style>
