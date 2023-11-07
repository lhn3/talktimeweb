<template>
  <svg
    aria-hidden="true"
    :class="`iconfont ${className}`"
    :style="`width:${size};height:${size};color:${color};${svgStyle}`"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
  export default { name: 'svg-icon' }
</script>

<script lang="ts" setup>
  import { computed, defineProps } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: String,
    className: { type: String, default: '' },
    svgStyle: { type: String, default: '' }
  })
  const symbolId = computed(() => `#${props.name}`)
</script>
