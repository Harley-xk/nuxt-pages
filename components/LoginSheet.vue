<template>
  <b-modal id="modal-login"
           ref="modal-login"
           title="登录"
           ok-title="登录"
           cancel-title="取消"
           @show="resetModal"
           @hidden="resetModal"
           @ok="handleOk"
           hide-header-close
           centered>
    <b-form ref="loginForm">
      <b-row class="form-row form-row-first">
        <b-col sm='1.5'>
          <label class="form-label"
                 for="form-username">账号</label>
        </b-col>
        <b-col>
          <b-form-input class="form-input"
                        type="email"
                        size="sm"
                        v-model="username"
                        :state="nameState"
                        placeholder="请输入账号，当前仅支持邮箱登录"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="form-row">
        <b-col sm='1.5'>
          <label class="form-label"
                 for="form-username">密码</label>
        </b-col>
        <b-col>
          <b-form-input class="form-input"
                        type="password"
                        size="sm"
                        v-model="password"
                        :state="passState"
                        @keydown.enter="handleOk"
                        placeholder="请输入密码"></b-form-input>
        </b-col>
      </b-row>
    </b-form>
    <template v-slot:modal-footer="{ ok, cancel }">
      <span class="form-message"
            v-if="message.length > 0">{{message}}</span>
      <span class="form-loading"
            v-if="loading">
        <b-spinner small
                   type="grow"></b-spinner>
        <span>登录中...</span>
      </span>
      <span class="modal-footer-placeholder"></span>
      <b-button size="md"
                variant="secondary"
                @click="cancel()">
        取消
      </b-button>
      <b-button size="md"
                variant="primary"
                @click="ok()">
        登录
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      username: '',
      password: '',
      nameState: null,
      passState: null,
      loading: false
    }
  },
  methods: {
    checkFormValidity () {
      if (this.username.length <= 0) {
        this.message = "请输入邮箱地址"
        this.nameState = false
        return false
      } else if (!this.$refs.loginForm.checkValidity()) {
        this.message = "邮箱地址格式不正确"
        this.nameState = false
        return false
      }
      this.nameState = true
      if (this.password.length <= 0) {
        this.message = "请输入密码"
        this.passState = false
        return false
      }
      this.passState = true
      this.message = ''
      return true
    },
    resetModal () {
      this.username = ''
      this.password = ''
      this.resetState()
    },
    resetState () {
      this.nameState = null
      this.passState = null
      this.message = ''
    },
    handleOk (e) {
      e.preventDefault()
      if (!this.checkFormValidity()) {
        return
      }
      this.loading = true
      this.$axios('login', {
        method: 'post',
        auth: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
      this.$store.commit('userCenter/userDidLogin', res.data)
        this.$refs['modal-login'].hide()
      }).catch(res => {
        this.nameState = false
        this.passState = false
        this.message = '用户名或密码错误'
      }).then(res => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="css">
.form-row-first {
  margin-bottom: 12px;
}

.form-input {
  height: 2.25rem;
}
.form-label {
  margin: 0;
  font-size: 0.875rem;
  line-height: 2.25rem;
}

.form-message {
  color: rgb(216, 42, 42);
  font-size: 0.85rem;
}

.form-loading {
  color: rgb(0, 138, 23);
  font-size: 0.85rem;
}
.modal-footer-placeholder {
  flex-grow: 1;
}
</style>