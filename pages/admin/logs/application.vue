<template>
  <div>
    
    <NavigationBar current="管理员"></NavigationBar>

    <div class="log-container">
        <chrysan :loading="loading"></chrysan>
        <consolelog :data="logContents"></consolelog>
    </div>
        
    <siteFooter></siteFooter>

  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'
import Chrysan from '~/components/Chrysan.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import Consolelog from '~/components/ConsoleLog.vue';

export default {
    components: {
    NavigationBar,
    Chrysan,
    SiteFooter,
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
      this.$axios.get('admin/logs/application').then( res => {
        this.logContents = res.data
      })
    }
  }
}
</script>

<style lang="css">

.log-container {
  margin: 2rem;
}
  
</style>