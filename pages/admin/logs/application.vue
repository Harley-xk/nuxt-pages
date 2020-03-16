<template>
  <div>
    
    <div class="log-container">
        <chrysan :loading="loading"></chrysan>
        <consolelog :data="logContents"></consolelog>
    </div>
        
  </div>
</template>

<script>

import Chrysan from '~/components/Chrysan.vue'
import Consolelog from '~/components/ConsoleLog.vue';

export default {
    components: {
    Chrysan,
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