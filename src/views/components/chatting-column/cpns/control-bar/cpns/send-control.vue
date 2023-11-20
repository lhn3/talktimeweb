<template>
  <div class="line"></div>

  <div
    @click="emit('submit')"
    class="icon-style"
    :style="{ backgroundColor: inputValue.trim() ? '#6d5b85' : 'transparent', width: '32px' }"
  >
    <svg-icon
      name="icon-zhifeiji"
      size="25px"
      :svg-style="`
          transform: rotate(${inputValue.trim() ? 45 : 0}deg);
          transition: all 0.3s;
          cursor: ${inputValue.trim() ? 'pointer' : 'unset'}
        `"
    />
  </div>
</template>
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'

  const emit = defineEmits(['submit'])
  const props = defineProps({
    inputValue: {
      type: String,
      default: ''
    }
  })
</script>
<style scoped lang="scss">
  .line {
    height: 16px;
    width: 1px;
    background-color: $chat-body-color;
    margin: 0 5px;
  }
</style>
