<template>
  <div>

    <NavigationBar current="文章"></NavigationBar>

    <banner image="/images/2020.jpg">
      <div class="title">Harley's Studio</div>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <SideMenu></SideMenu>
      </template>

        <chrysan :loading="loading"></chrysan>
        <post-list :posts="postPage.items"></post-list>
        <b-pagination-nav class="pagination-nav" v-show="postPage.metadata.total > pageSize"
                          :link-gen="linkGen"
                          :number-of-pages="totalPages"></b-pagination-nav>
    </split-container>

    <site-footer></site-footer>

  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'
import SplitContainer from '~/components/SplitContainer.vue'
import SideMenu from '~/components/SideMenu.vue'
import PostList from '~/components/PostList.vue'
import Banner from '~/components/Banner.vue'
import Chrysan from '~/components/Chrysan.vue'
import SiteFooter from '~/components/SiteFooter.vue'

export default {
  components: {
    Banner,
    'split-container': SplitContainer,
    NavigationBar,
    SideMenu,
    Chrysan,
    'post-list': PostList,
    'site-footer': SiteFooter,
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

.page-link {
  padding: 0.5rem 1rem;
  color: #526488;
}

.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #526488;
    border-color: #526488;
}

</style>
