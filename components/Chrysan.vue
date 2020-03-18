<template>
  <div class="chrysan d-flex justify-content-center mb-3"
       v-if="loading">
    <b-spinner class="chrysan-core" :small="small"
               type="grow"></b-spinner>
  </div>
</template>

<script>
export default {
  props: {
    loading: false,
    small: false
  }
}
</script>

<style lang="css">
.chrysan {
  flex-grow: 3;
}
.chrysan-core {
  margin: auto;
}
</style>