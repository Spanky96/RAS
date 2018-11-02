<template>
  <div class="login-container pull-height full-screen">
    <div class="login-info"></div>
    <div class="login-border animated fadeInRight">
      <div class="login-main">
        <h4 class="login-title">欢&nbsp;迎&nbsp;登&nbsp;录
        </h4>
        <div class="el-tabs el-tabs--top">
          <div class="el-tabs__header is-top">
            <div class="el-tabs__nav-wrap is-top">
              <div class="el-tabs__nav-scroll">
                <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);">
                  <div class="el-tabs__active-bar is-top"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="el-tabs__content">
            <div class="userdenglu">
              <form class="el-form login-form">
                <div class="el-form-item el-form-item--feedback is-required">
                  <div class="el-form-item__content" style="margin-left: 0px;">
                    <div class="el-input el-input--small el-input--prefix">
                      <input type="text" autocomplete="off" placeholder="请输入用户名" class="el-input__inner" v-model="username">
                      <span class="el-input__prefix"><i class="iconfont icon-yonghu"></i></span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback is-required">
                  <div class="el-form-item__content" style="margin-left: 0px;">
                    <div class="el-input el-input--small el-input--prefix el-input--suffix">
                      <input autocomplete="off" placeholder="请输入密码" class="el-input__inner password-input" :class="{'show-password': showPassword}" v-model="password"><span
                        class="el-input__prefix"><i class="iconfont icon-mima"></i>
                        </span>
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner" style="cursor:pointer;"  @click="showPassword = !showPassword;">
                            <i class="el-icon-view el-input__icon"></i>
                          </span>
                        </span>
                    </div>
                  </div>
                </div>
                <div class="el-form-item el-form-item--feedback is-required">
                  <div class="el-form-item__content" style="margin-left: 0px;">
                    <div class="el-row" span="24">
                      <div class="el-col el-col-14">
                        <div class="el-input el-input--small el-input--prefix">
                          <input type="text" autocomplete="off" maxlength="4" placeholder="请输入验证码" class="el-input__inner" v-model="validateCode">
                          <span class="el-input__prefix"><i class="iconfont icon-yanzhengma"></i></span>
                        </div>
                      </div>
                      <div class="el-col el-col-10">
                        <div class="login-code"><span class="login-code-img">{{validateCode}}</span></div>
                      </div>
                    </div> <button type="button" class="el-button login-submit el-button--primary el-button--small"
                      element-loading-spinner="iconfont icon-jiazailoading-B">
                      <span>登 录</span></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    components: {},
    data () {
      var validateCode = parseInt(Math.random() * 10000);
      validateCode < 1000 && (validateCode += 1000);
      return {
        username: 'qwerty',
        password: '654321',
        showPassword: false,
        validateCode: validateCode
      };
    },
    methods: {}
  };

</script>
<style lang="scss" scoped>
.password-input {
  -webkit-text-security: disc;
}
.show-password {
  -webkit-text-security: unset;
}
.full-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.login-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  &:before {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/imgs/bg.png);
    background-size: cover;
  }
}

.login-border {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 30px 50px 25px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #eee;
}

.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
  > {
    h3 {
      margin-bottom: 20px;
    }
    p {
      color: #76838f;
    }
  }
}

.login-title {
  margin: 0;
  text-align: center;
  color: #409eff;
  letter-spacing: 3px;
}

.login-submit {
  margin-top: 20px;
  width: 100%;
  border-radius: 28px;
}

.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix i {
      padding: 0 5px;
      font-size: 16px !important;
    }
  }
}

.login-code {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  margin: 0 0 0 10px;
}

.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}

.userdenglu .el-loading-mask {
  background: hsla(0, 0%, 100%, 0);
  top: 94%;
  left: 18%;
  .el-loading-spinner .icon-jiazailoading-B {
    animation: rotating 2s linear infinite;
    color: #fff;
    font-size: 12px;
  }
}
</style>
