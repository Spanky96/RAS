<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>京东报告</span>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '京东报告'})">打印</el-button></el-col>
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
          <td colspan="2">绑定银行信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.bankInfo, bankInfoKvs)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">白条信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="$FU.getHtmlByKvsFromObj(baiTiaoInfoKvs, result.data.baiTiaoInfo)"></table></td>
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
          <td colspan="2">订单信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.orderDetail, orderDetailKvs)" class="table"></table></td>
        </tr>
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
    const basicInfoKvs = {
        "nickName": "会员名",
        "vipLevel": "会员等级",
        "mobileNo": "手机号",
        "email": "邮箱",
        "realName": "真实姓名",
        "idCard": "证件号码",
        "growthValue": "成长值",
        "securityLevel": "安全等级"
    };
    const bankInfoKvs = {
      "name": "姓名",
      "bankCardID": "银行卡",
      "cardType": "银行卡类型",
      "tel": "电话"
    };
    const baiTiaoInfoKvs = {
      "creditlimit": "总额度",
      "availablelimit": "可用额度",
      "isOpen": "是否开通",
      "monthloan": "下月账单",
      "biaoTiaoConSum": "白条消费",
      "xiaoBaiCreditValue": "小白信用",
      "payStatus": "支付状态",
      "totalToBePay": "待还款总额",
      "nextRepayMentDate": "还款日"
    };
    const addressInfoKvs = {
      "address": "收货地址",
      "linkman": "联系人", 
      "tel": "电话"
    };
    const orderDetailKvs = {
      "goodsName": "商品名称",
      "consigneeAddr ": "收货人地址",
      "orderDate": "订单时间",
      "orderMoney": "订单金额",
      "consigneePerson": "收货人",
      "tel": "收货电话",
      "orderStatus": "订单状态",
      "payType": "支付类型"
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
            "nickName": "jd_XXXX",
            "vipLevel": "银牌会员",
            "mobileNo": "131*****121",
            "email": "47*****40@qq.com",
            "realName": "周 XX",
            "idCard": "32************377X",
            "growthValue": "8174",
            "securityLevel": "较高"
          },
          "bankInfo": [{
            "name": "*杨",
            "bankCardID": "工商银行尾号 1234",
            "cardType": "储蓄卡",
            "tel": "131*****121"
          }],
          "baiTiaoInfo": {
            "creditlimit": "10000",
            "availablelimit": "10000",
            "isOpen": "已开通",
            "monthloan": "0",
            "biaoTiaoConSum": "5000",
            "xiaoBaiCreditValue": "86.9",
            "payStatus": "正常支付",
            "totalToBePay": "2531.11",
            "nextRepayMentDate": "\"2017-08-12 23:59:59\""
          },
          "addressInfo": [{
            "address": "上海市浦东新区商城路 297 号",
            "linkman": "周 XX",
            "tel": "159****1202"
          }],
          "orderDetail": [{
            "goodsName": "胆机（KSCAT）音箱",
            "consigneeAddr ": "浦东新区商城路 297 号",
            "orderDate": "2016-06-23 22:20:10",
            "orderMoney": "89.00",
            "consigneePerson": "周 XX",
            "tel": "159****3502",
            "orderStatus": "等待收货",
            "payType": "在线支付"
          }]
        }
      },
      loading: false,
      btnText: "执行查询",
      tryAgain: 0,
      basicInfoKvs,
      bankInfoKvs,
      baiTiaoInfoKvs,
      addressInfoKvs,
      orderDetailKvs,
      ripId: '',
      token: ''
    };
  },
  methods: {
    getRipId: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/jingdongGet', {
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
      vm.getRipId().then(function (data) {
        vm.ripId = data.rip_id;
        vm.token = data.token;
        vm.btnText = '等待授权操作,需耐心等待';
        var qrCode = data.input.value;
        const h = vm.$createElement;
        vm.currentNotify = vm.$notify({
          title: '授权请求',
          message: h('div', null, [h('h3', {style: {width: '500px'}}, '请使用京东APP扫描该二维码'),
                                  h('img', {attrs: {src: 'data:image/png;base64,' + qrCode}, style: {width: '220px'}}, null)]),
          duration: 180000
        });
        vm.tryAgain = 36; // 重试36次
        vm.loading && vm.startPollingSearch();
      });
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
              biztype: 'jd'
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
        vm.$http.get('api/rip/getStatus', {
          params: {
            token: vm.token,
            ripId: vm.ripId,
            biztype: 'jd'
          },
          headers: {
            authorization: vm.$db.get('authorization')
          }
        }).then(function (res) {
          if (['0000', '0100'].includes(res.data.code)) {
            // 获取结果
            vm.btnText = "已得到您的授权，正在获取报告。";
            vm.currentNotify && vm.currentNotify.close();
            vm.tryAgain = res.data.code == '0000' ? 6 : 15;
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
