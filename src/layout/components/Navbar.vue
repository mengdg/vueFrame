<template>
  <div class="navbar">
    <hamburger
      v-show="show"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div v-show="show" class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          {{ name }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="showThemeVisible">主题</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="设置主题" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="主题颜色" label-width="150px">
          <el-switch
            v-model="themes"
            active-color="#ccc"
            inactive-color="#000"
            active-text="浅色"
            inactive-text="深色"
            active-value="white"
            inactive-value="black"
          />
        </el-form-item>
        <!-- <el-form-item label="导航位置" label-width="150px">
          <el-switch
            v-model="navbarPositions"
            active-text="左侧"
            inactive-text="上方"
            active-value="left"
            inactive-value="top"
          />
        </el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      themes: 'white',
      navbarPositions: 'left',
      dialogVisible: false,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'theme',
      'navbarPosition',
    ]),
  },
  watch: {
    themes: function(val) {
      this.$store.dispatch('app/setTheme', val)
    },
    navbarPositions: function(val) {
      this.$store.dispatch('app/setNavbarPosition', val)
    },
  },
  created() {
    this.themes = this.theme
    document.body.className = 'theme-' + this.theme
    this.navbarPositions = this.navbarPosition
  },
  methods: {
    showThemeVisible() {
      this.dialogVisible = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
.text-center {
  text-align: center;
}
</style>
