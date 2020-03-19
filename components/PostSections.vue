<template>
  <div class="post-sections-container">

    <div class="section-header">
      目录
    </div>

    <div v-for="(section, index) in sections"
         :key="index">
      <a :class="linkClass('first', section.title)"
         :href="'#' + section.title">{{section.title}}</a>
      <div v-for="(child, cindex) in section.children"
           :key="cindex">
        <a :class="linkClass('second', child.title)"
           :href="'#' + child.title">{{child.title}}</a>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: ['sections'],
  data () {
    return {
      active: ''
    }
  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll)
  },
  destroy () {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    linkClass (level, title) {
      var cls = 'section-title'
      if (level && level.length > 0) {
        cls += ` section-${level}-level`
      }
      if (title === this.active) {
        cls += ` section-active`
      }
      return cls
    },
    onScroll () {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('h1,h2,h3')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n
        }
      }
      // 把下标赋值给 vue 的 data
      this.active = navContents[navIndex].innerHTML
    },
  }
}
</script>

<style>
.section-header {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ccc;
}

.post-sections-container {
  padding: 1rem 0rem;
}

.section-first-level {
  font: 1.25rem;
  color: #888;
}

.section-second-level {
  font: 1rem;
  color: #aaa;
  padding-left: 1rem;
}

.section-title:hover {
  color: #42b983;
}

.section-active {
  color: #42b983;
}
</style>