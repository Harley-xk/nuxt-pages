<template>
  <div>
    <div class="comment-header">
      <div>评论</div>
    </div>

    <div class="post-comment-form">

      <b-form-textarea class="comment-input"
                       placeholder="开始评论..."
                       v-model="content"
                       :state="contentState"
                       @keydown.ctrl.enter="sendAction"
                       @keydown.meta.enter="sendAction"></b-form-textarea>
      <div class="comment-footer">

        <div class="comment-footer-item comment-footer-tip">
          <span class="iconfont icon-markdown"></span>
        </div>
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
                  @click="sendAction">发布</b-button>
      </div>
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
      contentState: null,
      nicknameState: null
    }
  },
  computed: {
    isLogined () {
      return this.$store.state.userCenter.isLogined
    }
  },
  methods: {
    sendAction () {
      if (!this.validateInput()) {
        return
      }
     this.$axios('posts/' + this.postId + '/comments', {
        method: 'post',
        data: {
          content: this.content,
          sender: this.nickname,
          replyTo: this.replyTo
        }
      }).then(res => {
        console.log(res)
      }).catch(res => {
      }).then(res => {
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
.comment-header {
  display: flex;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 2rem;
}

.post-comment-form {
  /* background: #f4f4f4; */
  /* padding: 0 1rem; */
  margin-top: 1rem;
  border: solid 1px #ececec;
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
</style>