import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    id: null,
    avatar: '',
    username: '',
    permissions: [],
    token: '',

    // 是否展示更多数据列
    isShowMoreInfo: false,
    //当前组，0聊天，1好友，2群聊
    group: 0,
    //当前聊天的id
    chattingId: 1,
    //当前好友的id
    userId: 0
  })

  /**展示隐藏更多列表*/
  const changeShowMore = () => (userInfo.isShowMoreInfo = !userInfo.isShowMoreInfo)

  return { userInfo, changeShowMore }
})
