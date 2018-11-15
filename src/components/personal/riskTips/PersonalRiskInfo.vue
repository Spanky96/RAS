<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>个人黑名单综合</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
         <el-col :span="10">
          <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
            <el-input v-model="inputFrom.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="银行卡号" label-width="0" prop="bankCardNo" class="form-item">
            <el-input v-model="inputFrom.bankCardNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="身份号码" label-width="0" prop="idCard" class="form-item">
            <el-input v-model="inputFrom.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="手机号" label-width="0" prop="mobile" class="form-item">
            <el-input v-model="inputFrom.mobile"></el-input>
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
        <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '失效身份证一致性验证'})">打印</el-button></el-col>
      </el-row>
    </div>
    <table class="table card-text">
      <tr class="text-left">
        <td width="15%">查询结果：</td>
        <td  colspan="3">
          <el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag>
        </td>
        <td width="15%">查询单号：</td>
        <td  colspan="3">{{result.orderNo}}</td>
      </tr>
      <tr class="text-left">
        <td width="15%">姓名：</td>
        <td  colspan="3">{{result.name | handleName}}</td>
        <td width="15%">身份证号码：</td>
        <td  colspan="3">{{result.idCard |handleIdCard}}</td>
      </tr>
      <tr>
         <td width="15%">手机号:</td>
        <td  colspan="3">{{result.mobile | handleMobile}}</td>
      </tr>
    </table>
    <el-card id="resultTable" class="resultTable-top">
    <div class="black-box">
     <table class="table card-text">
       <tr>
         <td colspan="2">
           <el-tag>
                综合风险概述
           </el-tag>
          </td>
       </tr>
       <tr v-for="list in totalCounts" :key="list.blackType">
        <td>{{list.blackType | blackTypefilters}}</td>
        <td>{{list.blackCount | blackCountfilters}}</td>
      </tr>
    </table>
  </div>
  <div class="black-body">
 <table class="table card-text">
   <tr>
         <td colspan="2">
           <el-tag>
                明细
           </el-tag>
          </td>
       </tr>
   <tr>
     <td v-for="list in resultArr" :key="list.label">{{list.label}}</td>
   </tr>
   <tr v-for="(key,i) in Reference" :key="i">
     <td v-for="(j,index) in resultArr" :key="index">{{key[j.prop]|Refer}}</td>
   </tr>
 </table>
</div>
</el-card>

</el-card>
</div>
</template>
<style scoped lang="scss">
.resultTable-top {
  margin-top: 15px;
}
.black-box {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  td {
    width: 50%;
    text-align: left;
     font-size: 13px;
  }
}
.black-body {
   padding: 5px;
  td {
    font-size: 13px;
  }
}
</style>

<script>
export default {
  name: "PersonalRiskInfo",
  components: {},
  data () {
    return {
      inputFrom: {
        name: "",
        bankCardNo: "",
        idCard: "",
        mobile: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        bankCardNo: [
          { validator: this.$validator.bankCardValidator, trigger: "blur" }
        ],
        idCard: [
          { validator: this.$validator.idCardValidator, trigger: "blur" }
        ],
        mobile: [
          { validator: this.$validator.mobileValidator, trigger: "blur" }
        ]
      },
      totalCounts: [
        {
          blackType: "A",
          blackCount: 0
        },
        {
          blackType: "B",
          blackCount: 2
        },
        {
          blackType: "C",
          blackCount: 1
        },
        {
          blackType: "D",
          blackCount: 0
        },
        {
          blackType: "E",
          blackCount: 0
        }
      ],
      result: {
        example: true,
        resultType: "0000",
        name: "吴磊",
        idCard: "320281199606286770",
        orderNo: "201811142311039474356",
        mobile: '15169693586'
        
      },
      resultArr: [
        { label: "所属风险类型", prop: "blackRiskType" },
        { label: "所属事实类型", prop: "blackFactsType" },
        { label: "命中事件", prop: "blackFacts" },
        { label: "实际金额", prop: "blackAmt" },
        { label: "发生日期", prop: "blackHappenDate" },
        { label: "持续时长(天)", prop: "blackDurationTime" },
        { label: "信息来源", prop: "blackPublishSource" }
      ],
      Reference: []
    };
  },
  methods: {
    update () {
      let testjson = [
        {
          blackRiskType: "信款逾期",
          blackFactsType: "贷款不良(逾期90天以上未还)",
          blackFacts: "身份证命中信贷逾期名单",
          blackAmt: "1000,5000",
          blackHappenDate: "2017-03",
          blackDurationTime: "(90,180]",
          blackPublishSource: " "
        },
        {
          blackRiskType: "信款逾期",
          blackFactsType: "短时逾期",
          blackFacts: "通过身份证号查得该用户非银(含全部非银类型)短期逾期",
          blackAmt: " ",
          blackHappenDate: " ",
          blackDurationTime: " ",
          blackPublishSource: " "
        },
        {
          blackRiskType: "法院失信",
          blackFactsType: "被执行人",
          blackFacts: "(2018)苏0812执03267号，执行中",
          blackAmt: "355645",
          blackHappenDate: "2018-09-20",
          blackDurationTime: " ",
          blackPublishSource: "淮安市清江浦区人民法院"
        }
      ];

      for (let i = 0; i < testjson.length; i++) {
        let tr = this.getDataRow();
        tr.blackRiskType = testjson[i].blackRiskType;
        tr.blackFactsType = testjson[i].blackFactsType;
        tr.blackFacts = testjson[i].blackFacts;
        tr.blackAmt = testjson[i].blackAmt;
        tr.blackHappenDate = testjson[i].blackHappenDate;
        tr.blackDurationTime = testjson[i].blackDurationTime;
        tr.blackPublishSource = testjson[i].blackPublishSource;
        this.Reference.push(tr);
      }
    },
    getDataRow () {
      return {
        blackRiskType: "",
        blackFactsType: "",
        blackFacts: "",
        blackAmt: "",
        blackHappenDate: "",
        blackDurationTime: "",
        blackPublishSource: ""
      };
    },
    onSubmit: function () {
      var vm = this;
      vm.$refs["inputFrom"].validate(valid => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.2)"
          });
          vm.$http
            .get("api/rip/personalRiskInformation", {
              params: vm.inputFrom,
              headers: {
                authorization: vm.$db.get("authorization")
              }
            })
            .then(function (res) {
              vm.totalCount = [];
              vm.Reference = [];
              if (res.status == 200 && res.data.rc == "0000") {
                vm.result = {
                  result: false,
                  resultType: res.data.rc,
                  name: vm.inputFrom.name,
                  idCard: vm.inputFrom.idCard,
                  mobile: vm.inputFrom.mobile,
                  orderNo: res.data.orderNo
                };
                vm.totalCounts = res.data.data.totalCounts;
                vm.Reference = res.data.data.list;
              } else {
                vm.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error",
                  duration: "5000"
                });
              }
              loading.close();
            });
        }
      });
    }
  },
  mounted () {
    this.update();
  }
};
</script>
