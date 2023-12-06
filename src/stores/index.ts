import localCache from '@/utils/cache'
export { useUserStore } from './userStore'
export { useOtherStore } from './otherStore'

/**
 * 数据持久化
 */
export const keepStore = userStore => {
  const userInfo = localCache.getCache('talkTime-userInfo')
  if (!userInfo) return
  userStore.userInfo.id = userInfo.id
  userStore.userInfo.avatar = userInfo.avatar
  userStore.userInfo.username = userInfo.username
  userStore.userInfo.permissions = userInfo.permissions
  userStore.userInfo.token = userInfo.token

  // userStore.userInfo.isShowMoreInfo = userInfo.isShowMoreInfo
  // userStore.userInfo.group = userInfo.group
  // userStore.userInfo.chattingId = userInfo.chattingId
  // userStore.userInfo.userId = userInfo.userId
}
