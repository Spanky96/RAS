<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>资产令牌</span>
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
          <td>手机号码</td>
          <td>{{result.mobile | handleMobile}}</td>
        </tr>
        <tr class="text-left">
          <td>是否有工作</td>
          <td>{{hasWork1(result.hasWork)}}</td>
        </tr>
        <tr class="text-left">
          <td>近一年收入等级</td>
          <td>{{result.oneYearAverageSalaryRange}} 元</td>
        </tr>
        <tr class="text-left">
          <td>近三年收入等级</td>
          <td>{{result.threeYearsAverageSalaryRange}} 元</td>
        </tr>
        <tr class="text-left">
          <td>近一年收入稳定性（0-1的数值，越低代表越稳定）</td>
          <td>{{result.oneYearWorkStability}}</td>
        </tr>
        <tr class="text-left">
          <td>近三年收入稳定性（0-1的数值，越低代表越稳定）</td>
          <td>{{result.threeYearsWorkStability}}</td>
        </tr>
        <tr class="text-left">
          <td>近一年收入波动（区间）</td>
          <td>{{result.oneYearSalaryFluctuateRange}}</td>
        </tr>
        <tr class="text-left">
          <td>近一年工作月份</td>
          <td>{{result.oneYearWorkMonths}} 月</td>
        </tr>
        <tr class="text-left">
          <td>是否有房</td>
          <td>{{hasHouse1(result.hasHouse)}}</td>
        </tr>
        <tr class="text-left">
          <td>是否有车</td>
          <td>{{hasHouse1(result.hasCar)}}</td>
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
        cardNo: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        cardNo: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }],
        mobile: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        name: '赵雷',
        idNumber: '320281199606286770',
        mobile: '13653576763',
        hasWork: 1,
        oneYearWorkStability: 0.0,
        threeYearsWorkStability: 0.0,
        oneYearWorkMonths: 0,
        hasHouse: null,
        threeYearsAverageSalaryRange: "5500-6000",
        oneYearAverageSalaryRange: "6500-7000",
        oneYearSalaryFluctuateRange: "7500-8000",
        hasCar: null
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
          vm.$http.get('api/rip/assetQuery', {
            params: {
              realname: vm.inputFrom.name,
              cardno: vm.inputFrom.cardNo,
              mobile: vm.inputFrom.mobile
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.code == '0') {
                  vm.result = {
                    example: false,
                    resultType: '0000',
                    name: vm.inputFrom.name,
                    idNumber: vm.inputFrom.cardNo,
                    mobile: vm.inputFrom.mobile,
                    hasWork: res.data.data.hasWork,
                    oneYearWorkStability: res.data.data.oneYearWorkStability,
                    threeYearsWorkStability: res.data.data.threeYearsWorkStability,
                    oneYearWorkMonths: res.data.data.oneYearWorkMonths,
                    hasHouse: res.data.data.hasHouse,
                    threeYearsAverageSalaryRange: res.data.data.threeYearsAverageSalaryRange,
                    oneYearAverageSalaryRange: res.data.data.oneYearAverageSalaryRange,
                    oneYearSalaryFluctuateRange: res.data.data.oneYearSalaryFluctuateRange,
                    hasCar: res.data.data.hasCar
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
    },
    hasWork1 (val) {
      if (val == 0) {
            return '可能有';
        } else if (val == '1') {
            return '有工作';
        } else if (val == -1) {
            return '没有工作';
        } else {
            return '未知';
        }
    },
    hasHouse1 (val) {
      if (val == 0) {
            return '没有';
        } else if (val == 1) {
            return '有';
        } else if (val == null) {
            return '不确定';
        } else {
            return '未知';
        }
    }
  }
};
</script>
