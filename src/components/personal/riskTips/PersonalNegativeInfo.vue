<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>个人负面排查</span>
      </div>
      <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputForm.idCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label-width="0" prop="flag" label="查询类别" class="form-item" style="margin: 0px;">
              <el-radio v-model="inputForm.flag" label="c">个人</el-radio>
              <el-radio v-model="inputForm.flag" label="b">企业</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label-width="0" prop="sourcet" class="form-item">
              <span style="margin-right:30px;">查询信息总类</span>
              <el-checkbox v-model="selectAll" class="select-all" name="selectAll" @change="selectAllClick()">全选</el-checkbox>
              <el-checkbox-group v-model="inputForm.sourcet">
                <el-checkbox v-for="(s, index) in sourcetArr" :key="index" :label="s.id" name="sourcet">{{s.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit(1)" round size="small">执行查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card id="resultTable">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col>
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '个人负面排查'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td width="20%">负面信息</td>
          <td>{{result.result.length}} 条</td>
        </tr>
        <tr v-for="(ret, index) in result.result" :key="index">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2"><el-tag round size="mini">{{index + 1}}</el-tag> {{ret.type}}</td>
              </tr>
              <tr class="text-left resultRows" v-for="(v,k) in JSON.parse(ret.json)" :key="k">
                <td class="mytd" width="25%">{{getKeyName(ret.t, k)}}</td>
                <td class="mytd">{{v || '&nbsp;'}}</td>
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
  name: 'PersonalRiskInfo',
  components: {
  },
  data () {
    const sourcetArr = [{
        id: 32,
        name: '最高法执行',
        kvs: {
          name: '被执行人姓名/名称',
          cidorcode: '身份证号码/组织机构代码',
          court: '执行法院',
          time: '立案时间',
          casenum: '执行案号',
          money: '执行标的',
          statute: '案件状态',
          basic: '执行依据',
          basiccourt: '做出执行依据的机构',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 150,
        name: '其他执行信息',
        kvs: {
          applyname: '执行申请人',
          name: '被执行人',
          leader: '法定代表人/负责人',
          cidorcode: '身份证号/组织机构代码证号',
          applyname2: '异议申请人',
          court: '执行法院',
          casenum: '执行案号',
          money: '执行标的',
          money2: '未履行标的（万元）',
          basic: '执行依据文号',
          time: '立案时间',
          statute: '执行状态',
          unit: '执行依据制作单位',
          opentime: '公开日期',
          obligation: '生效文书确定的义务',
          address: '住所地',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      },
      {
        id: 38,
        name: '失信被执行人',
        kvs: {
          name: '被执行人名称/姓名',
          cidorcode: '身份证号码/组织机构代码',
          leader: '法定代表人/负责人住所地',
          address: '住所地',
          court: '执行法院',
          time: '立案时间',
          casenum: '执行案号',
          money: '执行标的',
          base: '执行依据文号',
          basecompany: '做出执行依据单位',
          obligation: '生效法律文书确定的义务',
          lasttime: '生效法律文书确定的最后履行义务截止时间',
          performance: '被执行人的履行情况',
          concretesituation: '失信被执行人行为具体情形',
          breaktime: '认定失信时间',
          posttime: '发布时间',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 46,
        name: '老赖信息',
        kvs: {
          name: '被执行人',
          leader: '法定代表人',
          imgurl: '头像/照片',
          cidorcode: '组织机构代码证/身份证',
          address: '住址',
          money: '执行标的/未履行标的',
          court: '执行法院',
          casenum: '执行案号',
          time: '立案时间',
          posttime: '公布时间',
          basic: '执行依据文号',
          situation: '失信情形',
          obligation: '生效文书确定的义务',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      },
      {
        id: 148,
        name: '限制高消费被执行人',
        kvs: {
          name: '被限制人',
          cidorcode: '身份证号/组织机构代码证',
          leader: '法定代表人/负责人',
          address: '住所地',
          court: '执行法院',
          casenum: '案号',
          anyou: '案由',
          money: '标的',
          time: '立案时间',
          posttime: '发布时间',
          content: '具体内容',
          basic: '执行依据',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      },
      {
        id: 149,
        name: '限制出境被执行人',
        kvs: {
          name: '被限制人',
          address: '被限制人地址',
          control: '边控措施',
          controltime: '边控日期',
          cidorcode: '身份证号/护照号',
          court: '承办法院',
          casenum: '案号',
          basic: '执行依据编号',
          time: '立案时间',
          money: '执行标的',
          content: '具体内容',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      },
      {
        id: 36,
        name: '催欠公告',
        kvs: {
          name: '被催欠人名称/姓名',
          cidorcode: '身份证/住址机构代码证',
          leader: '被催欠单位法定代表人',
          phone: '被催欠人电话号码',
          email: '电子邮箱',
          address: '详细地址',
          money: '催欠金额',
          statute: '催欠状态',
          letterhref: '律师函',
          type: '催欠人身份',
          time: '催欠时间',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 147,
        name: '网贷逾期名单',
        kvs: {
          lender: '出借方',
          name: '借款人名称',
          leader: '法定代表人（负责人）',
          cidorcode: '身份证/组织机构代码证',
          sex: '性别',
          address: '居住地址',
          phone: '电话号码',
          networkname: '网络昵称',
          qq: 'QQ 号码',
          email: '电子邮箱',
          taobao: '淘宝账户',
          time: '借款时间',
          money: '借入本金',
          time2: '借款到期时间',
          totalmoney: '欠款本息总额',
          time3: '首次逾期日期',
          days: '最长逾期天数',
          time4: '信息更新时间',
          description: '描述',
          workunit: '工作单位',
          idaddress: '身份证地址',
          workunitaddress: '单位地址',
          workunitphone: '单位电话',
          other: '共同借款人',
          othercidorcode: '共同借款人身份证号',
          otherphone: '共同借款人电话',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      },
      {
        id: 31,
        name: '判决文书',
        kvs: {
          title: '标题',
          anyou: '案由',
          name: '当事人名称',
          cidorcode: '身份证号/组织机构代码证',
          address: '当事人住址',
          type: '诉讼地位',
          leader: '法定代表人/负责人',
          trialprocedure: '审理程序',
          court: '审理法院',
          casenum: '文书字号',
          casetype: '文书类型',
          time: '审结日期',
          contenthref: '文书内容',
          pdfhref: 'PDF 文件',
          ownfile: '源文件',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 33,
        name: '通知公告',
        kvs: {
          title: '标题',
          type: '送达类型',
          name: '当事人名称',
          cidorcode: '身份证号、组织机构代码',
          content: '送达内容',
          court: '送达法院',
          media: '刊登媒体',
          time: '刊登日期',
          banmian: '刊登版面',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 35,
        name: '开庭信息',
        kvs: {
          plaintiff: '原告（上诉人）',
          defendant: '被告（被上诉人）',
          plaintiff2: '原审被告',
          thirdperple: '原审第三人',
          court: '审理法院',
          time: '开庭时间',
          anyou: '案由',
          casenum: '案号',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 153,
        name: '立案信息',
        kvs: {
          plaintiff: '原告（上诉人）',
          defendant: '被告（被上诉人）',
          thirdpeople: '第三人',
          plaintiff2: '原审原告',
          defendant2: '原审被告',
          thirdpeople2: '原审第三人',
          court: '受理法院',
          time: '立案时间',
          anyou: '案由',
          casenum: '案号',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      },
      {
        id: 34,
        name: '欠税公告',
        kvs: {
          name: '纳税人名称',
          taxnum: '纳税人识别号',
          address: '经营地点',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          taxtype: '所欠税种',
          money: '期初陈欠',
          money2: '当期发生欠税余额（元）',
          money3: '欠税余额',
          time: '应征发生日期',
          time2: '认定日期',
          unit: '主管税务机关',
          leadership: '分管领导',
          taxpeople: '主管税务人员',
          region: '所属市县区',
          casenum: '认定字号',
          period: '公告期次',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 68,
        name: '行政处罚决定书',
        kvs: {
          name: '纳税人名称',
          taxnum: '纳税人识别号',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          unit: '主管税务机关',
          situation: '违法事实',
          time: '处罚事件',
          punishmenttype: '处罚类别',
          punishmentresult: '处罚结果',
          opentime: '公告时间',
          address: '生产经营地址',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 127,
        name: '违法案件',
        kvs: {
          name: '纳税人名称',
          taxnum: '纳税人识别号',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          unit: '主管税务机关',
          year: '检查/稽查年度',
          num: '稽查文书编号',
          fact: '违法违章事实',
          means: '违法违章手段',
          punishtime: '处理处罚决定日期',
          decisiontime: '处理处罚限定履行日期',
          money: '罚款金额',
          performtime: '处罚处理实际履行时间',
          money2: '实缴税款/入库金额（税、罚、滞合计）',
          money3: '未缴税款 /未入库金额(税、罚、滞合计)',
          statute: '限改状态',
          statute2: '纳税人当前状态',
          time: '公告时间',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 121,
        name: '失信纳税人',
        kvs: {
          name: '纳税人名称',
          taxnum: '纳税人识别号',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          unit: '主管税务机关',
          isd: '是否评定为 D 级',
          time: '评定时间',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      },
      {
        id: 133,
        name: '注销信息',
        kvs: {
          name: '失踪纳税人名称',
          taxnum: '纳税人识别号',
          peopletype: '纳税户类型',
          address: '经营地址',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          unit: '主管税务机关',
          cancletime: '注销日期',
          cancletype: '注销类型',
          canclereason: '注销原因',
          time: '公告时间',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 137,
        name: '失踪纳税人',
        kvs: {
          name: '失踪纳税人名称',
          taxnum: '纳税人识别号',
          address: '经营地址',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          unit: '主管税务机关',
          misstime: '认定失踪日期',
          num: '失踪通知书编号',
          money: '偷逃欠税税额',
          time: '公告时间',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 139,
        name: '逾期信息',
        kvs: {
          name: '纳税人名称',
          taxnum: '纳税人识别号',
          code: '海关代码',
          address: '经营地址',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          unit: '主管税务机关',
          timelimit: '申报期限',
          project: '未申报项目',
          taxtype: '未申报税种',
          money: '欠缴税额',
          money2: '处罚金额',
          time: '处罚时间',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }, {
        id: 134,
        name: '责令限期改正',
        kvs: {
          name: '纳税人名称',
          taxnum: '纳税人识别号',
          address: '生产经营地址',
          leader: '法定代表人（业主）',
          type: '证件类别',
          cidorcode: '证件号码',
          unit: '主管税务机关',
          num: '责令限改通知书号',
          statute: '责令限改状态',
          time: '公布日期',
          objection: '异议内容',
          objectiontime: '异议时间'
        }
      }
    ];
    return {
      sourcetArr: sourcetArr,
      selectAll: false,
      inputForm: {
        flag: 'c',
        name: '',
        idCard: '',
        sourcet: [],
        pageSize: 5
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ validator: this.$validator.idCardValidator, trigger: 'blur' }],
        sourcet: [{ type: 'array', required: true, message: '请至少选择一种分类', trigger: 'change' }]
      },
      result: {
        example: true,
        resultType: '000000',
        result: [
            {
              "cidorcode": "31011219621***0021",
              "datatime": "2018-10-24",
              "json": "{\"name\":\"喻海云\",\"cidorcode\":\"31011219621***0021\",\"court\":\"上海市闵行区人民法院\",\"time\":\"2018-10-24\",\"casenum\":\"（2018）沪0112执10132号\",\"money\":\"804520.00\",\"statute\":\"\",\"basic\":\"\",\"basiccourt\":\"\",\"objection\":\"\",\"objectiontime\":\"0001-01-01\"}",
              "keyid": "637461817",
              "name": "喻海云",
              "t": "32",
              "type": "执行信息-执行公开-最高法执行"
            },
            {
              "cidorcode": "31011219621***0021",
              "datatime": "2018-10-11",
              "json": "{\"name\":\"喻海云\",\"cidorcode\":\"31011219621***0021\",\"court\":\"上海市虹口区人民法院\",\"time\":\"2018-10-11\",\"casenum\":\"（2018）沪0109执3690号\",\"money\":\"543420.00\",\"statute\":\"\",\"basic\":\"\",\"basiccourt\":\"\",\"objection\":\"\",\"objectiontime\":\"0001-01-01\"}",
              "keyid": "634742629",
              "name": "喻海云",
              "t": "32",
              "type": "执行信息-执行公开-最高法执行"
            }
        ]
      }
    };
  },
  methods: {
    selectAllClick: function () {
      if (this.selectAll) {
        this.inputForm.sourcet = this.sourcetArr.map((n) => n.id);
      } else {
        this.inputForm.sourcet = [];
      }
    },
    onSubmit: function (currentPage) {
      currentPage = currentPage || 1;
      var vm = this;
      vm.$refs['inputForm'].validate((valid) => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)'
          });
          vm.$http.get('api/rip/personalNegative', {
            params: {
              name: vm.inputForm.name,
              idCard: vm.inputForm.idCard,
              currentPage: currentPage,
              pageSize: vm.inputForm.pageSize,
              sourcet: vm.inputForm.sourcet.join(","),
              flag: vm.inputForm.flag
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
              debugger;
              if (res.data.code == '000000') {
                vm.result.result = res.data.retdata.result;
                vm.result.example = false;
              } else {
                vm.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'error',
                  duration: '5000'
                });
              }
              loading.close();
          });
        }
      });
    },
    getKeyName (sourcet, name) {
      var i = this.sourcetArr.find((n) => n.id == sourcet);
      return i.kvs[name] || '';
    }
  }
};
</script>
