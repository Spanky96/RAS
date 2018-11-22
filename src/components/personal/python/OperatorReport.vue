<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>运营商报告</span>
      </div>
      <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm" size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号（运营商账号，例如移动手机号）" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号密码" label-width="0" prop="password" class="form-item">
              <el-input type="password" v-model="inputForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="身份证号" label-width="0" prop="identityCardNo" class="form-item">
              <el-input v-model="inputForm.identityCardNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" label-width="0" prop="identityName" class="form-item">
              <el-input v-model="inputForm.identityName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="查询内容" label-width="0" prop="contentType" class="form-item">
              <el-checkbox-group v-model="inputForm.contentType">
                <el-checkbox name="contentType" label="sms">短信记录</el-checkbox>
                <el-checkbox name="contentType" label="busi">业务记录</el-checkbox>
                <el-checkbox name="contentType" label="net">上网记录</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用评分" label-width="0" prop="contentType" class="form-item">
              <el-tooltip :content="inputForm.score == '1' ? '已选择启用' : '未选择启用'" placement="top">
                <el-switch v-model="inputForm.score" active-value="1" inactive-value="0"></el-switch>
              </el-tooltip>
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
                <el-input v-model="inputForm.contactName1st"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第一联系人手机号码" label-width="0" prop="contactMobile1st" class="form-item">
                <el-input v-model="inputForm.contactMobile1st"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第一联系人身份证号码" label-width="0" prop="contactIdentityNo1st" class="form-item">
                <el-input v-model="inputForm.contactIdentityNo1st"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第一联系人关系" label-width="0" prop="contactRelationship1st" class="form-item">
                <el-select v-model="inputForm.contactRelationship1st" style="width: 100%;">
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
                <el-input v-model="inputForm.contactName2nd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人手机号码" label-width="0" prop="contactMobile2nd" class="form-item">
                <el-input v-model="inputForm.contactMobile2nd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第二联系人身份证号码" label-width="0" prop="contactIdentityNo2nd" class="form-item">
                <el-input v-model="inputForm.contactIdentityNo2nd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第二联系人关系" label-width="0" prop="contactRelationship2nd" class="form-item">
                <el-select v-model="inputForm.contactRelationship2nd" style="width: 100%;">
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
                <el-input v-model="inputForm.contactName2nd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第三联系人手机号码" label-width="0" prop="contactMobile3rd" class="form-item">
                <el-input v-model="inputForm.contactMobile3rd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第三联系人身份证号码" label-width="0" prop="contactIdentityNo3rd" class="form-item">
                <el-input v-model="inputForm.contactIdentityNo3rd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="第三联系人关系" label-width="0" prop="contactRelationship3rd" class="form-item">
                <el-select v-model="inputForm.contactRelationship3rd" style="width: 100%;">
                  <el-option v-for="(linkMan, index) in linkManKvs" :key="index" :label="linkMan" :value="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row type="flex" justify="end" align="bottom">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" round size="small" :loading="loading">执行查询</el-button>
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
          <td width="20%">报告编号</td>
          <td width="30%">{{result.data.report.reportNo}}</td>
        </tr>
        <tr class="text-left">
          <td width="20%">数据来源</td>
          <td width="30%">{{result.data.report.dataSource}}</td>
          <td width="20%">报告日期</td>
          <td width="30%">{{result.data.report.reportTime}}</td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">基本信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(basicInfoKvs, result.data.basicInfo)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">紧急联系人信息</td>
        </tr>
        <tr>
          <td colspan="4" v-if="result.data.contactInfo == 0" class="centerAlign">无数据</td>
        </tr>
        <tr class="inner-table" v-for="(contact, index) in result.data.contactInfo" :key="index">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObjTm(contactInfoKvs, contact, [], operatorValueFmt)">
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">关联信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="1">关联身份证信息</td>
          <td colspan="3">{{$FU.arrayJoin(result.data.relationInfo.identiyNos, true)}}</td>
        </tr>
        <tr class="inner-table">
          <td colspan="1">关联手机号信息</td>
          <td colspan="3">{{$FU.arrayJoin(result.data.relationInfo.mobiles, true)}}</td>
        </tr>
        <tr class="inner-table">
          <td colspan="1">关联家庭地址信息</td>
          <td colspan="3">{{$FU.arrayJoin(result.data.relationInfo.homeAddresses)}}</td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">用户画像</td>
        </tr>
        <tr class="inner-table">
          <td colspan="1">风险概况</td>
          <td colspan="3" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(personasKvs['riskProfile'], result.data.personas.riskProfile)">
            </table>
          </td>
        </tr>
        <tr class="inner-table">
          <td colspan="1">社交概况</td>
          <td colspan="3" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(personasKvs['socialContactProfile'], result.data.personas.socialContactProfile)">
            </table>
          </td>
        </tr>
        <tr class="inner-table">
          <td colspan="1">通话概况</td>
          <td colspan="3" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(personasKvs['callProfile'], result.data.personas.callProfile)">
            </table>
          </td>
        </tr>
        <tr class="inner-table">
          <td colspan="1">消费概况</td>
          <td colspan="3" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(personasKvs['consumptionProfile'], result.data.personas.consumptionProfile)">
            </table>
          </td>
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">基本信息检测</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.basicInfoCheck, basicInfoCheckKvs)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">风险清单检测</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.riskListCheck, riskListCheckKvs)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">信贷逾期检查</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table">
              <tr><th>检查项</th><th>逾期金额(范围)</th><th>逾期天数(范围)</th><th>逾期时间</th></tr>
              <tr v-if="result.data.overdueLoanCheck.length == 0"><td colspan=4 class="centerAlign">无数据</td></tr>
              <tbody v-for="(ov, index) in result.data.overdueLoanCheck" :key="index">
                <tr v-for="(d, index2) in ov.details" :key="index2">
                  <td v-if="index2==0" :rowspan="ov.details.length">{{ov.desc}}</td>
                  <td>{{d.overdueAmt}}</td><td>{{d.overdueDays}}</td><td>{{d.overdueTime}}</td>
                </tr>
              </tbody>
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">多头借贷检查</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table">
              <tr><th>检查项</th><th>借贷平台类型</th><th>借贷次数</th></tr>
              <tr v-if="result.data.multiLendCheck.length == 0"><td colspan=4 class="centerAlign">无数据</td></tr>
              <tbody v-for="(r, index) in result.data.multiLendCheck" :key="index">
                <tr v-for="(d, index2) in r.details" :key="index2">
                  <td v-if="index2==0" :rowspan="r.details.length">{{r.desc}}</td>
                  <td>{{d.lendType}}</td>
                  <td>{{d.lendCnt}}</td>
                </tr>
              </tbody>
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">风险通话检测</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table">
              <tr><th rowspan=2>检查项</th><th rowspan=2>命中描述</th><th rowspan=2>命中次数</th><th rowspan=2>时长(s)</th><th colspan=4>详情</th></tr>
              <tr><th>通话标记</th><th>通话类型</th><th>通话次数</th><th>通话时长(s) </th></tr>
              <tr v-if="result.data.riskCallCheck.length == 0"><td colspan=4 class="centerAlign">无数据</td></tr>
              <tbody v-for="(rk, index) in result.data.riskCallCheck" :key="index">
                <tr v-for="(d, index2) in rk.details" :key="index2">
                  <td v-if="index2==0" :rowspan="rk.details.length">{{rk.desc}}</td>
                  <td v-if="index2==0" :rowspan="rk.details.length">{{rk.hitDesc}}</td>
                  <td v-if="index2==0" :rowspan="rk.details.length">{{rk.cnt}}</td>
                  <td v-if="index2==0" :rowspan="rk.details.length">{{rk.duration}}</td>
                  <td>{{d.callTag}}</td>
                  <td>{{d.callType}}</td>
                  <td>{{d.callCnt}}</td>
                  <td>{{d.callTime}}</td>
                </tr>
              </tbody>
            </table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">通话概况</td>
        </tr>
        <td colspan="4" style="padding: 0;">
          <table class="table" v-html="$FU.getHtmlByKvsFromObj(callAnalysisKvs, result.data.callAnalysis)">
          </table>
        </td>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">活跃情况</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV3(result.data.activeCallAnalysis, activeCallAnalysisKvs, [], activeCallValueFmt)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">静默情况</td>
        </tr>
        <td colspan="4" style="padding: 0;">
          <table class="table" v-html="$FU.getHtmlByKvsFromObj(silenceAnalysisKvs, result.data.silenceAnalysis)">
          </table>
        </td>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">通话时间段分析</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.callDurationAnalysis, callDurationAnalysisKvs)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">消费能力</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.consumptionAnalysis, consumptionAnalysisKvs)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">出行信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.tripAnalysis, tripAnalysisKvs)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">社交关系概况</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.socialContactAnalysis, socialContactAnalysisKvs)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">通话区域分析</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.callAreaAnalysis, callAreaAnalysisKvs)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title">
          <td colspan="4">通话联系人分析</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV3(result.data.contactAnalysis, contactAnalysisKvs, [], operatorValueFmt)"></table>
          </td>  
        </tr>
        <!-- ------------------------------------  -->
        <tr class="text-title" v-if="result.data.scoreAnalysis">
          <td colspan="4">信用分分析</td>
        </tr>
        <template v-if="result.data.scoreAnalysis">
          <tr>
            <th>评分项</th><th>评分项描述</th><th>配置分</th><th>扣分</th>
          </tr>
          <tr v-for="(de, index) in result.data.scoreAnalysis.deductionDetails" :key="index + '0'">
            <td>{{de.item}}</td><td>{{de.desc}}</td><td>{{de.score}}</td><td>{{de.deduction}}</td>
          </tr>
          <tr><td colspan="1">最后得分</td><td colspan="3">{{result.data.scoreAnalysis.score}}</td></tr>
        </template>
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
    const basicInfoKvs = {
      "name": "姓名",
      "identityNo": "身份证号",
      "gender": "性别",
      "age": "年龄",
      "mobile": "手机号",
      "regTime": "入网时间",
      "nativeAddress": "用户地址"
    };
    const contactInfoKvs = {
      "name": "姓名",
      "mobile": "手机号",
      "identityNo": "身份证号",
      "relationship": "与本人关系",
      "callCnt": "通话次数",
      "callTime": "通话时长（s）",
      "callRank": "通话频度排名",
      "isHitRiskList": "是否命中风险清单"
    };
    const basicInfoCheckKvs = {
      "desc": "检查项",
      "result": "检查结果",
      "resultDesc": "检查结果描述"
    };
    const riskListCheckKvs = {
      "item": "检查项",
      "desc": "检查项描述",
      "result": "检查结果"
    };
    const personasKvs = {
      riskProfile: {
        "riskListCnt": "命中风险清单次数",
        "overdueLoanCnt": "信贷逾期次数",
        "multiLendCnt": "多头借贷次数",
        "riskCallCnt": "风险通话次数"
      },
      socialContactProfile: {
        "freContactArea": "最常联系人区域",
        "contactNumCnt": "联系人号码总数",
        "interflowContactCnt": "互通号码数",
        "contactRishCnt": "联系人风险名单总数"
      },
      callProfile: {
        "avgCallCnt": "日均通话次数",
        "avgCallTime": "日均通话时长(s) ",
        "silenceCnt": "静默次数",
        "nightCallCnt": "夜间通话次数",
        "nightCallTime": "夜间平均通话时长(s)"
      },
      consumptionProfile: {"avgFeeMonth": "月均消费"}
    };
    const callAnalysisKvs = {
      "avgCallCnt": "日均通话次数",
      "avgCallTime": "日均通话时长(s)",
      "avgCallingCnt": "日均主叫次数",
      "avgCallingTime": "日均主叫时长(s)",
      "avgCalledCnt": "日均被叫次数",
      "avgCalledTime": "日均被叫时长(s)",
      "locCallPct": "本地通话占比"
    };
    const activeCallAnalysisKvs = {
      "item": "项目",
      "lately1m": "近 1 月",
      "lately3m": "近 3 月",
      "lately6m": "近 6 月",
      "avgMonth": "月均"
    };
    const silenceAnalysisKvs = {
      "silenceCnt": "静默次数",
      "silenceTime": "静默总时长(s)",
      "longestSilenceStart": "最长一次静默开始时间",
      "longestSilenceTime": "最长一次静默时长(s)",
      "lastSilenceStart": "最近一次静默开始时间",
      "lastSilenceTime": "最近一次静默时长(s)"
    };
    const callDurationAnalysisKvs = {
      "desc": "项目",
      "callCnt": "通话次数",
      "callNumCnt": "通话号码数",
      "freqContactNum": "最常联系号码",
      "freqContactNumCnt": "最常联系号码次数",
      "avgCallTime": "平均通话时长(s) ",
      "callingCnt": "主叫次数",
      "callingTime": "主叫时长(s)",
      "calledCnt": "被叫次数",
      "calledTime": "被叫时长(s)"
    };
    const consumptionAnalysisKvs = {
      "desc": "项目",
      "lately1m": "近 1 月",
      "lately3m": "近 3 月",
      "lately6m": "近 6 月",
      "avgMonth": "月均"
    };
    const tripAnalysisKvs = {
      "departureDate": "出发时间",
      "returnDate": "回程时间",
      "departurePlace": "出发地",
      "destinationPlace": "目的地"
    };
    const socialContactAnalysisKvs = {
      "desc": "项目",
      "content": "内容",
      "contentDesc": "内容描述"
    };
    const callAreaAnalysisKvs = {
      "attribution": "通话地",
      "callCnt": "通话次数",
      "callNumCnt": "通话号码数",
      "callTime": "通话时长(s)",
      "callingCnt": "主叫次数",
      "callingTime": "主叫时长(s)",
      "calledCnt": "被叫次数",
      "calledTime": "被叫时长(s)"
    };
    const activeCallItemKvs = {
      active_day: '通话活跃天数',
      call_cnt: '通话次数',
      call_time: '通话时长(s)',
      calling_cnt: '主叫次数',
      calling_time: '主叫时长(s)',
      called_cnt: '被叫叫次数',
      called_time: '被叫时长(s)',
      max_single_call_time: '单次通话最长时长(s)',
      min_single_call_time: '单次通话最短时长(s)',
      avg_single_call_time: '单次通话平均时长(s)',
      call_time_1min_below_cnt_pct: '时长在1分钟内通话次数占比',
      call_time_1min_3min_cnt_pct: '时长在1-3分钟内通话次数占比',
      call_time_3min_10min_cnt_pct: '时长在3-10分钟内通话次数占比',
      call_time_10min_over_cnt_pct: '时长在10分钟以上通话次数占比',
      sms_cnt: '短信条数'
    };
    const activeCallValueFmt = {
      item: function (v) {
        return activeCallItemKvs[v] || '未知项';
      }
    };
    const operatorValueFmt = {
      isHitRiskList: function (v) {
        return v == '1' ? '<span class="tag el-tag el-tag--error">命中</span>' : '<span class="tag el-tag el-tag--info">未命中</span>';
      },
      relationship: function (v) {
        return linkManKvs[v] || v;
      }
    };
    const contactAnalysisKvs = {
      "callNum": "号码",
      "isHitRiskList": "是否命中风险名单",
      "callTag": "电话标记",
      "attribution": "归属地",
      "callCnt": "通话次数",
      "callTime": "通话时长(s)",
      "callingCnt": "主叫次数",
      "callingTime": "主叫时长(s)",
      "calledCnt": "被叫次数",
      "calledTime": "被叫时长(s)",
      "lastStart": "最近一次通话时间",
      "lastTime": "最近一次通话时时长"
    };
    return {
      inputForm: {
        contentType: ['sms', 'busi', 'net'],
        score: '0'
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
        "data": {
          scoreAnalysis: {
            score: "10",
            deductionDetails: [
              {
                "item": "综合", 
                "desc": "综合智能", 
                "score": "10",
                "deduction": "10"
              }
            ]
          },
          "report": {
            "dataSource": "江苏南京市移动",
            "reportTime": "2018-11-15 20:36:16",
            "reportNo": "20181115203616017978"
          },
          "basicInfo": {
            "name": "金*洋",
            "identityNo": "320***********6774",
            "gender": "男",
            "age": "22",
            "mobile": "18795905639",
            "regTime": "2014-08-14 00:00:00",
            "nativeAddress": ""
          },
          "contactInfo": [{
            "name": "金*宽", 
            "mobile": "139****6527", 
            "identityNo": "320***********6770",  
            "relationship": "FATHER",  
            "callCnt": "1",  
            "callTime": "1",  
            "callRank": "1",  
            "isHitRiskList": "1" 
          }],
          "relationInfo": {
            "identiyNos": ['320***********6770', '320***********6774'],
            "mobiles": ['138****4445', '138****4446'],
            "homeAddresses": ['昆山美好家园5']
          },
          "personas": {
            "riskProfile": {
              "riskListCnt": "0",
              "overdueLoanCnt": "0",
              "multiLendCnt": "6",
              "riskCallCnt": "0"
            },
            "socialContactProfile": {
              "freContactArea": "无锡/上海/苏州",
              "contactNumCnt": "80",
              "interflowContactCnt": "4",
              "contactRishCnt": "0"
            },
            "callProfile": {
              "avgCallCnt": "0.66",
              "avgCallTime": "24.38",
              "silenceCnt": "34",
              "nightCallCnt": "0",
              "nightCallTime": "0"
            },
            "consumptionProfile": {
              "avgFeeMonth": "54.85"
            }
          },
          "basicInfoCheck": [{
            "item": "idcard_check",
            "desc": "身份证号是否有效",
            "result": "0",
            "resultDesc": "无效"
          }, {
            "item": "mobile_check",
            "desc": "手机号是否实名认证",
            "result": "1",
            "resultDesc": "已实名认证"
          }, {
            "item": "idcard_match",
            "desc": "身份证号与运营商数据是否匹配",
            "result": "0",
            "resultDesc": "匹配失败,运营商数据为:[暂无]"
          }, {
            "item": "name_match",
            "desc": "姓名与运营商数据是否匹配",
            "result": "2",
            "resultDesc": "模糊匹配成功,运营商数据为:[**洋]"
          }],
          "riskListCheck": [],
          "overdueLoanCheck": [],
          "multiLendCheck": [{
            "item": "mobile_check",
            "desc": "手机号申请借款",
            "details": [{
              "lendType": "其他",
              "lendCnt": "6"
            }]
          }],
          "riskCallCheck": [
            { 
              "item": "法院传唤", 
              "desc": "法院传唤", 
              "hitDesc": "疑似法院传唤电话", 
              "cnt": "3", 
              "duration": "90", 
              "details": [
                {
                  "callTag": "法院", 
                  "callType": "被叫", 
                  "callCnt": "2", 
                  "callTime": "60" 
                },
                {
                  "callTag": "法院", 
                  "callType": "被叫", 
                  "callCnt": "1", 
                  "callTime": "30" 
                }
              ] 
            } 
          ],
          "callAnalysis": {
            "avgCallCnt": "0.66",
            "avgCallTime": "24.38",
            "avgCallingCnt": "0.09",
            "avgCallingTime": "3.27",
            "avgCalledCnt": "0.56",
            "avgCalledTime": "21.11",
            "locCallPct": "4.24%"
          },
          "activeCallAnalysis": [{
            "item": "active_day",
            "desc": "通话活跃天数",
            "lately1m": "30",
            "lately3m": "82",
            "lately6m": "155",
            "avgMonth": "25.83"
          }, {
            "item": "call_cnt",
            "desc": "通话次数",
            "lately1m": "20",
            "lately3m": "48",
            "lately6m": "118",
            "avgMonth": "19.67"
          }, {
            "item": "call_time",
            "desc": "通话时长",
            "lately1m": "459",
            "lately3m": "1137",
            "lately6m": "4389",
            "avgMonth": "731.50"
          }, {
            "item": "calling_cnt",
            "desc": "主叫次数",
            "lately1m": "2",
            "lately3m": "6",
            "lately6m": "17",
            "avgMonth": "2.83"
          }, {
            "item": "calling_time",
            "desc": "主叫时长",
            "lately1m": "29",
            "lately3m": "179",
            "lately6m": "589",
            "avgMonth": "98.17"
          }, {
            "item": "called_cnt",
            "desc": "被叫次数",
            "lately1m": "18",
            "lately3m": "42",
            "lately6m": "101",
            "avgMonth": "16.83"
          }, {
            "item": "called_time",
            "desc": "被叫时长",
            "lately1m": "430",
            "lately3m": "958",
            "lately6m": "3800",
            "avgMonth": "633.33"
          }, {
            "item": "max_single_call_time",
            "desc": "单次通话最长时长",
            "lately1m": "74",
            "lately3m": "77",
            "lately6m": "733",
            "avgMonth": "0"
          }, {
            "item": "min_single_call_time",
            "desc": "单次通话最短时长",
            "lately1m": "4",
            "lately3m": "4",
            "lately6m": "2",
            "avgMonth": "0"
          }, {
            "item": "avg_single_call_time",
            "desc": "单次通话平均时长",
            "lately1m": "22.95",
            "lately3m": "23.69",
            "lately6m": "37.19",
            "avgMonth": "0"
          }, {
            "item": "call_time_1min_below_cnt_pct",
            "desc": "时长在1分钟内通话次数占比",
            "lately1m": "85.00%",
            "lately3m": "89.58%",
            "lately6m": "84.75%",
            "avgMonth": "0"
          }, {
            "item": "call_time_1min_3min_cnt_pct",
            "desc": "时长在1-3分钟内通话次数占比",
            "lately1m": "15.00%",
            "lately3m": "10.42%",
            "lately6m": "12.71%",
            "avgMonth": "0"
          }, {
            "item": "call_time_3min_10min_cnt_pct",
            "desc": "时长在3-10分钟内通话次数占比",
            "lately1m": "0.00%",
            "lately3m": "0.00%",
            "lately6m": "1.69%",
            "avgMonth": "0"
          }, {
            "item": "call_time_10min_over_cnt_pct",
            "desc": "时长在10分钟以上通话次数占比",
            "lately1m": "0.00%",
            "lately3m": "0.00%",
            "lately6m": "0.85%",
            "avgMonth": "0"
          }, {
            "item": "sms_cnt",
            "desc": "短信条数",
            "lately1m": "176",
            "lately3m": "366",
            "lately6m": "818",
            "avgMonth": "136.33"
          }],
          "silenceAnalysis": {
            "silenceCnt": "34",
            "silenceTime": "3993185",
            "longestSilenceStart": "2018-09-22 11:37:04",
            "longestSilenceTime": "254079",
            "lastSilenceStart": "2018-11-11 21:10:04",
            "lastSilenceTime": "87103"
          },
          "callDurationAnalysis": [{
            "item": "mid_night",
            "desc": "01:30-05:30",
            "callCnt": "0",
            "callNumCnt": "0",
            "freqContactNum": "",
            "freqContactNumCnt": "0",
            "avgCallTime": "0.00",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "0",
            "calledTime": "0"
          }, {
            "item": "morning",
            "desc": "05:30-08:30",
            "callCnt": "2",
            "callNumCnt": "2",
            "freqContactNum": "189****6527",
            "freqContactNumCnt": "1",
            "avgCallTime": "24",
            "callingCnt": "1",
            "callingTime": "19",
            "calledCnt": "1",
            "calledTime": "28"
          }, {
            "item": "daytime",
            "desc": "08:30-17:30",
            "callCnt": "91",
            "callNumCnt": "68",
            "freqContactNum": "189****6527",
            "freqContactNumCnt": "6",
            "avgCallTime": "40",
            "callingCnt": "9",
            "callingTime": "358",
            "calledCnt": "82",
            "calledTime": "3292"
          }, {
            "item": "dust",
            "desc": "17:30-19:30",
            "callCnt": "22",
            "callNumCnt": "14",
            "freqContactNum": "139****1698",
            "freqContactNumCnt": "4",
            "avgCallTime": "27",
            "callingCnt": "6",
            "callingTime": "185",
            "calledCnt": "16",
            "calledTime": "410"
          }, {
            "item": "night",
            "desc": "19:30-23:30",
            "callCnt": "3",
            "callNumCnt": "3",
            "freqContactNum": "02510086",
            "freqContactNumCnt": "1",
            "avgCallTime": "32",
            "callingCnt": "1",
            "callingTime": "27",
            "calledCnt": "2",
            "calledTime": "70"
          }, {
            "item": "daybreak",
            "desc": "23:30-01:30",
            "callCnt": "0",
            "callNumCnt": "0",
            "freqContactNum": "",
            "freqContactNumCnt": "0",
            "avgCallTime": "0",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "0",
            "calledTime": "0"
          }],
          "socialContactAnalysis": [{
            "item": "interflow_contact_cnt",
            "desc": "互通号码数",
            "content": "4",
            "contentDesc": "近6个月互通号码数"
          }, {
            "item": "friend_circle_contact_cnt",
            "desc": "朋友圈紧密联系人数",
            "content": "0",
            "contentDesc": "近6个月累计联系10次以上每月通话1次以上号码数量"
          }, {
            "item": "friend_circle_city",
            "desc": "朋友圈中心地",
            "content": "江苏",
            "contentDesc": "近6个月联系次数最多的归属地"
          }, {
            "item": "call_num_cnt",
            "desc": "联系号码总数",
            "content": "80",
            "contentDesc": "近6个月联系号码数"
          }],
          "contactAnalysis": [{
            "callNum": "0510****7115",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "",
            "callCnt": "4",
            "callTime": "870",
            "callingCnt": "3",
            "callingTime": "137",
            "calledCnt": "1",
            "calledTime": "733",
            "lastStart": "2018-08-01 16:41:04",
            "lastTime": "71"
          }, {
            "callNum": "136****8382",
            "callTag": "未知",
            "isHitRiskList": "1",
            "attribution": "上海",
            "callCnt": "3",
            "callTime": "205",
            "callingCnt": "1",
            "callingTime": "49",
            "calledCnt": "2",
            "calledTime": "156",
            "lastStart": "2018-07-02 19:08:26",
            "lastTime": "16"
          }, {
            "callNum": "0510****1888",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "",
            "callCnt": "2",
            "callTime": "108",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "2",
            "calledTime": "108",
            "lastStart": "2018-11-14 08:40:37",
            "lastTime": "34"
          }, {
            "callNum": "151****8642",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "江苏",
            "callCnt": "2",
            "callTime": "14",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "2",
            "calledTime": "14",
            "lastStart": "2018-11-13 11:33:24",
            "lastTime": "4"
          }, {
            "callNum": "133****1213",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "江苏",
            "callCnt": "2",
            "callTime": "14",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "2",
            "calledTime": "14",
            "lastStart": "2018-11-02 11:26:42",
            "lastTime": "5"
          }, {
            "callNum": "187****0001",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "上海",
            "callCnt": "2",
            "callTime": "80",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "2",
            "calledTime": "80",
            "lastStart": "2018-10-08 16:19:53",
            "lastTime": "32"
          }, {
            "callNum": "180****8480",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "江苏",
            "callCnt": "2",
            "callTime": "114",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "2",
            "calledTime": "114",
            "lastStart": "2018-09-27 13:21:41",
            "lastTime": "49"
          }, {
            "callNum": "157****8178",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "江苏",
            "callCnt": "2",
            "callTime": "69",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "2",
            "calledTime": "69",
            "lastStart": "2018-08-11 18:59:02",
            "lastTime": "33"
          }, {
            "callNum": "185****4485",
            "callTag": "未知",
            "isHitRiskList": "0",
            "attribution": "江苏",
            "callCnt": "2",
            "callTime": "38",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "2",
            "calledTime": "38",
            "lastStart": "2018-08-07 11:51:32",
            "lastTime": "11"
          }],
          "callAreaAnalysis": [{
            "attribution": "无锡",
            "callCnt": "80",
            "callNumCnt": "53",
            "callTime": "2907",
            "callingCnt": "11",
            "callingTime": "345",
            "calledCnt": "69",
            "calledTime": "2562"
          }, {
            "attribution": "上海",
            "callCnt": "27",
            "callNumCnt": "22",
            "callTime": "1223",
            "callingCnt": "4",
            "callingTime": "182",
            "calledCnt": "23",
            "calledTime": "1041"
          }, {
            "attribution": "苏州",
            "callCnt": "5",
            "callNumCnt": "5",
            "callTime": "115",
            "callingCnt": "1",
            "callingTime": "27",
            "calledCnt": "4",
            "calledTime": "88"
          }, {
            "attribution": "南京",
            "callCnt": "5",
            "callNumCnt": "5",
            "callTime": "76",
            "callingCnt": "1",
            "callingTime": "35",
            "calledCnt": "4",
            "calledTime": "41"
          }, {
            "attribution": "常州",
            "callCnt": "1",
            "callNumCnt": "1",
            "callTime": "68",
            "callingCnt": "0",
            "callingTime": "0",
            "calledCnt": "1",
            "calledTime": "68"
          }],
          "consumptionAnalysis": [{
            "item": "total_fee",
            "desc": "消费总额",
            "lately1m": "61.00",
            "lately3m": "147.30",
            "lately6m": "329.11",
            "avgMonth": "54.85"
          }, {
            "item": "net_fee",
            "desc": "网络流量消费金额",
            "lately1m": "--",
            "lately3m": "--",
            "lately6m": "--",
            "avgMonth": "--"
          }, {
            "item": "call_fee",
            "desc": "通话消费金额",
            "lately1m": "--",
            "lately3m": "--",
            "lately6m": "--",
            "avgMonth": "--"
          }, {
            "item": "vas_fee",
            "desc": "增值业务消费金额",
            "lately1m": "--",
            "lately3m": "--",
            "lately6m": "--",
            "avgMonth": "--"
          }, {
            "item": "extra_fee",
            "desc": "其它消费金额",
            "lately1m": "--",
            "lately3m": "--",
            "lately6m": "--",
            "avgMonth": "--"
          }],
          "tripAnalysis": [{
            "departureDate": "",
            "returnDate": "2018-06-18",
            "departurePlace": "无锡",
            "destinationPlace": "南京"
          }, {
            "departureDate": "2018-06-18",
            "returnDate": "2018-07-21",
            "departurePlace": "南京",
            "destinationPlace": "上海"
          }, {
            "departureDate": "2018-07-21",
            "returnDate": "2018-07-28",
            "departurePlace": "无锡",
            "destinationPlace": "苏州"
          }]
        }
      },
      linkMan: [],
      linkManKvs,
      ripId: '',
      token: '',
      tryAgain: 0,
      loading: false,
      basicInfoKvs,
      basicInfoCheckKvs,
      contactInfoKvs,
      personasKvs,
      riskListCheckKvs,
      callAnalysisKvs,
      activeCallAnalysisKvs,
      silenceAnalysisKvs,
      callDurationAnalysisKvs,
      consumptionAnalysisKvs,
      tripAnalysisKvs,
      socialContactAnalysisKvs,
      callAreaAnalysisKvs,
      contactAnalysisKvs,
      operatorValueFmt,
      activeCallValueFmt
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputForm'].validate((valid) => {
        if (valid) {
          const engNumArr = ['1st', '2nd', '3rd'];
          const chnNumArr = ['一', '二', '三'];
          var params = {
            name: vm.inputForm.name,
            password: vm.inputForm.password,
            identityCardNo: vm.inputForm.identityCardNo,
            identityName: vm.inputForm.identityName,
            contentType: vm.inputForm.contentType.join(';'),
            score: vm.inputForm.score
          };
          for (let i = 0; i < 3; i++) {
            if (vm.linkMan.includes(i + 1 + '')) {
              if (!(vm.inputForm['contactName' + engNumArr[i]] && vm.inputForm['contactMobile' + engNumArr[i]] &&
                  vm.inputForm['contactIdentityNo' + engNumArr[i]] && vm.inputForm['contactRelationship' + engNumArr[i]])) {
                  vm.$message({showClose: true, message: '第' + chnNumArr[i] + '联系人的信息不完整。', type: 'error'});
                  return;
              } else {
                params['contactName' + engNumArr[i]] = vm.inputForm['contactName' + engNumArr[i]];
                params['contactMobile' + engNumArr[i]] = vm.inputForm['contactMobile' + engNumArr[i]];
                params['contactIdentityNo' + engNumArr[i]] = vm.inputForm['contactIdentityNo' + engNumArr[i]];
                params['contactRelationship' + engNumArr[i]] = vm.inputForm['contactRelationship' + engNumArr[i]];
              }
            }
          }
          vm.startTask(params);
        }
      });
    },
    startTask: function (params) {
      var vm = this;
      vm.loading = true;
      vm.$http.get('api/rip/operatorCreditReports/result', { 
        params: params,
        headers: {
          authorization: vm.$db.get('authorization')
        }
      }).then(function (res) {
        if (res.data.code == '0010') {
          vm.ripId = res.data.rip_id;
          vm.token = res.data.token;
          vm.tryAgain = 10;
          vm.loading && vm.getStatus();
        }
      });
    },
    getStatus: function () {
      var vm = this;
      if (vm.tryAgain == 0) {
        vm.$message({showClose: true, message: '超时，状态状态获取失败。', type: 'error'});
        vm.loading = false;
      }
      vm.$http.get('api/rip/operatorCreditReports/status', { 
        params: {token: vm.token},
        headers: {authorization: vm.$db.get('authorization')}
      }).then(function (res) {
        if (res.data.code == '0006') {
          // 验证码采集
          vm.$prompt('请输入短信验证码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            vm.inputValidateCode(value);
          }).catch(() => {
            vm.$message({
              type: 'info',
              message: '您取消了。'
            });
            vm.loading = false;
          });
        } else if (['0000', '0100', '0200'].includes(res.data.code)) {
          vm.tryAgain = 10;
          vm.$message({showClose: true, message: '正在获取报告,请耐心等待', type: 'info'});
          vm.loading && (vm.timeout = setTimeout(vm.getResult, 5000));
        } else {
          vm.tryAgain--;
          if (res.data.msg) {
            vm.$message({showClose: true, message: res.data.msg, type: 'success'});
          }
          vm.loading && (vm.timeout = setTimeout(vm.getStatus, 5000));
        }
      });
    },
    inputValidateCode: function (value) {
      var vm = this;
      vm.$http.get('api/rip/operatorCreditReports/input', { 
        params: {token: vm.token, input: value},
        headers: {authorization: vm.$db.get('authorization')}
      }).then(function (res) {
        if (res.data.code == "0009") {
          vm.$message({showClose: true, message: '验证码已提交', type: 'success'});
          vm.tryAgain = 40;
          vm.loading && vm.getStatus();
        } else {
          vm.$message({showClose: true, message: '验证码提交失败', type: 'error'});
          vm.loading = false;
        }
      });
    },
    getResult: function () {
      var vm = this;
      if (vm.tryAgain == 0) {
        vm.$message({showClose: true, message: '获取报告失败', type: 'error'});
      }
      vm.tryAgain--;
      vm.$http.get('api/rip/operatorCreditReports/report', { 
        params: {token: vm.token, rip_id: vm.ripId},
        headers: {authorization: vm.$db.get('authorization')}
      }).then(function (res) {
        if (res.data.code == "0000") {
          vm.$message({showClose: true, message: res.data.msg, type: 'success'});
          vm.result = {
            example: false,
            code: '0000',
            data: res.data.data
          };
          console.log(vm.result);
        } else {
          vm.loading && (vm.timeout = setTimeout(vm.getResult, 3000));
        }
      });
    }
  },
  destroyed: function () {
    var vm = this;
    vm.loading = false;
    vm.timeout && clearTimeout(vm.timeout);
  }
};
</script>
