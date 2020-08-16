<template>
  <b-tabs class="component-accesslogs"
          content-class="mt-3">
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
        <pre>{{ log.request.body | formatJSON }}</pre>
      </div>
    </b-tab>
    <b-tab :title="'响应('+ log.response.status + ')'">
      <div>
        <span class="log-tab-unit-header">Status：</span>
        <span class="log-tab-unit">{{log.response.status}}</span>
      </div>
      <div v-if="log.response.headers.length > 0">
        <span class="log-tab-unit-header">Headers：</span>
        <pre>{{log.response.headers}}</pre>
      </div>
      <div v-if="log.response.body.length > 0">
        <span class="log-tab-unit-header">Body：</span>
        <pre>{{log.response.body | formatJSON }}</pre>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  props: {
    log: { type: Object }
  }
}
</script>