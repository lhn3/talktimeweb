<template>
  <el-dialog
    append-to-body
    :class="$style['self-info-dialog']"
    :close-on-click-modal="false"
    :model-value="modelValue"
    :before-close="reset"
    custom-class="tt-dialog"
    width="800"
  >
    <div class="self-info">
      <!--性别-->
      <div class="self-sex" @click="sexChange">
        <svg-icon
          v-if="user.userInfo.sex === 0"
          size="20"
          name="icon-nv"
          color="#f56c6c"
          svg-style="margin-left: 5px"
        />
        <svg-icon
          v-if="user.userInfo.sex === 1"
          size="20"
          name="icon-nan"
          color="#42a3f6"
          svg-style="margin-left: 5px"
        />
      </div>
      <!--头像-->
      <div class="self-avatar" @click="avatarUpload.click()">
        <input id="avatarUpload" type="file" ref="avatarUpload" v-show="false" />
        <el-image style="width: 100px; height: 100px" :src="user.userInfo.avatar" :initial-index="4" fit="cover" />
        <div class="edit-avatar">更换头像</div>
      </div>
      <!--用户名-->
      <div class="self-username">
        <el-input
          style="width: 200px"
          :maxlength="15"
          placeholder="输入昵称"
          v-model="user.userInfo.username"
          @blur="handelChange('userName')"
        />
      </div>
      <!--个性签名-->
      <div class="self-selfStyle">
        <div class="selfStyle-label">个性签名</div>
        <el-input
          type="textarea"
          style="width: 600px"
          :maxlength="100"
          :rows="3"
          placeholder="展示自己的个性~"
          v-model="user.userInfo.selfStyle"
          @blur="handelChange('selfStyle')"
        />
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { defineProps, defineEmits, ref, watch, nextTick } from 'vue'
  import { useUserStore } from '@/stores'
  import { getToken } from '@/utils/utils'

  const avatarUpload = ref()
  const user = useUserStore()
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  /**改变头像*/
  watch(
    () => props.modelValue,
    () => {
      nextTick(() => {
        avatarUpload.value.addEventListener('change', e => {
          let file = e.target.files[0]
          if (!file) return
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = res => {
            user.userInfo.avatar = res.target.result
          }
        })
      })
    }
  )

  /**改变昵称*/
  const handelChange = type => {}

  /**改变性别*/
  const sexChange = () => {
    console.log(user.userInfo.sex)
    if (user.userInfo.sex) {
      user.userInfo.sex = 0
    } else {
      user.userInfo.sex = 1
    }
  }

  /**重置信息*/
  const reset = () => {
    emit('update:modelValue', false)
  }
</script>

<style module lang="scss">
  .self-info-dialog {
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 3px 10px 5px rgba(0, 0, 0, 0.3);
    background-image: $black-bg;
    :global {
      .self-info {
        user-select: none;
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .self-sex {
          position: absolute;
          z-index: 999;
          top: 20px;
          margin-left: 100px;
        }
        .self-avatar {
          width: 100px;
          aspect-ratio: 1/1;
          border-radius: 50px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          .edit-avatar {
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            font-size: 12px;
            color: #fff;
            line-height: 35px;
            width: 100%;
            text-align: center;
            opacity: 0;
            transition: opacity 0.5s;
          }
        }
        .self-avatar:hover {
          .edit-avatar {
            opacity: 1;
          }
        }
        .self-username {
          //width: 100%;
          margin: 10px 0;
          .el-input__wrapper {
            background-color: transparent;
            box-shadow: none;
            .el-input__inner {
              color: #fff;
              text-align: center;
            }
          }
          .el-input__wrapper.is-focus {
            box-shadow: 0 0 0 1px #42a3f6 inset;
          }
          .el-input__wrapper:focus-visible {
            outline: none;
          }
        }
        .self-selfStyle {
          color: #fff;
          display: flex;
          align-items: center;
          .el-textarea__inner {
            background-color: rgba(255, 255, 255, 0.1);
            color: #fff;
            box-shadow: none;
            word-wrap: break-word;
            word-break: break-all;
          }
          .el-textarea__inner:focus {
            outline: 0;
            box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
          }
          .selfStyle-label {
            margin-right: 5px;
            min-width: 60px;
          }
        }
      }
    }
  }
</style>
