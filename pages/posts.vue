<template>
  <div>
  
  <NavigationBar current="文章"></NavigationBar>

    <h1>This is a post page</h1>
    
    <h5>Post id: {{id}}</h5>
  </div>
</template>

<script>

import NavigationBar from '~/components/NavigationBar.vue'

export default {
  components: {
    NavigationBar
  },
  created() {
    this.id = this.$route.query.id
    // this.title
  },
  data() {
    return {
      id: '',
      title: ''
    }
  },
}
</script>