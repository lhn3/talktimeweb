<!--横向滚动组件-->
<template>
  <div :class="$style['horizontal-scrolling']" ref="horizontalScrollingRef" :style="{ height }">
    <div
      class="scroll-container"
      :style="{
        width: height,
        height: `${horizontalScrollingRef?.clientWidth || 0}px`,
        transform: `translateY(${height}) rotate(-90deg)`
      }"
    >
      <div class="content" :style="{ height }">
        <!--插槽内容-->
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, ref } from 'vue'

  const horizontalScrollingRef = ref()
  const props = defineProps({
    height: {
      type: String,
      default: '200px'
    }
  })
</script>

<style module lang="scss">
  .horizontal-scrolling {
    width: 100%;
    //height: 200px;
    :global {
      .scroll-container {
        /*width: 父元素的高度;*/
        /*height: 父元素的宽度;*/
        //width: 200px;
        //height: 400px;
        position: relative;
        overflow: auto;
        transform-origin: 0 0;
        /*位移Y一个高度的距离*/
        //transform: translateY(200px) rotate(-90deg);
        .content {
          /*高度等于scroll-container的高度*/
          //height: 200px;
          position: absolute;
          left: 100%;
          transform-origin: 0 0;
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
