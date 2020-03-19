<template>
  <div class="post-comment-form">

    <b-form-textarea class="comment-input"
                     :placeholder="inputPlaceholder"
                     v-model="content"
                     :state="contentState"
                     @keydown.ctrl.enter="sendAction"
                     @keydown.meta.enter="sendAction"></b-form-textarea>
    <div class="comment-footer">

      <div class="comment-footer-item comment-footer-tip">
        <span class="iconfont icon-markdown"></span>
      </div>
      <chrysan small
               class="comment-form-chrysan"
               :loading="loading"></chrysan>
      <toast class="comment-footer-item comment-footer-tip"
             :state="state"
             :message="message">
      </toast>
      <!-- （command）、⌥（option）、⇧（shift）、⇪（caps lock）、⌃（control）、↩（return）、⌅（enter） -->
      <div class="comment-footer-item flex-placeholder"></div>
      <div class="comment-footer-item"
           v-if="!isLogined">
        <b-form-input type="text"
                      v-model="nickname"
                      :state="nicknameState"
                      placeholder="请输入昵称或登录"></b-form-input>
      </div>
      <span class="comment-footer-item comment-footer-tip">⌘+⏎</span>
      <b-button size="sm"
                variant="success"
                :disabled="loading"
                @click="sendAction">发布</b-button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['postId', 'replyTo'],
  data () {
    return {
      content: '',
      nickname: '',
      state: 'idle',
      message: '',
      contentState: null,
      nicknameState: null
    }
  },
  mounted () {
      // 读取本地缓存的用户输入的昵称
      var nickname = localStorage.post_nickname
      if (nickname && nickname.length > 0) {
        this.nickname = nickname
      }
  },
  computed: {
    isLogined () {
      return this.$store.state.userCenter.isLogined
    },
    loading () {
      return this.state === 'active'
    },
    inputPlaceholder () {
      if (this.replyTo && this.replyTo.sender.nickname) {
        return "回复 " + this.replyTo.sender.nickname
      } else {
        return "开始讨论..."
      }
    }
  },
  methods: {
    sendAction () {
      if (!this.validateInput()) {
        return
      }
      this.state = 'active'
      var replyTo = null
      if (this.replyTo !== undefined && this.replyTo.id !== undefined) {
        replyTo = this.replyTo.id
      }
      var sender = this.nickname
      if (this.$store.state.userCenter.isLogined) {
        sender = null
      }
      this.$axios('posts/' + this.postId + '/comments', {
        method: 'post',
        data: {
          content: this.content,
          sender: sender,
          replyTo: replyTo
        }
      }).then(res => {
        this.state = 'success'
        this.message = "发布成功！"
        this.content = ''
        this.contentState = null
        // 本地缓存用户输入的昵称
        localStorage.post_nickname = this.nickname
        this.$emit('commentPushed', res.data)
      }).catch(error => {
        this.state = 'error'
        if (error.response) {
          this.message = error.response.data.reason + `（${error.response.status}）`
        } else {
          console.log(error)
          this.message = '未知错误'
        }
      })
    },
    validateInput () {
      this.contentState = this.content.length > 0
      this.nicknameState = this.isLogined || this.nickname.length > 0
      return this.contentState && this.nicknameState
    }
  }
}
</script>

<style lang="css">
.post-comment-form {
  /* background: #f4f4f4; */
  /* padding: 0 1rem; */
  margin-top: 1rem;
  border: solid 1px #f4f4f4;
  border-radius: 2px;
}

.comment-input {
  width: calc(100% - 1rem);
  margin: 0.5rem;
  min-height: 6rem;
  border: none;
  border-radius: 2px;
  font-size: 0.85rem;
  padding: 0.5rem;
  background: #fafafa;
}

.comment-footer {
  margin: 0rem 0.5rem 0.5rem 0.5rem;
  display: flex;
}

.comment-footer-item {
  margin: 0 0.5rem;
}

.comment-footer-item input {
  font-size: 0.85rem;
  padding: 0 0.5rem;
  background-color: #fafafa;
  border: none;
  border-radius: 2px;
  height: 2rem;
  color: #8c8c8c;
}

.comment-footer-tip {
  text-align: center;
  line-height: 2rem;
  font-size: 0.75rem;
  color: #8c8c8c;
}

.comment-form-chrysan {
  margin: 0 !important;
}
</style>