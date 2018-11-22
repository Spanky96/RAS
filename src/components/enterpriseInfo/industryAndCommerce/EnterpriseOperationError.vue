<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>企业异常经营名录</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="查询主体名称（企业名称）" label-width="0" prop="entname" class="form-item">
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '企业异常经营名录'})">打印</el-button></el-col>
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
                <td colspan="2" width="50%"><el-tag round type="success">{{index + 1}}</el-tag><el-tag>企业异常经营名录</el-tag></td>
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
  name: 'EnterpriseOperationError',
  components: {
  },
  data () {
    return {
      inputFrom: {
        entname: '',
        creditCode: ''
      },
      rules: {
        entname: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "blur"
                    }
                ],
                creditCode: [
                    {
                        required: true,
                        message: "请输入统一信用代码",
                        trigger: "blur"
                    },
                    { validator: this.$validator.creditCode, trigger: "change" }
                ]
      },
      result: {
        example: true,
        resultType: '0000',
        status: '数据存在',
        retData: [
              {
                "content": "{\"经营异常名录ID\":\"400000087863278995\",\"主体身份代码\":\"340000000033896348\",\"企业名称\":\"安徽双语学习报社\",\"统一社会信用代码\":\"913400005957472253\",\"注册号\":\"340000000056535\",\"法定代表人\":\"陈万瑞\",\"证件类型\":\"\",\"列入经营异常名录原因类型\":\"1\",\"列入经营异常名录原因类型名称\":\"未依照《企业信息公示暂行条例》第八条规定的期限公示年度报告的\",\"设立日期\":\"2018/07/03\",\"列入决定机关\":\"340000\",\"列入决定机关名称\":\"安徽省工商行政管理局\",\"最新更新日期\":\"2018/08/05\"}"
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
              dataType: '5'
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
