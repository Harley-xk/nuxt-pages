<template>
  <div>
    
    <NavigationBar current="管理员"></NavigationBar>

    <banner image="/images/2020.jpg">
      <div class="title">Harley's Studio</div>
    </banner>

    <split-container>

      <template v-slot:side-menu>
        <SideMenu></SideMenu>
      </template>

        <chrysan :loading="loading"></chrysan>

        <consolelog :data="logContents"></consolelog>

    </split-container>

    <site-footer></site-footer>

  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'
import SplitContainer from '~/components/SplitContainer.vue'
import SideMenu from '~/components/SideMenu.vue'
import Banner from '~/components/Banner.vue'
import Chrysan from '~/components/Chrysan.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import Consolelog from '~/components/ConsoleLog.vue';

export default {
    components: {
    Banner,
    'split-container': SplitContainer,
    NavigationBar,
    SideMenu,
    Chrysan,
    'site-footer': SiteFooter,
    Consolelog,
  },
  data() {
    return {
      loading: false,
      logContents: ''
    }
  },
  created () {
    this.refreshData()
  },
  methods: {
    refreshData() {
      this.$axios.get('admin/logs?type=application').then( res => {
        this.logContents = res.data
      })
    }
  }
}
</script>