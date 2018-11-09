<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>手机在网时长认证</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="手机号码" label-width="0" prop="mobile" class="form-item">
              <el-input v-model="inputFrom.mobile"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
        <el-row type="flex" justify="end">
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '手机在网时长认证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result.mobile | handleMobile}}</td>
        </tr>
        <tr class="text-left">
          <td>手机在网时长</td>
          <td>{{result.inNetTime}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'InNetTime',
  components: {
  },
  data () {
    return {
      inputFrom: {
        mobile: ''
      },
      rules: {
        mobile: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        mobile: '13653576763',
        inNetTime: ' 0 到 6 个月'
      }
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)'
          });
          // var userInfo = vm.$db.getObject('user');
          vm.$http.get('api/rip/inTheNetworkTime', {
            params: {
              mobile: vm.inputFrom.mobile
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.code == '200' && res.data.data) {
              if (res.data.data.OUTPUT1 == '(0,6)') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    inNetTime: ' 0 到 6 个月'
                    };
              } else if (res.data.data.OUTPUT1 == '(24,+)') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    inNetTime: '24 个月以上 '
                    };
              }
            } else {
              vm.$message({
                showClose: true,
                message: res.data.message,
                type: 'error',
                duration: '5000'
              });
            }
            loading.close();
          });
        }
      });
    }
  }
};
</script>
