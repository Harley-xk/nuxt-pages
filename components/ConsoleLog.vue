<template>
  <div v-if="haveData">

    <div class="log-control">
      <span>更新时间: {{data.time}}</span>
      <div>
        <input type="checkbox"
               v-model="shouldBreakLines"
               id="breakLines"
               name="breakLines">
        <label for="breakLines">自动换行</label>
      </div>

    </div>

    <pre :style="preStyles">
          <div v-html="coloredHtml" class="console-log"></div>
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
  align-items: center;
  color: #8c8c8c;
  font-size: 14px;
}

.log-control label {
  margin: 0 4px;
  line-height: 16px;
}
</style>