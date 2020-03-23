<template>
  <div>

    <banner image="/images/2020.jpg">
      <div class="post-title">{{title}}</div>
    </banner>

    <SplitContainer>

      <template v-slot:side-menu>
        <PostSections :sections="details.meta.sections"></PostSections>
      </template>

      <chrysan :loading="loading"></chrysan>

      <div class="post-content"
           v-if="haveContents">
        <div class="post-meta"
             v-if="haveContents">

          <span class="post-meta-item">
            <span class="iconfont icon-wrods-line"></span>
            {{postLength}}</span>
          <span class="post-meta-item">
            <span class="iconfont icon-time"></span>
            {{readingCosts}} min</span>
          <span class="post-meta-item">
            <span class="iconfont icon-send-line"></span>
            {{details.meta.date}}
          </span>
          <span class="post-meta-item">
            <span class="iconfont icon-read-line"></span>
            {{details.meta.views}}
          </span>
        </div>

        <markdown :content="details.content"
                  anchor="1"></markdown>

        <div class="comment-header">
          评论({{details.meta.comments}})
        </div>

        <PostCommentForm v-if="haveContents"
                         :postId="$route.params.id"
                         @commentPushed="commentPushed"></PostCommentForm>

        <PostCommentList v-if="haveContents"
                         :postId="$route.params.id"
                         ref="commentsList"
                         @commentPushed="commentPushed"></PostCommentList>

      </div>

    </SplitContainer>

  </div>
</template>

<script>

import PostSections from '~/components/PostSections.vue'
import Banner from '~/components/Banner.vue'
import SplitContainer from '~/components/SplitContainer.vue'
import Chrysan from '~/components/Chrysan.vue'
import Markdown from '~/components/Markdown.vue'
import PostCommentForm from '~/components/PostCommentForm.vue'
import PostCommentList from '~/components/PostCommentList.vue'

export default {
  components: {
    PostSections,
    Banner,
    Chrysan,
    SplitContainer,
    Markdown,
    PostCommentForm,
    PostCommentList,
  },
  asyncData ({ $axios, params }) {
    if (process.server) {
      return $axios.get(`http://0.0.0.0:8080/api/posts/` + params.id).then(res => {
        // console.log(res)
        return { 
          details: res.data,
          title: res.data.meta.title,
        }
      })
    }
  },
  data () {
    return {
      title: '',
      loading: false,
      details: {
        meta: {
          sections: [],
        },
        content: ''
      },
    }
  },
  computed: {
    haveContents () {
      return (this.details !== null
        && this.details.content !== null
        && this.details.content.length > 0)
    },
    postLength () {
      return this.details.content.length
    },
    readingCosts () {
      return Math.ceil(this.postLength / 300)
    }
  },
  methods: {
    getContents () {
      console.log("this.route: ", this.$route)
      this.loading = true
      this.$axios.get(`posts/` + this.$route.params.id).then(res => {
        this.details = res.data
        this.title = res.data.meta.title
        console.log(res)
        this.loading = false
      })
    },
    commentPushed (data) {
      this.details.meta.comments += 1
      this.$refs.commentsList.pushComment(data)
    }
  }
}
</script>

<style lang="css">
.container {
  display: flex;
  margin: 2rem auto;
  min-height: 100vh;
}
.post-content-container {
  padding: 1rem;
}

.post-title {
  width: 100%;
  color: white;
  text-align: center;
  line-height: 2rem;
}

.post-meta {
  margin-bottom: 1.5rem !important;
}

.post-meta-item {
  /* font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; */
  font-size: 0.875rem;
  margin-right: 0.5rem;
  color: #8c8c8c;
}

.post-meta-item .iconfont {
  font-size: 0.875rem;
}

.post-content h2:first-child {
  margin-top: 0;
}

.post-content img {
  max-width: 100%;
}

.post-footer {
  margin: 1rem 0;
  font-size: 0.9rem;
  line-height: 2rem;
  color: #8b8b8b;
}

.post-footer-item {
  margin-right: 1rem;
}

.post-footer-item .iconfont {
  font-size: 14px;
  margin-right: 4px;
}

.comment-header {
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 2rem;
  padding: 0.5rem;
  color: #42b983;
  border-bottom: solid #42b983 2px;
}
</style>