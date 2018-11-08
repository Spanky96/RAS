<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>手机消费档次</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '失效身份证一致性验证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result.mobile}}</td>
        </tr>
        <tr class="text-left">
          <td>所属省份</td>
          <td>{{result.province}}</td>
        </tr>
        <tr class="text-left">
          <td>所属城市</td>
          <td>{{result.city}}</td>
        </tr>
        <tr class="text-left">
          <td>所属运营商</td>
          <td>{{result.operator}}</td>
        </tr>
        <tr class="text-left">
          <td>消费档次等级代号</td>
          <td>{{result.gradeCode}}</td>
        </tr>
        <tr class="text-left">
          <td>消费档次区间</td>
          <td>{{result.gradeDesc}}</td>
        </tr>
        <tr class="text-left">
          <td>状态</td>
          <td>{{result.status}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MobileConsume',
  components: {
  },
  data () {
    return {
      inputFrom: {
        mobile: ''
      },
      rules: {
        mobile: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        mobile: '13653576763',
        province: '山西省',
        city: '运城市',
        operator: '电信',
        gradeCode: 'CTC04',
        gradeDesc: '(100,200]',
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
  }
};
</script>
