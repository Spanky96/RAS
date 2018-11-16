<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>企业涉诉查询-C</span>
      </div>
      <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="企业名称" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputForm.name"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '企业涉诉查询-C'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="25%">查询结果</td>
          <td width="25%"><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="text-left">
          <td width="25%">企业名称:</td>
          <td>{{result.name}}</td>
          <td width="25%"></td>
          <td></td>
        </tr>
        <tr class="text-left">
          <td width="25%">开庭公告:</td>
          <td>{{result.statistic.ktggResultSize}} 条</td>
          <td width="25%">裁判文书:</td>
          <td>{{result.statistic.cpwsResultSize}} 条</td>
        </tr>
        <tr class="text-left">
          <td width="20%">执行公告</td>
          <td>{{result.statistic.zxggResultSize}} 条</td>
          <td width="20%">失信公告</td>
          <td>{{result.statistic.sxggResultSize}} 条</td>
        </tr>
        <tr class="text-left">
          <td width="20%">法院公告</td>
          <td>{{result.statistic.fyggResultSize}} 条</td>
          <td width="20%">网贷黑名单</td>
          <td>{{result.statistic.wdhmdResultSize}} 条</td>
        </tr>
        <tr class="text-left">
          <td width="20%">案件流程</td>
          <td>{{result.statistic.ajlcResultSize}} 条</td>
          <td width="20%">曝光台</td>
          <td>{{result.statistic.bgtResultSize}} 条</td>
        </tr>
        <tr v-for="(ret, index) in result.result" :key="index">
          <td colspan="4">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2"><el-tag round size="mini">{{index + 1}}</el-tag> {{dataTypeChange(ret.dataType)}}</td>
              </tr>
              <tr class="text-left resultRows" v-for="(v,k) in ret" :key="k">
                <td class="mytd" width="25%">{{getKeyName(ret.dataType, k)}}</td>
                <td class="mytd">{{tuomin((v || '&nbsp;'), k)}}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </el-card>
    <el-pagination v-if="!result.example" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="result.pagination.pageIndex" layout="prev, pager, next, jumper" :page-count="result.pagination.totalPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'EnterpriseLawsuitC',
  components: {
  },
  data () {
    const sourcetArr = [{
        id: 'SXGG',
        name: '失信公告',
        kvs: {
          name: '被执行人姓名',
          gender: '性别',
          implementationStatus: '履行情况',
          evidenceCode: '依据案号',
          identificationNO: '身份证/组织机构代码',
          executableUnit: '做出执行依据单位',
          specificCircumstances: '失信被执行人行为具体情形',
          obligations: '生效法律文书确定的义务',
          age: '年龄',
          province: '省份',
          postTime: '发布时间',
          id: '失信公告 ID（唯一的标识）',
          recordTime: '立案时间（时间戳）',
          content: '内容',
          caseNO: '案号',
          court: '执行法院名称',
          dataType: '类别',
          time: '立案时间（年月日格式）'
        }
      },
      {
        id: 'ZXGG',
        name: '执行公告',
        kvs: {
            title: '标题',
            name: '被执行人姓名',
            caseStatus: '案件状态',
            identificationNO: '身份证/组织机构代码',
            executionTarget: '执行标的',
            id: '执行公告 ID',
            recordTime: '立案时间（时间戳）',
            content: '内容',
            caseNO: '案号',
            court: '执行法院名称',
            dataType: '类别',
            time: '立案时间（年月日格式）'
        }
      },
      {
        id: 'CPWS',
        name: '裁判文书',
        kvs: {
            caseType: '案件类型',
            title: '标题',
            litigants: '法官陪审员',
            id: '裁判文书 ID',
            recordTime: '审结时间（时间戳）',
            content: '内容',
            caseNO: '案号',
            court: '法院名称',
            dataType: '类别',
            time: '审结时间（年月日格式）'
        }
      },
      {
        id: 'KTGG',
        name: '开庭公告',
        kvs: {
            party: '当事人',
            title: '标题',
            caseCause: '案由',
            courtroom: '法庭',
            id: '开庭公告 ID',
            content: '内容',
            recordTime: '开庭时间（时间戳）',
            caseNO: '案号',
            court: '法院名称',
            dataType: '类别',
            time: '开庭时间（年月日格式）'
        }
      },
      {
        id: 'FYGG',
        name: '法院公告',
        kvs: {
            layout: '版面',
            name: '当事人',
            announcementType: '公告类型',
            id: '法院公告 ID',
            recordTime: '发布时间（时间戳）',
            content: '公告内容',
            court: '法院名称',
            time: '发布时间（年月日格式）',
            dataType: '类别'
        }
      },
      {
        id: 'WDHMD',
        name: '网贷黑名单',
        kvs: {
            identificationNO: '身份证/组织机构代码',
            sex: '性别',
            address: '地址',
            email: '邮箱',
            name: '姓名',
            phone: '手机号',
            sourceName: '数据来源单位名称',
            principal: '本金/本息',
            penalty: '未还/罚息',
            mobile: '手机号',
            recordTime: '贷款时间',
            content: '内容',
            court: '法院名称',
            time: '贷款时间（年月日格式）',
            dataType: '类别',
            id: '网贷黑名单 ID'
        }
      },
      {
        id: 'AJLC',
        name: '案件流程',
        kvs: {
            caseType: '案件类别',
            caseCause: '案由',
            status: '流程状态',
            name: '当事人',
            id: '案件流程 ID',
            recordTime: '立案时间（时间戳）',
            content: '内容',
            caseNO: '案号',
            court: '法院名称',
            dataType: '类型',
            time: '立案时间（年月日格式）'
        }
      },
      {
        id: 'BGT',
        name: '曝光台',
        kvs: {
            name: '当事人',
            proposer: '提案人',
            id: '曝光台 ID',
            recordTime: '立案时间（时间戳）',
            content: '内容',
            caseNO: '案号',
            court: '法院名称',
            dataType: '类型',
            time: '立案时间（年月日格式）'
        }
      }
    ];
    return {
      sourcetArr: sourcetArr,
      selectAll: false,
      inputForm: {
        name: '',
        idCard: '',
        pageIndex: '1'
      },
      rules: {
      },
      result: {
        example: true,
        resultType: '000000',
        name: '乐视网信息技术(北京)股份有限公司',
        statistic: {
            "ktggResultSize": 757,
            "cpwsResultSize": 2584,
            "zxggResultSize": 88,
            "sxggResultSize": 9,
            "fyggResultSize": 23,
            "wdhmdResultSize": 0,
            "ajlcResultSize": 740,
            "bgtResultSize": 5
        },
        result: [
            {
                "title": "乐视网信息技术（北京）股份有限公司",
                "name": "乐视网信息技术（北京）股份有限公司",
                "caseStatus": "0",
                "identificationNO": "76938905-1",
                "executionTarget": 97209,
                "id": "c2018110108zhi16681_t20181022_plswxxjsbjgfyxgs@cG5hbWU65LmQ6KeG572R5L%2Bh5oGv5oqA5pyv77yI5YyX5Lqs77yJ6IKh5Lu95pyJ6ZmQ5YWs5Y%2B4",
                "recordTime": 1540137600000,
                "content": "资金 乐视网信息技术（北京）股份有限公司 d 7693...",
                "caseNO": "（2018）京0108执16681号",
                "court": "北京市海淀区人民法院",
                "dataType": "ZXGG",
                "time": "2018年10月22日"
            },
            {
                "title": "乐视网信息技术（北京）股份有限公司",
                "name": "乐视网信息技术（北京）股份有限公司",
                "caseStatus": "0",
                "identificationNO": "76938905-1",
                "executionTarget": 150160,
                "id": "c2018110108zhi16682_t20181022_plswxxjsbjgfyxgs@cG5hbWU65LmQ6KeG572R5L%2Bh5oGv5oqA5pyv77yI5YyX5Lqs77yJ6IKh5Lu95pyJ6ZmQ5YWs5Y%2B4",
                "recordTime": 1540137600000,
                "content": "资金 乐视网信息技术（北京）股份有限公司 d 7693...",
                "caseNO": "（2018）京0108执16682号",
                "court": "北京市海淀区人民法院",
                "dataType": "ZXGG",
                "time": "2018年10月22日"
            }
        ],
        pagination: {
            "pageIndex": "1",
            "totalPage": "211",
            "resultSize": "4206",
            "pageSize": "20"
        }
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
    onSubmit: function (pageIndex) {
      var vm = this;
      vm.$refs['inputForm'].validate((valid) => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)'
          });
          vm.$http.get('api/rip/enterpriseLitigationInquiryC', {
            params: {
              name: vm.inputForm.name,
              pageIndex: pageIndex
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
              if (res.data.success) {
                vm.result.name = res.data.data.name;
                vm.result.idCard = res.data.data.identityCard;
                vm.result.result = res.data.data.pageData;
                vm.result.statistic = res.data.data.statistic;
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
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.onSubmit(val);
    },
    getKeyName (sourcet, name) {
      var i = this.sourcetArr.find((n) => n.id == sourcet);
      return i.kvs[name] || '';
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
    },
    tuomin (v, keyName) {
      if (['name', 'title', 'party', 'proposer'].includes(keyName)) {
        return v;
      } else if (['caseStatus'].includes(keyName)) {
        if (v == '1') {
          return '结案';
        } else {
          return '执行中';
        }
      } else {
        return v;
      }
    }
  }
};
</script>
