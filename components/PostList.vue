<template>
  <div class="post-list">
    <!-- <b-list-group> -->
    <div class="post-list-item"
         v-for="(item, index) in posts"
         :key="index">
      <a class="post-list-item-title"
         :href="'/posts/' + item.id">

        {{item.title}}
      </a>

      <div class="post-list-item-intro">
        {{item.intro}}
      </div>
      <div class="post-list-item-tags">
        <a class="post-tags-item"
           v-for="(tag, index) in item.tags"
           :key="index"
           :href="'/tags/' + tag">
          #{{tag}}
        </a>
      </div>
      <div class="post-list-item-foot">
        <span class="post-list-foot-item">
          <span class="iconfont icon-calendar"></span>
          {{item.date}}
        </span>
        <span class="post-list-foot-item">
          <span class="iconfont icon-view"></span>
          {{item.views}}
        </span>
        <span class="post-list-foot-item">
          <span class="iconfont icon-comment"></span>
          {{item.comments}}
        </span>
      </div>
    </div>
    <!-- </b-list-group> -->
  </div>
</template>

<script>
export default {
  props: ['posts']
}
</script>

<style lang="css">
/* .post-list {
  } */

.post-list-item {
  margin-bottom: 1rem;
  border-bottom: dashed 1px #d8d8d8;
}

.post-list-item-title {
  color: #333;
  font-weight: 500;
  font-size: 1.5rem;
}

.post-list-item-title:hover {
  color: rgb(255, 72, 0);
  text-decoration: none;
}

.post-list-item-intro {
  color: #8c8c8c;
  font-size: 1.1rem;
  padding: 0.5rem 0;
}

.post-list-item-tags {
  margin-bottom: 0.5rem;
}

.post-tags-item {
  color: #8c8c8c;
  font-size: 0.9rem;
  /* padding: 2px 4px; */
  margin-right: 4px;
  /* border: solid 1px #8c8c8c; */
  /* border-radius: 6px; */
}

.post-tags-item:hover {
  color: rgb(255, 72, 0);
}

.post-list-item-foot {
  padding-bottom: 0.5rem;
}

.post-list-foot-item {
  color: #444;
  font-size: 0.9rem;
  margin-right: 1rem;
}
</style>