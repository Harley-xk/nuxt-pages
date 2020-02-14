<template>
  <div class="side-menu">

    <img class="side-menu-avatar"
         src="/images/avatar.jpg"
         alt="">

    <div class="side-menu-author">
      Harley-xk
    </div>

    <div class="side-menu-subtitle">
      Swift developer
    </div>

    <div class="side-menu-motto">
      给时光以生命，给岁月以文明
    </div>

    <div class="side-menu-contact">

      <a class="side-menu-contact-icon"
         href="https://github.com/Harley-xk">
        <span class="iconfont icon-github"></span>
      </a>

      <a class="side-menu-contact-icon"
         href="https://weibo.com/u/1161848005">
        <span class="iconfont icon-weibo"></span>
      </a>

      <b-popover target="popover-target-wechat"
                 triggers="hover"
                 placement="bottomright">
        <!-- <template v-slot:title>Popover Title</template> -->
        <img class="side-menu-contact-icon-popover" src="/images/wechat.jpg" alt="">
      </b-popover>

      <a class="side-menu-contact-icon"
         id="popover-target-wechat">
        <span class="iconfont icon-wechat"></span>
      </a>

      <b-popover target="popover-target-qq"
                 triggers="hover"
                 placement="bottomright">
        <!-- <template v-slot:title>Popover Title</template> -->
        <img class="side-menu-contact-icon-popover" src="/images/qq.jpg" alt="">
      </b-popover>

      <a class="side-menu-contact-icon"
         id="popover-target-qq">
        <span class="iconfont icon-qq"></span>
      </a>

      <a class="side-menu-contact-icon"
         href="https://paypal.me/harley491078160"
         target="blank">
        <span class="iconfont icon-paypal"></span>
      </a>

      <a class="side-menu-contact-icon"
         href="mailto:harley.gb@foxmail.com">
        <span class="iconfont icon-email"></span>
      </a>

    </div>

  </div>
</template>

<style scpoed>
.side-menu {
  padding: 1rem;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
}

.side-menu-avatar {
  width: 100%;
  height: auto;
  /* margin: 1rem; */
  border-radius: 5px;
}

.side-menu-author {
  font-size: 1.5rem;
  font-weight: 500;
}

.side-menu-subtitle {
  font-size: 0.85rem;
  color: #888;
}

.side-menu-motto {
  margin-top: 0.5rem;
}

.side-menu-contact {
  margin-top: 1rem;
}

.side-menu-contact-icon {
  margin: 0 2px;
}

.side-menu-contact-icon .iconfont {
  color: #888;
  font-size: 1.2rem;
}

.side-menu-contact-icon:hover {
  text-decoration: none;
}
.side-menu-contact-icon .iconfont:hover {
  color: black;
}

.side-menu-contact-icon-popover {
  width: 100%;
  height: auto;
}

</style>