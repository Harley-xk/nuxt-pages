<template>
  <div class="d-flex justify-content-center mb-3"
       v-if="loading">
    <b-spinner type="grow"></b-spinner>
  </div>
</template>

<script>
export default {
  props: ['loading']
}
</script>