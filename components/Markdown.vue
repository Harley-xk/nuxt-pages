<template>
  <div v-html="rendered">

  </div>
</template>

<script>

import 'highlight.js/styles/atom-one-dark-reasonable.css'

var MarkdownIt = require('markdown-it')
var hljs = require('highlight.js')

var md = new MarkdownIt({
  highlight: function (str, lang) {
    // 添加这两行才能正确显示 <>
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");

    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

export default {
  props: ["content"],
  computed: {
    rendered () {
      var anchor = require('markdown-it-anchor').default
      md.use(anchor)
      return md.render(this.content)
    }
  }
}
</script>

<style lang="css">

h1::before,h2::before,h3::before {
  content: "sss";
  display: block;
  height: 64px;
  margin-top: -64px;
  visibility: hidden;
}

code {
  padding: 2px 4px;
  border-radius: 3px;
  background-color: #eee;
}

pre {
  overflow: auto;
  margin: 0;
  padding: 0.5rem 1rem !important;
  background-color: #eee;
  border-radius: 4px;
}

pre code {
  padding: 0;
  overflow: auto;
  overflow-wrap: normal;
  word-wrap: normal;
  white-space: pre;
    background-color: unset;
}
</style>