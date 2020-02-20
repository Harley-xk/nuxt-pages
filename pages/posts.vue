<template>
  <div>

    <NavigationBar current="文章"></NavigationBar>

    <banner image="/images/2020.jpg">
      <h1>This is Title: {{id}}</h1>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <SideMenu></SideMenu>
      </template>

      <h1>This is a post page</h1>

      <h5>Post id: {{id}}</h5>

    </split-container>

  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'
import SideMenu from '~/components/SideMenu.vue'
import Banner from '~/components/Banner.vue'
import SplitContainer from '~/components/SplitContainer.vue'

export default {
  components: {
    NavigationBar,
    SideMenu,
    Banner,
    "split-container": SplitContainer
  },
  created () {
    this.id = this.$route.query.id
    // this.title
  },
  data () {
    return {
      id: '',
      title: ''
    }
  },
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

.post-title {
  width: 100%;
  color: white;
  text-align: center;
}
</style>