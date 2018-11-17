<template>
  <div>
    <el-card style="margin-bottom:25px" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>公积金</span>
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
                <el-option v-for="(f, index) in fundList" :key="index" :label="f.name" :value="index"></el-option>
              </el-select>
              <el-select v-model="inputFrom.org" no-data-text="请先选择所属省份">
                <template v-if="!isNaN(orgArea)">
                  <el-option v-for="(o, index) in fundList[orgArea].childOrgs" :key="index" :label="o.name" :value="o.org_id" :disabled="o.status=='DISABLED'"></el-option>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '公积金'})">打印</el-button></el-col>
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
          <td colspan="4">公积金基本信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(basicInfoKvs, result.data.report[0].data[0])">
            </table>
          </td>
        </tr>
        <tr class="text-title">
          <td colspan="4">贷款基本信息</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(loanBasicInfoKvs, result.data.report[0].data[0])">
            </table>
          </td>
        </tr>
        <tr class="text-title">
          <td colspan="4">贷款记录</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data[0].loans, loansKvs)">
            </table>
          </td>
        </tr>
        <tr class="text-title">
          <td colspan="4">缴存分析</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(depositeAnalyticKvs, result.data.report[0].data[0])">
            </table>
          </td>
        </tr>
        <tr class="text-title">
          <td colspan="4">还款分析</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.getHtmlByKvsFromObj(repayAnalyticKvs, result.data.report[0].data[0])">
            </table>
          </td>
        </tr>
        <tr class="text-title">
          <td colspan="4">近12个月公积金缴存流水</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data[0].flows, flowsKvs)">
            </table>
          </td>
        </tr>
        <tr class="text-title">
          <td colspan="4">就业历史</td>
        </tr>
        <tr class="inner-table">
          <td colspan="4" style="padding: 0;">
            <table class="table" v-html="$FU.arrayInfo2HtmlV2(result.data.report[0].data[0].companys, companysKvs)">
            </table>
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import SsLogin from './SsLogin';
import SsValidate from './SsValidate';
export default {
  name: 'Accumulation',
  components: {
  },
  data () {
    var vm = this;
    var fundList = [];
    var ripId = '';
    vm.getFundList().then(function (data) {
      vm.fundList = data.data;
      vm.ripId = data.rip_id;
    });
    const basicInfoKvs = {
      name: '姓名',
      sex: '性别',
      email: '邮箱',
      idcard: '证件号码',
      age: '年龄',
      address: '家庭地址',
      idcard_type: '证件类型',
      native: '出生地区',
      phone: '手机号码',
      organization_type: '机构名称',
      customer_id: '公积金账号',
      user_name: '用户填写姓名',
      user_idcard: '用户填写身份证',
      user_phone: '用户填写手机号',
      name_match: '姓名是否一致',
      idcard_match: '身份证是否一致'
    };
    const flowsKvs = {
      amount: '金额（单位：分）',
      balance: '余额 （单位：分）',
      operation_type: '操作类型',
      operation_date: '操作日期',
      company: '公司名称',
      record_month: '缴存月份',
      record_date: '缴存日期'
    };
    const depositeAnalyticKvs = {
      deposite_num_6: '近6月缴存金额（单位：分）',
      deposite_num_12: '近12月缴存金额 （单位：分）',
      deposite_num_24: '近24月缴存金额 （单位：分）',
      last_deposit_month_6: '近6月最大连续缴存月数',
      last_deposit_month_12: '近12月最大连续缴存月数',
      last_deposit_month_24: '近24月最大连续缴存月数',
      take_amount_6: '近6月取出金额（单位：分）',
      take_amount_12: '近12月取出金额（单位：分）',
      take_amount_24: '近24月取出金额（单位：分）',
      take_num_6: '近6月取出笔数',
      take_num_12: '近12月取出笔数',
      take_num_24: '近24月取出笔数'
    };
    const repayAnalyticKvs = {
      repay_month_6: '近6月还款月数',
      repay_month_12: '近12月还款月数',
      repay_month_24: '近24月还款月数',
      repay_continues_month_6: '近6月最大连续还款月数',
      repay_continues_month_12: '近12月最大连续还款月数',
      repay_continues_month_24: '近24月最大连续还款月数',
      delay_repay_ratio_6: '近6月逾期还款合同数占比（单位：%）',
      delay_repay_ratio_12: '近12月逾期还款合同数占比 （单位：%）',
      delay_repay_ratio_24: '近24月逾期还款合同数占比（单位：%）',
      repay_num_6: '近6月还款合同数',
      repay_num_12: '近12月还款合同数',
      repay_num_24: '近24月还款合同数',
      repay_amount_6: '近6月还款金额（单位：分）',
      repay_amount_12: '近12月还款金额（单位：分）',
      repay_amount_24: '近24月还款金额（单位：分）',
      repay_capital_6: '近6月还款本金（单位：分）',
      repay_capital_12: '近12月还款本金（单位：分）',
      repay_capital_24: '近24月还款本金（单位：分）',
      repay_interest_6: '近6月还款利息（单位：分）',
      repay_interest_12: '近12月还款利息（单位：分）',
      repay_interest_24: '近24月还款利息（单位：分）',
      repay_penalty_6: '近6月还款罚息（单位：分）',
      repay_penalty_12: '近12月还款罚息（单位：分）',
      repay_penalty_24: '近24月还款罚息（单位：分）'
    };
    const loanBasicInfoKvs = {
      loan_count: '贷款笔数',
      loan_repay_amount: '月还款金额（单位：分）',
      loan_amount: '贷款总额（单位：分）',
      loan_years: '贷款年限（单位：年）',
      loan_unpaid_amount: '剩余贷款（单位：分）'
    };
    const companysKvs = {
      name: '缴费单位',
      term: '缴费期数（单位：月）',
      amount: '缴费总金额 （单位：分）',
      last_term: '连续缴费期数（单位：月）',
      end_date: '结束时间',
      begin_date: '开始时间',
      type: '单位性质'
    };
    const loansKvs = {
      contract_no: '合同号',
      idcard: '身份证号',
      name: '姓名',
      phone: '手机号',
      bank: '贷款银行',
      period: '贷款期限（单位：年）',
      limit: '贷款额度（单位：分）',
      balance: '贷款余额（单位：分）',
      begin_date: '贷款开始时间',
      end_date: '贷款结束时间',
      loan_rate: '贷款年利率（单位：%）',
      status: '贷款状态'
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
          "report_time": "2018-07-17 17:47:32",
          "reportHTML": "",
          "report": [{
            "data": [{
              "corp_type": "",
              "repay_amount_12": "0",
              "deposite_num_6": "182336",
              "delay_repay_ratio_24": "公积金未提供该数据",
              "repay_capital_6": "-1183364",
              "deposit_rate": "16.000000",
              "repay_capital_12": "-3493253",
              "user_idcard": "",
              "take_num_6": "0",
              "repay_penalty_12": "公积金未提供该数据",
              "begin_handin_date": "2015-02-01",
              "balance": "1293812",
              "repay_num_24": "19",
              "loan_years": "10",
              "take_num_12": "0",
              "repay_interest_12": "0",
              "repay_amount_6": "0",
              "current_corp_continuous_deposit_month": "1",
              "last_deposit_month": "1",
              "loans": [{
                "contract_no": "12557178363801846",
                "end_date": "",
                "bank": "华夏银行",
                "period": "10",
                "balance": "7957568",
                "phone": "18888888888",
                "begin_date": "2011-08-15",
                "idcard": "110***********111",
                "limit": "22000000",
                "name": "**仁",
                "loan_rate": "0.000000",
                "status": ""
              }],
              "repay_month_24": "19",
              "repay_capital_24": "-3493253",
              "last_record_date": "2018-06-30",
              "loan_amount": "22000000",
              "monthly_income": "284900",
              "loan_count": "1",
              "idcard_type": "身份证",
              "repay_penalty_24": "公积金未提供该数据",
              "flow_count": "33",
              "loan_unpaid_amount": "7957568",
              "corp_deposite_amount": "16800.0",
              "phone": "18888888888",
              "idcard_match": "无法判断",
              "name": "**仁",
              "take_amount_24": "0",
              "deposite_num_12": "707360",
              "status": "正常",
              "repay_penalty_6": "公积金未提供该数据",
              "last_deposit_month_24": "21",
              "user_name": "",
              "corp_scale": "",
              "last_deposit_month_6": "3",
              "loan_repay_amount": "0",
              "repay_month_12": "12",
              "take_amount_6": "0",
              "repay_continues_month_24": "18",
              "continuous_deposit_month": "1",
              "unpaid_num_6": "3",
              "repay_num_6": "6",
              "flows": [{
                  "amount": "45584",
                  "balance": "1278773",
                  "operation_type": "补缴",
                  "operation_date": "2018-06-30",
                  "company": "华夏银行",
                  "record_month": "201804"
                },
                {
                  "amount": "15039",
                  "balance": "1293812",
                  "operation_type": "结息",
                  "operation_date": "2018-06-30",
                  "company": "华夏银行",
                  "record_month": ""
                },
                {
                  "amount": "45584",
                  "balance": "1233189",
                  "operation_type": "补缴",
                  "operation_date": "2018-05-28",
                  "company": "华夏银行",
                  "record_month": "201803"
                },
                {
                  "amount": "45584",
                  "balance": "1187605",
                  "operation_type": "补缴",
                  "operation_date": "2018-04-25",
                  "company": "华夏银行",
                  "record_month": "201802"
                },
                {
                  "amount": "45584",
                  "balance": "1142021",
                  "operation_type": "补缴",
                  "operation_date": "2018-03-30",
                  "company": "华夏银行",
                  "record_month": "201801"
                },
                {
                  "amount": "45584",
                  "balance": "1096437",
                  "operation_type": "补缴",
                  "operation_date": "2018-02-27",
                  "company": "华夏银行",
                  "record_month": "201712"
                },
                {
                  "amount": "45584",
                  "balance": "1050853",
                  "operation_type": "补缴",
                  "operation_date": "2018-01-23",
                  "company": "华夏银行",
                  "record_month": "201711"
                },
                {
                  "amount": "45584",
                  "balance": "1005269",
                  "operation_type": "补缴",
                  "operation_date": "2017-12-21",
                  "company": "华夏银行",
                  "record_month": "201710"
                },
                {
                  "amount": "45584",
                  "balance": "959685",
                  "operation_type": "补缴",
                  "operation_date": "2017-11-30",
                  "company": "华夏银行",
                  "record_month": "201709"
                },
                {
                  "amount": "45584",
                  "balance": "914101",
                  "operation_type": "补缴",
                  "operation_date": "2017-10-25",
                  "company": "华夏银行",
                  "record_month": "201708"
                },
                {
                  "amount": "45584",
                  "balance": "868517",
                  "operation_type": "补缴",
                  "operation_date": "2017-09-28",
                  "company": "华夏银行",
                  "record_month": "201707"
                },
                {
                  "amount": "41920",
                  "balance": "822933",
                  "operation_type": "补缴",
                  "operation_date": "2017-08-30",
                  "company": "华夏银行",
                  "record_month": "201706"
                },
                {
                  "amount": "41920",
                  "balance": "781013",
                  "operation_type": "补缴",
                  "operation_date": "2017-07-28",
                  "company": "华夏银行",
                  "record_month": "201705"
                }
              ],
              "native": "340403",
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
              ],
              "user_phone": "",
              "company": "华夏银行",
              "take_amount_12": "0",
              "unpaid_num_24": "3",
              "deposite_num_24": "1187936",
              "email": "",
              "deposit_amount": "45584",
              "personal_deposite_rate": "8.0",
              "repay_amount_24": "0",
              "address": "",
              "delay_repay_ratio_12": "公积金未提供该数据",
              "repay_month_6": "6",
              "last_deposit_month_12": "9",
              "sex": "男",
              "name_match": "无法判断",
              "first_record_date": "2015-02-01",
              "corp_deposite_rate": "8.0",
              "repay_interest_6": "0",
              "repay_continues_month_12": "11",
              "delay_repay_ratio_6": "公积金未提供该数据",
              "personal_deposite_amount": "16800.0",
              "idcard": "110**********111",
              "repay_continues_month_6": "5",
              "repay_num_12": "19",
              "organization_type": "华夏公积金中心",
              "customer_id": "11707",
              "unpaid_num_12": "3",
              "take_num_24": "0",
              "age": "34",
              "repay_interest_24": "0",
              "base": "2100"
            }],
            "type": "公积金"
          }]
        },
        "return_code": "0"
      },
      fundList,
      ripId,
      orgArea: undefined,
      loading: false,
      openId: '',
      taskId: '',
      tryAgain: 8, // 报报告找不到错误，但是重试可以解决设置8次重访问
      basicInfoKvs,
      flowsKvs,
      depositeAnalyticKvs,
      repayAnalyticKvs,
      loanBasicInfoKvs,
      companysKvs,
      loansKvs
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
          title: '公积金信息采集',
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
    },
    getFundList: function () {
      var vm = this;
      var p = new Promise(function (resolve, reject) { 
          vm.$http.get('api/rip/fundlist', {
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
              resolve(res.data);
          });
      });
      return p;
    }
  }
};
</script>
