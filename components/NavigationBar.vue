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
                    :active="current===link.name">
          {{link.name}}
        </b-nav-item>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <span>管理员</span>
          </template>
          <b-dropdown-item href="/admin/logs">系统日志</b-dropdown-item>
          <b-dropdown-item href="#">其他</b-dropdown-item>
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
                    type="submit">
            <span class="iconfont icon-search"></span>
          </b-button>
        </b-nav-form>
        <div class="nav-link-user">
          <b-nav-item-dropdown v-if="isLogined"
                               right>
            <template v-slot:button-content>
              <em>{{username}}</em>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
            <b-dropdown-item @click="signOut">登出</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button class="btn-login"
                    variant="outline-light"
                    size="sm"
                    v-else>登录</b-button>
        </div>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  data () {
    return {
      links: [
        {
          name: '文章',
          href: '/'
        },
        {
          name: '项目',
          href: '/poojects'
        },
        {
          name: '关于',
          href: '/about'
        },
      ],
      isLogined: false,
      username: '',
    }
  },
  props: {
    current: '',
    keyword: '',
  },
  computed: {
    _keyword () {
      return this.keyword
    },
  },
  mounted () {
    this.autoLogin()
  },
  methods: {
    autoLogin () {
      this.isLogined = this.$userCenter.isLogined()
      if (!this.isLogined) {
        this.$axios.post('autoLogin').then(res => {
          if (res.status == 200) {
            this.$userCenter.userDidLogin(res.data)
            this.isLogined = true
            this.username = res.data.nickname
          }
        })
      } else {
        var user = this.$userCenter.user
        this.isLogined = true
        this.username = user.nickname
      }
    },
    signOut () {
      this.$axios.post('signout').then(res => {
        this.$userCenter.signOut()
        this.isLogined = false
        this.username = ''
      })
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