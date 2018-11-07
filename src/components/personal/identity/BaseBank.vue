<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>开户行查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="银行卡号" label-width="0" prop="bankCardNo" class="form-item">
              <el-input v-model="inputFrom.bankCardNo"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '身份证一致性验证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result.success ? 'success': 'danger'" class="tag">{{result.success ? '成功': '失败'}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>银行卡号</td>
          <td>{{result.bankCardNo}}</td>
        </tr>
        <tr class="text-left">
          <td>开户银行</td>
          <td>{{result.accountBank}}</td>
        </tr>
        <tr class="text-left">
          <td>银行卡类型</td>
          <td>{{result.accountType}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BaseBank',
  components: {
  },
  data () {
    var bankCardValidator = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入银行卡号'));
      } else if (/^\d{16}|\d{19}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入合法的银行卡号'));
      }
    };
    return {
      inputFrom: {
        bankCardNo: ''
      },
      rules: {
        bankCardNo: [{ validator: bankCardValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        success: true,
        bankCardNo: '6228481111221432430',
        accountBank: '中国建设银行',
        accountType: '借记卡'
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
          vm.$http.get('api/rip/bankCardBasicInformation', {
            params: {
              accountNo: vm.inputFrom.bankCardNo
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.code == '200') {
              if (res.data.data) {
                  vm.result = {
                    example: false,
                    success: true,
                    bankCardNo: vm.inputFrom.bankCardNo,
                    accountBank: res.data.data.accountBank,
                    accountType: res.data.data.accountType
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

<style lang="scss">
</style>
