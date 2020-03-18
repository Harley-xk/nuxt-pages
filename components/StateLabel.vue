<template>
  <span class="state-label" v-if="message.length > 0">
    <span :class="stateClass">{{message}}</span>
  </span>
</template>

<script>
export default {
  props: ['state', 'message'],
  computed: {
    stateClass () {
      return 'state-label state-label-' + this.state
    }
  }
}
</script>

<style lang="css">

.state-label-idel {
  color: #8c8c8c;
}

.state-label-warning {
  color: #f5c62b;
}

.state-label-error {
  color: red;
}

.state-label-active {
  color: #42b983;
}

.state-label-success {
  color: #42b983;
}
</style>