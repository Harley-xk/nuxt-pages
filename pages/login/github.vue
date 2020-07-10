<template>
  <div class="content-login-github">
    <chrysan :loading="loading"></chrysan>
    <span>{{message}}</span>
  </div>
</template>

<script>

import chrysan from '../../components/Chrysan'

export default {
  components: { chrysan },
  mounted () {
    this.checkCode()
  },
  data () {
    return {
      loading: false,
      message: 'Login with Github ...'
    }
  },
  methods: {
    async checkCode () {
      try {
        const resp = await this.$axios.post(`githubLogin`, this.$route.query)
        console.log(resp)
        this.$store.commit('userCenter/userDidLogin', resp.data)
        this.$router.replace({ path: '/', query: { key: this.keyword_ } })
        console.log(resp)
      } catch (error) {
        console.log('error: ', error.message)
        this.message = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.content-login-github {
  min-width: 300px;
  text-align: center;
  margin: 200px auto;
}
</style>