<!--桥背景-->
<template>
  <div
    :style="{
      boxSizing: 'border-box',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex'
    }"
    ref="boxRef"
  >
    <canvas ref="canvasRef">您的浏览器版本过低，请更新浏览器</canvas>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import WaterRipple from './waterRipple'
  import waterBg from '@/assets/img/water.png'

  let canvasWidth = 600
  let canvasHeight = 600
  let timer: number | null = null
  let waterRipple: WaterRipple | null = null

  const boxRef = ref<HTMLDivElement>()
  const canvasRef = ref<HTMLCanvasElement>()

  onMounted(() => {
    if (boxRef.value && canvasRef.value) {
      const { offsetWidth, offsetHeight } = boxRef.value
      canvasWidth = offsetWidth
      canvasHeight = offsetHeight
      canvasRef.value.width = canvasWidth
      canvasRef.value.height = canvasHeight

      const waterImg = new Image()
      waterImg.src = waterBg
      waterRipple = new WaterRipple({
        canvas: canvasRef.value,
        background: waterImg,
        boxRef
      })

      waterRipple.animate()

      timer = window.setInterval(() => {
        const x = Math.floor(canvasWidth * Math.random())
        const y = Math.floor(canvasHeight * Math.random())
        waterRipple?.ripple(x, y)
      }, 1000)

      waterRipple.addMousemove()
    }
  })

  onUnmounted(() => {
    timer && clearInterval(timer)
    waterRipple?.stop()
  })
</script>
