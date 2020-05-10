<template>
  <div class="log-container">
    <div class="log-control">
      <!-- <span>更新时间: {{data.time}}</span> -->
      <!-- <span>删除</span> -->
      <b-tabs @activate-tab="indexChanged">
        <b-tab :title="date.name"
               v-for="(date, index) in days"
               :key="index">
        </b-tab>
      </b-tabs>
      <span class="log-control-placehokder"></span>
      <span>
        <input type="checkbox"
               v-model="breakLines"
               id="breakLines"
               name="breakLines">
        <label for="breakLines">自动换行</label>
      </span>
    </div>
    <chrysan :loading="loading"></chrysan>
    <consolelog :content="logContents"
                :breakLines="breakLines"></consolelog>
  </div>

</template>

<script>

import Chrysan from '~/components/Chrysan.vue'
import Consolelog from '~/components/ConsoleLog.vue';

export default {
  components: {
    Chrysan,
    Consolelog,
  },
  data () {
    return {
      loading: false,
      logContents: '',
      breakLines: false
    }
  },
  computed: {
    days () {
      var days = []
      for (const offset of [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]) {
        days.push(this.getDate(offset))
      }
      return days
    }
  },
  created () {
    this.refreshData(0)
  },
  methods: {
    async refreshData (index) {
      const date = this.days[index]
      try {
        this.loading = true
        const response = await this.$axios.get(`admin/logs/standard/${date.year}/${date.date}`)
        this.logContents = response.data
      } catch (error) {
        this.logContents = '获取失败：' + error.message
      } finally {
        this.loading = false
      }
    },
    getDate (offset) {
      const date = new Date()
      if (offset !== 0) {
        date.setDate(date.getDate() + offset);//获取AddDayCount天后的日期
      }
      var day = date.format("MM-dd")
      var name = day
      if (offset == 0) { name = '今天' }
      if (offset == -1) { name = '昨天' }
      if (offset == -2) { name = '前天' }
      return {
        name,
        year: date.getFullYear(),
        date: day
      }
    },
    indexChanged (newTabIndex, prevTabIndex, bvEvt) {
      this.refreshData(newTabIndex)
    }
  }
}
</script>

<style lang="css">
.log-container {
  margin: 2rem;
}
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
</style>