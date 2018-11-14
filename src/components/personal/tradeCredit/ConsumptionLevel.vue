<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>消费等级</span>
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
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
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
          <td>消费等级</td>
          <td>{{result.consumptionGrade}}</td>
        </tr>
        <tr class="text-left">
          <td>消费区间</td>
          <td>{{result.consumptionInterval}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ConsumptionLevel',
  components: {
  },
  data () {
    return {
      inputFrom: {
        name: '',
        cardNo: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        cardNo: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        name: '赵雷',
        idNumber: '320281199606286770',
        consumptionGrade: 'D',
        consumptionInterval: '[7000,9000)'
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
          vm.$http.get('api/rip/queryOfConsumptionLevel', {
            params: {
              name: vm.inputFrom.name,
              idCard: vm.inputFrom.cardNo
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.success) {
                  vm.result = {
                    example: false,
                    resultType: '0000',
                    name: res.data.data.name,
                    idNumber: res.data.data.identityCard,
                    consumptionGrade: res.data.data.consumptionGrade,
                    consumptionInterval: res.data.data.consumptionInterval
                  };
            } else {
              vm.$message({
                showClose: true,
                message: res.data.errorDesc,
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
