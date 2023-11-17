import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { messageBox, friendList } from '@/stores/test'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    index: 0,
    id: null,
    username: '',
    permissions: [],
    token: '',
    // 是否展示更多数据列
    isShowMoreInfo: false,
    friendList: [] as any,
    messageBox: [] as any
  })
  const doubleCount = computed(() => userInfo.index + 1)

  userInfo.friendList = friendList
  userInfo.messageBox = messageBox

  /**展示隐藏更多列表*/
  const changeShowMore = () => (userInfo.isShowMoreInfo = !userInfo.isShowMoreInfo)

  /**添加數據*/
  const addMessage = (chattingId: number | undefined, value: any) => {
    userInfo.messageBox.forEach((item: any): void => {
      if (item.id === chattingId) {
        item.messageList.push(value)
      }
    })
  }

  return { userInfo, doubleCount, changeShowMore, addMessage }
})
