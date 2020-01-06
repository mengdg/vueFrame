<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="show" class="verticalSidebar">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar :show="show" />
        </div>
        <app-main />
      </div>
    </div>
    <div v-else class="horizontalSidebar">
      <horizontal-sidebar />
      <div class="main-container">
        <div :class="{'fixed-header':false}">
          <!-- <navbar :show="show" /> -->
        </div>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import HorizontalSidebar from './components/HorizontalSidebar/index.vue'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    HorizontalSidebar
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters([
      'navbarPosition'
    ])
  },
  data() {
    return {
      show: true // 切换导航位置。为true时左侧，false时为上方
    }
  },
  mounted() {
    // console.log(this.$router, "sss");
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.horizontalSidebar {
  .main-container {
    margin-left: 0 !important;
  }
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
