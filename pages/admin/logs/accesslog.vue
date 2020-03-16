<template>
  <div>

    <div class="log-container">
      <chrysan :loading="loading"></chrysan>

      <div class="log-item-card"
           v-for="log in logsPage.items"
           :key="log.id">
        <b-card>
          <b-row>
            <b-col size="1">
              <span class="iconfont icon-page"></span>
              <span>{{log.page}}</span>
            </b-col>
            <span v-b-toggle="'collapse' + log.id"
                  class="log-btn-details iconfont icon-icon-details"></span>
          </b-row>
          <b-row>
            <b-col size="1">
              <span class="iconfont icon-address"></span>
              <span>{{geoLocation(log)}}</span>
            </b-col>
            <b-col size="1">
              <span class="iconfont icon-time"></span>
              <span>{{ log.createdAt | dateString }}</span>
            </b-col>
          </b-row>

          <b-collapse :id="'collapse' + log.id"
                      class="mt-2">
            <div class="log-item-details">
              <b-row class="log-item-details-tag">
                <span class="iconfont icon-tag"></span>
                <span>请求</span>
              </b-row>
              <pre>{{log.request}}</pre>
            </div>

            <div class="log-item-details">
              <b-row class="log-item-details-tag">
                <span class="iconfont icon-tag"></span>
                <span>响应</span>
              </b-row>
              <pre>{{log.response}}</pre>
            </div>

            <div class="log-item-details">
              <b-row class="log-item-details-tag">
                <span class="iconfont icon-tag"></span>
                <span>地址</span>
              </b-row>
              <pre>{{JSON.stringify(log.geoLocation, null, 2)}}</pre>
            </div>

          </b-collapse>

        </b-card>
      </div>

      <b-pagination-nav class="pagination-nav"
                        v-show="logsPage.metadata.total > pageSize"
                        :link-gen="linkGen"
                        :number-of-pages="totalPages"></b-pagination-nav>
    </div>

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
      pageSize: 40,
      logsPage: {
        items: [],
        metadata: {
          page: 1,
          per: 10,
          total: 1
        }
      }
    }
  },
  mounted () {
    var page = this.$route.query.page
    if (page === null || page === undefined) {
      page = 1
    }
    var key = this.$route.query.key
    if (key === null || key === undefined) {
      key = ''
    }
    this.refreshData(page, key)
  },
  computed: {
    totalPages () {
      return Math.ceil(this.logsPage.metadata.total / this.pageSize)
    }
  },
  methods: {
    refreshData (page, key) {
      this.loading = true
      var query = 'page=' + page + '&per=' + this.pageSize
      this.$axios.get(`admin/logs/accesslog?` + query).then(res => {
        this.logsPage = res.data
        this.loading = false
      })
    },
        geoLocation (log) {
      var string = ''
      if (log.geoLocation) {
        let location = log.geoLocation
        if (location.city) {
          string += location.city
        }
        if (location.country) {
          string += ' · ' + location.country
        }
        return string
      } else {
        return log.ip
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
pre {
  color: #666666;
  white-space: pre-wrap;
  word-break: break-all;
}

.log-container {
  display: flex;
  flex-wrap: wrap;
}

.log-item-card {
  margin: 0.5rem;
}

.log-btn-details {
  padding: 0 1rem;
}

.log-btn-details:hover {
  color: rgb(255, 72, 0);
}

.log-item-details {
  margin: 1rem;
}

.log-item-details-tag span {
  font-size: 0.85rem;
  padding-right: 5px;
  color: rgb(255, 72, 0);
}

@media screen and (min-width: 1600px) {
  .log-container {
    margin: 1rem 5rem;
  }
  .log-item-card {
    margin: 1rem;
    width: calc(33% - 2rem);
  }
}

@media screen and (max-width: 1600px) {
  .log-container {
    margin: 1rem 2rem;
  }
  .log-item-card {
    width: calc(50% - 1rem);
  }
}

@media screen and (max-width: 800px) {
  .log-container {
    margin: 1rem 0.5rem;
  }
  .log-item-card {
    width: 100%;
  }
}
</style>