<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>重大税收违法案件警示</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="查询主体名称（企业名称）" label-width="0" prop="c" class="form-item">
              <el-input v-model="inputFrom.entname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="统一的信用代码" label-width="0" prop="creditCode" class="form-item">
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '重大税收违法案件警示'})">打印</el-button></el-col>
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
                <td colspan="2" width="50%"><el-tag round type="success">{{index + 1}}</el-tag><el-tag>重大税收违法案件警示</el-tag></td>
              </tr>
              <tr class="text-left resultRows" v-for="(v,k) in JSON.parse(ret.content)" :key="k">
                <td class="mytd" width="25%">{{k}} ：</td>
                <td class="mytd">{{v}}</td>
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
  name: 'IllegalTax',
  components: {
  },
  data () {
    return {
      inputFrom: {
        entname: '',
        creditCode: ''
      },
      rules: {
      },
      result: {
        example: true,
        resultType: '0000',
        status: '数据存在',
        retData: [
          {
            "content": "{\"案件上报期\":\"\",\"纳税人名称\":\"安徽天鹰实业有限公司\",\"纳税人识别码\":\"341124559237375\",\"组织机构代码\":\"559237375\",\"注册地址\":\"全椒县经济开发区纬三路\",\"法定代表人或者负责人姓名\":\"周建伟\",\"法定代表人或者负责人性别\":\"男\",\"法定代表人或者负责人证件名称\":\"\",\"负有直接责任的财务负责人姓名\":\"\",\"负有直接责任的财务负责人性别\":\"\",\"负有直接责任的财务负责人证件名称\":\"\",\"负有直接责任的财务负责人证件号码\":\"\",\"负有直接责任的中介机构信息及其从业人员信息\":\"\",\"案件性质\":\"偷税\",\"主要违法事实\":\"经全椒县地方税务局稽查局检查,发现其在2013年01月01日至2015年12月31日期间,主要存在以下问题:采取偷税手段,不缴或者少缴应纳税款377.14万元。\",\"相关法律依据及税务处理处罚情况\":\"依照《中华人民共和国税收征收管理法》等相关法律法规的有关规定,对其处以追缴税款377.14万元的行政处理、处以罚款377.14万元的行政处罚,并依法移送司法机关。\",\"最新更新日期\":\"2018/08/01 17:05:24.625\"}"
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
          vm.$http.get('api/rip/enterpriseRecord', {
            params: {
              entname: vm.inputFrom.entname,
              creditCode: vm.inputFrom.creditCode,
              dataType: '6'
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.code == '000000') {
                if (res.data.retData) {
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
