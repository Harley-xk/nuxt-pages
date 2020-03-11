<template>
  <div class="error-page">
    <img src="/images/404-mars.png"
         alt="">
    <div>
      <p class="error-message">啊，不小心来到火星了！</p>
      <NuxtLink class="error-link"
                to="/">🚀 送我回地球</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message || '<%= messages.client_error %>'
    }
  },
  head () {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  }
}
</script>

<style>
.error-page {
  padding: 1rem;
  background: #101125;
  color: #47494e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.error-page img {
  max-width: 100%;
}

.error-message {
  font-size: 1.5rem;
  font-weight: 400;
  color: #aaa;
}

.error-link {
  color: #888;
}

.error-link:hover {
  color: white;
}
</style>
