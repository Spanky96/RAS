<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>不良信息排查</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputFrom.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否在逃" label-width="0" prop="escape" class="form-item">
              <el-radio v-model="inputFrom.escape" label="true">是</el-radio>
              <el-radio v-model="inputFrom.escape" label="false">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否有前科" label-width="0" prop="crime" class="form-item">
              <el-radio v-model="inputFrom.crime" label="true">是</el-radio>
              <el-radio v-model="inputFrom.crime" label="false">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否吸毒" label-width="0" prop="drug" class="form-item">
              <el-radio v-model="inputFrom.drug" label="true">是</el-radio>
              <el-radio v-model="inputFrom.drug" label="false">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否涉毒" label-width="0" prop="drugRelated" class="form-item">
              <el-radio v-model="inputFrom.drugRelated" label="true">是</el-radio>
              <el-radio v-model="inputFrom.drugRelated" label="false">否</el-radio>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '不良信息排查'})">打印</el-button></el-col>
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
          <td>身份证号码</td>
          <td>{{result.idCard | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td>是否在逃(用户选择)</td>
          <td>{{result.escape | isOrNoFmt}}</td>
          <td>比对结果</td>
          <td>{{result.escapeCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>是否有前科(用户选择)</td>
          <td>{{result.crime | isOrNoFmt}}</td>
          <td>比对结果</td>
          <td>{{result.crimeCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>是否吸毒(用户选择)</td>
          <td>{{result.drug | isOrNoFmt}}</td>
          <td>比对结果</td>
          <td>{{result.drugCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>是否涉毒(用户选择)</td>
          <td>{{result.drugRelated | isOrNoFmt}}</td>
          <td>比对结果</td>
          <td>{{result.drugRelatedCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>前科事件数量</td>
          <td>{{result.checkCount}}</td>
        </tr>
        <tr class="text-left">
          <td>事件类别</td>
          <td>{{result.caseType}}</td>
          <td>案发时间</td>
          <td> <span v-for="(c, index) in result.caseTime" :key="index">{{c | handleCaseTime}},</span></td>
        </tr>
        <tr class="text-left">
          <td>查询数据状态</td>
          <td>{{result.status}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NegativeInfo',
  components: {
  },
  data () {
    return {
      inputFrom: {
        name: '',
        idCard: '',
        escape: '',
        crime: '',
        drug: '',
        drugRelated: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }],
        escape: [{ required: true, message: '请选择' }],
        crime: [{ required: true, message: '请选择' }],
        drug: [{ required: true, message: '请选择' }],
        drugRelated: [{ required: true, message: '请选择' }]
      },
      result: {
        example: true,
        resultType: '0000',
        name: '吴磊',
        idCard: '320281199606286770',
        escape: 'true',
        crime: 'true',
        drug: 'false',
        drugRelated: 'false',
        escapeCompared: '一致',
        crimeCompared: '不一致',
        drugCompared: '一致',
        drugRelatedCompared: '不一致',
        checkCount: '2',
        caseTime: ["[5,10)", "[2,8]"],
        caseType: '侵犯人身权利案',
        status: '数据存在'
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
          vm.$http.get('api/rip/negativeInformationVerify', {
            params: vm.inputFrom,
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
              debugger;
            if (res.data.success && res.data.data) {
              if (res.data.data.status == 'EXIST') {
                // 你的复制语句抛异常了 好像 不然debug后后的位置在
                vm.result = {
                  example: false,
                  resultType: '0000',
                  name: vm.inputFrom.name,
                  idCard: vm.inputFrom.idCard,
                  escape: res.data.data.escape,
                  crime: res.data.data.crime,
                  drug: res.data.data.drug,
                  drugRelated: res.data.data.drugRelated,
                  escapeCompared: res.data.data.escapeCompared,
                  crimeCompared: res.data.data.crimeCompared,
                  drugCompared: res.data.data.drugCompared,
                  drugRelatedCompared: res.data.data.drugRelatedCompared,
                  checkCount: res.data.data.checkCount,
                  caseTime: res.data.data.caseTime,
                  caseType: res.data.data.caseType,
                  status: '数据存在'
                };
                // 这个位置
              } else if (res.data.data.status == 'NO_DATA') {
                vm.result = {
                  example: false,
                  resultType: '0000',
                  name: vm.inputFrom.name,
                  idCard: vm.inputFrom.idCard,
                  escape: res.data.data.escape,
                  crime: res.data.data.crime,
                  drug: res.data.data.drug,
                  drugRelated: res.data.data.drugRelated,
                  escapeCompared: res.data.data.escapeCompared,
                  crimeCompared: res.data.data.crimeCompared,
                  drugCompared: res.data.data.drugCompared,
                  drugRelatedCompared: res.data.data.drugRelatedCompared,
                  checkCount: res.data.data.checkCount,
                  caseTime: res.data.data.caseTime,
                  caseType: res.data.data.caseType,
                  status: '无数据'
                };
              }
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
