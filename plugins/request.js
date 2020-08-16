export default function ({ $axios, redirect }) {
  // request interceptor
  $axios.interceptors.request.use(
    config => {
      // do something before request is sent

      console.log('interceptors in ', process.server ? 'server' : 'client')
      if (process.server) {
        /// 服务端渲染的请求加上标识
        config.headers['X-Render'] = 'Server'
      } else {
        /// 在浏览器端调用时，头部加上 token
        var token = localStorage.token
        if (token && token.length > 0) {
          console.log('set Authorization header: Bearer ' + token)
          config.headers['Authorization'] = 'Bearer ' + token
        }
      }
      return config
    },
    error => {
      // do something with request error
      return Promise.reject(error)
    }
  )
  // response interceptor
  $axios.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      return response
    },
    (error) => {
      if (error.response.data.reason) {
        error.message = error.response.data.reason
      }
      return Promise.reject(error)
    }
  )
}