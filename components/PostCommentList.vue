<template>
  <div class="post-comment-list">

    <div class="post-comment-item"
         v-for="(item, index) in comments"
         :key="index">

      <div class="comment-container">
        <div class="comment-item-left">
          <img class="comment-avatar"
               src="/images/avatar-placeholder.png"
               alt="">
        </div>

        <div class="comment-item-right">
          <div class="comment-item-header">
            <span class="comment-sender-name">{{item.sender.nickname}}</span>
            <span v-if="replyTargetName(item) !== null">
              回复 <span class="comment-reply-target">{{replyTargetName(item)}}</span>
            </span>
            <span class="comment-time"> • {{item.createdAt | dateString}}</span>
            <span class="comment-actions">
              <span @click="toggleReplyTo(item)">回复</span>
              <span>删除</span>
              <span>举报</span>
            </span>
          </div>
          <div class="comment-item-content">
            <markdown style="display: inline;"
                      :content="item.content"></markdown>
          </div>
        </div>
      </div>

      <div v-if="isRepling(item)">
        <CommentForm :replyTo="item"
                     :postId="postId"
                     @commentPushed="commentPushed"></CommentForm>
      </div>
    </div>
  </div>
</template>

<script>

import CommentForm from '~/components/PostCommentForm.vue'

export default {
  components: {
    CommentForm
  },
  props: ['postId'],
  mounted () {
    this.refreshData()
  },
  data () {
    return {
      state: 'idle',
      pageMeta: null,
      comments: [],
      replyTo: null
    }
  },
  computed: {
    replyToId () {
      if (this.replyTo !== null, this.replyTo.id !== null) {
        return this.replyTo.id
      }
      return 0
    }
  },
  methods: {
    refreshData () {
      this.state = 'active'
      console.log('fetch comments,', this.postId)
      this.$axios('/posts/' + this.postId + '/comments?per=999').then(res => {
        this.state = 'idle'
        this.pageMeta = res.data.metadata
        this.comments = res.data.items
      })
    },
    toggleReplyTo (comment) {
      if (this.replyTo !== null && this.replyTo.id === comment.id) {
        this.replyTo = null
      } else {
        this.replyTo = comment
      }
    },
    isRepling (comment) {
      return (this.replyTo !== null && this.replyTo.id === comment.id)
    },
    replyTargetName (comment) {
      if (comment.targetUser === undefined || comment.targetUser === null) {
        return null
      }
      var target = comment.targetUser
      if (target.nickname === undefined) {
        return null
      }
      return target.nickname
    },
    commentPushed (data) {
      this.replyTo = null
      this.$emit('commentPushed', data)
    },
    pushComment (data) {
      this.comments.splice(0, 0, data)
    }
  }
}
</script>

<style lang="css">
.post-comment-item {
  margin-top: 1rem;
  background-color: #f4f4f4;
  padding: 0.5rem;
  border-radius: 4px;
}

.comment-container {
  display: flex;
}

.comment-avatar {
  margin: 2px 0;
  width: 50px;
  height: 50px;
}

.comment-item-header span {
  font-size: 0.85rem;
}

.comment-sender-name {
  color: #42b983;
  font-weight: bold;
}

.comment-reply-target {
  color: #42b983;
  font-weight: bold;
}

.comment-time {
  color: #888;
}

.comment-item-left {
  flex-shrink: 0;
}

.comment-item-right {
  flex-grow: 1;
  padding-right: 0.5rem;
  overflow: hidden;
  margin-left: 0.5rem;
  color: #666;
}

.comment-item-content p {
  margin: 0;
}

.post-comment-item:hover .comment-actions {
  font-size: 0.85rem;
  visibility: visible;
}

.comment-actions {
  visibility: hidden;
  margin-left: 1rem;
}

.comment-actions span {
  cursor: pointer;
  color: #888;
  padding: 2px;
}

.comment-actions span:hover {
  color: #42b983;
}
</style>