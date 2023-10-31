<template>
  <canvas id="bg" @click="canvasClick"></canvas>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue'

  let canvas: any
  let ctx: any
  let r = 3 //半径
  let time = 0.02 //移动速度
  let maxLength = 200 //两点显示线条最大距离200
  let pointList: Array<any> = [] //全部点的数组

  onMounted(() => {
    canvas = document.querySelector('#bg')
    //获取canvas绘制上下文
    ctx = canvas.getContext('2d')

    //设置canvas原始尺寸*放大倍率，保持清晰度
    canvas.width = window.innerWidth * devicePixelRatio
    canvas.height = window.innerHeight * devicePixelRatio

    // 开始画图
    init(100)
    draw()
  })

  /**获取[min, max]范围内随机整数*/
  const randomNum = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min) + min)

  /**随机生成点或者绘制传入的点*/
  const setPoint = (oldX = null, oldY = null) => {
    //点的颜色
    ctx.fillStyle = '#ffffff'
    // 随机坐标
    let x = oldX || randomNum(r, canvas.width - r)
    let y = oldY || randomNum(r, canvas.height - r)
    let speedX = randomNum(-50, 50)
    let speedY = randomNum(-50, 50)

    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
    return { x, y, speedX, speedY }
  }

  /**两点连线*/
  const contentLine = (start: Array<number>, end: Array<number>) => {
    // 两点的距离
    let len = Math.sqrt((start[0] - end[0]) ** 2 + (start[1] - end[1]) ** 2)
    // 距离超过最大距离不画线
    if (len === 0 || len >= maxLength) return
    ctx.beginPath()
    ctx.moveTo(...start)
    ctx.lineTo(...end)
    ctx.strokeStyle = `rgba(225,225,225,${1 - len / maxLength})`
    ctx.stroke()
  }

  /**
   * 初始化点数
   * @param pointNum 点数
   */
  const init = (pointNum: number) => {
    for (let i = 0; i < pointNum; i++) {
      pointList.push(setPoint())
    }
  }

  /**画图*/
  const draw = () => {
    // 清屏
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //画点并设置当前画的时间
    for (let i = 0; i < pointList.length; i++) {
      // 拿到当前的点
      let point = pointList[i]
      //x,y位移
      point.x = point.x + point.speedX * time
      point.y = point.y + point.speedY * time
      // 达到边缘情况设置xy方向
      if (point.x <= r || point.x >= canvas.width - r) point.speedX = -point.speedX
      if (point.y <= r || point.y >= canvas.height - r) point.speedY = -point.speedY
      setPoint(point.x, point.y)
    }

    // 连线
    pointList.forEach(item => {
      pointList.forEach(i => {
        contentLine([item.x, item.y], [i.x, i.y])
      })
    })
    requestAnimationFrame(draw)
  }

  /**点击新增一个点*/
  const canvasClick = (e: any) => {
    // 超过三百删除第一个
    if (pointList.length >= 300) pointList.splice(0, 1)
    pointList.push(setPoint(e.offsetX * devicePixelRatio, e.offsetY * devicePixelRatio))
  }
</script>

<style lang="less" scoped>
  /*样式尺寸*/
  #bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
