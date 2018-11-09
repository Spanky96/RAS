<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>银行卡三要素</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号码" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.cardNo"></el-input>
            </el-form-item>
          </el-col>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '银行卡三要素'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result.success | isSuccessLogoFmt" class="tag">{{result.success | isConsistentFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result.name | handleName}}</td>
        </tr>
        <tr class="text-left">
          <td>身份证号码</td>
          <td>{{result.idNumber | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td>银行卡号</td>
          <td>{{result.bankCardNo | handleBankCardNo}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BankV3',
  components: {
  },
  data () {
    return {
      inputFrom: {
        name: '',
        cardNo: '',
        bankCardNo: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        cardNo: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }],
        bankCardNo: [{ validator: this.$validator.bankCardValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        success: true,
        name: '赵雷',
        idNumber: '320281199606286770',
        bankCardNo: '6228481111221432430'
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
          vm.$http.get('api/rip/threeElementsOfBankCard', {
            params: {
              name: vm.inputFrom.name,
              idNumber: vm.inputFrom.cardNo,
              bankCard: vm.inputFrom.bankCardNo
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.code == '200') {
              if (res.data.data) {
                if (res.data.data.key == "0000") {
                  vm.result = {
                    example: false,
                    success: true,
                    name: vm.inputFrom.name,
                    idNumber: vm.inputFrom.cardNo,
                    bankCardNo: vm.inputFrom.bankCardNo
                  };
                }
                if (res.data.data.key != "0000") {
                  vm.result = {
                    example: false,
                    success: false,
                    name: vm.inputFrom.name,
                    idNumber: vm.inputFrom.cardNo,
                    bankCardNo: vm.inputFrom.bankCardNo
                  };
                }
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
