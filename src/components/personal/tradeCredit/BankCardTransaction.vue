<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>银行卡交易信息查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputFrom.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="银行卡号" label-width="0" prop="bankCardNo" class="form-item">
              <el-input v-model="inputFrom.bankCardNo"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '身份证一致性验证'})">打印</el-button></el-col>
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
        </tr>
        <tr class="text-left">
          <td>身份证号码</td>
          <td>{{result.idCard | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td>银行卡号码</td>
          <td>{{result.bankCardNo | handleBankCardNo}}</td>
        </tr>
        <tr class="text-left">
          <td>银行卡信息</td>
        </tr>
        <tr class="text-left">
          <td>借贷标记(credit：信用卡，debit：借记卡)</td>
          <td>{{result.bankCardInfo.loanMark}}</td>
          <td>卡等级</td>
          <td>{{result.bankCardInfo.cardRank}}</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
        <tr class="text-left">
          <td>是否银联高端客户</td>
          <td>{{result.bankCardInfo.isUnionpayVIP}}</td>
        </tr>
        <tr class="text-left">
          <td>交易城市信息</td>
        </tr>
        <tr class="text-left">
          <td>当月活动省市</td>
          <td>{{result.transactionCityInfo.activeProvincesThisM}}</td>
          <td>最近一笔交易城市</td>
          <td>{{result.transactionCityInfo.latestTransactionCity}}</td>
        </tr>
        <tr class="text-left">
          <td>最近一笔交易城市名称</td>
          <td>{{result.transactionCityInfo.latestTransactionCityName}}</td>
          <td>第一常用城市总金额</td>
          <td>{{result.transactionCityInfo.cityConsume1st}}</td>
        </tr>
        <tr class="text-left">
          <td>第二常用城市总金额</td>
          <td>{{result.transactionCityInfo.cityConsume2nd}}</td>
          <td>第三常用城市总金额</td>
          <td>{{result.transactionCityInfo.cityConsume3rd}}</td>
        </tr>
        <tr class="text-left">
          <td>第一常用城市名称</td>
          <td>{{result.transactionCityInfo.cityConsumeName1st}}</td>
          <td>第二常用城市名称</td>
          <td>{{result.transactionCityInfo.cityConsumeName2nd}}</td>
        </tr>
        <tr class="text-left">
          <td>第三常用城市名称</td>
          <td>{{result.transactionCityInfo.cityConsumeName3rd}}</td>
          <td>近 6 个月交易金额排名第一的城市名称</td>
          <td>{{result.transactionCityInfo.rankConsumeCity6M1st}}</td>
        </tr>
        <tr class="text-left">
          <td>近 6 个月交易金额排名第二的城市名称</td>
          <td>{{result.transactionCityInfo.rankConsumeCity6M2nd}}</td>
          <td>近 6 个月交易金额排名第三的城市名称</td>
          <td>{{result.transactionCityInfo.rankConsumeCity6M3rd}}</td>
        </tr>
        <tr class="text-left">
          <td>基本消费信息</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月消费金额</td>
          <td>{{result.basicConsumptionInfo.consume1M}}</td>
          <td>近 1 个月消费笔数</td>
          <td>{{result.basicConsumptionInfo.consumeTimes1M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 12 个月月均消费金额</td>
          <td>{{result.basicConsumptionInfo.averageConsume12M}}</td>
          <td>近 12 个月月均消费笔数</td>
          <td>{{result.basicConsumptionInfo.averageConsumeTimes12M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月消费类交易金额</td>
          <td>{{result.basicConsumptionInfo.consumeTransaction1M}}</td>
          <td>近 12 个月消费类交易金额</td>
          <td>{{result.basicConsumptionInfo.consumeTransaction12M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月消费类交易笔数</td>
          <td>{{result.basicConsumptionInfo.consumeTransactionTimes1M}}</td>
          <td>近 12 个月消费类交易笔数</td>
          <td>{{result.basicConsumptionInfo.consumeTransactionTimes12M}}</td>
        </tr>
        <tr class="text-left">
          <td>基本交易信息</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月交易金额</td>
          <td>{{result.basicTransactionInfo.transaction1M}}</td>
          <td>近 1 个月交易笔数</td>
          <td>{{result.basicTransactionInfo.transactionTimes1M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月午夜交易金额（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransaction1M}}</td>
          <td>近 6 个月午夜交易金额（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransaction6M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 12 个月午夜交易金额（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransaction12M}}</td>
          <td>近 1 个月午夜交易笔数（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransactionTimes1M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 6 个月午夜交易笔数（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransactionTimes6M}}</td>
          <td>近 12 个月午夜交易笔数（午夜：00：00-06:00</td>
          <td>{{result.basicTransactionInfo.nightTransactionTimes12M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月午夜交易金额占比（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransactionPro1M}}</td>
          <td>近 12 个月午夜交易金额占比（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransactionPro12M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月午夜交易笔数占比（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransactionTimesPro1M}}</td>
          <td>近 12 个月午夜交易笔数占比（午夜：00：00-06:00）</td>
          <td>{{result.basicTransactionInfo.nightTransactionTimesPro12M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月转出交易金额（仅支持借记卡）</td>
          <td>{{result.basicTransactionInfo.outTransaction1M}}</td>
          <td>近 1 个月转出交易笔数（仅支持借记卡</td>
          <td>{{result.basicTransactionInfo.outTransactionTimes1M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 12 个月交易天数</td>
          <td>{{result.basicTransactionInfo.activeDays12M}}</td>
          <td>最近一笔交易（含转入转出）日期</td>
          <td>{{result.basicTransactionInfo.latestTransactionDate}}</td>
        </tr>
        <tr class="text-left">
          <td>近 12 个月有无境外交易</td>
          <td>{{result.basicTransactionInfo.overseaTrade12M}}</td>
          <td>近 12 个月跨境交易国家名称列举</td>
          <td>{{result.basicTransactionInfo.overseasTradeCountryList12M}}</td>
        </tr>
        <tr class="text-left">
          <td>典当拍卖类交易信息</td>
        </tr>
        <tr class="text-left">
          <td>近 1 个月典当、拍卖、信托交易金额</td>
          <td>{{result.bankCardInfo.pawnAuctionTrust1M}}</td>
          <td>近 6 个月典当、拍卖、信托交易金额</td>
          <td>{{result.bankCardInfo.pawnAuctionTrust6M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 12 个月典当、拍卖、信托交易金额</td>
          <td>{{result.bankCardInfo.pawnAuctionTrust12M}}</td>
          <td>近 1 个月典当、拍卖、信托交易笔数</td>
          <td>{{result.bankCardInfo.pawnAuctionTrustTimes1M}}</td>
        </tr>
        <tr class="text-left">
          <td>近 6 个月典当、拍卖、信托交易笔数</td>
          <td>{{result.bankCardInfo.pawnAuctionTrustTimes6M}}</td>
          <td>近 12 个月典当、拍卖、信托交易笔数</td>
          <td>{{result.bankCardInfo.pawnAuctionTrustTimes12M}}</td>
        </tr>
        <tr class="text-left">
          <td>证券保险类交易信息</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
        <tr class="text-left">
          <td>博彩罚款类交易信息</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
        <tr class="text-left">
          <td>医疗卫生类交易信息</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
        <tr class="text-left">
          <td>法律服务类交易信息</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
        <tr class="text-left">
          <td>商户交易类信息</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
        <tr class="text-left">
          <td>购物类交易信息</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
        <tr class="text-left">
          <td>借贷还款类交易信息</td>
        </tr>
        <tr class="text-left">
          <td>卡名称</td>
          <td>{{result.bankCardInfo.cardName}}</td>
          <td>发卡行</td>
          <td>{{result.bankCardInfo.issuingBank}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BankCardTransaction',
  components: {
  },
  data () {
    return {
      inputFrom: {
        name: '',
        idCard: '',
        bankCardNo: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }],
        bankCardNo: [{ validator: this.$validator.bankCardValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        identityValid: '一致',
        name: '赵雷',
        idCard: '320281199606286770',
        bankCardNo: '3415432543254325432',
        bankCardInfo: {
            "loanMark": "debit",
            "cardRank": "\"null\"",
            "cardName": "金穗通宝卡(银联卡)",
            "issuingBank": "中国农业银行",
            "isUnionpayVIP": "非银联高端客户"
        },
        transactionCityInfo: {
            "activeProvincesThisM": "null",
            "latestTransactionCity": "null",
            "latestTransactionCityName": "苏州市",
            "cityConsume1st": "0",
            "cityConsume2nd": "0",
            "cityConsume3rd": "0",
            "cityConsumeName1st": "\"null\"",
            "cityConsumeName2nd": "\"null\"",
            "cityConsumeName3rd": "\"null\"",
            "rankConsumeCity6M1st": "\"null\"",
            "rankConsumeCity6M2nd": "\"null\"",
            "rankConsumeCity6M3rd": "\"null\""
        },
        basicConsumptionInfo: {
            "consume1M": "20",
            "consumeTimes1M": "1",
            "averageConsume12M": "25.95",
            "averageConsumeTimes12M": "0.9167",
            "consumeTransaction1M": "20",
            "consumeTransaction12M": "311.45",
            "consumeTransactionTimes1M": "1",
            "consumeTransactionTimes12M": "11"
        },
        basicTransactionInfo: {
            "transaction1M": "20",
            "transactionTimes1M": "1",
            "nightTransaction1M": "0",
            "nightTransaction6M": "0",
            "nightTransaction12M": "0",
            "nightTransactionTimes1M": "0",
            "nightTransactionTimes6M": "0",
            "nightTransactionTimes12M": "0",
            "nightTransactionPro1M": "0.00",
            "nightTransactionPro12M": "0.00",
            "nightTransactionTimesPro1M": "0.00",
            "nightTransactionTimesPro12M": "0.00",
            "outTransaction1M": "0",
            "outTransactionTimes1M": "0",
            "activeDays12M": "11",
            "latestTransactionDate": "20180914",
            "overseaTrade12M": "未发生过境外交易",
            "overseasTradeCountryList12M": "\"null\""
        },
        pawnAuctionInfo: {
            "pawnAuctionTrust1M": "0",
            "pawnAuctionTrust6M": "0",
            "pawnAuctionTrust12M": "0",
            "pawnAuctionTrustTimes1M": "0",
            "pawnAuctionTrustTimes6M": "0",
            "pawnAuctionTrustTimes12M": "0"
        },
        securitiesInsuranceInfo: {
            "securityTrading12M": "0",
            "securityTradingTimes12M": "0",
            "insurance1M": "0",
            "insurance6M": "0",
            "insurance12M": "0",
            "insuranceTimes1M": "0",
            "insuranceTimes6M": "0",
            "insuranceTimes12M": "0"
        },
        gamingFinesInfo: {
            "gamingConsume1M": "0",
            "gamingConsume6M": "0",
            "gamingConsume12M": "0",
            "gamingConsumeTimes1M": "0",
            "gamingConsumeTimes6M": "0",
            "gamingConsumeTimes12M": "0",
            "fineLast1M": "0",
            "fineLastTimes1M": "0"
        },
        healthCareInfo: {
            "healthConsume1M": "0",
            "healthConsumeTimes1M": "0",
            "medicalApparatusConsume1M": "0",
            "medicalApparatusConsume12M": "0",
            "medicalApparatusConsumeTimes1M": "0",
            "medicalApparatusConsumeTimes12M": "0"
        },
        legalServiceInfo: {
            "legalService1M": "0",
            "legalService12M": "0",
            "legalServiceTimes1M": "0",
            "legalServiceTimes12M": "0"
        },
        merchantTransactionInfo: {
            "highRiskStoreTrading1M": "0",
            "highRiskStoreTrading6M": "0",
            "highRiskStoreTradingTimes1M": "0",
            "largestConsumeMerchant1M": "（特约）小米支付",
            "largestMerchantConsume6M": "195",
            "mostFrequentMerchant1M": "（特约）小米支付",
            "mostFrequentMerchant6M": "（特约）小米支付"
        },
        shoppingTransactionInfo: {
            "onlineTransaction12M": "224.85",
            "onlineTransactionTimes12M": "10",
            "luxuryConsume1M": "0",
            "luxuryConsumeTimes1M": "0"
        },
        loanRepaymentInfo: {
            "creditCardPayment1M": "0",
            "creditCardPayment12M": "0",
            "creditCardPaymentTimes12M": "0",
            "loan1M": "0",
            "loan6M": "0",
            "loanTimes1M": "0",
            "loanTimes6M": "0"
        }
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
          vm.$http.get('api/rip/bankCardTransactionInformationQuery', {
            params: {
              name: vm.inputFrom.name,
              idCard: vm.inputFrom.idCard,
              month: vm.inputFrom.month,
              passportNo: vm.inputFrom.passportNo
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.success) {
                  vm.result = {
                    example: false,
                    resultType: '0000',
                    identityValid: res.data.data.idCardValidator,
                    name: res.data.data.name,
                    idCard: res.data.data.idcard,
                    firstTimes: res.data.data.flightInfoDetail.firstTimes,
                    busTimes: res.data.data.flightInfoDetail.busTimes,
                    avgDelayTime: res.data.data.flightInfoDetail.avgDelayTime,
                    delayTime: res.data.data.flightInfoDetail.delayTime,
                    ecoTimes: res.data.data.flightInfoDetail.ecoTimes,
                    domesticAvgDiscount: res.data.data.flightInfoDetail.domesticAvgDiscount,
                    flightDomesticTimes: res.data.data.flightInfoDetail.flightDomesticTimes,
                    flightInterTimes: res.data.data.flightInfoDetail.flightInterTimes,
                    flightTimes: res.data.data.flightInfoDetail.flightTimes,
                    avgPrice: res.data.data.flightInfoDetail.avgPrice,
                    favorFlightTimes: res.data.data.flightInfoDetail.favorFlightTimes,
                    maxFromCity: res.data.data.flightInfoDetail.maxFromCity,
                    busyMonth: res.data.data.flightInfoDetail.busyMonth,
                    busyMonthTimes: res.data.data.flightInfoDetail.busyMonthTimes,
                    maxToCity: res.data.data.flightInfoDetail.maxToCity,
                    freeTimes: res.data.data.flightInfoDetail.freeTimes,
                    avgAdvanceTicketday: res.data.data.flightInfoDetail.avgAdvanceTicketday,
                    lastFlightDate: res.data.data.flightInfoDetail.lastFlightDate,
                    lastFromCity: res.data.data.flightInfoDetail.lastFromCity,
                    lastToCity: res.data.data.flightInfoDetail.lastToCity,
                    flyTotalKm: res.data.data.flightInfoDetail.flyTotalKm
                  };
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
