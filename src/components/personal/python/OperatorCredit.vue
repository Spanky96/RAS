<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>运营商信用报告</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row type="flex" align="middle">
          <el-col :span="8">
            <el-form-item label="手机号" label-width="0" prop="cellphone" class="form-item">
              <el-input maxlength="40" v-model="inputFrom.cellphone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码（运营商）" label-width="0" prop="password" class="form-item">
              <el-input maxlength="6" class="password-input" :class="{'show-password': showPassword}" v-model="inputFrom.password">
                <i slot="suffix" class="el-icon-view" style="cursor:pointer;"  @click="showPassword = !showPassword;"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" round @click="getToken()" :disabled="wait!=0">{{wait == 0 ? '获取验证码' : wait + '秒后再试'}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="验证码" label-width="0" prop="sign" class="form-item">
              <el-input v-model="inputFrom.sign">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" align="bottom">
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '运营商信用报告'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.code | resultLogoFmt" class="tag">{{result.code | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td width="20%">姓名</td>
          <td>{{result.data.realName}}</td>
        </tr>
        <tr class="text-title">
          <td colspan="2">基本信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="objectInfo2Html(result.data.basicInfo, basicInfoKvs)"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="2">前十通话记录次数</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="arrayInfo2Html(result.data.stati, statiKvs)"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="2">近6个月通话记录详单</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="arrayInfo2HtmlV2(result.data.callRecordInfo, callRecordInfoKvs)"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="2">近6个月账单信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="arrayInfo2HtmlV2(result.data.bill, billKvs)"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="2">近6个月短信信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="arrayInfo2HtmlV2(result.data.smsInfo, smsInfoKvs)"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="2">近6个月上网信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="arrayInfo2HtmlV2(result.data.netInfo, netInfoKvs)"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="2">近6个月办理业务信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="2" style="padding: 0;"><table class="table" v-html="arrayInfo2HtmlV2(result.data.businessInfo, businessInfoKvs)"></table></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OperatorCredit',
  components: {
  },
  data () {
    const basicInfoKvs = {
      mobileNo: '本机号码',
      realName: '姓名',
      registerDate: '入网时间',
      idCard: '身份证号',
      address: '地址',
      vipLevelstr: '星级',
      email: '邮箱',
      pointsValuestr: '可用积分',
      amount: '可用余额'
    };
    const statiKvs = {
      mobileNo: '与本机通话手机号码',
      callCount: '与本机通话次数' 
    };
    const callRecordInfoKvs = {
      callAddress: '通话地点',
      callDateTime: '通话时间',
      callTimeLength: '通话时长(秒) ',
      callType: '通话类型(主叫、被叫)',
      mobileNo: '与本机通话手机号码',
      cost: '通话费用'
    };
    const billKvs = {
      mobileNo: '本机号码',
      startTime: '账单月份',
      comboCost: '套餐消费',
      sumCost: '总金额',
      realCost: '实际费用'
    };
    const smsInfoKvs = {
      mobileNo: '本机号码',
      sendSmsToTelCode: '与本机通话手机号码',
      sendSmsAddress: '发送地',
      sendSmsTime: '发送时间',
      sendType: '发送类型(接收、发送)'
    };
    const netInfoKvs = {
      mobileNo: '本机号码',
      place: '上网地点',
      netTime: '上网时间',
      onlineTime: '上网时长(秒)',
      netType: '上网类型',
      cost: '上网费用(元)',
      netFlow: '上网流量'
    };
    const businessInfoKvs = {
      mobileNo: '本机号码',
      businessName: '业务名称',
      beginTime: '业务开始时间',
      cost: '业务消费'
    };
    return {
      inputFrom: {
        cellphone: '',
        password: ''
      },
      rules: {
        cellphone: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }],
        password: [{ validator: this.$validator.cellPhonePassword, trigger: 'blur' }],
        sign: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      result: {
        example: true,
        "code": "0000",
        "msg": "成功",
        "token": "d99732b448b242b3a04e1e508f439f0d",
        "data": {
          "callRecordInfo": [{
              "callAddress": "无锡",
              "callDateTime": "2018-11-10 10:09:10",
              "callTimeLength": "74",
              "callType": "被叫",
              "mobileNo": "18915496587"
            },
            {
              "callAddress": "无锡",
              "callDateTime": "2018-11-06 13:27:19",
              "callTimeLength": "9",
              "callType": "被叫",
              "mobileNo": "17301187781"
            },
            {
              "callAddress": "无锡",
              "callDateTime": "2018-11-02 11:26:42",
              "callTimeLength": "5",
              "callType": "被叫",
              "mobileNo": "13373611213"
            },
            {
              "callAddress": "无锡",
              "callDateTime": "2018-11-01 11:29:19",
              "callTimeLength": "14",
              "callType": "被叫",
              "mobileNo": "17095137251"
            },
            {
              "callAddress": "无锡",
              "callDateTime": "2018-10-30 11:34:37",
              "callTimeLength": "69",
              "callType": "被叫",
              "mobileNo": "02595084036"
            }
          ],
          "realName": "xx鸣",
          "basicInfo": {
            "mobileNo": "18795905631",
            "realName": "xx鸣",
            "registerDate": "2014-08-14 00:00:00",
            "idCard": "",
            "address": "",
            "vipLevelstr": "3",
            "email": "",
            "pointsValuestr": "104",
            "amount": "94.26"
          },
          "stati": [{
              "mobileNo": "18915256527",
              "callCount": "11"
            },
            {
              "mobileNo": "13961631698",
              "callCount": "10"
            },
            {
              "mobileNo": "18015391898",
              "callCount": "4"
            },
            {
              "mobileNo": "051086417115",
              "callCount": "4"
            },
            {
              "mobileNo": "15261640316",
              "callCount": "3"
            },
            {
              "mobileNo": "13636678382",
              "callCount": "3"
            },
            {
              "mobileNo": "13373611213",
              "callCount": "2"
            },
            {
              "mobileNo": "18721140001",
              "callCount": "2"
            },
            {
              "mobileNo": "18036868480",
              "callCount": "2"
            },
            {
              "mobileNo": "18549854485",
              "callCount": "2"
            }
          ],
          "bill": [{
              "mobileNo": "18795905631",
              "startTime": "2018-11-01 00:00:00",
              "comboCost": "19.70",
              "sumCost": "19.70",
              "realCost": "19.70"
            },
            {
              "mobileNo": "18795905631",
              "startTime": "2018-10-01 00:00:00",
              "comboCost": "92.23",
              "sumCost": "92.43",
              "realCost": "92.43"
            },
            {
              "mobileNo": "18795905631",
              "startTime": "2018-09-01 00:00:00",
              "comboCost": "61.00",
              "sumCost": "61.80",
              "realCost": "61.80"
            },
            {
              "mobileNo": "18795905631",
              "startTime": "2018-08-01 00:00:00",
              "comboCost": "43.00",
              "sumCost": "43.30",
              "realCost": "43.30"
            },
            {
              "mobileNo": "18795905631",
              "startTime": "2018-07-01 00:00:00",
              "comboCost": "43.00",
              "sumCost": "43.00",
              "realCost": "43.00"
            },
            {
              "mobileNo": "18795905631",
              "startTime": "2018-06-01 00:00:00",
              "comboCost": "61.00",
              "sumCost": "61.00",
              "realCost": "61.00"
            }
          ],
          "smsInfo": [{
              "mobileNo": "18795905631",
              "sendSmsToTelCode": "106917534131788075",
              "sendSmsAddress": "内地",
              "sendSmsTime": "2018-11-10 22:15:46",
              "sendType": "接收"
            },
            {
              "mobileNo": "18795905631",
              "sendSmsToTelCode": "106917534131788075",
              "sendSmsAddress": "内地",
              "sendSmsTime": "2018-11-10 21:56:40",
              "sendType": "接收"
            },
            {
              "mobileNo": "18795905631",
              "sendSmsToTelCode": "1069209650963806",
              "sendSmsAddress": "内地",
              "sendSmsTime": "2018-11-10 21:37:36",
              "sendType": "接收"
            },
            {
              "mobileNo": "18795905631",
              "sendSmsToTelCode": "10690605433119727",
              "sendSmsAddress": "内地",
              "sendSmsTime": "2018-11-10 19:26:10",
              "sendType": "接收"
            },
            {
              "mobileNo": "18795905631",
              "sendSmsToTelCode": "106911598774583806",
              "sendSmsAddress": "内地",
              "sendSmsTime": "2018-11-10 18:03:35",
              "sendType": "接收"
            }
          ],
          "netInfo": [{
              "mobileNo": "18795905631",
              "place": "江苏",
              "netTime": "2018-11-09 09:22:12",
              "onlineTime": "10800",
              "netType": "4G"
            },
            {
              "mobileNo": "18795905631",
              "place": "江苏",
              "netTime": "2018-11-09 09:22:10",
              "onlineTime": "0",
              "netType": "4G"
            },
            {
              "mobileNo": "18795905631",
              "place": "浙江",
              "netTime": "2018-11-03 14:15:08",
              "onlineTime": "70",
              "netType": "2G"
            },
            {
              "mobileNo": "18795905631",
              "place": "浙江",
              "netTime": "2018-11-03 14:05:34",
              "onlineTime": "571",
              "netType": "2G"
            },
            {
              "mobileNo": "18795905631",
              "place": "浙江",
              "netTime": "2018-11-03 12:35:27",
              "onlineTime": "5407",
              "netType": "4G"
            }
          ],
          "businessInfo": [{
              "mobileNo": "18795905631",
              "businessName": "话费充值",
              "beginTime": "2018-10-19 00:00:00",
              "cost": ""
            },
            {
              "mobileNo": "18795905631",
              "businessName": "积分兑换",
              "beginTime": "2018-10-19 00:00:00",
              "cost": ""
            },
            {
              "mobileNo": "18795905631",
              "businessName": "5元话费直充",
              "beginTime": "2018-10-19 00:00:00",
              "cost": ""
            },
            {
              "mobileNo": "18795905631",
              "businessName": "任我用叠加包B（校园）",
              "beginTime": "2018-03-29 00:00:00",
              "cost": ""
            },
            {
              "mobileNo": "18795905631",
              "businessName": "校园任我用叠加包优惠50元",
              "beginTime": "2018-03-29 00:00:00",
              "cost": ""
            }
          ]
        }
      },
      showPassword: false,
      ripId: '',
      token: '',
      wait: 0,
      basicInfoKvs,
      statiKvs,
      callRecordInfoKvs,
      billKvs,
      smsInfoKvs,
      netInfoKvs,
      businessInfoKvs
    };
  },
  methods: {
    getToken: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$refs['inputFrom'].validateField('cellphone', (valid) => {
        if (!valid) {
          vm.$refs['inputFrom'].validateField('password', (valid2) => {
            if (!valid2) {
              vm.time(true);
              vm.$http.get('api/rip/mobileGet', {
                params: {
                  cellphone: vm.inputFrom.cellphone,
                  password: vm.inputFrom.password
                },
                headers: {
                  authorization: vm.$db.get('authorization')
                }}).then(function (res) {
                  if (res.data.code == '0010') {
                    vm.ripId = res.data.rip_id;
                    vm.token = res.data.token;
                    console.log('token: ' + vm.token + '; ripId: ' + vm.ripId);
                    resolve();
                  } else if (res.data.code == '0000') {
                    // 已经有数据
                    vm.$alert('您之前成功获取授权，直接返回信用报告。', '提示框', { confirmButtonText: '确定' });
                    vm.result = res.data;
                    vm.example = false;
                  } else {
                    vm.$message({
                      showClose: true,
                      message: res.data.msg || '获取失败',
                      type: 'error',
                      duration: '5000'
                    });
                  }
                });
              }
            });
          }
        });
      });
      p.then(function () {
        // 第一次获取轮询信息
        var pStatus = vm.getTaskStatus();
        pStatus.then(function (data) {
          if (data.code == '0001' && data.input.type == 'sms-jl') {
            console.log('吉林电信');
              vm.$alert('吉林电信用户需主动发送 CXXD 至 10001 获取验证码', '提示框', { confirmButtonText: '确定' });
          }
        });
      });
    },
    getTaskStatus: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/getStatus', {
          params: {
            token: vm.token,
            ripId: vm.ripId,
            biztype: 'mobile'
          },
          headers: {
            authorization: vm.$db.get('authorization')
          }}).then(function (res) {
            resolve(res.data);
          });
        });
      return p;
    },
    time: function (first) {
      var vm = this;
      if (first) {
        vm.wait = 60;
        vm.time();
      } else if (vm.wait) {
        vm.wait--;
        setTimeout(function () {
          vm.time();
        }, 1000);
      }
    },
    onSubmit: function () {
      var vm = this;
      if (!vm.token) {
        vm.$alert('请先获取验证码', '提示框', { confirmButtonText: '确定' });
      }
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          vm.$http.get('api/rip/getInput', {
            params: {
              token: vm.token,
              sign: vm.inputFrom.sign
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
              if (res.data.code == '0009') {
                console.log('验证码写入成功，即将轮询检查结果');
                vm.startPollingSearch();
              } else {
                vm.$message({
                  showClose: true,
                  message: res.data.msg || '验证码未成功写入',
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
      var pStatus = vm.getTaskStatus();
      pStatus.then(function (data) {
        if (data.code && (data.code == '0000' || data.code == '0010')) {
          // 获取结果
          vm.$http.get('api/rip/getResult', {
          params: {
            token: vm.token,
            ripId: vm.ripId,
            biztype: 'mobile'
          },
          headers: {
            authorization: vm.$db.get('authorization')
          }}).then(function (res) {
            // 把结果直接替换样本数据
            vm.result = res.data;
            vm.example = false;
          });
        } else if (data.code) {
          console.log(new Date().getTime() + '___轮询___code：' + data.code);
          // 两秒后再次请求api
          setTimeout(vm.startPollingSearch(), 2000);
        } else {
          vm.$message({
            showClose: true,
            message: '验证不通过，结束轮询',
            type: 'error',
            duration: '5000'
          });
        }
      });
    },
    // 下面是 结果转表单
    objectInfo2Html: function (basicInfo, kvs) {
      var html = "";
      let index = 0;
      var keys = Object.keys(basicInfo);
      for (let i in basicInfo) {
        if (index % 2) {
          html += `
                <td width="20%">${kvs[i]}</td>
                <td width="30%">${basicInfo[i]}</td>
                </tr>
              `;
        } else {
          html += `
            <tr class="text-left">
              <td width="20%">${kvs[i]}</td>
              <td width="30%">${basicInfo[i]}</td>
          `;
          if (index == keys.length - 1) {
            html += '<td></td><td></td></tr>';
          }
        }
        index++;
      }
      return html;
    },
    arrayInfo2Html: function (arrayInfo, kvs) {
      var html = "";
      arrayInfo.forEach(element => {
        html += this.objectInfo2Html(element, kvs);
      });
      return html;
    },
    kvsToTableHead: function (kvs) {
      var html = "<tr>";
      for (let k in kvs) {
        html += `<th>${kvs[k]}</th>`;
      }
      html += '</tr>';
      return html;
    },
    arrayInfo2HtmlV2: function (arrayInfo, kvs) {
      var html = "";
      html += this.kvsToTableHead(kvs);
      arrayInfo.forEach(element => {
        html += '<tr>';
        for (let k in kvs) {
          html += `<td>${element[k] == undefined ? '' : element[k]}</td>`;
        }
        html += '</tr>';
      });
      return html;
    }
  }
};
</script>
