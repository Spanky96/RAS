<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>个人名下关联企业查询</span>
      </div>
      <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="身份证号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputForm.idCard"></el-input>
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
          <td width="20%">身份证号码</td>
          <td>{{result.idCard | handleIdCard()}}</td>
        </tr><tr class="text-left">
          <td width="20%">数据是否存在</td>
          <td>{{result.status}}</td>
        </tr>
        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">失信被执行人信息</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.punishBreaks" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">案号 ：</td>
                <td class="mytd">{{ret.caseCode}}</td>
                <td class="mytd" width="25%">被执行人姓名/名称 ：</td>
                <td class="mytd">{{ret.name}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">失信人类型 ：</td>
                <td class="mytd">{{ret.type}}</td>
                <td class="mytd" width="25%">性别 ：</td>
                <td class="mytd">{{ret.sex}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">年龄 ：</td>
                <td class="mytd">{{ret.age}}</td>
                <td class="mytd" width="25%">身份证号码 ：</td>
                <td class="mytd">{{ret.cardNum}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">身份证原始发证地 ：</td>
                <td class="mytd">{{ret.ysfzd}}</td>
                <td class="mytd" width="25%">法定代表人/负责人姓名 ：</td>
                <td class="mytd">{{ret.businessEntity}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">立案时间 ：</td>
                <td class="mytd">{{ret.regDate}}</td>
                <td class="mytd" width="25%">公布时间 ：</td>
                <td class="mytd">{{ret.publishDate}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">执行法院 ：</td>
                <td class="mytd">{{ret.courName}}</td>
                <td class="mytd" width="25%">省份 ：</td>
                <td class="mytd">{{ret.areaName}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">执行依据文号 ：</td>
                <td class="mytd">{{ret.gistId}}</td>
                <td class="mytd" width="25%">执行依据单位 ：</td>
                <td class="mytd">{{ret.gistUnit}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">法律文书确定的义务 ：</td>
                <td class="mytd">{{ret.duty}}</td>
                <td class="mytd" width="25%">失信被执行人行为具体情形 ：</td>
                <td class="mytd">{{ret.disruptTypeName}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">被执行人的履行情况 ：</td>
                <td class="mytd">{{ret.performAnce}}</td>
                <td class="mytd" width="25%">已履行 ：</td>
                <td class="mytd">{{ret.performedPart}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">未履行 ：</td>
                <td class="mytd">{{ret.unPerformPart}}</td>
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
                <td colspan="2">被执行人信息</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.punished" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">案号 ：</td>
                <td class="mytd">{{ret.caseCode}}</td>
                <td class="mytd" width="25%">被执行人姓名/名称 ：</td>
                <td class="mytd">{{ret.name}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">身份证号码 ：</td>
                <td class="mytd">{{ret.cardNum}}</td>
                <td class="mytd" width="25%">性别 ：</td>
                <td class="mytd">{{ret.sex}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">年龄 ：</td>
                <td class="mytd">{{ret.age}}</td>
                <td class="mytd" width="25%">省份 ：</td>
                <td class="mytd">{{ret.areaName}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">身份证原始发证地 ：</td>
                <td class="mytd">{{ret.ysfzd}}</td>
                <td class="mytd" width="25%">执行法院 ：</td>
                <td class="mytd">{{ret.courtName}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">立案时间 ：</td>
                <td class="mytd">{{ret.regDate}}</td>
                <td class="mytd" width="25%">案件状态 ：</td>
                <td class="mytd">{{ret.caseState}}</td>
              </tr><tr class="text-left resultRows">
                <td class="mytd" width="25%">执行标的（元） ：</td>
                <td class="mytd">{{ret.execMoney}}</td>
                <td class="mytd" width="25%"></td>
                <td class="mytd"></td>
              </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">行政处罚历史信息</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.caseInfos" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">案由 ：</td>
                <td class="mytd">{{ret.caseReason}}</td>
                <td class="mytd" width="25%">案发时间 ：</td>
                <td class="mytd">{{ret.caseTime}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">案值 ：</td>
                <td class="mytd">{{ret.caseVal}}</td>
                <td class="mytd" width="25%">案件类型 ：</td>
                <td class="mytd">{{ret.caseType}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">执行类别 ：</td>
                <td class="mytd">{{ret.exeSort}}</td>
                <td class="mytd" width="25%">案件结果 ：</td>
                <td class="mytd">{{ret.caseResult}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">处罚决定文书 ：</td>
                <td class="mytd">{{ret.penDecNo}}</td>
                <td class="mytd" width="25%">处罚决定书签发日期 ：</td>
                <td class="mytd">{{ret.penDecIssDate}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">做出行政处罚决定机关名 ：</td>
                <td class="mytd">{{ret.penAuth}}</td>
                <td class="mytd" width="25%">主要违法事实 ：</td>
                <td class="mytd">{{ret.illegFact}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">处罚依据 ：</td>
                <td class="mytd">{{ret.penBasis}}</td>
                <td class="mytd" width="25%">处罚种类 ：</td>
                <td class="mytd">{{ret.penType}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">处罚结果 ：</td>
                <td class="mytd">{{ret.penResult}}</td>
                <td class="mytd" width="25%">处罚金额（万元） ：</td>
                <td class="mytd">{{ret.penAm}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">处罚执行情况 ：</td>
                <td class="mytd">{{ret.penExeSt}}</td>
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
                <td colspan="2" width="50%">企业法人信息</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.corporates" :key="index">
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">查询人姓名 ：</td>
                <td class="mytd">{{ret.ryName}}</td>
                <td class="mytd" width="25%">企业（机构）名称 ：</td>
                <td class="mytd">{{ret.entName}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">注册号 ：</td>
                <td class="mytd">{{ret.regNo}}</td>
                <td class="mytd" width="25%">企业（机构）类型 ：</td>
                <td class="mytd">{{ret.entType}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">注册资本（万元） ：</td>
                <td class="mytd">{{ret.regCap}}</td>
                <td class="mytd" width="25%">注册资本币种 ：</td>
                <td class="mytd">{{ret.regCapCur}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">企业状态 ：</td>
                <td class="mytd">{{ret.entStatus}}</td>
                <td class="mytd" width="25%">统一社会信用代码 ：</td>
                <td class="mytd">{{ret.creditNo}}</td>
              </tr>
              </table>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2" width="50%">企业股东信息</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.corporateShareholders" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">查询人姓名 ：</td>
                <td class="mytd">{{ret.ryName}}</td>
                <td class="mytd" width="25%">企业（机构）名称 ：</td>
                <td class="mytd">{{ret.entName}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">注册号 ：</td>
                <td class="mytd">{{ret.regNo}}</td>
                <td class="mytd" width="25%">企业（机构）类型 ：</td>
                <td class="mytd">{{ret.entType}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">注册资本（万元） ：</td>
                <td class="mytd">{{ret.regCap}}</td>
                <td class="mytd" width="25%">注册资本币种 ：</td>
                <td class="mytd">{{ret.regCapCur}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">企业状态 ：</td>
                <td class="mytd">{{ret.entStatus}}</td>
                <td class="mytd" width="25%">认缴出资额（万元） ：</td>
                <td class="mytd">{{ret.subConam}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">认缴出资币种 ：</td>
                <td class="mytd">{{ret.currency}}</td>
                <td class="mytd" width="25%">出资比例 ：</td>
                <td class="mytd">{{ret.fundedRatio}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">统一社会信用代码 ：</td>
                <td class="mytd">{{ret.creditNo}}</td>
                <td class="mytd" width="25%"></td>
                <td class="mytd"></td>
              </tr>
              </table>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2" width="50%">企业主要管理人员信息</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.corporateManagers" :key="index">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">查询人姓名 ：</td>
                <td class="mytd">{{ret.ryName}}</td>
                <td class="mytd" width="25%">企业（机构）名称 ：</td>
                <td class="mytd">{{ret.entName}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">注册号 ：</td>
                <td class="mytd">{{ret.regNo}}</td>
                <td class="mytd" width="25%">企业（机构）类型 ：</td>
                <td class="mytd">{{ret.entType}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">注册资本（万元） ：</td>
                <td class="mytd">{{ret.regCap}}</td>
                <td class="mytd" width="25%">注册资本币种 ：</td>
                <td class="mytd">{{ret.regCapCur}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">企业状态 ：</td>
                <td class="mytd">{{ret.entStatus}}</td>
                <td class="mytd" width="25%">职务 ：</td>
                <td class="mytd">{{ret.position}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">统一社会信用代码 ：</td>
                <td class="mytd">{{ret.creditNo}}</td>
                <td class="mytd" width="25%"></td>
                <td class="mytd"></td>
              </tr>
              </table>
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
       idCard: ''
      },
      rules: {
        idCard: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '000000',
        idCard: '320281199606286770',
        status: '数据存在',
        punishBreaks: [
            {
                "caseCode": " XXX",
                "name": " 刘**",
                "type": " 自然人",
                "sex": " 男",
                "age": " 49",
                "cardNum": " 3210811972*****3656",
                "ysfzd": " 江西省**地区**市",
                "businessEntity": "",
                "regDate": " 20**-03-07",
                "publishDate": " 20**-11-24",
                "courName": " **市人民法院",
                "areaName": "江西",
                "gistId": " XXXX",
                "gistUnit": " 江西省**市人民法院",
                "duty": " XXX",
                "disruptTypeName": "其他有履行能力而拒不履行生效法律文书确定义务",
                "performAnce": "全部未履行",
                "performedPart": "",
                "unPerformPart": ""
            }
        ],
        punished: [
            {
                "caseCode": "XXX",
                "name": "刘**",
                "cardNum": "XXX",
                "sex": "男",
                "age": "45",
                "areaName": "",
                "ysfzd": "江苏省**市",
                "courtName": "**市人民法院",
                "regDate": "20**-10-22",
                "caseState": "已结案且全国法院被执行人查询平台已不披露",
                "execMoney": "94**.24"
            }
        ],
        caseInfos: [
            {
                "caseTime": "20**-06-30",
                "caseReason": "XXX",
                "caseVal": "0",
                "caseType": "其他案件",
                "exeSort": "已执行",
                "caseResult": "已处罚",
                "penDecNo": "XXX",
                "penDecIssDate": "20**-07-27",
                "penAuth": "XXX",
                "illegFact": "虚假出资",
                "penBasis": "《公司法》第二百条",
                "penType": "罚款",
                "penResult": "",
                "penAm": "1",
                "penExeSt": ""
            }
        ],
        corporates: [
            {
                "ryName": "刘**",
                "entName": "**市**包装印刷厂",
                "regNo": "321081**0010",
                "entType": "个人独资企业",
                "regCap": "40.000000",
                "regCapCur": "人民币元",
                "entStatus": "吊销",
                "creditNo": "XXX"
            }
        ],
        corporateManagers: [
            {
                "ryName": "刘**",
                "entName": "**市**包装有限公司",
                "regNo": "32108**00066265",
                "entType": "有限责任公司（自然人投资或控股）",
                "regCap": "50.000000",
                "regCapCur": "人民币元",
                "entStatus": "在营（开业）",
                "position": "总经理",
                "creditNo": "XXX"
            },
            {
                "ryName": "刘**",
                "entName": "**市**包装印刷厂",
                "regNo": "32108**00010",
                "entType": "个人独资企业",
                "regCap": "40.000000",
                "regCapCur": "人民币元",
                "entStatus": "吊销",
                "position": "",
                "creditNo": "XXX"
            }
        ],
        corporateShareholders: [
            {
                "ryName": "刘**",
                "entName": "**市**包装印刷厂",
                "regNo": "32108**00010",
                "entType": "个人独资企业",
                "regCap": "40.000000",
                "regCapCur": "人民币元",
                "entStatus": "吊销",
                "subConam": "40.000000",
                "currency": "人民币元",
                "fundedRatio": "100.00%",
                "creditNo": "XXX"
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
          vm.$http.get('api/rip/personalEnterprise', {
            params: {
              key: vm.inputForm.idCard
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
              if (res.data.success) {
                  if (res.data.data.status == 'EXIST') {
                      vm.result.idCard = res.data.data.key;
                vm.result.status = '数据存在',
                vm.result.punishBreaks = res.data.data.punishBreaks;
                vm.result.punished = res.data.data.punished;
                vm.result.caseInfos = res.data.data.caseInfos;
                vm.result.corporates = res.data.data.corporates;
                vm.result.corporateManagers = res.data.data.corporateManagers;
                vm.result.corporateShareholders = res.data.data.corporateShareholders;
                vm.result.example = false;
                  } else {
                      vm.result.idCard = res.data.data.key;
                vm.result.status = '数据不存在',
                vm.result.punishBreaks = res.data.data.punishBreaks;
                vm.result.punished = res.data.data.punished;
                vm.result.caseInfos = res.data.data.caseInfos;
                vm.result.corporates = res.data.data.corporates;
                vm.result.corporateManagers = res.data.data.corporateManagers;
                vm.result.corporateShareholders = res.data.data.corporateShareholders;
                vm.result.example = false;
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
