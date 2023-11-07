<template>
  <div
    :class="$style['input-control']"
    contenteditable="true"
    v-text="modelValue"
    placeholder="来聊点什么吧~"
    @input="inputChange"
    @keyup.enter="submit"
  ></div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits(['update:modelValue', 'submit'])

  /**输入内容改变*/
  const inputChange = (e: any) => {
    emit('update:modelValue', e.target.innerText)
  }

  /**enter发送*/
  const submit = () => emit('submit')
</script>

<style module lang="scss">
  .input-control {
    box-sizing: border-box;
    max-height: 100px;
    cursor: pointer;
    flex: 1;
    min-height: 32px;
    margin: 0 5px;
    padding: 8px 0 8px 8px;
    border: 2px solid transparent;
    transition: border 0.5s;
    border-radius: 5px;
    font-size: 14px;
    //输满才换行
    word-wrap: break-word;
    word-break: break-all;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .input-control:focus-visible {
    outline: unset;
    border-color: $chat-body-color;
  }
  .input-control:empty:before {
    content: attr(placeholder);
    color: #bbb;
  }
  .input-control:focus:before {
    content: none;
  }
</style>
