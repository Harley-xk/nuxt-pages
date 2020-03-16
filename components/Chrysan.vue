<template>
  <div class="chrysan d-flex justify-content-center mb-3"
       v-if="loading">
    <b-spinner type="grow"></b-spinner>
  </div>
</template>

<script>
export default {
  props: ['loading']
}
</script>

<style lang="css">
  
  .chrysan {
    flex-grow: 3;
  }

</style>