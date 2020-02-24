<template>
  <div>

    <NavigationBar current="文章"></NavigationBar>

    <banner image="/images/2020.jpg">
      <div class="post-title">{{title}}</div>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <SideMenu></SideMenu>
      </template>

      <chrysan :loading="loading"></chrysan>

      <div v-if="haveContents">
        <markdown :content="details.content"></markdown>
      </div>

    </split-container>

  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'
import SideMenu from '~/components/SideMenu.vue'
import Banner from '~/components/Banner.vue'
import SplitContainer from '~/components/SplitContainer.vue'
import Chrysan from '~/components/Chrysan.vue'
import Markdown from '~/components/Markdown.vue'

export default {
  components: {
    NavigationBar,
    SideMenu,
    Banner,
    Chrysan,
    "split-container": SplitContainer,
    Markdown
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
}
</style>