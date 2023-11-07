<template>
  <el-popover
    popper-style="
      width: 400px;
      height: 280px;
      padding: 10px 0 0 0;
      background-color:#35244e;
      border:none;
      box-shadow: 0 0 10px 3px #35244e;"
    placement="top"
    :show-arrow="false"
    trigger="click"
  >
    <template #reference>
      <div class="icon-style">
        <svg-icon name="icon-biaoqing2" size="22px" />
      </div>
    </template>
    <div :class="$style['emoji-box']">
      <!--表情-->
      <div v-if="activeType === 1" class="emoji-list" style="height: calc(100% - 45px)">
        <div class="emoji" @click="selectItem(item)" v-for="item in emojis" :key="item">{{ item }}</div>
      </div>

      <!--上传的表情-->
      <div v-if="activeType === 2" class="emoji-list"></div>

      <!--选择不同的表情-->
      <div class="emoji-type">
        <div
          @click="activeType = item.id"
          :class="{ 'type-item': true, 'type-active': item.id === activeType }"
          v-for="item in typeList"
          :key="item.icon"
        >
          <svg-icon :name="item.icon" :size="item.size" />
        </div>
      </div>
    </div>
  </el-popover>
</template>
<script setup lang="ts">
  import { emojis } from '@/assets/icons/emojis.ts'
  import { defineEmits, ref } from 'vue'

  const emit = defineEmits(['selectEmoji'])
  const activeType = ref(1)
  const typeList = [
    { id: 1, icon: 'icon-biaoqing', size: '20px' },
    { id: 2, icon: 'icon-aixin', size: '20px' }
  ]
  const selectItem = (value: string) => emit('selectEmoji', value)
</script>

<style module lang="scss">
  .emoji-box {
    height: 100%;
    width: 100%;
    position: relative;
    :global {
      .emoji-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 0 10px;
        .emoji {
          user-select: none;
          width: calc(100% / 13);
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border-radius: 5px;
          cursor: pointer;
        }
        .emoji:hover {
          background-color: $primary-color3;
        }
      }
      .emoji-type {
        position: absolute;
        bottom: 0;
        height: 40px;
        width: 100%;
        border-top: 1px solid $primary-color3;
        display: flex;
        padding: 5px 10px;
        .type-item {
          cursor: pointer;
          height: 100%;
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          margin-right: 10px;
          transition: all 0.3s;
        }
        .type-active {
          background-color: $primary-color3;
        }
      }
    }
  }
</style>
