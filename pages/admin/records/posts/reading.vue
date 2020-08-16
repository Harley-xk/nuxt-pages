<template>
  <div class="page-records posts-reading">

    <div class="status">
      <chrysan :loading="loading"></chrysan>
      <div v-if="Boolean(message)"
           style="color:red">{{message}}</div>
    </div>

    <div class="log-container">
      <div class="log-list-item"
           v-for="(record, index) in dataList"
           :key="index">
        <div class="log-list-brief"
             @click="toggleDetails(record.id)">
          <span class="log-item log-time">
            <span class="iconfont icon-time"></span>
            <span>{{ record.createdAt | dateString }}</span>
          </span>
          <span class="log-item log-page">
            <span class="iconfont icon-page"></span>
            <span>{{record.post.title}}</span>
          </span>
          <span class="flex-placeholder"></span>
          <span class="log-item log-address">
            <span class="iconfont icon-address"></span>
            <span>{{geoLocation(record)}}</span>
          </span>
        </div>

        <AccessLog class="log-list-detail"
                   v-if="showDetails===record.id"
                   :log="record.accessLog"></AccessLog>
      </div>
    </div>
    <div>
      <b-pagination-nav class="pagination-nav"
                        v-show="pageInfo.total > pageInfo.per"
                        :link-gen="linkGen"
                        :number-of-pages="totalPages"></b-pagination-nav>
    </div>
  </div>
</template>

<script>
import AccessLog from '../../../../components/AccessLog'

export default {
  components: { AccessLog },
  data () {
    return {
      loading: false,
      showDetails: 0,
      message: '',
      dataList: [],
      pageInfo: {
        page: 1,
        per: 100,
        total: 0
      }
    }
  },
  computed: {
    totalPages () {
      return Math.max(Math.ceil(this.pageInfo.total / this.pageInfo.per), 1)
    }
  },
  mounted () {
    if (this.$route.query.page) {
      this.pageInfo.page = this.$route.query.page
    }
    if (this.$route.query.per) {
      this.pageInfo.per = this.$route.query.per
    }
    this.loadDataByPage()
  },
  methods: {
    async loadDataByPage () {
      try {
        this.loading = true
        // var from = (new Date())
        // from.setDate(31)
        const response = await this.$axios.get('/admin/records/posts/read', {
          params: {
            page: this.pageInfo.page,
            per: this.pageInfo.per,
            // from: from.getTime() / 1000
          }
        })
        this.dataList = response.data.items
        this.pageInfo = response.data.metadata
      } catch (error) {
        this.message = error.message
      } finally {
        this.loading = false
      }
    },
    geoLocation (record) {
      var string = ''
      if (record.accessLog.geoLocation) {
        let location = record.accessLog.geoLocation
        if (location.city) {
          string += location.city
        }
        if (location.country) {
          string += ' • ' + location.country
        }
        return string
      } else {
        return record.accessLog.ip
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
      return `?page=${pageNum}&per=${this.pageInfo.per}`
    },
  }

}
</script>

<style lang="scss">
.page-records {
  padding: 30px 15px;

  .status {
    text-align: center;
  }

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
}
</style>