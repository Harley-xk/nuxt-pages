<template>
  <div>

    <NavigationBar current="首页"></NavigationBar>

    <div class="banner">
    </div>

    <b-container class="container">
      <!-- <div> -->
      <div class="side-menu-col">
        <SideMenu></SideMenu>
      </div>
      <div class="post-list-container">
        <post-list :posts="postPage.items"></post-list>
        <b-pagination-nav v-show="postPage.metadata.total > pageSize"
                          :link-gen="linkGen"
                          :number-of-pages="totalPages"></b-pagination-nav>
      </div>
      <!-- </div> -->
    </b-container>

  </div>
</template>

<script>

import Logo from '~/components/Logo.vue'
import NavigationBar from '~/components/NavigationBar.vue'
import SideMenu from '~/components/SideMenu.vue'
import PostList from '~/components/PostList.vue'

export default {
  components: {
    Logo,
    NavigationBar,
    SideMenu,
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
      postPage: {
        pageSize: 10,
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
      this.$axios.get(`posts?page=` + page).then(res => {
        this.postPage = res.data
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
.container {
  display: flex;
  margin: 2rem auto;
  min-height: 100vh;
}
.post-list-container {
  padding: 1rem;
}

/*当页面宽度小于 960px 的时候执行包裹的css*/
@media screen and (max-width: 991px) {
  .side-menu-col {
    display: none;
  }
}

/*当页面宽度大于 960px 的时候执行包裹的css*/
@media screen and (min-width: 991px) {
  .side-menu-col {
    flex-shrink: 0;
    flex-basis: 280px;
  }
}

.banner {
  width: 100vw;
  height: 60vw;
  min-height: 200px;
  max-height: 400px;
  display: block;
  background-size: cover;
  background-position: 50%;
  /* background-repeat: no-repeat; */
  background-image: url(/images/2020.jpg);
}

.banner img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
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
