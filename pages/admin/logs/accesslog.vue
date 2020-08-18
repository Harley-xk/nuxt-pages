<template>
  <div>

    <SplitContainer>

      <template v-slot:side-menu>
        <div class="type-menu">
          <div :class="menuItemClass('normal')"
               @click="toggleShowType('normal')">普通日志</div>
          <div :class="menuItemClass('all')"
               @click="toggleShowType('all')">全部日志</div>
        </div>
      </template>

      <template v-slot:menu-compact>
        <div class="type-menu">
          <span :class="menuItemClass('normal')"
                @click="toggleShowType('normal')">普通日志</span>
          <span :class="menuItemClass('all')"
                @click="toggleShowType('all')">全部日志</span>
        </div>
      </template>

      <chrysan :loading="loading"></chrysan>

      <div class="log-container">
        <div class="log-list-item"
             v-for="(log, index) in logsPage.items"
             :key="index">
          <div :class="logListClass(log)"
               @click="toggleDetails(log.id)">
            <span class="log-item log-time">
              <span class="iconfont icon-time"></span>
              <span>{{ log.createdAt | dateString }}</span>
            </span>
            <span class="log-item log-page">
              <span class="iconfont icon-page"></span>
              <span>{{log.request.method}} • {{log.request.url}}</span>
            </span>
            <span class="flex-placeholder"></span>
            <span class="log-item log-address">
              <span class="iconfont icon-address"></span>
              <span>{{geoLocation(log)}}</span>
            </span>
          </div>

          <AccessLog class="log-list-detail"
                     v-if="showDetails===log.id"
                     :log="log"></AccessLog>
        </div>
      </div>
      <div>
        <b-pagination-nav class="pagination-nav"
                          v-show="logsPage.metadata.total > pageSize"
                          :link-gen="linkGen"
                          :number-of-pages="totalPages"></b-pagination-nav>
      </div>
    </SplitContainer>
  </div>
</template>

<script>

import Chrysan from '~/components/Chrysan.vue'
import Consolelog from '~/components/ConsoleLog.vue';
import SplitContainer from '~/components/SplitContainer.vue';
import AccessLog from '../../../components/AccessLog'

export default {
  components: {
    Chrysan,
    Consolelog,
    SplitContainer,
    AccessLog
  },
  data () {
    return {
      loading: false,
      pageSize: 100,
      logsPage: {
        items: [],
        metadata: {
          page: 1,
          per: 10,
          total: 1
        }
      },
      showDetails: 0,
      showType: 'normal',
    }
  },
  mounted () {
    var page = this.$route.query.page
    var type = this.$route.query.type
    this.refreshData(page, type)
  },
  computed: {
    totalPages () {
      return Math.ceil(this.logsPage.metadata.total / this.pageSize)
    }
  },
  methods: {
    refreshData (page) {
      if (page === null || page === undefined) {
        page = 1
      }
      this.loading = true
      var query = `page=${page}&per=${this.pageSize}&type=${this.showType}`
      this.$axios.get(`admin/logs/accesslog?` + query).then(res => {
        this.logsPage = res.data
        this.loading = false
      })
    },
    menuItemClass (type) {
      var cls = "type-menu-item"
      if (type === this.showType) {
        cls += " active"
      }
      return cls
    },
    toggleShowType (type) {
      if (this.showType === type) {
        return
      } else {
        this.showType = type
        this.refreshData()
      }
    },
    logListClass (log) {
      var cls = 'log-list-brief '
      var status = log.response.status
      if (status >= 200 && status < 300) {
        cls += 'log-status-normal'
      } else if (status >= 300 && status < 400) {
        cls += 'log-status-warning'
      } else if (status >= 400 && status < 500) {
        cls += 'log-status-danger'
      } else {
        cls += 'log-status-error'
      }
      return cls
    },
    geoLocation (log) {
      var string = ''
      if (log.geoLocation) {
        let location = log.geoLocation
        if (location.city) {
          string += location.city
        }
        if (location.country) {
          string += ' • ' + location.country
        }
        return string
      } else {
        return log.ip
      }
    },
    toggleDetails (id) {
      if (this.showDetails === id) {
        this.showDetails = 0
      } else {
        this.showDetails = id
      }
    },
    linkGen (pageNum) {
      // this.postPage.items = []
      // this.refreshData(pageNum)
      return pageNum === 1 ? '/admin/logs/accesslog' : `?page=${pageNum}&per=${this.pageSize}`
    },
  }
}

</script>

<style lang="css">
.type-menu {
  padding: 1rem;
}

.type-menu-item {
  margin-bottom: 10px;
  text-align: center;
  cursor: pointer;
  padding: 0.5rem;
}

.type-menu-item:hover {
  color: #42b983;
}

.type-menu .active {
  font-weight: bold;
  color: #42b983;
}

pre {
  color: #666666;
  white-space: pre-wrap;
  word-break: break-all;
}

.log-list-item {
  padding: 0.5rem;
  border-radius: 4px;
}

.log-list-brief {
  display: flex;
  flex-wrap: wrap;
}

.log-list-detail {
  margin: 0.5rem;
}

.log-list-detail .tab-content {
  padding: 0 0.5rem;
}

.log-status-normal {
  color: #444;
}

.log-status-warning {
  color: rgb(224, 158, 15);
}

.log-status-danger {
  color: #eb4f06;
}

.log-status-error {
  color: #eb0606;
}

.log-list-item:hover {
  background-color: #f4f4f4;
}

.log-list-item:hover .log-page {
  font-weight: bold;
}

.log-item {
  margin: 0 0.25rem;
}

.log-time,
.log-address {
  color: #ccc;
}

@media screen and (max-width: 500px) {
  .log-address {
    width: 100%;
  }
  .log-page {
    width: 100%;
  }
}

.log-tab-unit-header {
  display: inline-block;
  width: 4rem;
  text-align: right;
  color: #8c8c8c;
  font-size: 0.85rem;
}
</style>