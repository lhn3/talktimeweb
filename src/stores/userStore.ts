import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    id: null,
    token: '',
    permissions: [],
    avatar: '',
    username: '',
    selfStyle: '',
    sex: 0,

    // 是否展示更多数据列
    isShowMoreInfo: false
  })

  /**展示隐藏更多列表*/
  const changeShowMore = () => (userInfo.isShowMoreInfo = !userInfo.isShowMoreInfo)

  return { userInfo, changeShowMore }
})
