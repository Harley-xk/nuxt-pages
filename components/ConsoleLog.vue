<template>
  <div v-if="haveData">

    <div class="log-control">
      <span>更新时间: {{data.time}}</span>
      <!-- <span>删除</span> -->
      <span class="log-control-placehokder"></span>
      <span>
        <input type="checkbox"
               v-model="shouldBreakLines"
               id="breakLines"
               name="breakLines">
                     <label for="breakLines">自动换行</label>
      </span>
    </div>

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
  props: ["data"],
  data () {
    return {
      shouldBreakLines: false
    }
  },
  computed: {
    haveData () {
      let content = this.data.content
      return (content != undefined && content != null && content.length > 0)
    },
    coloredHtml () {
      return ansi_up.ansi_to_html(this.data.content)
    },
    preStyles () {
      return this.shouldBreakLines ? 'white-space: pre-wrap;' : ''
    }
  }
}
</script>

<style lang="css">
.log-control {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  color: #8c8c8c;
  font-size: 14px;
  line-height: 1.5rem;
}

.log-control-placehokder {
  flex-grow: 2;
}

.log-control span {
  margin: 0 0.5rem;
}

.log-control label {
  line-height: 1.5rem;
}

.log-content {
  background: #f4f4f4;
  padding: 0 2rem;
  border-radius: 8px;
  margin-top: 8px;
  word-break: break-all;
}
</style>