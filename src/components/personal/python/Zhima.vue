<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>芝麻分认证</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
                <el-input v-model="inputFrom.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码" label-width="0" prop="idCard" class="form-item">
                <el-input v-model="inputFrom.idCard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号" label-width="0" prop="mobile" class="form-item">
                <el-input v-model="inputFrom.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row type="flex" justify="end" align="bottom">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" round size="small" :loading="loading">{{btnText}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card id="resultTable">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col>
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '芝麻分认证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.return_code | resultLogoFmt" class="tag">{{result.return_code | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td width="20%">姓名</td>
          <td>{{result.name | handleName}}</td>
        </tr>
        <tr class="text-left">
          <td width="20%">身份证</td>
          <td>{{result.idCard | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td width="20%">芝麻信用分</td>
          <td>{{result.data.sesameScore}} {{result.data.sesameScore | sesameLevel}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Zhima',
  data () {
    return {
      inputFrom: {
        name: '',
        idCard: '',
        beginDate: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }],
        mobile: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }]
      },
      result: {
        name: '**辉',
        idCard: '340154199512115445',
        example: true,
        "data": {
          "orderNumber": "069",
          "sesameScore": 560,
          "time": 1537328342126
        },
        "return_code": "0"
      },
      orderNumber: '',
      loading: false,
      btnText: "执行查询",
      tryAgain: 0
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          vm.loading = true;
          vm.orderNumber = 'zm' + new Date().getTime();
          vm.$http.get('api/rip/sesameCreditScore/jurisdiction', {
            params: {
              name: vm.inputFrom.name,
              idCard: vm.inputFrom.idCard,
              mobile: vm.inputFrom.mobile,
              orderNumber: vm.orderNumber // 用时间戳啦
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
              if (res.data.code == '0' && res.data.data) {
                if (vm.loading) {
                  vm.btnText = '等待授权操作,需耐心等待';
                  var qrCode = res.data.data.authUrl;
                  const h = vm.$createElement;
                  vm.currentNotify = vm.$notify({
                    title: '授权请求',
                    message: h('div', null, [h('h3', {style: {width: '500px'}}, '请扫描二维码提供芝麻分授权'),
                                            h('qriously', {props: {size: 220, value: qrCode}}, null)]),
                    duration: 180000
                  });
                  vm.tryAgain = 35; // 给36*5次轮询  180秒
                  vm.startPollingSearch();
                }
              } else {
                vm.loading = false;
                vm.$message({
                  showClose: true,
                  message: res.data.message || '请求失败',
                  type: 'error',
                  duration: '5000'
                });
            }
          });
        }
      });
    },
    startPollingSearch: function () {
      var vm = this;
      if (vm.tryAgain != 0) {
        vm.tryAgain--;
        vm.timeout = setTimeout(() => {
          vm.$http.get('api/rip/sesameCreditScore/result', {
            params: {
              orderNumber: vm.orderNumber // 用时间戳啦
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }
          }).then(function (res) {
            if (res.data.return_code == '0') {
              vm.result = {
                example: false,
                data: res.data.data,
                name: vm.inputFrom.name,
                idCard: vm.inputFrom.idCard,
                return_code: '0'
              };
              vm.loading = false;
              vm.btnText = '执行查询';
              vm.currentNotify && vm.currentNotify.close();
              vm.$message({
                showClose: true,
                message: '成功获取芝麻信用分!',
                type: 'success',
                duration: '1000'
              });
            } else {
              vm.startPollingSearch();
            }
          });
        }, 5000);
      } else {
        // 超时啦
        vm.$message({
          showClose: true,
          message: '很抱歉！请求超时，未成功获取芝麻评分。',
          type: 'error',
          duration: '5000'
        });
        vm.loading = false;
        vm.btnText = '执行查询';
      }
    }
  },
  destroyed: function () {
    var vm = this;
    vm.loading = false; // 防止点击执行查询按钮后，立刻离开页面
    vm.currentNotify && vm.currentNotify.close();
    vm.timeout && clearTimeout(vm.timeout);
  }
};
</script>
<style scoped>
 .coderequest {
    width: 260px;
    text-align: center;
    margin-top: 20px;
 }
</style>
