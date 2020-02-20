<template>
  <div class="banner-container">

    <style>
    :root {
      --banner-image: url('{{ image }}');
    }
    </style>

    <div class="banner-mask">
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
  width: 100vw;
  height: 60vw;
  min-height: 200px;
  max-height: 400px;
  display: block;
  background-size: cover;
  background-position: 50%;
  /* background-repeat: no-repeat; */
  background-image: var(--banner-image);
}

.banner-mask {
  height: 100%;
  width: 100%;
  color: white;
  font-size: 2rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
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