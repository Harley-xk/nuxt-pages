<template>
  <div class="banner-container">
    <img :src="image">
    <div class="banner-cover">
      <div class="banner-title">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['image']
}
</script>

<style lang="css">
.banner-container {
  position: relative;
  width: 100vw;
  height: 60vw;
  min-height: 200px;
  max-height: 400px;
  display: block;
}

.banner-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

.banner-cover {
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
}

.banner-title {
  width: 100%;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}
</style>