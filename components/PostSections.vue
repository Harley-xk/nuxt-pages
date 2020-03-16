<template>
  <div class="post-sections-container">

    <div class="section-header">
      目录
    </div>

    <div v-for="(section, index) in sections"
         :key="index">
      <a class="section-title section-frist-level"
         :href="'#' + section.title">{{section.title}}</a>
      <div v-for="(child, cindex) in section.children"
           :key="cindex">
        <a class="section-title section-second-level"
           :href="'#' + child.title">{{child.title}}</a>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: ['sections']
}
</script>

<style>
.section-header {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ccc;
}

.post-sections-container {
  padding: 1rem 0rem;
}

.section-frist-level {
  font: 1.25rem;
  color: #888;
}

.section-second-level {
  font: 1rem;
  color: #aaa;
  padding-left: 1rem;
}

.section-title:hover {
  color: #42b983;
}

.section-active {
  color: #42b983;
}

</style>