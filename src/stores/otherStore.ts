import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useOtherStore = defineStore('other', () => {
  const otherInfo = reactive({
    // 消息盒子
    chattingBodyDom: null,
    // 聊天输入框
    inputDom: null
  })

  return { otherInfo }
})
