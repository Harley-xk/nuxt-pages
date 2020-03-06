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

var userData = localStorage.user
if (userData && userData.length > 0) {
  userCenter.user = JSON.parse(userData)
}
vue.prototype.$userCenter = userCenter