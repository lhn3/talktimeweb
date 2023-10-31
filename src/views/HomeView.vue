<template>
  <div :class="$style['home']">
    <!--背景-->
    <particle-bg />
    <div class="home-container">
      <!--左侧头像信息分组一列-->
      <group-settings-column />

      <!--中间人员，公众号，群等列表列-->
      <list-column />

      <!--聊天框-->
      <chatting-column />

      <!--群聊或个人信息（可隐藏）-->
      <information-column />
    </div>
  </div>
</template>
<script setup lang="ts">
  import ParticleBg from '@/components/particle-bg/particle-bg.vue'
  import GroupSettingsColumn from '@/views/cpns/group-settings-column.vue'
  import ListColumn from '@/views/cpns/list-column.vue'
  import ChattingColumn from '@/views/cpns/chatting-column.vue'
  import InformationColumn from '@/views/cpns/information-column.vue'
</script>
<style module lang="scss">
  .home {
    height: 100%;
    width: 100%;
    //background: url('../assets/img/login_bg.webp') no-repeat;
    background: linear-gradient(to bottom, #b48dfd, #637ecf);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: scroll;
    :global {
      .home-container {
        z-index: 999;
        box-shadow: -5px 5px 10px 3px rgba(#000, 0.5);
        height: 85vh;
        min-height: 500px;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
      }
    }
  }
</style>
