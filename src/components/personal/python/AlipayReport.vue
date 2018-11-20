<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>支付宝报告</span>
      </div>
      <el-form ref="inputFrom" id="inputForm">
        <el-row type="flex">
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '支付宝报告'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.code | resultLogoFmt" class="tag">{{result.code | resultSuccessFmt}}</el-tag></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">基本信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(basicInfoKvs, result.data.basicInfo)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">资产信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObjTm(assetsInfoKvs, result.data.assetsInfo, [], moneyFmt)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">银行卡信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.bankInfo, bankInfoKvs)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">地址信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.addressInfo, addressInfoKvs)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">交易信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.tradeInfo, tradeInfoKvs, [], moneyFmt)" class="table"></table></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AlipayReport',
  components: {
  },
  data () {
    const moneyFmt = {
      "totalAssets": this.$FU.moneyF2Y,
      "amount": this.$FU.moneyF2Y,
      "yuEBao": this.$FU.moneyF2Y,
      "zhaoCaiBao": this.$FU.moneyF2Y,
      "fund": this.$FU.moneyF2Y,
      "cunJinBao": this.$FU.moneyF2Y,
      "taoBaoLiCai": this.$FU.moneyF2Y,
      "huabeiAvailableLimit": this.$FU.moneyF2Y,
      "huabeiLimit": this.$FU.moneyF2Y
    };
    const basicInfoKvs = {
      "accoutName": "用户名",
      "registerDate": "注册时间",
      "name": "姓名 ",
      "identityNo": "身份证号",
      "mobile": "电话号码",
      "email": "邮箱",
      "lastLogintime": "最后一次登录时间",
      "identityStatus": "实名认证"
    };
    const assetsInfoKvs = {
      "totalAssets": "总资产",
      "amount": "余额",
      "yuEBao": "余额宝",
      "zhaoCaiBao": "招财宝",
      "fund": "基金",
      "cunJinBao": "存金宝",
      "taoBaoLiCai": "淘宝理财",
      "huabeiAvailableLimit": "花呗可用额度",
      "huabeiLimit": "花呗总额度"
    };
    const bankInfoKvs = {
      "bankName": "银行名称",
      "bankType": "银行类型",
      "bankCardId": "银行卡",
      "name": "姓名",
      "mobile": "电话",
      "openDate": "开卡日期"
    };
    const addressInfoKvs = {
      "name": "姓名",
      "address": "地址",
      "zipcode": "邮政编码",
      "mobile": "电话号码" 
    };
    const tradeInfoKvs = {
      "tradeName": "交易名称",
      "trader": "交易对方",
      "amount": "金额",
      "createTime": "交易时间",
      "status": "交易状态"
    };
    return {
      inputFrom: {
        partnerUserId: ''
      },
      rules: {
        partnerUserId: [{ required: true, message: '请输入paetnerID', trigger: 'blur' }]
      },
      result: {
        "example": true,
        "code": '0000',
        "data": {
          "basicInfo": {
            "accoutName": "138****5516",
            "registerDate": "2014 年 08 月 24 日",
            "name": "*哥 ",
            "identityNo": "3****************X",
            "mobile": "138****5516",
            "email": "abc@yeah.net",
            "lastLogintime": "2017.08.24 14:55:31",
            "identityStatus": ""
          },
          "assetsInfo": {
            "totalAssets": "10000",
            "amount": "10000",
            "yuEBao": "10000",
            "zhaoCaiBao": "10000",
            "fund": "10000",
            "cunJinBao": "10000",
            "taoBaoLiCai": "10000",
            "huabeiAvailableLimit": "10000",
            "huabeiLimit": "10000"
          },
          "bankInfo": [{
            "bankName": "bankName",
            "bankType": "信用卡",
            "bankCardId": "**** **** **** 2656",
            "name": "账户名",
            "mobile": "152****4666",
            "openDate": "2017.04.17"
          }],
          "addressInfo": [{
            "name": "*哥",
            "address": "新华路",
            "zipcode": "100000",
            "mobile": "180****1010"
          }],
          "tradeInfo": [{
            "tradeName": "小买卖",
            "trader": "12312454444444412112",
            "amount": "3000",
            "createTime": "2018-11-01 15:24",
            "status": "已付款"
          }]
        }
      },
      moneyFmt,
      loading: false,
      btnText: "执行查询",
      tryAgain: 0,
      basicInfoKvs,
      bankInfoKvs,
      tradeInfoKvs,
      addressInfoKvs,
      assetsInfoKvs,
      ripId: '',
      token: ''
    };
  },
  methods: {
    getRipId: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/alipayGet', {
          headers: {
            authorization: vm.$db.get('authorization')
          }
        }).then(function (res) {
          resolve(res.data);
        });
      });
      return p;
    },
    onSubmit: function () {
      var vm = this;
      vm.loading = true;
      vm.btnText = "正在获取授权二维码。。。";
      vm.getRipId().then(function (data) {
        vm.ripId = data.rip_id;
        vm.token = data.token;
        vm.tryAgain = 5;
        vm.loading && vm.startOauth();
      });
    },
    startOauth: function () {
      var vm = this;
      if (vm.tryAgain == 0) {
        vm.$message({
          showClose: true,
          message: '很抱歉，未得到授权二维码。',
          type: 'error',
          duration: '5000'
        });
        vm.loading = false;
        vm.btnText = '执行查询';
      } else {
        vm.tryAgain--;
        vm.getStaus().then(function (data) {
          if (data.code == '0006') {
            vm.btnText = '等待授权操作';
            var qrCode = data.input.value;
            const h = vm.$createElement;
            vm.currentNotify = vm.$notify({
              title: '授权请求',
              message: h('div', null, [h('h3', {style: {width: '500px'}}, '请使用支付宝APP扫描该二维码'),
                                      h('img', {attrs: {src: 'data:image/png;base64,' + qrCode}, style: {width: '220px'}}, null)]),
              duration: 190000
            });
            vm.tryAgain = 36; // 重试36次
            vm.loading && vm.startPollingSearch();
          } else {
            vm.timeout = setTimeout(vm.startOauth, 3000);
          }
        });
      }
    },
    getStaus: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/getStatus', {
          params: {
            token: vm.token,
            ripId: vm.ripId,
            biztype: 'alipay'
          },
          headers: {
            authorization: vm.$db.get('authorization')
          }
        }).then(function (res) {
          resolve(res.data);
        });
      });
      return p;
    },
    getResult: function () {
      var vm = this;
      if (vm.tryAgain == 0) {
        vm.$message({
          showClose: true,
          message: vm.errorMsg || '获取报告失败',
          type: 'error',
          duration: '5000'
        });
      } else {
        vm.tryAgain--;
        vm.timeout = setTimeout(() => {
          vm.$http.get('api/rip/getResult', {
            params: {
              token: vm.token,
              ripId: vm.ripId,
              biztype: 'alipay'
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }
          }).then(function (res) {
            if (res.data.code == '0000') {
              vm.result = {
                example: false,
                code: '0000',
                data: res.data.data
              };
              vm.$message({
                showClose: true,
                message: '获取报告成功',
                type: 'success',
                duration: '5000'
              });
              vm.loading = false;
              vm.btnText = '执行查询';
            } else {
              vm.getResult();
              res.data.msg && (vm.errorMsg = res.data.msg);
            }
          });
        }, 3000);
      }
    },
    startPollingSearch: function () {
      var vm = this;
      if (vm.tryAgain != 0) {
        vm.tryAgain--;
        vm.getStaus().then(function (data) {
          if (data.code == '0006') {
            vm.btnText = '请再次扫描二维码提供授权';
            var qrCode = data.input.value;
            const h = vm.$createElement;
            vm.currentNotify && vm.currentNotify.close();
            vm.$message({
              showClose: true,
              message: '请再次扫描二维码提供授权。',
              duration: '5000'
            });
            vm.currentNotify = vm.$notify({
              title: '授权请求',
              message: h('div', null, [h('h3', {style: {width: '500px'}}, '请使用支付宝APP扫描该二维码'),
                                      h('img', {attrs: {src: 'data:image/png;base64,' + qrCode}, style: {width: '220px'}}, null)]),
              duration: 190000
            });
            vm.tryAgain = 36; // 重试36次
            vm.loading && vm.startPollingSearch();
          } else if (['0000', '0100'].includes(data.code)) {
            // 获取结果
            vm.btnText = "已得到您的授权，正在获取报告。";
            vm.currentNotify && vm.currentNotify.close();
            vm.tryAgain = data.code == '0000' ? 6 : 40;
            vm.getResult();
          } else {
            vm.timeout = setTimeout(vm.startPollingSearch, 5000);
          }
        });
      } else {
        // 超时啦
        vm.$message({
          showClose: true,
          message: '很抱歉，请求超时。',
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
