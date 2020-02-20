<template>
  <div>

    <NavigationBar current="首页"></NavigationBar>

    <banner image="/images/2020.jpg">
      <div class="title">Harley's Studio</div>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <SideMenu></SideMenu>
      </template>

        <chrysan :loading="loading"></chrysan>
        <post-list :posts="postPage.items"></post-list>
        <b-pagination-nav v-show="postPage.metadata.total > pageSize"
                          :link-gen="linkGen"
                          :number-of-pages="totalPages"></b-pagination-nav>
    </split-container>

  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'
import SplitContainer from '~/components/SplitContainer.vue'
import SideMenu from '~/components/SideMenu.vue'
import PostList from '~/components/PostList.vue'
import Banner from '~/components/Banner.vue'
import Chrysan from '~/components/Chrysan.vue'

export default {
  components: {
    Banner,
    'split-container': SplitContainer,
    NavigationBar,
    SideMenu,
    Chrysan,
    'post-list': PostList
  },
  created () {
    var page = this.$route.query.page
    if (page === null || page === undefined) {
      page = 1
    }
    this.refreshData(page)
  },
  data () {
    return {
      loading: false,
      pageSize: 10,
      postPage: {
        items: [],
        metadata: {
          page: 1,
          per: 10,
          total: 1
        }
      }
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.postPage.metadata.total / this.pageSize)
    }
  },
  methods: {
    refreshData (page) {
      this.loading = true
      this.$axios.get(`posts?page=` + page).then(res => {
        this.postPage = res.data
        this.loading = false
        console.log(res)
      })
    },
    linkGen (pageNum) {
      // this.postPage.items = []
      // this.refreshData(pageNum)
      return pageNum === 1 ? '/' : `?page=${pageNum}`
    },
  }
}

</script>

<style>
.title {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
  font-size: 3.5rem;
  color: white;
  letter-spacing: 2px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
