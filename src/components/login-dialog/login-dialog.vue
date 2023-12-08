<template>
  <el-dialog
    align-center
    :class="$style['login-dialog']"
    :close-on-click-modal="false"
    :model-value="modelValue"
    :before-close="reset"
    custom-class="tt-dialog"
    width="400"
  >
    <div class="login-main">
      <div class="login-top">
        <logo-svg />
        <div class="login-tip">即刻登录，畅聊无限~</div>
      </div>
      <el-carousel
        v-if="modelValue"
        ref="carouselRef"
        style="width: 100%"
        indicator-position="none"
        :autoplay="false"
        arrow="never"
        height="360px"
      >
        <el-carousel-item name="qr-login">
          <div class="qr-login">
            <vue-qr
              :text="encodeURI('hello worldgreoihgioerhg834893h4uvnh39')"
              size="300"
              :margin="0"
              :correct-level="3"
            />
          </div>
        </el-carousel-item>
        <el-carousel-item name="phone-login">
          <div class="phone-login">
            <div class="phone-ctr">
              <div class="input-item">
                <svg-icon
                  name="icon-shouji"
                  color="#aaa"
                  size="30px"
                  svg-style="padding: 0 10px;border-right: 1px solid #aaaaaa"
                />
                <el-input v-input="0" v-model="state.phone" placeholder="请输入手机号码" clearable maxlength="11" />
              </div>
              <div class="input-item">
                <svg-icon
                  name="icon-duanxin"
                  size="30px"
                  color="#aaa"
                  svg-style="padding: 0 13.5px;border-right: 1px solid #aaaaaa"
                />
                <el-input v-model="state.code" placeholder="请输入验证码" clearable maxlength="4" />
                <div class="send-code" v-if="!state.timer" @click="getCode" style="cursor: pointer; --color: #f56c6c">
                  获取验证码
                </div>
                <div class="send-code" v-else style="--color: #909399">{{ state.time }}秒</div>
              </div>
            </div>
            <bird-button :size="0.9" text="登录" class="login-submit" @click="toLogin" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="type-btn" @click="changeLoginType">
        {{ state.loginType === 'qr-login' ? '使用手机号码验证登录' : '使用微信扫码登录' }}
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { defineProps, defineEmits, ref, reactive } from 'vue'
  import LogoSvg from '@/components/logo-svg/logo-svg.vue'
  import BirdButton from '@/components/bird-button/bird-button.vue'
  import VueQr from 'vue-qr/src'
  import { ElMessage } from 'element-plus'
  import { isType, getUuid } from '@/utils/utils'
  import avatar from '@/assets/img/avatar.jpg'
  import localCache from '@/utils/cache'
  import { useUserStore } from '@/stores'

  const user = useUserStore()
  const carouselRef = ref()
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  const state = reactive({
    loginType: 'qr-login',
    timer: null,
    time: 60,
    phone: '',
    code: ''
  })

  /**切换登录方式*/
  const changeLoginType = () => {
    if (state.loginType === 'qr-login') {
      state.loginType = 'phone-login'
    } else {
      state.loginType = 'qr-login'
    }
    carouselRef.value.setActiveItem(state.loginType)
  }

  /**获取验证码*/
  const getCode = () => {
    if (!isType('mobile', state.phone)) return ElMessage.error('请输入正确的手机号码！')
    state.timer = setInterval(() => {
      state.time--
      if (state.time === 0) {
        state.time = 60
        clearInterval(state.timer)
        state.timer = null
      }
    }, 1000)
  }

  /**登录*/
  const toLogin = () => {
    // if (!isType('mobile', state.phone)) return ElMessage.error('请输入正确的手机号码！')
    // if (!isType('code', state.code)) return ElMessage.error('请输入正确的验证码！')
    user.userInfo.id = 666
    user.userInfo.username = '西兰花🥦'
    user.userInfo.avatar = avatar
    user.userInfo.selfStyle = '个性签名你别管！'
    user.userInfo.sex = 1
    user.userInfo.permissions = []
    user.userInfo.token = getUuid()
    localCache.setCache('talkTime-userInfo', user.userInfo)
    window.location.reload()
  }

  /**重置信息*/
  const reset = () => {
    state.loginType = 'qr-login'
    emit('update:modelValue', false)
  }
</script>

<style module lang="scss">
  .login-dialog {
    height: 600px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 3px 10px 5px rgba(0, 0, 0, 0.3);
    background-image: $black-bg;
    :global {
      .login-main {
        width: 100%;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        .login-top {
          height: 80px;
          width: 100%;
          text-align: center;
          color: #aaaaaa;
          .login-tip {
            margin-top: 10px;
          }
        }
        .qr-login {
          user-select: none;
          width: 100%;
          height: 100%;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phone-login {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .phone-ctr {
            width: 100%;
            margin-top: 80px;
            .input-item {
              display: flex;
              height: 50px;
              align-items: center;
              justify-content: center;
              border-bottom: 1px solid #aaaaaa;
              .el-input__wrapper {
                background-color: transparent;
                box-shadow: none;
                .el-input__inner {
                  color: #aaaaaa;
                }
              }
              .el-input__wrapper:focus-visible {
                outline: none;
              }
              .send-code {
                user-select: none;
                height: 30px;
                min-width: 80px;
                text-align: center;
                line-height: 30px;
                border-radius: 4px;
                font-size: 13px;
                color: var(--color);
                border: 1px solid var(--color);
              }
            }
          }
          .login-submit {
            margin: auto 0 20px 0;
          }
        }
        .type-btn {
          transition: all 0.3s;
          user-select: none;
          cursor: pointer;
          margin-bottom: 10px;
          color: #aaaaaa;
        }
        .type-btn:hover {
          color: #e6a23c;
        }
      }
    }
  }
</style>
