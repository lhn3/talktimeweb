import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    index: 0,
    id: null,
    username: '',
    permissions: [],
    token: ''
  })
  const doubleCount = computed(() => userInfo.index + 1)
  function increment() {
    userInfo.index++
  }

  return { userInfo, doubleCount, increment }
})
