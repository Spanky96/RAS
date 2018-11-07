<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>手机在网状态认证</span>
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
          <td><el-tag :type="resultsuccess.logo" class="tag">{{resultsuccess.name}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result.mobile}}</td>
        </tr>
        <tr class="text-left">
          <td>手机运营商</td>
          <td>{{result.operator}}</td>
        </tr>
        <tr class="text-left">
          <td>手机在网状态</td>
          <td>{{result.inNetStatus}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'InNetStatus',
  components: {
  },
  data () {
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
        mobile: ''
      },
      rules: {
        mobile: [{ validator: mobileValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        mobile: '13653576763',
        operator: '联通',
        inNetStatus: '停机'
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
          vm.$http.get('api/rip/thePhoneIsOnTheInternet', {
            params: {
              phone: vm.inputFrom.mobile
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.code == '200' && res.data.data) {
              if (res.data.data.status == '1') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '在网'
                    };
              } else if (res.data.data.status == '2') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '停机'
                    };
              } else if (res.data.data.status == '3') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '销号'
                    };
              } else if (res.data.data.status == '4') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '在网但不可用'
                    };
              } else if (res.data.data.status == '5') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '空号'
                    };
              } else if (res.data.data.status == '6') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '不在网'
                    };
              } else if (res.data.data.status == '7') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '未启用'
                    };
              } else if (res.data.data.status == '8') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    mobile: vm.inputFrom.mobile,
                    operator: res.data.data.operators,
                    inNetStatus: '无法查询'
                    };
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
    }
  }
};
</script>
