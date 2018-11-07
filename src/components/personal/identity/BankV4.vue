<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>银行卡四要素</span>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '身份证一致性验证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result.success ? 'success': 'danger'" class="tag">{{result.success ? '一致': '不一致'}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result.name}}</td>
        </tr>
        <tr class="text-left">
          <td>身份证号码</td>
          <td>{{result.idNumber}}</td>
        </tr>
        <tr class="text-left">
          <td>银行卡号</td>
          <td>{{result.bankCardNo}}</td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result.mobile}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BankV4',
  components: {
  },
  data () {
    var idCardValidator = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入身份证号'));
      } else if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入合法的身份证号'));
      }
    };
    var bankCardValidator = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入银行卡号'));
      } else if (/^\d{16}|\d{19}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入合法的银行卡号'));
      }
    };
    var mobileValidator = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入手机号码'));
      } else if (/^1[34578]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的手机号码'));
      }
    };
    return {
      inputFrom: {
        name: '',
        cardNo: '',
        bankCardNo: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        cardNo: [{ validator: idCardValidator, trigger: 'blur' }],
        bankCardNo: [{ validator: bankCardValidator, trigger: 'blur' }],
        mobile: [{ validator: mobileValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        success: true,
        name: '赵1雷',
        idNumber: '320281199606286770',
        bankCardNo: '6228481111221432430',
        mobile: '13653576763'
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
          vm.$http.get('api/rip/bankCardFourElements', {
            params: {
              name: vm.inputFrom.name,
              idNumber: vm.inputFrom.cardNo,
              bankCard: vm.inputFrom.bankCardNo,
              mobile: vm.inputFrom.mobile
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
                    bankCardNo: vm.inputFrom.bankCardNo,
                    mobile: vm.inputFrom.mobile
                  };
                }
                if (res.data.data.key != "0000") {
                  vm.result = {
                    example: false,
                    success: false,
                    name: vm.inputFrom.name,
                    idNumber: vm.inputFrom.cardNo,
                    bankCardNo: vm.inputFrom.bankCardNo,
                    mobile: vm.inputFrom.mobile
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
