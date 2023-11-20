<template>
  <div :class="$style['at-dialog']" v-show="modelValue" :style="{ top: `${top - 245}px`, left: `${left}px` }">111</div>
</template>
<script setup lang="ts">
  import { defineProps, defineEmits, watch } from 'vue'

  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    // 是否显示
    modelValue: {
      type: Boolean,
      default: false
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    }
  })

  /**监听window点击，并关闭弹窗*/
  watch(
    () => props.modelValue,
    v => {
      if (v) {
        window.onclick = () => emit('update:modelValue', false)
      } else {
        window.onclick = null
      }
    }
  )
</script>

<style module lang="scss">
  .at-dialog {
    position: fixed;
    background-color: white;
    border-radius: 6px;
    width: 180px;
    height: 240px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    :global {
    }
  }
</style>
