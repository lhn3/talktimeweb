<template>
  <svg
    aria-hidden="true"
    :class="`iconfont ${className}`"
    :style="`width:${width};height:${height};color:${color};${style}`"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
  export default { name: 'svg-icon' }
</script>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    width: String,
    height: String,
    className: { type: String, default: '' },
    style: { type: String, default: '' }
  })
  const symbolId = computed(() => `#${props.name}`)
</script>
