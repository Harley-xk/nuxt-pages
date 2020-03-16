<template>
  <b-navbar toggleable="md"
            type="dark"
            variant="dark"
            sticky>
    <b-navbar-brand href="/">Harley's Studio</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse"
                is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="link in links"
                    :key="link.name"
                    :href="link.href"
                    :active="$route.path===link.href">
          {{link.name}}
        </b-nav-item>

        <!-- 管理员模块，只有管理员可见 -->
        <b-nav-item-dropdown v-if="isAdmin"
                             right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <span :class="isInAdmin ? 'nav-drop-active' : ''">
              管理员
            </span>
          </template>
          <b-dropdown-item v-for="link in adminLinks"
                           :key="link.name"
                           :href="link.href">
            {{link.name}}
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input name="key"
                        v-model="_keyword"
                        size="sm"
                        class="mr-sm-2"
                        placeholder="搜索文章"></b-form-input>
          <b-button size="sm"
                    class="my-2 my-sm-0"
                    @click="onSearch">
            <span class="iconfont icon-search"></span>
          </b-button>
        </b-nav-form>
        <div class="nav-link-user">
          <b-nav-item-dropdown v-if="isLogined"
                               right>
            <template v-slot:button-content>
              <em>{{user.nickname}}</em>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
            <b-dropdown-item @click="signOut">登出</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button class="btn-login"
                    variant="outline-light"
                    size="sm"
                    v-b-modal.modal-login
                    v-else>登录</b-button>
        </div>
      </b-navbar-nav>
    </b-collapse>
    <!-- 登录框 -->
    <loginSheet @logined="userDidLogin"></loginSheet>
  </b-navbar>
</template>

<script>

import LoginSheet from '~/components/LoginSheet.vue'

export default {
  components: {
    LoginSheet
  },
  data () {
    return {
      links: [
        {
          name: '文章',
          href: '/'
        },
        {
          name: '项目',
          href: '/projects'
        },
        {
          name: '关于',
          href: '/about'
        },
      ],
      adminLinks: [
        {
          name: '系统日志',
          href: '/admin/logs/application'
        },
        {
          name: '访问日志',
          href: '/admin/logs/accesslog'
        },
      ],
      isLogined: false,
      user: null,
      _keyword: ''
    }
  },
  props: {
    keyword: '',
  },
  computed: {
    isAdmin () {
      if (!this.isLogined || this.user == null) {
        return false
      }
      /// 拥有管理员权限
      return this.user.roles.indexOf('admin') >= 0
    },
    // 是否在管理员页面
    isInAdmin () {
      var root = this.$route.path.split('/')[1]
      console.log(this.$route)
      return (root && root === 'admin')
    },
    current () {
      return this.$route.path
    }
  },
  mounted () {
    this._keyword = this.keyword
    this.autoLogin()
          console.log('searching ' + this._keyword)
  },
  methods: {
    onSearch () {
      console.log('searching ' + this._keyword)
      this.$router.push({ name: 'index', query: { key: this._keyword }})
    },
    autoLogin () {
      this.isLogined = this.$userCenter.isLogined()
      if (!this.isLogined) {
        this.$axios.post('autoLogin').then(res => {
          if (res.status == 200) {
            this.userDidLogin(res)
          }
        })
      } else {
        var user = this.$userCenter.user
        this.isLogined = true
        this.user = user
      }
    },
    signOut () {
      this.$axios.post('signout').finally(res => {
        this.$userCenter.signOut()
        this.isLogined = false
        this.user = null
      })
    },
    userDidLogin (res) {
      this.$userCenter.userDidLogin(res.data)
      this.isLogined = true
      this.user = res.data.user
    }
  }
}
</script>

<style>
.navbar {
  padding: 0.25rem 1rem;
  box-shadow: 0px 2px 2px #00000055;
}

.navbar-nav {
  margin: 0;
}

.nav-drop-active {
  color: white;
}

@media screen and (min-width: 768px) {
  .nav-link-user {
    margin-left: 0.5rem;
  }

  .navbar-expand-md .navbar-nav {
    align-items: center;
  }
}

@media screen and (max-width: 768px) {
  .nav-link-user {
    margin: 0.5rem 0;
  }
}
</style>  