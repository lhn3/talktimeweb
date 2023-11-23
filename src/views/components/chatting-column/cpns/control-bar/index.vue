<template>
  <div :class="$style['control-bar']">
    <!--语音键盘输入-->
    <div class="icon-style" @click="changeInputType">
      <svg-icon :name="state.inputType ? 'icon-jianpan1' : 'icon-yuyin'" size="22px" />
    </div>

    <!--输入框-->
    <el-tooltip
      v-if="state.inputType"
      :visible="state.tip"
      effect="light"
      content="不能发送空白信息"
      placement="right-end"
    >
      <input-control v-model="state.inputValue" @submit="send" v-model:currentValue="state.currentValue" />
    </el-tooltip>
    <!--语音框-->
    <speak-control v-else />

    <!--表情包-->
    <emoji-control @selectEmoji="value => (state.inputValue += value)" />

    <!--图片-->
    <div class="icon-style">
      <svg-icon name="icon-tupian" size="22px" />
    </div>

    <!--文件-->
    <div class="icon-style">
      <svg-icon name="icon-wenjianguanli" size="22px" />
    </div>

    <!--发送-->
    <send-control :input-value="state.inputValue" @submit="send" />

    <!--人员选择弹窗-->
    <at-dialog
      v-model="state.chooseUserVisible"
      :left="state.left"
      :top="state.top"
      :user-list="state.userFilterList"
      :at-all="state.canAtAll"
      @select-user="selectUser"
    />
  </div>
</template>
<script setup>
  import { nextTick, reactive, defineProps, watch } from 'vue'
  import InputControl from '@/views/components/chatting-column/cpns/control-bar/cpns/input-control.vue'
  import SpeakControl from '@/views/components/chatting-column/cpns/control-bar/cpns/speak-control.vue'
  import EmojiControl from '@/views/components/chatting-column/cpns/control-bar/cpns/emoji-control.vue'
  import SendControl from '@/views/components/chatting-column/cpns/control-bar/cpns/send-control.vue'
  import { useUserStore } from '@/stores'
  import { scrollToBottom, getCursorCoordinates, moveCursor } from '@/utils/utils'
  import AtDialog from '@/views/components/chatting-column/cpns/control-bar/cpns/at-dialog.vue'

  const user = useUserStore()
  const props = defineProps({
    chattingId: {
      type: Number,
      require: true
    }
  })
  const state = reactive({
    // 输入框为空时的判断
    tip: false,
    timer: null,

    // 选择人员弹窗
    chooseUserVisible: false,
    canAtAll: true, //能否艾特全体成员
    sliceStr: '', //需要被替换掉的字符串
    sliceOffset: 0, //切割字符串才用到的光标的最后一次位置
    userList: [], //选择人员总列表
    userFilterList: [], //选择人员过滤的列表
    left: 0, //选择人员弹窗的位置
    top: 0,

    //1键盘输入，2语音输入
    inputType: 1,
    currentValue: null, //当前输入的值
    inputValue: '' //输入的所有值
  })

  /**改变输入状态*/
  const changeInputType = () => {
    if (state.inputType) {
      state.inputType = 0
    } else {
      state.inputType = 1
    }
  }

  state.userList = [
    { avatar: 'https://picsum.photos/300/300?id=1', userName: '张三', id: 1 },
    { avatar: 'https://picsum.photos/300/300?id=2', userName: '李四', id: 2 },
    { avatar: 'https://picsum.photos/300/300?id=3', userName: '王五', id: 3 },
    { avatar: 'https://picsum.photos/300/300?id=4', userName: 'hsdik', id: 4 },
    { avatar: 'https://picsum.photos/300/300?id=5', userName: 'Lin', id: 5 },
    { avatar: 'https://picsum.photos/300/300?id=6', userName: 'xixi', id: 6 },
    { avatar: 'https://picsum.photos/300/300?id=7', userName: '东方', id: 7 },
    { avatar: 'https://picsum.photos/300/300?id=8', userName: '富贵', id: 8 },
    { avatar: 'https://picsum.photos/300/300?id=9', userName: '山花不懂茶', id: 9 }
  ]

  /**
   * 获取当前位置到前一个@的所有字符
   * 并过滤人员数组
   */
  const getBeforeAtStr = () => {
    let strArr = []
    let offset = getCursorCoordinates().offset
    while (offset > 0 && state.inputValue[offset - 1] !== '@') {
      strArr.unshift(state.inputValue[offset - 1])
      offset--
    }
    let str = strArr.join('')
    // 记录需要被过滤的值
    state.sliceStr = '@' + str
    // 过滤数组
    state.userFilterList = state.userList.filter(item => item.userName.includes(str))
  }

  /**监听内容变化，出现@则弹出人员选择div*/
  watch(
    () => state.inputValue,
    (_, oldValue) => {
      if (!state.currentValue && state.chooseUserVisible) {
        /**删除@字符的时候*/
        let offset = getCursorCoordinates().offset
        if (oldValue[offset] === '@') {
          state.chooseUserVisible = false
        } else {
          getBeforeAtStr() //过滤当前人员列表
        }
      } else if (state.currentValue === '@') {
        //记录光标最后一次位置
        state.sliceOffset = getCursorCoordinates().offset
        /**下一个字符输入的是@*/
        let { left, top } = getCursorCoordinates()
        state.left = left
        state.top = top
        state.chooseUserVisible = true
        getBeforeAtStr() //过滤当前人员列表
      } else if (state.chooseUserVisible) {
        //记录光标最后一次位置
        state.sliceOffset = getCursorCoordinates().offset
        /**艾特人员的弹窗展示的时候*/
        getBeforeAtStr() //过滤当前人员列表
      }
    }
  )

  /**是否展示tip*/
  const showTip = () => {
    // 先清空前后空格和定时器
    state.inputValue = state.inputValue.trim()
    if (state.timer) clearTimeout(state.timer)
    return new Promise(resolve => {
      if (!state.inputValue) {
        state.tip = true
        state.timer = setTimeout(() => {
          state.tip = false
        }, 2000)
        resolve(false)
      } else {
        state.timer = null
        state.tip = false
        resolve(true)
      }
    })
  }

  /**选择了某个人*/
  const selectUser = value => {
    moveCursor()
    // 创建@元素
    let dom = `<button class="at-btn" contenteditable="false" data-info="${JSON.stringify(value)}">@${
      value.userName
    }</button>`
    // 清空此部分内容并加入@
    state.inputValue =
      state.inputValue.slice(0, state.sliceOffset - state.sliceStr.length) +
      dom +
      state.inputValue.slice(state.sliceOffset, state.inputValue.length - 1)
  }

  /**发送信息*/
  const send = async () => {
    let result = await showTip()
    if (!result) return
    // 发送并清空输入框内容
    user.addMessage(props.chattingId, {
      id: 8,
      self: true,
      avatar: 'https://picsum.photos/300/300?id=4',
      userName: '西兰花',
      address: '浙江',
      city: '杭州',
      time: '11:48',
      message: state.inputValue
    })
    state.inputValue = ''
    nextTick(() => {
      // 滚动到最底部
      scrollToBottom()
      // 获取焦点
      moveCursor()
    })
  }
</script>
<style module lang="scss">
  .control-bar {
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    background-color: $chat-input-color;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 5px;
    box-shadow: 0 -5px 8px 0 rgba(#000, 0.3);
    position: relative;
    :global {
      //子组件继承此样式
      .icon-style {
        height: 28px;
        min-width: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        transition: all 0.3s;
        border-radius: 5px;
      }
      .icon-style:hover {
        background-color: $primary-color3;
      }
    }
  }
</style>
