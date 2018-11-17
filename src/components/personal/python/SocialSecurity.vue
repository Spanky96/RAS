<template>
  <div>
    <el-card style="margin-bottom:25px" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>社保</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="用户身份证号" label-width="0" prop="partnerUserId" class="form-item">
              <el-input maxlength="40" v-model="inputFrom.partnerUserId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="查询机构（灰色为不可用）" label-width="0" prop="org" class="form-item">
              <el-select v-model="orgArea" placeholder="所属省份" @change="inputFrom.org=undefined">
                <el-option v-for="(f, index) in socialsecurityList" :key="index" :label="f.name" :value="index"></el-option>
              </el-select>
              <el-select v-model="inputFrom.org" no-data-text="请先选择所属省份">
                <template v-if="!isNaN(orgArea)">
                  <el-option v-for="(o, index) in socialsecurityList[orgArea].childOrgs" :key="index" :label="o.name" :value="o.org_id" :disabled="o.status=='DISABLED'"></el-option>
                </template>
              </el-select>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '社保'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td width="30%"><el-tag :type="result.return_code | resultLogoFmt" class="tag">{{result.return_code | resultSuccessFmt}}</el-tag></td>
          <td width="20%">报告日期</td>
          <td width="30%">{{result.data.report_time}}</td>
        </tr>
        <tr v-show="result.data.reportHTML">
          <td colspan="4"><a id="download"><el-button type="primary" size="small" round>下载报告</el-button></a></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">个人信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(basicInfoKvs, result.data.report[0].data)">
            </table>
          </td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本医疗保险流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data.medicareFlow, medicareFlowKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本养老保险流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data.pensionFlow, pensionFlowKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本失业保险流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data.unemploymentFlow, unemploymentFlowKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本工伤保险流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data.injuryFlow, injuryFlowKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本生育保险流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data.maternityFlow, maternityFlowKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本医疗保险摘要</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.objectInfo2Html(result.data.report[0].data.medicare_summary, medicare_summaryKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本养老保险摘要</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.objectInfo2Html(result.data.report[0].data.pension_summary, pension_summaryKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本失业保险摘要</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.objectInfo2Html(result.data.report[0].data.unemployment_summary, unemployment_summaryKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本工伤保险摘要</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.objectInfo2Html(result.data.report[0].data.injury_summary, injury_summaryKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">基本生育保险摘要</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.objectInfo2Html(result.data.report[0].data.maternity_summary, maternity_summaryKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">医疗消费记录</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data.consumptions, consumptionsKvs)" class="table"></table></td>
        </tr>
        <tr class="text-title">
          <td colspan="4">就业历史</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;"><table v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data.companys, companysKvs)" class="table"></table></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import SsLogin from './SsLogin';
import SsValidate from './SsValidate';
export default {
  name: 'SocialSecurity',
  data () {
    var vm = this;
    var socialsecurityList = [];
    var ripId = '';
    vm.getSSList().then(function (data) {
      vm.socialsecurityList = data.data;
      vm.ripId = data.rip_id;
    });
    const basicInfoKvs = {
      customer: '个人编号',
      name: '姓名',
      idcard_type: '证件类型',
      idcard: '证件号码',
      gender: '性别',
      birth: '生日',
      nation: '民族',
      account_property: '户口性质',
      insured_begin_date: '开始参保时间',
      insured_status: '参保状态',
      end_date: '终止参保时间',
      education: '学历',
      company: '最近参保单位',
      social_security_name: '最近社保机构名称',
      address: '通讯地址',
      phone: '联系电话',
      medicare_balance: '医疗账户余额(单位：分)',
      payment_months: '累计缴纳月数',
      pension_balance: '养老账户余额(单位：分)',
      period: '最近缴纳时间',
      continuous_payment_max_months: '历史连续缴纳最大月数',
      max_base: '历史最大缴纳基数（单位：分）',
      average_base: '平均缴纳基数（单位：分）',
      current_base: '最近缴纳基数（单位：分）',
      current_payment_months: '最近单位缴纳月数',
      medicare_consumption_total_amount: '医保累计消费金额',
      yj_month_income: '预计月收入(单位：分)'
    };
    const medicareFlowKvs = {
      'origin_name': '险种名称',
      'period': '缴纳月份',
      'payment_base': '缴费基数(单位：分)',
      'company_amount': '单位缴费金额(单位：分)',
      'person_amount': '个人缴费金额(单位：分)',
      'company': '缴费单位名称'
    };
    const pensionFlowKvs = {
      'origin_name': '险种名称',
      'period': '缴纳月份',
      'payment_base': '缴费基数',
      'company_amount': '单位缴费金额',
      'person_amount': '个人缴费金额',
      'company': '缴费单位名称'
    };
    const unemploymentFlowKvs = {
      'origin_name': '险种名称',
      'period': '缴纳月份',
      'payment_base': '缴费基数',
      'company_amount': '单位缴费金额',
      'person_amount': '个人缴费金额',
      'company': '缴费单位名称'
    };
    const injuryFlowKvs = {
      'origin_name': '险种名称',
      'period': '缴纳月份',
      'payment_base': '缴费基数',
      'company_amount': '单位缴费金额',
      'person_amount': '个人缴费金额'
    };
    const maternityFlowKvs = {
      'origin_name': '险种名称',
      'period': '缴纳月份',
      'payment_base': '缴费基数',
      'company_amount': '单位缴费金额',
      'person_amount': '个人缴费金额'
    };
    // eslint-disable-next-line
    const medicare_summaryKvs = {
      'origin_name': '险种名称',
      'first_insured_date': '首次参保时间',
      'company': '缴存单位名称',
      'total_amount': '累计缴纳金额',
      'total_month': '累计缴纳月份',
      'latest_continuous_payment_months': '最近连续缴纳月数',
      'last_year_stop_payment_months': '最近1年停缴的月数',
      'last_year_stop_payment_times': '最近1年停缴的次数',
      'total_stop_payment_months': '历史停缴月数',
      'total_stop_payment_times': '历史停缴次数',
      'last_half_year_company_num': '近6月社保社保缴纳不同单位数',
      'last_year_company_num': '近12月社保社保缴纳不同单位数',
      'last_two_year_company_num': '近24月社保社保缴纳不同单位数'
    };
    // eslint-disable-next-line
    const pension_summaryKvs = {
      'origin_name': '险种名称',
      'first_insured_date': '首次参保时间',
      'company': '缴存单位名称',
      'total_amount': '累计缴纳金额（单位：分）',
      'total_month': '累计缴纳月份',
      'latest_continuous_payment_months': '最近连续缴纳月数',
      'last_year_stop_payment_months': '最近1年停缴的月数',
      'last_year_stop_payment_times': '最近1年停缴的次数',
      'total_stop_payment_months': '历史停缴月数',
      'total_stop_payment_times': '历史停缴次数',
      'last_half_year_company_num': '近6月社保社保缴纳不同单位数',
      'last_year_company_num': '近12月社保社保缴纳不同单位数',
      'last_two_year_company_num': '近24月社保社保缴纳不同单位数'
    };
    // eslint-disable-next-line
    const unemployment_summaryKvs = {
      'origin_name': '险种名称',
      'first_insured_date': '首次参保时间',
      'company': '缴存单位名称',
      'total_amount': '累计缴纳金额',
      'total_month': '累计缴纳月份',
      'latest_continuous_payment_months': '最近连续缴纳月数',
      'last_year_stop_payment_months': '最近1年停缴的月数',
      'last_year_stop_payment_times': '最近1年停缴的次数',
      'total_stop_payment_months': '历史停缴月数',
      'total_stop_payment_times': '历史停缴次数',
      'last_half_year_company_num': '近6月社保社保缴纳不同单位数',
      'last_year_company_num': '近12月社保社保缴纳不同单位数',
      'last_two_year_company_num': '近24月社保社保缴纳不同单位数'
    };
    // eslint-disable-next-line
    const injury_summaryKvs = {
      'origin_name': '险种名称',
      'first_insured_date': '首次参保时间',
      'company': '缴存单位名称',
      'total_amount': '累计缴纳金额',
      'total_month': '累计缴纳月份',
      'latest_continuous_payment_months': '最近连续缴纳月数',
      'last_year_stop_payment_months': '最近1年停缴的月数',
      'last_year_stop_payment_times': '最近1年停缴的次数',
      'total_stop_payment_months': '历史停缴月数',
      'total_stop_payment_times': '历史停缴次数',
      'last_half_year_company_num': '近6月社保社保缴纳不同单位数',
      'last_year_company_num': '近12月社保社保缴纳不同单位数',
      'last_two_year_company_num': '近24月社保社保缴纳不同单位数'
    };
    // eslint-disable-next-line
    const maternity_summaryKvs = {
      'origin_name': '险种名称',
      'first_insured_date': '首次参保时间',
      'company': '缴存单位名称',
      'total_amount': '累计缴纳金额',
      'total_month': '累计缴纳月份',
      'latest_continuous_payment_months': '最近连续缴纳月数',
      'last_year_stop_payment_months': '最近1年停缴的月数',
      'last_year_stop_payment_times': '最近1年停缴的次数',
      'total_stop_payment_months': '历史停缴月数',
      'total_stop_payment_times': '历史停缴次数',
      'last_half_year_company_num': '近6月社保社保缴纳不同单位数',
      'last_year_company_num': '近12月社保社保缴纳不同单位数',
      'last_two_year_company_num': '近24月社保社保缴纳不同单位数'
    };
    const consumptionsKvs = {
      'trade_time': '结算时间',
      'trade_amount': '结算金额（单位：分）',
      'trade_type': '医疗类别',
      'trade_place': '医疗结构名称'
    };
    const companysKvs = {
      'name': '缴费单位',
      'term': '缴费期数',
      'amount': '缴费总金额（单位：分）',
      'last_term': '连续缴费期数',
      'end_date': '结束时间',
      'begin_date': '开始时间',
      'type': '单位性质'
    };
    return {
      inputFrom: {
        partnerUserId: '',
        org: ''
      },
      rules: {
        partnerUserId: [{ required: true, message: '请输入paetnerID', trigger: 'blur' }],
        org: [{ required: true, message: '请选择' }]
      },
      result: {
        example: true,
        "data": {
          "report_time": "2018-07-17 20:46:28",
          "reportHTML": "",
          "report": [{
            "data": {
              "end_date": "",
              "education": "",
              "account_property": "",
              "gender": "",
              "nation": "",
              "max_base": 377280,
              "medicare_consumption_total_amount": 0,
              "social_security_name": "",
              "average_base": 255276,
              "current_base": 377280,
              "pension_balance": 0,
              "insured_status": "",
              "company": "华夏银行",
              "current_payment_months": 0,
              "payment_months": 84,
              "period": "2018-07",
              "address": "",
              "insured_begin_date": "",
              "birth": "",
              "idcard_type": "身份证",
              "yj_month_income": 377280,
              "continuous_payment_max_months": 21,
              "phone": "",
              "idcard": "11000******111",
              "medicare_balance": 541739,
              "name": "**仁",
              "customer": "",
              "maternityFlow": [{
                "company_amount": 0,
                "payment_base": 377280,
                "period": "2018-07",
                "person_amount": 0,
                "company": "",
                "origin_name": "生育保险 "
              }],
              "maternity_summary": {
                "latest_continuous_payment_months": 17,
                "last_year_stop_payment_months": 0,
                "last_two_year_company_num": 0,
                "last_year_stop_payment_times": 0,
                "total_stop_payment_months": 21,
                "first_insured_date": "2009-11",
                "total_amount": 124822,
                "last_half_year_company_num": 0,
                "company": "",
                "last_year_company_num": 0,
                "total_month": 84,
                "origin_name": "生育保险 ",
                "total_stop_payment_times": 6
              },
              "pensionFlow": [{
                "company_amount": 0,
                "payment_base": 170000,
                "period": "2018-07",
                "person_amount": 13600,
                "company": "",
                "origin_name": "养老保险 "
              }],
              "pension_summary": {
                "latest_continuous_payment_months": 17,
                "last_year_stop_payment_months": 0,
                "last_two_year_company_num": 0,
                "last_year_stop_payment_times": 0,
                "total_stop_payment_months": 21,
                "first_insured_date": "2009-11",
                "total_amount": 2089380,
                "last_half_year_company_num": 0,
                "company": "",
                "last_year_company_num": 0,
                "total_month": 84,
                "origin_name": "养老保险 ",
                "total_stop_payment_times": 6
              },
              "injuryFlow": [{
                "company_amount": 0,
                "payment_base": 170000,
                "period": "2018-07",
                "person_amount": 0,
                "company": "",
                "origin_name": "工伤保险 "
              }],
              "medicareFlow": [{
                "company_amount": 0,
                "payment_base": 377280,
                "period": "2018-07",
                "person_amount": 13582,
                "company": "",
                "origin_name": "医疗保险 "
              }],
              "unemploymentFlow": [{
                "company_amount": 0,
                "payment_base": 170000,
                "period": "2018-07",
                "person_amount": 0,
                "company": "",
                "origin_name": "失业保险 "
              }],
              "unemployment_summary": {
                "latest_continuous_payment_months": 17,
                "last_year_stop_payment_months": 0,
                "last_two_year_company_num": 0,
                "last_year_stop_payment_times": 0,
                "total_stop_payment_months": 21,
                "first_insured_date": "2009-11",
                "total_amount": 145870,
                "last_half_year_company_num": 0,
                "company": "",
                "last_year_company_num": 0,
                "total_month": 84,
                "origin_name": "失业保险 ",
                "total_stop_payment_times": 6
              },
              "medicare_summary": {
                "latest_continuous_payment_months": 17,
                "last_year_stop_payment_months": 0,
                "last_two_year_company_num": 0,
                "last_year_stop_payment_times": 0,
                "total_stop_payment_months": 21,
                "first_insured_date": "2009-11",
                "total_amount": 1176935,
                "last_half_year_company_num": 0,
                "company": "",
                "last_year_company_num": 0,
                "total_month": 84,
                "origin_name": "医疗保险 ",
                "total_stop_payment_times": 6
              },
              "injury_summary": {
                "latest_continuous_payment_months": 17,
                "last_year_stop_payment_months": 0,
                "last_two_year_company_num": 0,
                "last_year_stop_payment_times": 0,
                "total_stop_payment_months": 21,
                "first_insured_date": "2009-11",
                "total_amount": 59797,
                "last_half_year_company_num": 0,
                "company": "",
                "last_year_company_num": 0,
                "total_month": 84,
                "origin_name": "工伤保险 ",
                "total_stop_payment_times": 6
              },
              "consumptions": [{
                "trade_time": "2015-01-21",
                "trade_amount": 2507,
                "trade_type": "",
                "trade_place": "华夏银行"
              }],
              "companys": [{
                  "end_date": "2018-06",
                  "amount": "494096",
                  "last_term": "11",
                  "begin_date": "2017-07",
                  "name": "华夏银行",
                  "term": "12",
                  "type": ""
                },
                {
                  "end_date": "2017-06",
                  "amount": "682688",
                  "last_term": "7",
                  "begin_date": "2016-01",
                  "name": "",
                  "term": "18",
                  "type": ""
                }
              ]
            },
            "type": "社保"
          }]
        },
        "return_code": "0"
      },
      loading: false,
      socialsecurityList,
      orgArea: undefined,
      openId: '',
      ripId,
      taskId: '',
      basicInfoKvs,
      medicareFlowKvs,
      pensionFlowKvs,
      unemploymentFlowKvs,
      injuryFlowKvs,
      maternityFlowKvs,
      medicare_summaryKvs,
      pension_summaryKvs,
      unemployment_summaryKvs,
      injury_summaryKvs,
      maternity_summaryKvs,
      consumptionsKvs,
      companysKvs,
      tryAgain: 8 // 报报告找不到错误，但是重试可以解决设置8次重访问
    };
  },
  methods: {
    getOrgInfo: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/agencyInfo', {
        params: {
          organization_id: vm.inputFrom.org
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
    inputOrgInfo: function () {
      var vm = this;
      vm.getOrgInfo().then(function (data) {
        var formElement = vm.$createElement(SsLogin, { props: { json: data } });
        var promise = vm.$msgbox({
          title: '社保信息采集',
          message: formElement,
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          confirmButtonText: '提交',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              var errorField = vm.innerFormValidate(formElement.child.form, data.data.tabs[0].entrys[0].parameters);
              if (errorField.length) {
                // eslint-disable-next-line
                alert(errorField.join(',') + '输入不合法，请重试。', '提示框');
              } else {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                // 提交
                var jsonData = {
                  rip_id: vm.ripId,
                  open_id: vm.openId,
                  organization_id: data.data.org_id,
                  entry_id: data.data.tabs[0].entrys[0].entryId,
                  version: '102'
                };
                var strDate = JSON.stringify(Object.assign(jsonData, formElement.child.form));
                vm.$http.get('api/rip/jsontask', {
                  params: {
                    jsonData: strDate
                  },
                  headers: {
                    authorization: vm.$db.get('authorization')
                  }}).then(function (res) {
                    if (res.data && res.data.return_code == '0') {
                      // 请求成功
                      vm.taskId = res.data.task_info.task_id;
                      if (res.data.task_info.task_wait) {
                        // 需要验证码 TODO
                        vm.doValidate(vm.taskId = res.data.task_info.task_wait);
                      } else {
                        vm.loading = true;
                        vm.startPollingSearch();
                      }
                    } else {
                      res.data && alert(res.data.return_message);
                    }
                    instance.confirmButtonLoading = false;
                    done();
                });
              }
            } else {
              done();
            }
          },
          showClose: false
        });
        promise.catch(() => {
          vm.$message({
            type: 'info',
            message: '查询被取消'
          });
        });
      });
    },
    doValidate: function (wait) {
      var vm = this;
      var formElement = vm.$createElement(SsValidate, { props: { json: wait } });
      var promise = vm.$msgbox({
        title: wait.message,
        message: formElement,
        showCancelButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        confirmButtonText: '提交',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            var formData = {};
            for (let k of formElement.child.type.keys) {
              if (formElement.child.form[k] == '') {
                alert('请填写验证信息。');
                return;
              } else {
                formData[k] = formElement.child.form[k];
              }
            }
            vm.responseLogin(formData);
            done();
          } else {
            done();
          }
        },
        showClose: false
      });
      promise.catch(() => {
        vm.$message({
          type: 'info',
          message: '查询被取消'
        });
      });
    },
    getTaskStatus: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/status', {
          params: {
            task_id: vm.taskId
          },
          headers: {
            authorization: vm.$db.get('authorization')
          }}).then(function (res) {
            resolve(res.data);
          });
        });
      return p;
    },
    responseLogin: function (formData) {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/verification', {
          params: {
            jsonData: JSON.stringify(Object.assign(formData, {task_id: vm.taskId}))
          },
          headers: {
            authorization: vm.$db.get('authorization')
        }}).then(function (res) {
          resolve(res.data);
        });
      });
      p.then(function (data) {
        if (data && data.return_code == '0') {
          // 请求成功
          vm.taskId = data.task_info.task_id;
          if (data.task_info.task_wait) {
            // 需要验证码 TODO
            vm.doValidate(vm.taskId = data.task_info.task_wait);
          } else {
            vm.loading = true;
            vm.startPollingSearch();
          }
        }
      });
    },
    startPollingSearch: function () {
      var vm = this;
      var pStatus = vm.getTaskStatus();
      pStatus.then(function (data) {
        if (data.return_code && data.return_code == '0') {
          var status = data.task_info.status;
          if (status == 'COMPLETE') {
            // 报告生成
            vm.$http.get('api/rip/report', {
              params: {
                task_id: vm.taskId,
                open_id: vm.openId,
                version: '102'
              },
              headers: {
                authorization: vm.$db.get('authorization')
              }
              }).then(function (res) {
                if (res.data.return_code == '0') {
                  vm.result = res.data;
                  vm.result.example = false;
                  vm.loading = false;
                  vm.initDownloadLink(res.data.data.reportHTML);
                  vm.tryAgain = 8;
                  vm.loading = false;
                } else {
                  vm.tryAgain--;
                  if (vm.tryAgain == 0) {
                    vm.$message({
                      showClose: true,
                      message: res.data.return_message,
                      type: 'error',
                      duration: '5000'
                    });
                    vm.loading = false;
                  } else {
                    vm.startPollingSearch();
                  }
                }
            });
          } else if (['INVALID', 'FAILURE', 'PROCESS'].includes(status)) {
            vm.$message({
              showClose: true,
              message: data.task_info.error_message,
              type: 'error',
              duration: '5000'
            });
            vm.loading = false;
          } else {
            console.log(new Date().getTime() + '___轮询___Status：' + status);
            // 3秒后再次请求api
            setTimeout(vm.startPollingSearch, 3000);
          }
        } else {
          vm.$message({
            showClose: true,
            message: '很抱歉，无法获取报告，错误代码：' + data.return_code,
            type: 'error',
            duration: '5000'
          });
          vm.loading = false;
        }
      });
    },
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
    getSSList: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) {
        vm.$http.get('api/rip/socialsecurityList', {
          headers: {
            authorization: vm.$db.get('authorization')
          }
          }).then(function (res) {
            resolve(res.data);
        });
      });
      return p;
    },
    innerFormValidate: function (form, parameters) {
      var errorField = [];
      parameters.forEach(p => {
        if (!new RegExp(p.reg).test(form[p.name] || '')) {
          errorField.push(p.label);
        }
      });
      return errorField;
    },
    initDownloadLink (reportHTML) {
      if (!this.result.data.reportHTML) {
        return;
      }
      let Base64 = require('js-base64').Base64;
      var html = Base64.decode(reportHTML);
      var aLink = document.getElementById('download');
      var blob = new Blob([html]);
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);
      aLink.download = '1.html';
      aLink.href = URL.createObjectURL(blob);
      aLink.dispatchEvent(evt);
    },
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          vm.getOpenId().then(function (data) {
            vm.openId = data.open_id;
          });
          vm.inputOrgInfo();
        }
      });
    }
  }
};
</script>
