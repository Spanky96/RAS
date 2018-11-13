<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>淘宝报告</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="用户partnerID（手机号/身份证等）" label-width="0" prop="partnerUserId" class="form-item">
              <el-input maxlength="40" v-model="inputFrom.partnerUserId"></el-input>
            </el-form-item>
          </el-col>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '淘宝报告'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PersonalIdentityInvalid',
  components: {
  },
  data () {
    return {
      inputFrom: {
        partnerUserId: ''
      },
      rules: {
        partnerUserId: [{ required: true, message: '请输入paetnerID', trigger: 'blur' }]
      },
      result: {
        example: true
      },
      openId: '',
      loading: false,
      btnText: "执行查询",
      tryAgain: 0
    };
  },
  methods: {
    getOpenId: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/operatorReport', {
        params: {
          partner_user_id: vm.inputFrom.partnerUserId
        },
        headers: {
          authorization: vm.$db.get('authorization')
        }
        }).then(function (res) {
          console.log('获取openid：' + res.data.open_id);
          resolve(res.data);
        });
      });
      return p;
    },
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          vm.loading = true;
          vm.getOpenId().then(function (data) {
            vm.openId = data.open_id;
            vm.$http.get('api/rip/accessPath', {
              params: {
                organization_type: 'COMMERCE',
                partner_user_id: vm.inputFrom.partnerUserId,
                organization_id: '1020004'
              },
              headers: {
                authorization: vm.$db.get('authorization')
              }
              }).then(function (res) {
                if (res.data.return_code == '0') {
                  vm.btnText = '等待授权操作,需耐心等待';
                  var qrCode = res.data.url;
                  const h = vm.$createElement;
                  vm.currentNotify = vm.$notify({
                    title: '授权请求',
                    message: h('div', null, [h('h3', {style: {width: '500px'}}, '请扫描二维码提供授权'),
                                            h('qriously', {props: {size: 220, value: qrCode}}, null)]),
                    duration: 140000
                  });
                  vm.tryAgain = 45; // 给45次轮询时间
                  // 5秒后开始检查状态
                  setTimeout(vm.startPollingSearch, 5000);
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
          });
        }
      });
    },
    getResult: function () {
      var vm = this;
      vm.$http.get('api/rip/electricityCommerce/data', {
        params: {
          open_id: vm.openId
        },
        headers: {
          authorization: vm.$db.get('authorization')
        }
      }).then(function (res) {
        debugger;
        vm.result = {
          example: false,
          data: res.data.data,
          return_code: res.data.return_code
        };
        vm.loading = false;
        vm.btnText = '执行查询';
        vm.currentNotify && vm.currentNotify.close();
        vm.$message({
          showClose: true,
          message: '获取数据成功!',
          type: 'success',
          duration: '1000'
        });
      });
    },
    startPollingSearch: function () {
      var vm = this;
      vm.$http.get('api/rip//electricityCommerce/status', {
        params: {
          open_id: vm.openId
        },
        headers: {
          authorization: vm.$db.get('authorization')
        }
      }).then(function (res) {
        var status = res.data.task_info && res.data.task_info.status;
        if (status == 'COMPLETE') {
          // 获取结果
          vm.getResult();
        } else if (['INVALID', 'FAILURE', 'PROCESS'].includes(status)) {
          vm.$message({
            showClose: true,
            message: res.data.task_info.error_message || '很抱歉查询失败。',
            type: 'error',
            duration: '5000'
          });
          vm.currentNotify && vm.currentNotify.close();
          vm.loading = false;
          vm.btnText = '执行查询';
        } else {
          // 3秒后再次检查
          if (vm.tryAgain != 0) {
            vm.tryAgain--;
            setTimeout(vm.startPollingSearch, 3000);
          } else {
            // 超时啦
            vm.$message({
              showClose: true,
              message: (res.data && res.data.task_info.error_message) || '很抱歉查询失败。',
              type: 'error',
              duration: '5000'
            });
            vm.loading = false;
            vm.btnText = '执行查询';
          }
        }
      });
    }
  }
};
</script>
