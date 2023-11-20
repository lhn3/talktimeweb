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
    <at-dialog v-model="state.chooseUserVisible" :left="state.left" :top="state.top" />
  </div>
</template>
<script setup>
  import { nextTick, reactive, defineProps, watch } from 'vue'
  import InputControl from '@/views/components/chatting-column/cpns/control-bar/cpns/input-control.vue'
  import SpeakControl from '@/views/components/chatting-column/cpns/control-bar/cpns/speak-control.vue'
  import EmojiControl from '@/views/components/chatting-column/cpns/control-bar/cpns/emoji-control.vue'
  import SendControl from '@/views/components/chatting-column/cpns/control-bar/cpns/send-control.vue'
  import { useUserStore, useOtherStore } from '@/stores'
  import { scrollTo, getCursorCoordinates } from '@/utils/utils'
  import AtDialog from '@/views/components/chatting-column/cpns/control-bar/cpns/at-dialog.vue'

  const user = useUserStore()
  const other = useOtherStore()
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

  /**
   * 获取当前位置到前一个@的所有字符
   * 并过滤人员数组
   */
  const getBeforeAtStr = () => {
    let strArr = []
    let offset = getCursorCoordinates().offset
    while (state.inputValue[offset - 1] !== '@') {
      strArr.unshift(state.inputValue[offset - 1])
      offset--
    }
    let str = strArr.join('')
    console.log(str)
  }

  /**监听内容变化，出现@则弹出人员选择div*/
  watch(
    () => state.inputValue,
    (_, oldValue) => {
      // 删除@字符的时候
      if (!state.currentValue && state.chooseUserVisible) {
        let offset = getCursorCoordinates().offset
        if (oldValue[offset] === '@') {
          state.chooseUserVisible = false
        } else {
          //过滤当前人员列表
          getBeforeAtStr()
        }
      } else if (state.currentValue === '@') {
        // 下一个字符输入的是@
        let { left, top } = getCursorCoordinates()
        state.left = left
        state.top = top
        state.chooseUserVisible = true
        //过滤当前人员列表
        getBeforeAtStr()
      } else if (state.chooseUserVisible) {
        //过滤当前人员列表
        getBeforeAtStr()
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
    // 滚动到最底部
    nextTick(() => scrollTo(other.otherInfo.chattingBodyDom))
    state.inputValue = ''
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
