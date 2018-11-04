<template>
  <div class="full-screen content-bg">
    <el-dialog title="修改密码" :visible="true" class="resetPw-dialog" center :show-close="false">
      <el-form :model="resetForm" :rules="rules" ref="resetPwForm">
        <el-form-item label="旧密码" label-width="70px" class="password-input" prop="oldPassword">
          <el-input v-model="resetForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="70px" prop="newPassword">
          <el-input v-model="resetForm.newPassword" class="password-input" :class="{'show-password': showPassword}" autocomplete="off">
            <i slot="suffix" class="el-icon-view" style="cursor:pointer;"  @click="showPassword = !showPassword;"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ResetPassword",
    components: {},
    data () {
      if (!this.$db.getObject("user")) {
        this.$router.push({
          path: "/login"
        });
      }
      var passwordValidator = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入新密码'));
        } else if (value.length < 6) {
          callback(new Error('密码长度至少6位'));
        } else {
          callback();
        }
      };
      return {
        showPassword: false,
        resetForm: {
          oldPassword: '',
          newPassword: ''
        },
        rules: {
          oldPassword: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
          newPassword: [{ validator: passwordValidator, trigger: 'blur' }]
        }
      };
    },
    methods: {
      onSubmit: function () {
        var vm = this;
        vm.$refs['resetPwForm'].validate((valid) => {
          if (valid) {
            vm.$alert('密码修改成功！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                // 返回
                vm.$router.back(-1);
              }
            });
          }
        });
      },
      cancel: function () {
        this.$router.back(-1);
      }
    }
  };

</script>

<style lang="scss">
.content-bg {
  background-image: url(../assets/imgs/resetPwBg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100%;
}
.resetPw-dialog {
  .el-dialog {
    border-radius: 8px;
  }
}
.el-dialog,.el-pager li{
  background:#ffffffd1;
}
</style>
