<template>
  <div>
    <div class="comment-header">
      <div>评论</div>

      <!-- <div class="flex-placeholder"></div>
      <div v-if="!isLogined">
        <label for="post-comment-nickname">昵称：</label>
        <input type="text"
               id="post-comment-nickname">
      </div> -->
    </div>

    <div class="post-comment-form">

      <textarea class="comment-input"
                name=""
                id=""
                @keydown.ctrl.enter="sendAction"
                @keydown.meta.enter="sendAction"></textarea>
      <div class="comment-footer">

        <div class="comment-footer-item iconfont icon-markdown"></div>
        <!-- （command）、⌥（option）、⇧（shift）、⇪（caps lock）、⌃（control）、↩（return）、⌅（enter） -->
        <div class="comment-footer-item flex-placeholder"></div>

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
  computed: {
    isLogined () {
      return this.$store.state.userCenter.isLogined
    }
  },
  methods: {
    sendAction () {
      console.log('Send Action!')
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
  border: solid 1px #f4f4f4;
  border-radius: 4px;
}

.comment-input {
  width: calc(100% - 1rem);
  margin: 0.5rem;
  min-height: 5rem;
  border: none;
  border-radius: 0;
  font-size: 0.75rem;
  padding: 0.5rem;
  background: #f4f4f4;
}

.comment-footer {
  /* padding-top: 0.2rem; */
  /* padding-bottom: 0.6rem; */
  margin: 0rem 0.5rem 0.5rem 0.5rem;
  display: flex;
}

.comment-footer-item {
  line-height: 2rem;
  margin-right: 0.5rem;
}
.comment-footer-tip {
  text-align: center;
  line-height: 2rem;
  font-size: 0.75rem;
  color: #8c8c8c;
}
</style>