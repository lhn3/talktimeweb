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
    isShowMoreInfo: false,
    messageList: [
      {
        id: 1,
        self: false,
        avatar: 'https://picsum.photos/300/300?id=1',
        userName: '张三',
        address: '杭州',
        time: '11:24',
        message:
          'sdhgkjdejrnhoiewjnilofemwlo mmjfewliong ienrilog3475898347985437985432353252ewj g9034ut9043ut039 j t023948u90从前有一只小鸟，它渴望飞翔。然而，在它出生的时候，它的翅膀却发育不完整，无法飞行。小鸟非常伤心，但它并没有放弃。它每天观察其他鸟儿优雅地飞翔，努力学习。小鸟利用每一次跳跃都像是在飞翔一样的机会，锻炼自己的技巧和身体素质。日复一日的努力，小鸟终于能够短暂地在空中飞翔了。小鸟为自己的进步感到自豪，而这份自豪和坚持也引发了一个奇迹。小鸟的翅膀开始逐渐长出，并让它能够真正飞翔。这个故事告诉我们，无论遇到什么困难，只要坚持努力，就能够实现自己的梦想。'
      },
      {
        id: 2,
        self: false,
        avatar: 'https://picsum.photos/300/300?id=2',
        userName: '李四',
        address: '四川',
        time: '11:28',
        message: '啊对对对'
      },
      {
        id: 3,
        self: false,
        avatar: 'https://picsum.photos/300/300?id=1',
        userName: '张三',
        address: '杭州',
        time: '11:30',
        message: '信不信我抽你丫的'
      },
      {
        id: 4,
        self: false,
        avatar: 'https://picsum.photos/300/300?id=2',
        userName: '李四',
        address: '四川',
        time: '11:31',
        message: '来啊来啊'
      },
      {
        id: 5,
        self: false,
        avatar: 'https://picsum.photos/300/300?id=3',
        userName: '王五',
        address: null,
        time: '11:40',
        message: '好了好了，你们吵到我的眼睛了，都安静，听我讲个故事'
      },
      {
        id: 6,
        self: false,
        avatar: 'https://picsum.photos/300/300?id=3',
        userName: '王五',
        address: null,
        time: '11:45',
        message:
          '从前有一个小猫咪叫小花，在一个小村庄里生活。小花非常喜欢冒险，她常常四处探索，寻找新的伙伴和新鲜的事物。一天，她听说森林深处有一只传说中的金色鹿，它的角据说能带来好运。小花决定出发寻找金色鹿。她跳过小溪，穿过茂密的树林，终于来到了传说中的金色鹿的所在地。小花兴奋地看见了金色鹿，它的角真的闪闪发光！小花心满意足地返回了村庄，从此，她的生活充满了快乐和幸运。大家都被小花的故事所感动，纷纷鼓励着小花继续勇往直前。'
      },
      {
        id: 6,
        self: true,
        avatar: 'https://picsum.photos/300/300?id=4',
        userName: '西兰花',
        address: '杭州',
        time: '11:45',
        message: '666'
      },
      {
        id: 7,
        self: true,
        avatar: 'https://picsum.photos/300/300?id=4',
        userName: '西兰花',
        address: '杭州',
        time: '11:45',
        message: '讲的太好啦！'
      }
    ]
  })
  const doubleCount = computed(() => userInfo.index + 1)

  /**展示隐藏更多列表*/
  const changeShowMore = () => (userInfo.isShowMoreInfo = !userInfo.isShowMoreInfo)

  return { userInfo, doubleCount, changeShowMore }
})
