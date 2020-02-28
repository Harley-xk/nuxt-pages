<template>
  <div>

    <NavigationBar current="文章"></NavigationBar>

    <banner image="/images/2020.jpg">
      <div class="post-title">{{title}}</div>
        <div class="post-meta" v-if="haveContents">
          <span class="post-meta-item">字数: {{postLength}}</span>
          <span class="post-meta-item">阅读: {{readingCosts}} min</span>
        </div>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <SideMenu></SideMenu>
      </template>

      <chrysan :loading="loading"></chrysan>

      <div class="post-content"
           v-if="haveContents">

        <markdown :content="details.content"></markdown>

        <div class="post-footer">
          <span class="post-footer-item">
            <span class="iconfont icon-calendar-2"></span>
            {{details.meta.date}}
          </span>
          <span class="post-footer-item">
            <span class="iconfont icon-reading"></span>
            {{details.meta.views}}
          </span>
        </div>
      </div>

    </split-container>

    <siteFooter />

  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'
import SideMenu from '~/components/SideMenu.vue'
import Banner from '~/components/Banner.vue'
import SplitContainer from '~/components/SplitContainer.vue'
import Chrysan from '~/components/Chrysan.vue'
import Markdown from '~/components/Markdown.vue'
import SiteFooter from '~/components/SiteFooter.vue'

export default {
  components: {
    NavigationBar,
    SideMenu,
    Banner,
    Chrysan,
    "split-container": SplitContainer,
    Markdown,
    SiteFooter,
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
        meta: null,
        content: ''
      }
    }
  },
  computed: {
    haveContents () {
      return (this.details !== null
        && this.details.content !== null
        && this.details.content.length > 0)
    },
    postLength() {
      return this.details.content.length
    },
    readingCosts() {
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

.post-meta-item {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 0.8rem;
  margin-right: 0.5rem;
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

</style>