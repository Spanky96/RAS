<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>车辆违章信息查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
         <el-col :span="5">
            <el-form-item label="手机号或者身份证" label-width="0" prop="partner_user_id" class="form-item">
              <el-input v-model="inputFrom.partner_user_id"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '行驶证信息查询'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td width="30%"><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
          <tr class="text-left">
          <td width="20%">地址</td>
          <td width="80%">{{result.url}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'VehicleLicenseInfo',
  components: {
  },
  data () {
    return {
      inputFrom: {
        organization_type: 'PECC',
        partner_user_id: ''
      },
      rules: {
        // plateNumber: [{ required: true, message: '请输入车牌号', trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        url: 'https://api.fudata.cn/mobile/access/h5/supportlist?p=8F11012D88E68B3EEBC503A080F09E8C3E7170C9A822C4DFA2E6A2601F26A4482C9EA19941A3BDE176A39E05595644803877842CF78087009BF43EC92A1B67C0EDA11891C7B6997468B16494FEF137391766C880556A905817F0AF3D7EF3A'
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
          vm.$http.get('api/rip/vehicleViolation', {
            params: vm.inputFrom,
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.return_code == '0' && res.data.url) {
                debugger;
                vm.result = {
                  example: false,
                  resultType: '0000',
                  url: res.data.url
                };
                window.open(res.data.url);
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
