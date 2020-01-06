<template>
  <div class="login-container">
    <div>
      <div class="img-box">
        <div class="system_title">基础模板系统</div>
        <!-- <div class="system_title_2">数据创建像搭积木一样简单</div> -->
        <h6 class="system_desc">缩短了您与数据的距离,真正实现了数据的触手可及。同时也提供了命令行工具，方便您将算法嵌入到自己的工程中。</h6>
        <div>
          <h6>YOYOSYS</h6>
          <h6>北京友友天宇系统技术有限公司</h6>
        </div>
      </div>
      <div class="form-box">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
          hide-required-asterisk
        >
          <div class="title-container">
            <span class="title">登录</span>
          </div>
          <el-form-item label="用户名" prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入用户密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin: 22px 0;"
            @click.native.prevent="handleLogin"
          >登 录</el-button>

          <div class="tips">@2019</div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入有效的登录账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码长度不能小于5位!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #f7f7f7;
$light_gray: #a2a2a2;
$cursor: #a2a2a2;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-form-item__label {
    color: $light_gray;
    font-size: 14px;
    width: 100%;
  }
  .el-input {
    display: inline-block;
    height: 42px;
    width: 100%;
    background-color: #f7f7f7;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 4px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 42px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
}
</style>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #f7f7f7;
$light_gray: #a2a2a2;
$cursor: #a2a2a2;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-form-item__label {
    color: $light_gray;
    font-size: 14px;
    width: 100%;
  }
  .el-input {
    display: inline-block;
    height: 42px;
    width: 100%;
    background-color: #f7f7f7;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 4px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 42px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #f7f7f7 inset !important;
        -webkit-text-fill-color: #a2a2a2 !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #a2a2a2;

.login-container {
  height: 100%;
  width: 100%;
  background: url("../../assets/image/loginbg.png") repeat;
  position: relative;
  overflow: auto;
  > div {
    max-width: 940px;
    max-height: 636px;
    min-height: 380px;
    min-width: 640px;
    width: 50vw;
    height: 65vh;
    position: absolute;
    left: 25vw;
    top: 18vh;
    background: #fff;
    .img-box {
      float: left;
      width: 50%;
      height: 100%;
      background: url("../../assets/image/loginleft.png") no-repeat;
      background-position: 100% 100%;
      color: #fff;
      background-size: cover;
      padding: 0 40px;
      .system_title {
        position: absolute;
        top: 8vh;
        font-size: 28px;
        font-weight: bold;
        // font-family: "SourceHanSerifCN-Heavy";
      }
      .system_title_2 {
        position: absolute;
        top: 15vh;
        font-size: 28px;
        font-weight: bold;
        // font-family: "SourceHanSerifCN-Heavy";
      }
      .system_desc {
        position: relative;
        width: 100%;
        top: 20vh;
      }
      h1,
      h6 {
        margin: 0;
        letter-spacing: 1px;
      }
      h1 {
        // font-family: "SourceHanSerifCN-Heavy";
        line-height: 50px;
      }
      h6 {
        // font-family: "SourceHanSerifCN-Regular";
        line-height: 25px;
      }
      > div {
        position: absolute;
        bottom: 3vh;
        h6 {
          font-size: 12px;
        }
      }
    }
    .form-box {
      width: 50%;
      height: 100%;
      float: left;
      .login-form {
        // background: url("../../assets/image/loginbg.png") repeat;
        position: absolute;
        display: inline-block;
        width: 50%;
        top: 50%;
        left: 50%;
        transform: translate(0%, -50%);
        color: $light_gray;
        // font-family: "SourceHanSerifCN-Regular";
        padding: 5vh 40px;
        .title-container {
          margin-bottom: 40px;
          .title {
            font-size: 18px;
            font-weight: bold;
            border-bottom: 2px solid $light_gray;
          }
        }
      }
    }
  }

  .tips {
    font-size: 12px;
    color: $light_gray;
    margin-top: 8px;
    // font-family: "SourceHanSerifCN-Regular";
    text-align: center;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 42px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
