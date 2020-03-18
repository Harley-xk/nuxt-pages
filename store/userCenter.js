
export const state = () => ({
  user: null,
  isLogined: false,
})

export const mutations = {
  userDidLogin(state, loginData) {
    state.user = loginData.user
    state.isLogined = true
    localStorage.user = JSON.stringify(loginData.user)
    localStorage.token = loginData.token.value
  },
  signOut(state) {
    state.user = null
    state.isLogined = false
    localStorage.user = null
    localStorage.token = null
  }
}