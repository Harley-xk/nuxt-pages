<template>
  <div class="post-list">
    <!-- <b-list-group> -->
    <div class="post-list-item"
         v-for="(item, index) in preocessedPosts"
         :key="index">
      <a class="post-list-item-title"
         :href="'/post?id=' + item.id" v-html="item.title">
      </a>

      <div class="post-list-item-intro" v-html="item.intro">
      </div>
      <div class="post-list-item-tags">
        <a class="post-tags-item"
           v-for="(tag, index) in item.tags"
           :key="index"
           :href="'/tags/' + tag">
          <span class="iconfont icon-tag"></span>{{tag}}
        </a>
      </div>
      <div class="post-list-item-foot">
        <span class="post-list-foot-item">
          <span class="iconfont icon-calendar-2"></span> {{item.date}}
        </span>
        <span class="post-list-foot-item">
          <span class="iconfont icon-reading"></span>
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
  props: ['posts', 'highlighting'],
  computed: {
    preocessedPosts() {
      if (this.highlighting && this.highlighting.length > 0) {
        this.posts.map((item, index) => {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.highlighting, 'ig')
          // 高亮替换v-html值
          let replaceString =
            '<span class="searching-hilighted">' + this.highlighting + '</span>'
            console.log('replacing ' + this.posts[index])
          this.posts[index].title = item.title.replace(replaceReg,replaceString)
          if (this.posts[index].intro && this.posts[index].intro.length > 0) {
          this.posts[index].intro = item.intro.replace(replaceReg,replaceString)
          }
        })
      }        
      return this.posts
    }
  }
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
    text-decoration: none;
}

.post-tags-item .iconfont {
  font-size: 12px;
  margin-right: 4px;
}

.searching-hilighted {
    color: rgb(255, 72, 0);
}

/* 
.post-tags-item .iconfont:hover {
  text-decoration: none;
} */

.post-list-item-foot {
  padding-bottom: 0.5rem;
}

.post-list-foot-item {
  color: #444;
  font-size: 0.9rem;
  margin-right: 1rem;
}

.post-list-foot-item .iconfont {
  font-size: 12px;
}
</style>