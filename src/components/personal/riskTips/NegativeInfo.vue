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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '失效身份证一致性验证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="resultsuccess.logo" class="tag">{{resultsuccess.name}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result.name}}</td>
        </tr>
        <tr class="text-left">
          <td>身份证号码</td>
          <td>{{result.idCard}}</td>
        </tr>
        <tr class="text-left">
          <td>是否在逃</td>
          <td>{{result.escape}}</td>
        </tr>
        <tr class="text-left">
          <td>是否有前科</td>
          <td>{{result.crime}}</td>
        </tr>
        <tr class="text-left">
          <td>是否吸毒</td>
          <td>{{result.drug}}</td>
        </tr>
        <tr class="text-left">
          <td>是否涉毒</td>
          <td>{{result.drugRelated}}</td>
        </tr>
        <tr class="text-right">
          <td>在逃比对结果</td>
          <td>{{result.escapeCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>前科比对结果</td>
          <td>{{result.crimeCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>吸毒比对结果</td>
          <td>{{result.drugCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>涉毒比对结果</td>
          <td>{{result.drugRelatedCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>前科事件数量</td>
          <td>{{result.checkCount}}</td>
        </tr>
        <tr class="text-left">
          <td>案发时间</td>
          <td>{{result.caseTime}}</td>
        </tr>
        <tr class="text-left">
          <td>事件类别</td>
          <td>{{result.caseType}}</td>
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
    var idCardValidator = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入身份证号'));
      } else if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入合法的身份证号'));
      }
    };
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
        idCard: [{ validator: idCardValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        name: '吴磊',
        idCard: '320281199606286770',
        escape: '是',
        crime: '是',
        drug: '是',
        drugRelated: '是',
        escapeCompared: '不一致',
        crimeCompared: '一致',
        drugCompared: '不一致',
        drugRelatedCompared: '不一致',
        checkCount: '2',
        caseTime: '[15,20）',
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
          // var userInfo = vm.$db.getObject('user');
          vm.$http.get('api/rip/mobileConsumptionLevel', {
            params: {
              mobile: vm.inputFrom.mobile
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.success && res.data.data) {
              if (res.data.data.status == 'EXIST') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    province: res.data.data.province,
                    city: res.data.data.city,
                    operator: res.data.data.operator,
                    gradeCode: res.data.data.gradeCode,
                    gradeDesc: res.data.data.gradeDesc,
                    status: '数据存在'
                    };
              } else if (res.data.data.status == 'NO_DATA') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    province: res.data.data.province,
                    city: res.data.data.city,
                    operator: res.data.data.operator,
                    gradeCode: res.data.data.gradeCode,
                    gradeDesc: res.data.data.gradeDesc,
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
  },
  computed: {
    resultsuccess: function () {
      if (this.result.resultType == '0000') {
        return {name: '成功', logo: 'success'};
      }
      if (this.result.resultType == '9998') {
        return {name: '失败', logo: 'danger'};
      }
      if (this.result.resultType == '3') {
       return {name: '无数据', logo: 'info'};
      }
    },
    result: function () {
      if (this.result.escape == 'true') {
        return {name: '是'};
      } else {
        return {name: '否'};
      }
      if (this.result.crime == 'true') {
        return {name: '是'};
      } else {
        return {name: '否'};
      }
      if (this.result.drug == 'true') {
        return {name: '是'};
      } else {
        return {name: '否'};
      }
      if (this.result.drugRelated == 'true') {
        return {name: '是'};
      } else {
        return {name: '否'};
      }
    }
  }
};
</script>
