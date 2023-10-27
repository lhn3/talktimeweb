//不同环境定义不同的环境变量
let BASE_URL = ''
const TIME_OUT = 3000

// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  // BASE_URL = 'http://152.136.185.210:5000'
} else {
  // @ts-ignore
  if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://152.136.185.210:5000'
  }
}

export { BASE_URL, TIME_OUT }
