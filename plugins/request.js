export default function({ $axios, redirect }) {
  // request interceptor
  $axios.interceptors.request.use(
    config => {
      // do something before request is sent
      console.log('do something before request is sent in interceptors')

      return config
    },
    error => {
      // do something with request error
      return Promise.reject(error)
    }
  )
  $axios.onRequest(config => {
    var token = localStorage.token
    if (token && token.length > 0) {
      console.log('set Authorization header: Bearer ' + token)
      config.headers['Authorization'] = 'Bearer ' + token
    }
  })

  // response interceptor
  $axios.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    // response => {
    //   const res = response.data
    //   if (res.code === 20000) {
    //     return res
    //   } else {
    //     redirect('/404')
    //     // if the custom code is not 200, it is judged as an error.
    //   }
    //   return Promise.reject(new Error(res.msg || 'Error'))
    // },
    // error => {
    //   console.log('err' + error) // for debug

    //   return Promise.reject(error)
    // }
  )

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/404')
  //   } else if (code === 500) {
  //     redirect('/500')
  //   }
  // })
}