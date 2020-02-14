<template>
  <div>

    <NavigationBar current="首页"></NavigationBar>

    <div class="banner">
      <!-- <img src="/images/2020.jpg" alt=""> -->

    </div>
    <div class="container">

      <logo />

      <h1 class="title">
        nuxt-pages
      </h1>
      <h2 class="subtitle">
        Web pages for Vapor Blog Project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/"
           target="_blank"
           class="button--green">
          Documentation
        </a>
        <a href="https://github.com/nuxt/nuxt.js"
           target="_blank"
           class="button--grey">
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import Logo from '~/components/Logo.vue'
import NavigationBar from '~/components/NavigationBar.vue'

export default {
  components: {
    Logo,
    NavigationBar,
  }
}
</script>

<style>
.container {
  margin: 2rem auto;
  min-height: 100vh;
  /* display: flex; */
  /* justify-content: center;
  align-items: center;
  text-align: center; */
}

.banner {
  width: 100%;
  height: 400px;
  display: block;
  background-size: cover;
  background-position: 0px;
  /* background-repeat: no-repeat; */
  background-image: url(/images/2020.jpg);
}

.banner img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
