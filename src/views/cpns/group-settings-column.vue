<template>
  <div :class="$style['group-settings']">
    <!--头像-->
    <el-avatar
      style="margin: 20px 0; cursor: pointer"
      shape="square"
      :size="50"
      fit="cover"
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    />

    <!--消息，群组等-->
    <div class="groups">
      <div
        v-for="item in tabs"
        :key="item.id"
        :class="{ 'groups-item': true, 'groups-item-active': activeTab === item.id }"
        @click="tabClick(item.id)"
      >
        <svg-icon :name="item.icon" size="24px" />
      </div>
    </div>

    <!--退出-->
    <div class="exit">
      <svg-icon name="icon-tuichu" color="#6d5b85" size="22px" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SvgIcon from '@/components/svg-icon/svg-icon.vue'

  const activeTab = ref(1)
  const tabs = [
    { icon: 'icon-a-ziyuan720', id: 1 },
    { icon: 'icon-yonghudianji', id: 2 },
    { icon: 'icon-nav_client', id: 3 }
  ]

  /**点击不同分组*/
  const tabClick = (id: number) => (activeTab.value = id)
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
          width: calc(100% + 2px);
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
      }
    }
  }
</style>
