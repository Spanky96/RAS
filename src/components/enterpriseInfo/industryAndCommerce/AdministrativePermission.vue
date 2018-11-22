<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>行政经营许可</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="查询主体名称（企业名称）" label-width="0" prop="entname" class="form-item">
              <el-input v-model="inputFrom.entname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="统一信用代码" label-width="0" prop="creditCode" class="form-item">
              <el-input v-model="inputFrom.creditCode"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '行政经营许可'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>数据状态</td>
          <td>{{result.status}}</td>
        </tr>

        <tr>
          <td colspan="2">
            <table class="table card-text">
              <table class="table card-text" v-for="(ret, index) in result.retData" :key="index">
                <tr class="text-left">
                <td colspan="2" width="50%"><el-tag round type="success">{{index + 1}}</el-tag><el-tag>行政经营许可信息</el-tag></td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">文书号 ：</td>
                <td class="mytd">{{ret.xk_wsh}}</td>
                <td class="mytd" width="25%">项目名称 ：</td>
                <td class="mytd">{{ret.xk_xmmc}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">审批类别 ：</td>
                <td class="mytd">{{ret.xk_splb}}</td>
                <td class="mytd" width="25%">许可内容 ：</td>
                <td class="mytd">{{ret.xk_nr}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">行政相对人名称 ：</td>
                <td class="mytd">{{ret.xk_xdr}}</td>
                <td class="mytd" width="25%">行政相对人代码_1 ：</td>
                <td class="mytd">{{ret.xk_xdr_shxym}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">行政相对人代码_2 ：</td>
                <td class="mytd">{{ret.xk_xdr_zdm}}</td>
                <td class="mytd" width="25%">行政相对人代码_3 ：</td>
                <td class="mytd">{{ret.xk_xdr_gsdj}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">行政相对人代码_4 ：</td>
                <td class="mytd">{{ret.xk_xdr_swdj}}</td>
                <td class="mytd" width="25%">法定代表人姓名 ：</td>
                <td class="mytd">{{ret.xk_fr}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">许可决定日期 ：</td>
                <td class="mytd">{{ret.xk_jdrq}}</td>
                <td class="mytd" width="25%">许可截止期 ：</td>
                <td class="mytd">{{ret.xk_jzq}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">审批类别 ：</td>
                <td class="mytd">{{ret.regCode}}</td>
                <td class="mytd" width="25%">许可内容 ：</td>
                <td class="mytd">{{ret.orgCode}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">许可机构 ：</td>
                <td class="mytd">{{ret.xk_xzjg}}</td>
                <td class="mytd" width="25%">当前状态 ：</td>
                <td class="mytd">{{ret.xk_zt}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">地方编码 ：</td>
                <td class="mytd">{{ret.dfbm}}</td>
                <td class="mytd" width="25%">数据更新时间戳 ：</td>
                <td class="mytd">{{ret.sjc}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">备注 ：</td>
                <td class="mytd">{{ret.bz}}</td>
                <td class="mytd" width="25%"></td>
                <td class="mytd"></td>
              </tr>
              
              </table>
            </table>
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AdministrativePermission',
  components: {
  },
  data () {
    return {
      inputFrom: {
        entname: '',
        creditCode: ''
      },
      rules: {
        entname: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
        creditCode: [
          {required: true, message: '请输入统一信用代码', trigger: 'blur'},
          {validator: this.$validator.creditCode, trigger: 'change'}
        ]
      },
      result: {
        example: true,
        resultType: '0000',
        status: '数据存在',
        retData: [{
            "regCode": "33***********90",
            "credCode": "913*******06",
            "orgCode": "1********0",
            "entName": "浙江省*****公司",
            "taxCode": ""
          }
          ]
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
          vm.$http.get('api/rip/administrativeLicensing', {
            params: {
              entname: vm.inputFrom.entname,
              creditCode: vm.inputFrom.creditCode
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.code == '000000') {
                if (res.data.retData.length > 0) {
                  vm.result = {
                    example: false,
                    resultType: '0000',
                    status: '数据存在',
                    retData: res.data.retData
                  };
                } else {
                    vm.result = {
                    example: false,
                    resultType: '0000',
                     status: '数据不存在',
                    retData: res.data.retData
                  };
                }
            } else {
              vm.$message({
                showClose: true,
                message: res.data.msg,
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
