<template>
  <b-container class="split-container">

    <div class="split-side-menu">
      <slot name="side-menu"></slot>
    </div>

    <div class="split-content">
      <slot></slot>
    </div>

  </b-container>
</template>

<style lang="css">
.split-container {
  display: flex;
  margin: 2rem auto;
  min-height: 100vh;
}
.split-content {
  flex-grow: 1;
  padding: 1rem;
  overflow: hidden;
}

.split-side-menu {
  top: 60px;
  height: 100%;
  position: sticky;
  overflow: auto;
}

/*当页面宽度小于 960px 的时候执行包裹的css*/
@media screen and (max-width: 991px) {
  .split-side-menu {
    display: none;
  }
  .split-content {
    margin-left: 0;
  }
}

/*当页面宽度大于 960px 的时候执行包裹的css*/
@media screen and (min-width: 991px) {
  .split-side-menu {
    flex-shrink: 0;
    flex-basis: 200px;
  }
  .split-content {
    margin-left: 2rem;
  }
}
</style>