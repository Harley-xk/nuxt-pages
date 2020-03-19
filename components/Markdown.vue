<template>
  <div :class="markdownClass"
       v-html="rendered">

  </div>
</template>

<script>

import 'highlight.js/styles/atom-one-dark-reasonable.css'

var MarkdownIt = require('markdown-it')
var hljs = require('highlight.js')

function markdownRender () {
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
        } catch (__) { }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });
  return md
}

var md = markdownRender()
var mdAnchored = markdownRender()

export default {
  props: {
    content: {
      required: true
    },
    anchor: {
      default: "0"
    },
  },
  computed: {
    markdownClass () {
      var cls = 'markdown-content'
      if (this.anchor === "1") {
        cls += ' markdown-anchored'
      }
      return cls
    },
    rendered () {
      if (this.anchor === "1") {
        var anchor = require('markdown-it-anchor').default
        mdAnchored.use(anchor)
        return mdAnchored.render(this.content)
      }
      return md.render(this.content)
    },
  }
}
</script>

<style lang="css">
.markdown-anchored h1::before,
.markdown-anchored h2::before,
.markdown-anchored h3::before {
  content: "";
  display: block;
  height: 64px;
  margin-top: -64px;
  visibility: hidden;
  pointer-events: none;
}

.markdown-anchored h1,
.markdown-anchored h2,
.markdown-anchored h3 {
  pointer-events: none;
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