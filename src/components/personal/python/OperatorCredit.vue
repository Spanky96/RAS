<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>运营商信用报告</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row type="flex" align="middle">
          <el-col :span="8">
            <el-form-item label="手机号" label-width="0" prop="cellphone" class="form-item">
              <el-input maxlength="40" v-model="inputFrom.cellphone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码（运营商）" label-width="0" prop="password" class="form-item">
              <el-input maxlength="6" class="password-input" :class="{'show-password': showPassword}" v-model="inputFrom.password">
                <i slot="suffix" class="el-icon-view" style="cursor:pointer;"  @click="showPassword = !showPassword;"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" round @click="getToken()">获取验证码</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="验证码" label-width="0" prop="token" class="form-item">
              <el-input v-model="inputFrom.token">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" align="bottom">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" round size="small">执行查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card id="resultTable">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col>
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '运营商信用报告'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag type="success" class="tag">成功</el-tag></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SocialSecurity',
  components: {
  },
  data () {
    return {
      inputFrom: {
        cellphone: '',
        password: ''
      },
      rules: {
        cellphone: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }],
        password: [{ validator: this.$validator.cellPhonePassword, trigger: 'blur' }],
        token: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      result: {
        example: true
      },
      showPassword: false
    };
  },
  methods: {
    getToken: function () {
      var vm = this;
      vm.$refs['inputFrom'].validateField('cellphone', (valid) => {
        if (!valid) {
          vm.$refs['inputFrom'].validateField('password', (valid2) => {
            if (!valid2) {
              vm.$http.post('api/rip/mobileGet', {
                params: {
                  cellphone: vm.inputFrom.cellphone,
                  password: vm.inputFrom.password
                }}).then(function (res) {
                console.log(res);
              });
            }
          });
        }
      });
    },
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
        }
      });
    }
  }
};
</script>
