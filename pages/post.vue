<template>
  <div>

    <banner image="/images/2020.jpg">
      <div class="post-title">{{title}}</div>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <PostSections :sections="details.meta.sections"
                      :active="active"></PostSections>
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

        <markdown :content="details.content"></markdown>

        <div class="comment-header">
          评论
        </div>

        <PostCommentForm v-if="haveContents"
                         :postId="id"></PostCommentForm>

      </div>

    </split-container>

  </div>
</template>

<script>

import PostSections from '~/components/PostSections.vue'
import Banner from '~/components/Banner.vue'
import SplitContainer from '~/components/SplitContainer.vue'
import Chrysan from '~/components/Chrysan.vue'
import Markdown from '~/components/Markdown.vue'
import PostCommentForm from '~/components/PostCommentForm.vue'

export default {
  components: {
    PostSections,
    Banner,
    Chrysan,
    "split-container": SplitContainer,
    Markdown,
    PostCommentForm,
  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll)
  },
  destroy () {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.onScroll)
  },
  created () {
    this.id = this.$route.query.id
    this.getContents()
  },
  data () {
    return {
      id: '',
      title: '',
      loading: false,
      details: {
        meta: {
          sections: [],
        },
        content: ''
      },
      active: ''
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
      this.loading = true
      this.$axios.get(`posts/` + this.id).then(res => {
        this.details = res.data
        this.title = res.data.meta.title
        console.log(res)
        this.loading = false
      })
    },
    onScroll () {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('h1,h2,h3')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n
        }
      }
      // 把下标赋值给 vue 的 data
      this.active = navContents[navIndex].innerHTML
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
  font-size: 1rem;
  margin-top: 2rem;
}
</style>