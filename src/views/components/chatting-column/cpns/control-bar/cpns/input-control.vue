<template>
  <div
    ref="inputControlRef"
    autofocus
    :class="$style['input-control']"
    contenteditable="true"
    v-text="modelValue"
    placeholder="来聊点什么吧~"
    @input="inputChange"
    @keyup.enter="submit"
  ></div>
</template>

<script setup>
  import { ref, defineProps, defineEmits, onMounted } from 'vue'
  import { moveCursor } from '@/utils/utils'
  import { useOtherStore } from '@/stores'

  const other = useOtherStore()
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    currentValue: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits(['update:modelValue', 'update:currentValue', 'submit'])
  const inputControlRef = ref()

  onMounted(() => {
    //将dom记录到vuex
    other.otherInfo.inputDom = inputControlRef.value
    moveCursor()
  })

  /**输入内容改变*/
  const inputChange = e => {
    emit('update:currentValue', e.data)
    emit('update:modelValue', e.target.innerText)
  }

  /**enter发送*/
  const submit = () => {
    emit('submit')
  }
</script>

<style module lang="scss">
  .input-control {
    box-sizing: border-box;
    max-height: 100px;
    cursor: pointer;
    flex: 1;
    //min-height: 32px;
    margin: 0 5px;
    line-height: 20px;
    padding: 4px 0 4px 8px;
    border: 2px solid transparent;
    transition: border 0.5s;
    border-radius: 5px;
    font-size: 14px;
    //输满才换行
    word-wrap: break-word;
    word-break: break-all;
    overflow-y: scroll;
    overflow-x: hidden;
    :global {
      .at-btn {
        background-color: transparent;
        border: none;
        color: $url-color;
        line-height: 20px;
        padding: 0;
        margin: 0;
      }
    }
  }
  .input-control:focus-visible {
    outline: none;
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
