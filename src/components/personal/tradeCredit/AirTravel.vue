<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>航旅信息</span>
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
            <el-form-item label="查询几月内的数据" label-width="0" prop="month" class="form-item">
              <el-cascader
              placeholder="请选择"
              :options="options"
              v-model="inputFrom.month"
              @change="handleChange">
            </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="护照号(国际航班需要)" label-width="0" prop="passportNo" class="form-item">
              <el-input v-model="inputFrom.passportNo"></el-input>
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
          <td>身份证对比结果</td>
          <td>{{result.identityValid}}</td>
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
          <td>数据是否存在</td>
          <td>{{result.status}}</td>
        </tr>
        <tr class="text-left">
          <td>头等舱乘机次数</td>
          <td>{{result.firstTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>商务舱乘机次数</td>
          <td>{{result.busTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>平均延误分钟数</td>
          <td>{{result.avgDelayTime}}</td>
        </tr>
        <tr class="text-left">
          <td>经济舱乘机次数</td>
          <td>{{result.ecoTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>一年内平均折扣</td>
          <td>{{result.domesticAvgDiscount}}</td>
        </tr>
        <tr class="text-left">
          <td>国内飞行次数</td>
          <td>{{result.flightDomesticTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>国际飞行次数</td>
          <td>{{result.flightInterTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>乘机次数</td>
          <td>{{result.flightTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>平均票价</td>
          <td>{{result.avgPrice}} 元</td>
        </tr>
        <tr class="text-left">
          <td>最频繁使用航空公司以及乘机次数</td>
          <td>{{result.favorFlightTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>最频繁乘机出发城市</td>
          <td>{{result.maxFromCity}}</td>
        </tr>
        <tr class="text-left">
          <td>最繁忙的月份</td>
          <td>{{result.busyMonth}}</td>
        </tr>
        <tr class="text-left">
          <td>最繁忙的月份乘机次数</td>
          <td>{{result.busyMonthTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>最频繁乘机到达城市</td>
          <td>{{result.maxToCity}}</td>
        </tr>
        <tr class="text-left">
          <td>免费次数</td>
          <td>{{result.freeTimes}}</td>
        </tr>
        <tr class="text-left">
          <td>平均提前多少天出票</td>
          <td>{{result.avgAdvanceTicketday}} 天</td>
        </tr>
        <tr class="text-left">
          <td>最后飞行时间</td>
          <td>{{result.lastFlightDate}}</td>
        </tr>
        <tr class="text-left">
          <td>最后起飞城市</td>
          <td>{{result.lastFromCity}}</td>
        </tr>
        <tr class="text-left">
          <td>最后抵达城市</td>
          <td>{{result.lastToCity}}</td>
        </tr>
        <tr class="text-left">
          <td>总共飞行里程数（KM）</td>
          <td>{{result.flyTotalKm}}</td>
        </tr>
        <tr class="text-left">
          <td>总延误分钟数</td>
          <td>{{result.delayTime}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ConsumptionLevel',
  components: {
  },
  data () {
    return {
      options: [
          {
              value: '3',
              label: '3月内'
          },
          {
              value: '6',
              label: '6月内'
          },
          {
              value: '12',
              label: '12月内'
          }
      ],
      inputFrom: {
        name: '',
        idCard: '',
        month: '',
        passportNo: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        identityValid: '一致',
        name: '赵雷',
        idCard: '320281199606286770',
        status: '数据存在',
            firstTimes: "0",
            busTimes: "0",
            avgDelayTime: "19",
            delayTime: "57",
            ecoTimes: "3",
            domesticAvgDiscount: "59",
            flightDomesticTimes: "3",
            flightInterTimes: "0",
            flightTimes: "3",
            avgPrice: "1090",
            favorFlightTimes: "深航,1 次",
            maxFromCity: "北京 2 次,深圳 1 次",
            busyMonth: "201711",
            busyMonthTimes: "1",
            maxToCity: "石家庄 1 次,深圳 1 次,重庆 1 次",
            freeTimes: "0",
            avgAdvanceTicketday: "2.67",
            lastFlightDate: "20171103",
            lastFromCity: "深圳",
            lastToCity: "石家庄",
            flyTotalKm: "5490"
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
          vm.$http.get('api/rip/airTravelinformationQuery', {
            params: {
              name: vm.inputFrom.name,
              idCard: vm.inputFrom.idCard,
              month: vm.inputFrom.month[0],
              passportNo: vm.inputFrom.passportNo
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
            if (res.data.success) {
              if (res.data.data.status == 'EXSIT') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    status: '数据存在',
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
              } else if (res.data.data.status == 'NO_DATA') {
                vm.result = {
                    example: false,
                    resultType: '0000',
                    status: '无数据',
                    identityValid: res.data.data.idCardValidator,
                    name: res.data.data.name,
                    idCard: res.data.data.idcard
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
