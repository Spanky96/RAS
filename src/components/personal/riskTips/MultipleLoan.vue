<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>多重借贷</span>
      </div>
      <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="电话号码" label-width="0" prop="mobile" class="form-item">
              <el-input v-model="inputForm.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit()" round size="small">执行查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card id="resultTable">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col>
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '多重借贷查询'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td width="20%">手机号码</td>
          <td>{{result.mobile | handleMobile()}}</td>
        </tr>
        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">信贷平台注册详情</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.creditPlatformRegistrationDetails" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">平台代码 ：</td>
                <td class="mytd">{{ret.code}}</td>
                <td class="mytd" width="25%">注册时间 ：</td>
                <td class="mytd">{{ret.time}}</td>
              </tr>
              </table>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">贷款申请详情</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.loanApplicationDetails" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">平台代码 ：</td>
                <td class="mytd">{{ret.code}}</td>
                <td class="mytd" width="25%">申请时间 ：</td>
                <td class="mytd">{{ret.time}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">申请金额 ：</td>
                <td class="mytd">{{ret.applicationAmountut}}</td>
                <td></td>
                <td></td>
              </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">贷款放款详情</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.loanDetails" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">平台代码 ：</td>
                <td class="mytd">{{ret.code}}</td>
                <td class="mytd" width="25%">放款时间 ：</td>
                <td class="mytd">{{ret.time}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">放款金额 ：</td>
                <td class="mytd">{{ret.loanlendersAmount}}</td>
                <td></td>
                <td></td>
              </tr>
              </table>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2" width="50%">贷款驳回详情</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.loanRejectDetails" :key="index">
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">平台代码 ：</td>
                <td class="mytd">{{ret.code}}</td>
                <td class="mytd" width="25%">驳回时间 ：</td>
                <td class="mytd">{{ret.time}}</td>
              </tr>
              </table>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2" width="50%">逾期平台详情</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.overduePlatformDetails" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">平台代码 ：</td>
                <td class="mytd">{{ret.code}}</td>
                <td class="mytd" width="25%">逾期次数 ：</td>
                <td class="mytd">{{ret.counts}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">逾期/欠款 金额区间 ：</td>
                <td class="mytd">{{ret.money}}</td>
                <td class="mytd" width="25%">逾期时间 ：</td>
                <td class="mytd">{{ret.time}}</td>
              </tr>
              </table>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2" width="50%">欠款查询详情</td>
              </tr>
              <tr class="text-left resultRows" v-for="(ret, index) in result.arrearsInquiry" :key="index">
                <td class="mytd" width="25%">平台代码 ：</td>
                <td class="mytd">{{ret.code}}</td>
                <td class="mytd">欠款金额区间 ：</td>
                <td class="mytd">{{ret.money}}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PersonalLawsuitA',
  components: {
  },
  data () {
    return {
      inputForm: {
       mobile: ''
      },
      rules: {
        mobile: [{ validator: this.$validator.mobileValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '000000',
        mobile: '13653576763',
        creditPlatformRegistrationDetails: [
            {
                "code": "TX_AAAABICGID",
                "time": "2017--10 10:17:58"
            }
        ],
        loanApplicationDetails: [
            {
                "code": "TX_AAAABICGID",
                "time": "2017--02 10:17:58",
                "applicationAmountut": "0W～0.2W"
            },
            {
                "code": "TX_AAAABICGID",
                "time": "2017--02 10:17:58",
                "applicationAmountut": "0W～0.2W"
            }
        ],
        loanDetails: [
            {
                "code": "TX_AAAABICGID",
                "time": "2017--02 10:17:58",
                "loanlendersAmount": "0W～0.2W"
            }
        ],
        loanRejectDetails: [
            {
                "code": "TX_BAAACJ",
                "time": "2017-06-23"
            },
            {
                "code": "TX_BAAFCD ",
                "time": "2016-09-26"
            }
        ],
        overduePlatformDetails: [
            {
                "code": "TX_AAAABICGID",
                "counts": "1",
                "money": "0W～0.2W",
                "time": "2017-04-09 10:17:58"
            }
        ],
        arrearsInquiry: [
            {
                "code": "TX_AAAABICGID",
                "money": "0W～0.2W"
            }
        ]
      }
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputForm'].validate((valid) => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)'
          });
          vm.$http.get('api/rip/multipleLoanQuery', {
            params: {
              mobile: vm.inputForm.mobile
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
              if (res.data.success) {
                vm.result.mobile = res.data.data.phone;
                vm.result.creditPlatformRegistrationDetails = res.data.data.creditPlatformRegistrationDetails;
                vm.result.loanApplicationDetails = res.data.data.loanApplicationDetails;
                vm.result.loanDetails = res.data.data.loanDetails;
                vm.result.loanRejectDetails = res.data.data.loanRejectDetails;
                vm.result.overduePlatformDetails = res.data.data.overduePlatformDetails;
                vm.result.arrearsInquiry = res.data.data.arrearsInquiry;
                vm.result.example = false;
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
    },
    dataTypeChange (val) {
        if (val == 'SXGG') {
            return '失信公告';
        } else if (val == 'ZXGG') {
            return '执行公告';
        } else if (val == 'CPWS') {
            return '裁判文书';
        } else if (val == 'KTGG') {
            return '开庭公告';
        } else if (val == 'FYGG') {
            return '法院公告';
        } else if (val == 'WDHMD') {
            return '网贷黑名单';
        } else if (val == 'AJLC') {
            return '案件流程';
        } else if (val == 'BGT') {
            return '曝光台';
        } else {
            return '未知';
        }
    }
  }
};
</script>
