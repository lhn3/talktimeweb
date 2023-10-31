import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    index: 0,
    id: null,
    username: '',
    permissions: [],
    token: '',
    // 是否展示更多数据列
    isShowMoreInfo: false
  })
  const doubleCount = computed(() => userInfo.index + 1)

  const changeShowMore = () => (userInfo.isShowMoreInfo = !userInfo.isShowMoreInfo)

  return { userInfo, doubleCount, changeShowMore }
})
