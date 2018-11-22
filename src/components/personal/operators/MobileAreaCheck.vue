<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>运营商手机位置核验</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="手机号码" label-width="0" prop="Mobile" class="form-item">
              <el-input v-model="inputFrom.Mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="城市行政编码" label-width="0" class="form-item">
            <el-cascader
                size="large"
                :options="options"
                change-on-select
                v-model="inputFrom.AreaCode"
                @change="handleChange">
            </el-cascader>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '运营商手机位置核验'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result.Mobile}}</td>
        </tr>
        <tr class="text-left">
          <td>数据是否存在</td>
          <td>{{result.status}}</td>
        </tr>
        <tr class="text-left">
          <td>地区</td>
          <td>{{CodeToText[result.AreaCode]}}</td>
        </tr>
        <tr class="text-left">
          <td>手机运营商位置情况</td>
          <td>{{handleCheckResult(result.CheckResult)}}</td>
        </tr>
        <tr class="text-left" v-if="result.resultType == '3'">
          <td>报错信息</td>
          <td>{{result.errorMsg}}</td>
        </tr>
        
      </table>
    </el-card>
  </div>
</template>

<script>
import {provinceAndCityData, CodeToText} from 'element-china-area-data';
export default {
  name: 'MobileAreaCheck',
  components: {
  },
  data () {
    return {
        CodeToText,
        options: provinceAndCityData,
      inputFrom: {
        Mobile: '',
        AreaCode: ''
      },
      rules: {
        Mobile: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        Mobile: '15201204367',
        status: '数据存在',
        AreaCode: "110000",
        CheckResult: '0',
        errorMsg: '系统错误'
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
          vm.$http.get('api/rip/mobileAreaCheck', {
            params: {
              Mobile: vm.inputFrom.Mobile,
              AreaCode: vm.inputFrom.AreaCode[1]
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.error_code == 0) {
              debugger;
              if (res.data.result) {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    status: '数据存在',
                    Mobile: res.data.result.Mobile,
                    AreaCode: res.data.result.Area,
                    CheckResult: res.data.result.CheckResult
                  };
              } else {
                vm.result = {
                    example: false,
                    resultType: '3',
                    status: '无数据',
                    errorMsg: res.data.reason
                  };
              }
            } else {
              vm.result = {
                    example: false,
                    resultType: '3',
                    status: '无数据',
                    errorMsg: res.data.reason
                  };
              // vm.$message({
              //   showClose: true,
              //   message: res.data.reason,
              //   type: 'error',
              //   duration: '5000'
              // });
            }
            loading.close();
          });
        }
      });
    },
    handleChange (value) {
        console.log(value);
    },
    handleCheckResult (value) {
        if (value == '0') {
            return '验证一致';
        } else if (value == '1') {
            return '省份一致，城市不一致';
        } else if (value == '2') {
            return '不一致';
        } else {
            return '未知';
        }
    }
  }
};
</script>
