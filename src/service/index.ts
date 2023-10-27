import myRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

//创建一个请求实例
const myAxios = new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //自定义传入拦截器
  interceptors: {
    requestInterceptor(config) {
      //携带token发送请求
      const token = localCache.getCache('talkTimeWeb-token')
      if (token) config.headers!.Authorization = `Bearer ${token}`
      return config
    }
  }
})

export default myAxios
