<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>运营商报告</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm" size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号（运营商账号，例如移动手机号）" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号密码" label-width="0" prop="password" class="form-item">
              <el-input type="password" v-model="inputFrom.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="身份证号" label-width="0" prop="identityCardNo" class="form-item">
              <el-input v-model="inputFrom.identityCardNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" label-width="0" prop="identityName" class="form-item">
              <el-input v-model="inputFrom.identityName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="查询内容" label-width="0" prop="contentType" class="form-item">
              <el-checkbox-group v-model="inputFrom.contentType">
                <el-checkbox name="contentType" label="sms">短信记录</el-checkbox>
                <el-checkbox name="contentType" label="busi">业务记录</el-checkbox>
                <el-checkbox name="contentType" label="net">上网记录</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="(选填)联系人" label-width="0" class="form-item">
              <el-checkbox-group v-model="linkMan" size="small">
                <el-checkbox label="1" border>第一联系人</el-checkbox>
                <el-checkbox label="2" border>第二联系人</el-checkbox>
                <el-checkbox label="3" border>第三联系人</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="linkMan.includes('1')">
          <el-row>
            <el-col :span="8">
              <el-form-item label="第一联系人姓名" label-width="0" prop="contactName1st" class="form-item">
                <el-input v-model="inputFrom.contactName1st"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第一联系人手机号码" label-width="0" prop="contactMobile1st" class="form-item">
                <el-input v-model="inputFrom.contactMobile1st"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第一联系人身份证号码" label-width="0" prop="contactIdentityNo1st" class="form-item">
                <el-input v-model="inputFrom.contactIdentityNo1st"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第一联系人关系" label-width="0" prop="contactRelationship1st" class="form-item">
                <el-select v-model="inputFrom.contactRelationship1st" style="width: 100%;">
                  <el-option v-for="(linkMan, index) in linkManKvs" :key="index" :label="linkMan" :value="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="linkMan.includes('2')">
          <el-row>
            <el-col :span="8">
              <el-form-item label="第二联系人姓名" label-width="0" prop="contactName2nd" class="form-item">
                <el-input v-model="inputFrom.contactName2nd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人手机号码" label-width="0" prop="contactMobile2nd" class="form-item">
                <el-input v-model="inputFrom.contactMobile2nd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第二联系人身份证号码" label-width="0" prop="contactIdentityNo2nd" class="form-item">
                <el-input v-model="inputFrom.contactIdentityNo2nd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人关系" label-width="0" prop="contactRelationship2nd" class="form-item">
                <el-select v-model="inputFrom.contactRelationship2nd" style="width: 100%;">
                  <el-option v-for="(linkMan, index) in linkManKvs" :key="index" :label="linkMan" :value="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="linkMan.includes('3')">
          <el-row>
            <el-col :span="8">
              <el-form-item label="第三联系人姓名" label-width="0" prop="contactName3rd" class="form-item">
                <el-input v-model="inputFrom.contactName2nd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第三联系人手机号码" label-width="0" prop="contactMobile3rd" class="form-item">
                <el-input v-model="inputFrom.contactMobile3rd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第三联系人身份证号码" label-width="0" prop="contactIdentityNo3rd" class="form-item">
                <el-input v-model="inputFrom.contactIdentityNo3rd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第三联系人关系" label-width="0" prop="contactRelationship3rd" class="form-item">
                <el-select v-model="inputFrom.contactRelationship3rd" style="width: 100%;">
                  <el-option v-for="(linkMan, index) in linkManKvs" :key="index" :label="linkMan" :value="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '运营商报告'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td width="30%"><el-tag :type="result.code | resultLogoFmt" class="tag">{{result.code | resultSuccessFmt}}</el-tag></td>
          <td width="20%">报告日期</td>
          <td width="30%">{{result.data.report.reportTime}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OperatorReport',
  components: {
  },
  data () {
    function linkManIdValidator (rule, value, callback) {
      if (!value || value.length == 18) {
        callback();
      } else {
        callback(new Error('请输入正确身份证号码'));
      }
    }
    function linkManPhoneValidator (rule, value, callback) {
      if (!value || /^1[34578]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的手机号码'));
      }
    }
    const linkManKvs = {
      FATHER: '父亲',
      MOTHER: '母亲',
      SPOUSE: '配偶',
      CHILD: '子女',
      OTHER_RELATIVE: '其他亲属',
      FRIEND: '朋友',
      COWORKER: '同事',
      OTHERS: '其他'
    };
    return {
      inputFrom: {
        contentType: ['sms', 'busi', 'net']
      },
      rules: {
        name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        identityCardNo: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }],
        identityName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        contentType: [{ required: true, message: '请至少选择一项', trigger: 'blur' }],
        contactMobile1st: [{ validator: linkManPhoneValidator, trigger: 'blur' }],
        contactMobile2nd: [{ validator: linkManPhoneValidator, trigger: 'blur' }],
        contactMobile3rd: [{ validator: linkManPhoneValidator, trigger: 'blur' }],
        contactIdentityNo1st: [{ validator: linkManIdValidator, trigger: 'blur' }],
        contactIdentityNo2nd: [{ validator: linkManIdValidator, trigger: 'blur' }],
        contactIdentityNo3rd: [{ validator: linkManIdValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        code: '0000',
        data: {
          "report": {
            "dataSource": "",
            "reportTime": "",
            "reportNo": ""
          },
          "basicInfo": {
            "name": "",
            "identityNo": "",
            "gender": "",
            "age": "",
            "mobile": "",
            "regTime": "",
            "nativeAddress": ""
          },
          "contactInfo": [{
            "name": "",
            "mobile": "",
            "identityNo": "",
            "relationship": "",
            "callCnt": "",
            "callTime": "",
            "callRank": "",
            "isHitRiskList": ""
          }],
          "relationInfo": {
            "identiyNos": [],
            "mobiles": [],
            "homeAddresses": []
          },
          "personas": {
            "riskProfile": {
              "riskListCnt": "",
              "overdueLoanCnt": "",
              "multiLendCnt": "",
              "riskCallCnt": ""
            },
            "socialContactProfile": {
              "freContactArea": "",
              "contactNumCnt": "",
              "interflowContactCnt": "",
              "contactRishCnt": ""
            },
            "callProfile": {
              "avgCallCnt": "",
              "avgCallTime": "",
              "silenceCnt": "",
              "nightCallCnt": "",
              "nightCallTime": ""
            },
            "consumptionProfile": {
              "avgFeeMonth": ""
            }
          },
          "basicInfoCheck": [{
            "item": "",
            "desc": "",
            "result": "",
            "resultDesc": ""
          }],
          "riskListCheck": [{
            "item": "",
            "desc": "",
            "result": ""
          }],
          "overdueLoanCheck": [{
            "item": "",
            "desc": "",
            "details": [{
              "overdueAmt": "",
              "overdueDays": "",
              "overdueTime": ""
            }]
          }],
          "multiLendCheck": [{
            "item": "",
            "desc": "",
            "details": [{
              "lendType": "",
              "lendCnt": ""
            }]
          }],
          "riskCallCheck": [{
            "item": "",
            "desc": "",
            "hitDesc": "",
            "cnt": "",
            "duration": "",
            "details": [{
              "callTag": "",
              "callType": "",
              "callCnt": "",
              "callTime": ""
            }]
          }],
          "callAnalysis": {
            "avgCallCnt": "",
            "avgCallTime": "",
            "avgCallingCnt": "",
            "avgCallingTime": "",
            "avgCalledCnt": "",
            "avgCalledTime": "",
            "locCallPct": ""
          },
          "activeCallAnalysis": [{
            "item": "",
            "desc": "",
            "lately1m": "",
            "lately3m": "",
            "lately6m": "",
            "avgMonth": ""
          }],
          "silenceAnalysis": {
            "silenceCnt": "",
            "silenceTime": "",
            "longestSilenceStart": "",
            "longestSilenceTime": "",
            "lastSilenceStart": "",
            "lastSilenceTime": ""
          },
          "callDurationAnalysis": [{
            "item": "",
            "desc": "",
            "callCnt": "",
            "callNumCnt": "",
            "freqContactNum": "",
            "freqContactNumCnt": "",
            "avgCallTime": "",
            "callingCnt": "",
            "callingTime": "",
            "calledCnt": "",
            "calledTime": ""
          }],
          "consumptionAnalysis": [{
            "item": "",
            "desc": "",
            "lately1m": "",
            "lately3m": "",
            "lately6m": "",
            "avgMonth": ""
          }],
          "tripAnalysis": [{
            "departureDate": "",
            "returnDate": "",
            "departurePlace": "",
            "destinationPlace": ""
          }],
          "socialContactAnalysis": [{
            "item": "",
            "desc": "",
            "content": "",
            "contentDesc": ""
          }],
          "callAreaAnalysis": [{
            "attribution": "",
            "callCnt": "",
            "callNumCnt": "",
            "callTime": "",
            "callingCnt": "",
            "callingTime": "",
            "calledCnt": "",
            "calledTime": ""
          }],
          "contactAnalysis": [{
            "callNum": "",
            "isHitRiskList": "",
            "callTag": "",
            "attribution": "",
            "callCnt": "",
            "callTime": "",
            "callingCnt": "",
            "callingTime": "",
            "calledCnt": "",
            "calledTime": "",
            "lastStart": "",
            "lastTime": ""
          }],
          "scoreAnalysis": {
            "score": "",
            "deductionDetails": [{
              "item": "",
              "desc": "",
              "score": "",
              "deduction": ""
            }]
          }
        }
      },
      linkMan: ['1'],
      linkManKvs
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      const engNumArr = ['1st', '2nd', '3rd'];
      for (let i = 0; i < 3; i++) {
        if (vm.linkMan.includes('' + i)) {
          
        }
      }
      // vm.$refs['inputFrom'].validate((valid) => {
      //   if (valid) {
      //     console.log(1);
      //   }
      // });
    }
  }
};
</script>
