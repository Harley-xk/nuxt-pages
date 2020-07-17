<template>
  <div>
    <NavigationBar current="文章"
                   :keyword="$route.query.key">
    </NavigationBar>
    <nuxt />
    <SiteFooter></SiteFooter>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
import SiteFooter from '~/components/SiteFooter.vue'

export default {
  head: {
    meta: [
      { charset: 'utf-8' },
    ]
  },
  components: {
    NavigationBar,
    SiteFooter,
  },
  computed: {
    isLogined () {
      return this.$store.state.userCenter.isLogined
    },
  },
  mounted () {
    this.autoLogin()
  },
  methods: {
    autoLogin () {
      if (this.isLogined) {
        return
      }

      // 本地已保存用户数据，则不再请求
      let userString = localStorage.user
      if (userString) {
        let user = JSON.parse(userString)
        if (user !== undefined && user !== null) {
          this.$store.commit('userCenter/autoLogin', user)
          return
        }
      }

      // 本地保存了 token，则自动登录
      if (localStorage.token) {
        this.$axios.post('autoLogin').then(res => {
          if (res.status == 200) {
            this.$store.commit('userCenter/userDidLogin', res.data)
          }
        })
      }
    },
  }
}
</script>

<style>
html {
  font-family: Arial, "Microsoft YaHe", "Source Sans Pro", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.flex-placeholder {
  flex-grow: 99;
}
</style>
