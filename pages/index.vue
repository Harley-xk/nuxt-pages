<template>
  <div>
    <banner image="/images/2020.jpg">
      <div class="title">Harley's Studio</div>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <SideMenu></SideMenu>
      </template>

      <chrysan :loading="loading"></chrysan>
      <post-list :posts="postPage.items"
                 :highlighting="$route.query.key"></post-list>
      <b-pagination-nav class="pagination-nav"
                        v-show="postPage.metadata.total > pageSize"
                        :link-gen="linkGen"
                        :number-of-pages="totalPages"></b-pagination-nav>
    </split-container>
  </div>
</template>

<script>

import SplitContainer from '~/components/SplitContainer.vue'
import SideMenu from '~/components/SideMenu.vue'
import PostList from '~/components/PostList.vue'
import Banner from '~/components/Banner.vue'
import Chrysan from '~/components/Chrysan.vue'

export default {
  components: {
    Banner,
    'split-container': SplitContainer,
    SideMenu,
    Chrysan,
    'post-list': PostList,
  },
  watchQuery: true,
  asyncData ({ query, $axios, req }) {
    if (process.server) {
      var page = 1
      if (query.page) {
        page = query.page
      }
      var querystr = 'page=' + page
      if (query.key && query.key.length > 0) {
        querystr += '&key=' + query.key
      }
      return $axios.get(`/posts?` + querystr, {
        headers: req.headers
      }).then(res => {
        // console.log(res)
        return { postPage: res.data }
      })
    }
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
  mounted () {
    if (this.postPage.items.length <= 0) {
      this.fetchPostList()
    }
  },
  methods: {
    async fetchPostList () {
      var page = 1
      var query = this.$route.query
      if (query.page) {
        page = query.page
      }
      var querystr = 'page=' + page
      if (query.key && query.key.length > 0) {
        querystr += '&key=' + query.key
      }
      var resp = await this.$axios.get(`/posts?` + querystr)
      this.postPage = resp.data
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
  line-height: 4rem;
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
