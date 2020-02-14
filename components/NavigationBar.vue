<template>
  <b-navbar toggleable="lg"
            type="dark"
            variant="dark" sticky>
    <b-navbar-brand href="#">Harley's Studio</b-navbar-brand>

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
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm"
                        class="mr-sm-2"
                        placeholder="搜索文章"></b-form-input>
          <b-button size="sm"
                    class="my-2 my-sm-0"
                    type="submit">搜索</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
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
          name: '首页',
          href: '/'
        },
        {
          name: '文章',
          href: '/post'
        },
        {
          name: '关于',
          href: '/about'
        },
      ]
    }
  },
  props: {
    current: ''
  }
}
</script>