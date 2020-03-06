import vue from 'vue'

export const userCenter = {
  user: null,
  isLogined() {
    return this.user !== null
  },
  userDidLogin(loginData) {
    this.user = loginData.user
    localStorage.user = JSON.stringify(loginData.user)
    localStorage.token = loginData.token.value
  },
  signOut() {
    this.user = null
    localStorage.user = null
    localStorage.token = null
  }
}

userCenter.user = JSON.parse(localStorage.user)
vue.prototype.$userCenter = userCenter