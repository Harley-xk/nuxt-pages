<template>
  <div class="post-sections-container">

    <div class="section-header">
      目录
    </div>

    <div v-for="(section, index) in sections"
         :key="index">
      <a :class="linkClass('first', section.title)"
         :href="'#' + section.title">{{section.title}}</a>
      <div v-for="(child, cindex) in section.children"
           :key="cindex">
      <a :class="linkClass('second', child.title)"
           :href="'#' + child.title">{{child.title}}</a>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: ['sections', 'active'],
  methods: {
    linkClass(level, title) {
      var cls = 'section-title'
      if (level && level.length > 0) {
        cls += ` section-${level}-level`
      }
      if (title === this.active) {
        cls += ` section-active`
      }
      return cls
    }
  }
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

.section-first-level {
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