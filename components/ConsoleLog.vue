<template>
  <div v-if="content">
    <pre class="log-content"
         :style="preStyles">
          <div v-html="coloredHtml"></div>
    </pre>
    <!-- <div>{{coloredHtml}}</div> -->
  </div>
</template>

<script>

var AU = require('ansi_up');
var ansi_up = new AU.default;

export default {
  props: {
    content: { type: String, default: '' },
    breakLines: { type: Boolean, default: false }
  },
  computed: {
    coloredHtml () {
      return ansi_up.ansi_to_html(this.content)
    },
    preStyles () {
      return this.breakLines ? 'white-space: pre-wrap;' : ''
    }
  }
}
</script>

<style lang="css">
.log-content {
  background: #f4f4f4;
  padding: 0 2rem;
  border-radius: 8px;
  margin-top: 8px;
  word-break: break-all;
}
</style>