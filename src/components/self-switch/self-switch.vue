<template>
  <div class="self-switch" :style="switchStyle" @click="onSwitchClick">
    <div class="switchBox" :style="switchBoxStyle"></div>
    <div class="icon" :style="closeIconStyle" v-if="closeIcon">
      <slot name="closeIcon"></slot>
    </div>
    <div class="icon" :style="openIconStyle" v-if="openIcon">
      <slot name="openIcon"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, defineEmits, defineProps } from 'vue'

  const props = defineProps({
    // 双向绑定的值
    modelValue: Boolean,
    // 单项绑定的值
    value: Boolean,
    // 关闭和开的插槽
    openIcon: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: Boolean,
      default: false
    },
    // 控件大小
    width: {
      type: Number,
      default: 90
    },
    height: {
      type: Number,
      default: 40
    }
  })
  const emit = defineEmits(['update:modelValue', 'change'])

  // 是否是受控组件,modelValue等于null是受控组件
  const isControlled = ref<boolean>(props.modelValue === null)

  const switchStyle = computed(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    borderRadius: `${props.height / 2}px`,
    backgroundColor:
      (isControlled.value && props.value) || (!isControlled.value && props.modelValue) ? '#ededed' : '#1a1c20'
  }))

  const switchBoxStyle = computed(() => {
    return (isControlled.value && props.value) || (!isControlled.value && props.modelValue)
      ? {
          width: `${props.height * 0.8}px`,
          height: `${props.height * 0.8}px`,
          borderRadius: '50%',
          top: `${props.height * 0.1}px`,
          left: `${props.height * 0.1}px`
        }
      : {
          width: `${props.height * 0.2}px`,
          height: `${props.height * 0.7}px`,
          borderRadius: `${(props.height * 0.2) / 2}px`,
          top: `${props.height * 0.15}px`,
          left: `${props.width - props.height / 2}px`
        }
  })

  const openIconStyle = computed(() => ({
    width: `${props.height * 0.8}px`,
    height: `${props.height * 0.8}px`,
    top: `${props.height * 0.1}px`,
    left: `${props.width - props.height * 0.9}px`,
    opacity: (isControlled.value && props.value) || (!isControlled.value && props.modelValue) ? 1 : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }))

  const closeIconStyle = computed(() => ({
    width: `${props.height * 0.8}px`,
    height: `${props.height * 0.8}px`,
    top: `${props.height * 0.1}px`,
    left: `${props.height * 0.1}px`,
    opacity: (isControlled.value && props.value) || (!isControlled.value && props.modelValue) ? 0 : 1,
    display: 'flex',
    alignItems: 'center'
  }))

  const onSwitchClick = () => {
    if (isControlled.value) {
      emit('change', !props.value)
    } else {
      emit('update:modelValue', !props.modelValue)
      emit('change', !props.modelValue)
    }
  }
</script>

<style scoped lang="scss">
  .self-switch {
    user-select: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    $transition: all 0.4s;
    .switchBox {
      position: absolute;
      //background-color: #42a3f6;
      background-color: $primary-color2;
      overflow: hidden;
      transition: $transition;
    }
    .icon {
      position: absolute;
      transition: $transition;
    }
  }
</style>
