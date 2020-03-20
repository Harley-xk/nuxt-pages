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
          <div class="log-list-brief"
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

          <div class="log-list-detail"
               v-if="showDetails===log.id">
            <b-tabs content-class="mt-3">
              <b-tab title="地址"
                     active>
                <div>
                  <span class="log-tab-unit-header">城市：</span>
                  <span class="log-tab-unit">{{log.geoLocation.city}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">地区：</span>
                  <span class="log-tab-unit">{{log.geoLocation.regionName}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">国家：</span>
                  <span class="log-tab-unit">{{log.geoLocation.country}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">时区：</span>
                  <span class="log-tab-unit">{{log.geoLocation.timezone}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">IP：</span>
                  <span class="log-tab-unit">{{log.geoLocation.query}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">ISP：</span>
                  <span class="log-tab-unit">{{log.geoLocation.isp}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">经纬度：</span>
                  <span class="log-tab-unit">{{log.geoLocation.lon}}，{{log.geoLocation.lat}}</span>
                </div>
              </b-tab>
              <b-tab title="请求">
                <div>
                  <span class="log-tab-unit-header">Method：</span>
                  <span class="log-tab-unit">{{log.request.method}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">URL：</span>
                  <span class="log-tab-unit">{{log.request.url}}</span>
                </div>
                <div v-if="log.request.query !== undefined && log.request.query.length > 0">
                  <span class="log-tab-unit-header">Query：</span>
                  <span class="log-tab-unit">{{log.request.query}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">Headers：</span>
                  <pre>{{log.request.headers}}</pre>
                </div>
                <div v-if="log.request.body.length > 0">
                  <span class="log-tab-unit-header">Body：</span>
                  <pre>{{JSON.stringify(JSON.parse(log.request.body), null, 2)}}</pre>
                </div>
              </b-tab>
              <b-tab title="响应">
                <div>
                  <span class="log-tab-unit-header">Status：</span>
                  <span class="log-tab-unit">{{log.response.status}}</span>
                </div>
                <div>
                  <span class="log-tab-unit-header">Headers：</span>
                  <pre>{{log.response.headers}}</pre>
                </div>
                <div v-if="log.request.body.length > 0">
                  <span class="log-tab-unit-header">Body：</span>
                  <pre>{{JSON.stringify(JSON.parse(log.response.body), null, 2)}}</pre>
                </div>
              </b-tab>
            </b-tabs>
          </div>
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

export default {
  components: {
    Chrysan,
    Consolelog,
    SplitContainer,
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

.log-list-item:hover {
  background-color: #f4f4f4;
}

.log-list-item:hover .log-page {
  color: #42b983;
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