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
          <el-col :span="6" class="top-mar">
            <span>我已经阅读并同意<el-button type="text" @click="open">《授权协议》</el-button></span>
          </el-col>
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
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.return_code | resultLogoFmt" class="tag">{{result.return_code | resultSuccessFmt}}</el-tag></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">账户信息</td>
        </tr>
        <tr>
          <td colspan="2" v-if="result.data.accounts.length == 0" class="centerAlign">无数据</td>
        </tr>
        <tr class="inner-table" v-for="(account, index) in result.data.accounts" :key="index + '1'">
          <td colspan="2" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(accountsKvs, account)">
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">地址信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.addresses, addressesKvs)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">银行卡信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.cards, cardsKvs)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">订单流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.flows, flowsKvs, [], moneyFmt)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">支付宝流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.huabei_flows, huabeiFlowsKvs, [], moneyFmt)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">信用额度信息（数组），花呗、借呗、网商贷</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.credit_limit, creditLimitKvs, [], creditLimitFmt)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">泛金融电商钱包持仓</td>
        </tr>
        <tr>
          <td colspan="2" v-if="result.data.position_fund.length == 0" class="centerAlign">无数据</td>
        </tr>
        <tr class="inner-table" v-for="(pfund, index) in result.data.position_fund" :key="index + '2'">
          <td colspan="2" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObjTm(positionFundKvs, pfund, [], moneyFmt)">
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">基金、理财产品持仓</td>
        </tr>
        <tr>
          <td colspan="2" v-if="result.data.position_finance.length == 0" class="centerAlign">无数据</td>
        </tr>
        <tr class="inner-table" v-for="(pfe, index) in result.data.position_finance" :key="index + '3'">
          <td colspan="2" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObjTm(positionFinanceKvs, pfe, [], moneyFmt)">
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">泛金融定期持仓</td>
        </tr>
        <tr>
          <td colspan="2" v-if="result.data.position_fixed.length == 0" class="centerAlign">无数据</td>
        </tr>
        <tr class="inner-table" v-for="(pfixed, index) in result.data.position_fixed" :key="index + '4'">
          <td colspan="2" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObjTm(positionFixedKvs, pfixed, [], moneyFmt)">
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">商户流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.business_flows, huabeiFlowsKvs, [], moneyFmt)" class="table"></table></td>
        </tr>
                <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">账户余额流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.balance_flows, huabeiFlowsKvs, [], moneyFmt)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">余额宝流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.yuebao_flows, huabeiFlowsKvs, [], moneyFmt)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">近期流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.recent_flows, huabeiFlowsKvs, [], moneyFmt)" class="table"></table></td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="2">银行卡流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV3(result.data.bankcards_flows, huabeiFlowsKvs, [], moneyFmt)" class="table"></table></td>
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
    const moneyFmt = {
      settle_amount: this.$FU.moneyF2Y,
      capital: this.$FU.moneyF2Y,
      share: this.$FU.moneyF2Y,
      usable_share: this.$FU.moneyF2Y,
      net_value: this.$FU.moneyF2Y,
      market_value: this.$FU.moneyF2Y,
      expected_return: this.$FU.moneyF2Y,
      floating_pl: this.$FU.moneyF2Y,
      income_yesterday: this.$FU.moneyF2Y,
      amount: this.$FU.moneyF2Y,
      interest: this.$FU.moneyF2Y
    };
    const creditLimitFmt = {
      credit_limit: this.$FU.moneyF2Y,
      usable_limit: this.$FU.moneyF2Y,
      admit: function (v) {
        return v == 'true' ? '是' : '否';
      }
    };
    const accountsKvs = {
      id: '账户ID',
      type: '账户类型',
      account: '用户名',
      real_name: '真实姓名',
      idcard: '证件号',
      taobao_account: '淘宝会员名（支付宝特有）',
      nick_name: '昵称',
      birthday: '生日',
      gender: '性别',
      phone: '绑定手机',
      email: '绑定邮箱',
      balance: '账户余额',
      isidentify: '是否实名认证'
    };
    const addressesKvs = {
      account_id: '账户ID',
      name: '收货人姓名',
      phone: '收货人电话',
      address_area: '所在区域',
      address_detail: '详细地址',
      postcode: '邮编',
      is_default: '是否默认地址'
    };
    const cardsKvs = {
      account_id: '账户ID',
      card_type: '卡类型',
      open_date: '快捷支付的开通时间（绑卡时间）',
      bank: '银行名称',
      card: '卡号（后四位）',
      name: '持卡人姓名',
      fast_payment_flag: '是否开通快捷支付',
      phone: '银行预留手机号'
    };
    const flowsKvs = {
      account_id: '账户ID',
      order_num: '订单编号',
      settle_date: '交易时间',
      settle_amount: '交易金额',
      shop_name: '商户名称',
      status: '订单状态',
      trade_description: '交易描述',
      name: '收货人姓名',
      phone: '收货人电话',
      address_area: '所在地区',
      address_detail: '详细地址',
      postcode: '邮编',
      payment_mode: '支付方式'
    };
    const huabeiFlowsKvs = {
      account_id: '账户ID',
      order_num: '订单编号',
      settle_date: '交易时间',
      settle_amount: '交易金额',
      shop_name: '商户名称',
      status: '订单状态',
      trade_description: '交易描述',
      payment_mode: '支付方式'
    };
    const creditLimitKvs = {
      account_id: '账户ID',
      name: '产品名称',
      admit: '是否开通',
      account: '账号',
      credit_limit: '信用额度',
      usable_limit: '可用额度'
    };
    const positionFinanceKvs = {
      account_id: '账户ID',
      code: '产品代码',
      name: '产品名称',
      currency: '币种（中文，如人民币）',
      capital: '本金',
      share: '当前份额，余额宝余额使用该字段',
      usable_share: '可用份额',
      dividend_type: '分红方式（如 现金分红）',
      net_value: '当前净值',
      market_value: '当前市值',
      start_date: '开始时间',
      end_date: '到期时间',
      expected_return: '预期收益',
      expected_yield: '预期收益率（百分比）',
      floating_pl: '浮动盈亏',
      term: '存期',
      income_yesterday: '昨日收益',
      status: '状态'
    };
    const positionFundKvs = {
      account_id: '账户ID',
      code: '产品代码',
      name: '产品名称',
      currency: '币种（中文，如人民币）',
      capital: '本金',
      share: '当前份额，余额宝余额使用该字段',
      usable_share: '可用份额',
      dividend_type: '分红方式（如 现金分红）',
      net_value: '当前净值',
      net_value_date: '净值日期',
      market_value: '当前市值',
      floating_pl: '浮动盈亏',
      yield: '收益率（百分比）',
      income_yesterday: '昨日收益'
    };
    const positionFixedKvs = {
      account_id: '账户ID',
      code: '产品代码',
      name: '产品名称',
      status: '状态',
      currency: '币种（中文，如人民币）',
      start_date: '开始日期',
      end_date: '到期日期',
      capital: '本金',
      interest: '利息',
      amount: '本息总额',
      interest_rate: '利率',
      term: '存期',
      automatic_redeposit: '自动转存'
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
        "data": {
          "addresses": [{
            "address_area": "江苏省 南京市 *** ***",
            "address_detail": "南京信息工程大学",
            "account_id": "158658527260",
            "phone": "187****5679",
            "name": "**声",
            "postcode": "320111",
            "is_default": "n"
          }, {
            "address_area": "江苏省 苏州市 *******",
            "address_detail": "**镇**园**幢***室",
            "account_id": "158658527260",
            "phone": "173****5816",
            "name": "**辉",
            "postcode": "320583",
            "is_default": "n"
          }, {
            "address_area": "安徽省 芜湖市 *** ***",
            "address_detail": "虚拟地址",
            "account_id": "158658527260",
            "phone": "187****2555",
            "name": "Spanky",
            "postcode": "340203",
            "is_default": "n"
          }],
          "cards": [{
            "open_date": "",
            "bank": "中国农业银行",
            "account_id": "158658527260",
            "fast_payment_flag": "y",
            "phone": "187****5631",
            "name": "**鸣",
            "card_type": "储蓄卡",
            "card": "0772"
          }, {
            "open_date": "",
            "bank": "中国银行",
            "account_id": "158658***260",
            "fast_payment_flag": "y",
            "phone": "187****5631",
            "name": "**鸣",
            "card_type": "储蓄卡",
            "card": "7192"
          }],
          "huabei_flows": [{
            "payment_mode": "",
            "account_id": "158*****260",
            "settle_amount": "-111",
            "settle_date": "2018-11-14 09:35:00",
            "trade_description": "余额宝-2018.11.13-收益发放",
            "order_num": "20181114331675849001",
            "shop_name": "国泰基金管理有限公司",
            "status": "交易成功"
          }, {
            "payment_mode": "",
            "account_id": "1**6*****0",
            "settle_amount": "-199",
            "settle_date": "2018-11-14 03:44:00",
            "trade_description": "余额宝-自动转入",
            "order_num": "20181114009130101000000044725935",
            "shop_name": "国泰基金管理有限公司",
            "status": "交易成功"
          }, {
            "payment_mode": "",
            "account_id": "1586****8260",
            "settle_amount": "600",
            "settle_date": "2018-11-14 03:35:00",
            "trade_description": "App Store & Apple Music: ****期间完成的购买",
            "order_num": "2018111****15377514",
            "shop_name": "App Store &amp; Apple Music",
            "status": "交易成功"
          }, {
            "payment_mode": "",
            "account_id": "158*****260",
            "settle_amount": "1300",
            "settle_date": "2018-11-13 18:47:00",
            "trade_description": "商品",
            "order_num": "2018111322001473001015416735",
            "shop_name": "茶唐氏",
            "status": "交易成功"
          }],
          "login_name": "xxxxxxx",
          "business_flows": [],
          "flows": [{
            "address_area": "江苏省  *** *** ",
            "payment_mode": "",
            "settle_date": "2018-08-08 15:33:44",
            "trade_description": "现货包邮 码农翻身 用故事给技术加点料 企业级应用架构",
            "postcode": "214400",
            "shop_name": "电子工业出版社旗舰店",
            "address_detail": "",
            "account_id": "15******7260",
            "phone": "189***6527",
            "settle_amount": "4100",
            "name": "**龙",
            "order_num": "175266114423926745",
            "status": "交易成功"
          }, {
            "address_area": "安徽省 芜湖市 ******",
            "payment_mode": "",
            "settle_date": "2018-06-06 22:38:07",
            "trade_description": "［现货秒发］2018最新传智黑马PythonS教程零基础入门",
            "postcode": "000000",
            "shop_name": "Daotinの软件学院",
            "address_detail": "",
            "account_id": "158******7260",
            "phone": "187****2555",
            "settle_amount": "300",
            "name": "Spanky",
            "order_num": "15692950******6745",
            "status": "交易成功"
          }, {
            "address_area": "江苏省 苏州市 ******",
            "payment_mode": "",
            "settle_date": "2017-12-12 23:07:27",
            "trade_description": "【1212价】Intel/英特尔 I7 7700K 酷睿i7四核处理器 台式机电脑盒装CPU",
            "postcode": "215300",
            "shop_name": "英特尔官方旗舰店",
            "address_detail": "",
            "account_id": "158******260",
            "phone": "173****5816",
            "settle_amount": "235900",
            "name": "**辉",
            "order_num": "113270217104926745",
            "status": "交易成功"
          }],
          "position_fund": [{
             "dividend_type": "",
              "net_value_date": "",
              "capital": "",
              "floating_pl": "",
              "market_value": "42035",
              "code": "",
              "income_yesterday": "",
              "usable_share": "42035",
              "account_id": "131******06253",
              "net_value": "",
              "yield": "",
              "name": "余额宝",
              "currency": "人民币",
              "share": "42035"
            }
          ],
          "organization_id": "1020004",
          "credit_limit": [{
            "credit_limit": "200000",
            "name": "花呗",
            "account_id": "158658527260",
            "admit": "true",
            "usable_limit": "102203",
            "account": "819****98@qq.com"
          }, {
            "credit_limit": "",
            "name": "借呗",
            "account_id": "158******60",
            "admit": "false",
            "usable_limit": "",
            "account": "819****98@qq.com"
          }],
          "yuebao_flows": [],
          "balance_flows": [],
          "bankcards_flows": [],
          "recent_flows": [],
          "position_finance": [],
          "position_fixed": [],
          "organization_type": "COMMERCE",
          "accounts": [{
            "birthday": "1996-06-28",
            "gender": "男",
            "taobao_account": "******小笨蛋",
            "real_name": "**鸣",
            "type": "支付宝",
            "zmxy": "",
            "register_time": "2015-07-05 00:00:00",
            "available_limit": "102203",
            "isidentify": "y",
            "balance": "0",
            "phone": "187****5631",
            "yuebao_balance": "1454065",
            "idcard": "3****************4",
            "nick_name": "钻******笨蛋",
            "repay_day": "",
            "limit": "200000",
            "id": "158658527260",
            "account": "819****98@qq.com",
            "email": "819****98@qq.com"
          }]
        },
        "return_message": "",
        "return_code": "0"
      },
      openId: '',
      loading: false,
      btnText: "执行查询",
      tryAgain: 0,
      moneyFmt,
      creditLimitFmt,
      accountsKvs,
      addressesKvs,
      cardsKvs,
      flowsKvs,
      huabeiFlowsKvs,
      creditLimitKvs,
      positionFinanceKvs,
      positionFundKvs,
      positionFixedKvs
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
                    message: h('div', null, [h('h3', {style: {width: '500px'}}, '请使用手机淘宝APP扫描二维码提供授权'),
                                            h('qriously', {props: {size: 220, value: qrCode}}, null)]),
                    duration: 140000
                  });
                  vm.tryAgain = 45; // 重试45次
                  vm.loading && vm.startPollingSearch();
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
    getResult: function (taskId) {
      var vm = this;
      vm.$http.get('api/rip/electricityCommerce/data', {
        params: {
          open_id: vm.openId,
          task_id: taskId
        },
        headers: {
          authorization: vm.$db.get('authorization')
        }
      }).then(function (res) {
        if (res.data.return_code == '0') {
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
        } else {
          vm.$message({
            showClose: true,
            message: res.data.return_message || (res.data.return_code + '获取报告失败'),
            type: 'success',
            duration: '1000'
          });
        }
      });
    },
    startPollingSearch: function () {
      var vm = this;
      if (vm.tryAgain != 0) {
        vm.tryAgain--;
        vm.$http.get('api/rip/electricityCommerce/status', {
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
            vm.getResult(res.data.task_info.task_id);
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
    },
    open () {
            var vm = this;
            this.$http
                .get("static/licenseAgreement.txt")
                .then(function (response) {
                    vm.$alert(response.data, "授权数据采集服务协议", {
                        dangerouslyUseHTMLString: true,
                        showConfirmButton: false,
                        callback: action => {
                            vm.$message({
                                type: "success",
                                message: `已同意`
                            });
                        }
                    });
                });
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
