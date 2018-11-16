<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>综合查询（个人）</span>
      </div>
      <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm">
        <el-row>
         <el-col :span="10" v-if="getInputSet().has('name')">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="getInputSet().has('idCard')">
            <el-form-item label="身份证" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputForm.idCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" v-if="getInputSet().has('beginDate')">
            <el-form-item label="有效期起始日期" label-width="0" prop="beginDate" class="form-item">
              <el-date-picker type="date" v-model="inputForm.beginDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="getInputSet().has('bankCardNo')">
            <el-form-item label="银行卡号" label-width="0" prop="bankCardNo" class="form-item">
              <el-input v-model="inputForm.bankCardNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col :span="10" v-if="getInputSet().has('mobile')">
            <el-form-item label="手机号码" label-width="0" prop="mobile" class="form-item">
              <el-input v-model="inputForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="getInputSet().has('AreaCode')">
            <el-form-item label="城市行政编码" label-width="0" prop="AreaCode" class="form-item">
            <el-cascader
                size="large"
                :options="options"
                change-on-select
                v-model="inputForm.AreaCode"
                >
            </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="20">
            <el-form-item label-width="0" prop="flag" label="查询类别" class="form-item" style="margin: 0px;">
              <el-checkbox-group v-model="sons">
              <el-checkbox label="sons1">身份核验</el-checkbox>
              <el-checkbox label="sons2">运营商验证</el-checkbox>
              <el-checkbox label="sons3">风险提示</el-checkbox>
              <el-checkbox label="sons4">交易信用信息</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" v-if="sons.includes('sons1')">
            <el-form-item label-width="0" prop="sourcet" class="form-item">
              <span style="margin-right:30px;">身份核验</span>
              <el-checkbox v-model="selectAll" class="select-all" name="selectAll" @change="selectAllClick()">全选</el-checkbox>
              <el-checkbox-group v-model="inputForm.sourcet">
                <el-checkbox v-for="(s, index) in sourcetArr1" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" v-if="sons.includes('sons2')">
            <el-form-item label-width="0" prop="sourcet" class="form-item">
              <span style="margin-right:30px;">运营商验证</span>
              <el-checkbox v-model="selectAll" class="select-all" name="selectAll" @change="selectAllClick()">全选</el-checkbox>
              <el-checkbox-group v-model="inputForm.sourcet">
                <el-checkbox v-for="(s, index) in sourcetArr2" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" v-if="sons.includes('sons3')">
            <el-form-item label-width="0" prop="sourcet" class="form-item">
              <span style="margin-right:30px;">身份核验</span>
              <el-checkbox v-model="selectAll" class="select-all" name="selectAll" @change="selectAllClick()">全选</el-checkbox>
              <el-checkbox-group v-model="inputForm.sourcet">
                <el-checkbox v-for="(s, index) in sourcetArr" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" v-if="sons.includes('sons4')">
            <el-form-item label-width="0" prop="sourcet" class="form-item">
              <span style="margin-right:30px;">身份核验</span>
              <el-checkbox v-model="selectAll" class="select-all" name="selectAll" @change="selectAllClick()">全选</el-checkbox>
              <el-checkbox-group v-model="inputForm.sourcet">
                <el-checkbox v-for="(s, index) in sourcetArr" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
              </el-checkbox-group>
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
          <!-- <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col> -->
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '多重借贷查询'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <!-- <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr> -->
        <!-- <tr class="text-left">
          <td width="20%">手机号码</td>
          <td>{{result.mobile | handleMobile()}}</td>
        </tr> -->
        <tr>
          <td colspan="2">
            <table class="table card-text">

              <table class="table card-text">
                <tr class="text-left">
                <td colspan="2"><el-tag>身份核验-身份证二要素</el-tag></td>
              </tr>
               <tr class="text-left">
                  <td width="20%">匹配结果</td>
                  <td><el-tag :type="result[0].success | isSuccessLogoFmt" class="tag">{{result[0].success | isConsistentFmt}}</el-tag></td>
                </tr>
                <tr class="text-left">
                  <td>姓名</td>
                  <td>{{result[0].name | handleName}}</td>
                </tr>
                <tr class="text-left">
                  <td>身份证号码</td>
                  <td>{{result[0].idNumber | handleIdCard}}</td>
                </tr>
              </table>

              <table class="table card-text">
                <tr class="text-left">
                <td colspan="2"><el-tag>身份核验-失效身份证一致性验证</el-tag></td>
              </tr>
              <tr class="text-left">
                <td width="20%">匹配结果</td>
                <td><el-tag :type="resultSuccess.logo" class="tag">{{resultSuccess.name}}</el-tag></td>
              </tr>
              <tr class="text-left">
                <td>姓名</td>
                <td>{{result[1].name | handleName}}</td>
              </tr>
              <tr class="text-left">
                <td>身份证号码</td>
                <td>{{result[1].idCard | handleIdCard}}</td>
              </tr>
              <tr class="text-left">
                <td>有效期起始日期</td>
                <td>{{result[1].beginDate}}</td>
              </tr>
              </table>

              <table class="table card-text">
                <tr class="text-left">
                <td colspan="2"><el-tag>身份核验-银行三要素</el-tag></td>
              </tr>
              <tr class="text-left">
                <td width="20%">匹配结果</td>
                <td><el-tag :type="result[2].success | isSuccessLogoFmt" class="tag">{{result[2].success | isConsistentFmt}}</el-tag></td>
              </tr>
              <tr class="text-left">
                <td>姓名</td>
                <td>{{result[2].name | handleName}}</td>
              </tr>
              <tr class="text-left">
                <td>身份证号码</td>
                <td>{{result[2].idNumber | handleIdCard}}</td>
              </tr>
              <tr class="text-left">
                <td>银行卡号</td>
                <td>{{result[2].bankCardNo | handleBankCardNo}}</td>
              </tr>
              </table>

              <table class="table card-text">
                <tr class="text-left">
                <td colspan="2"><el-tag>身份核验-银行卡四要素</el-tag></td>
              </tr>
              <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result[3].success | isSuccessLogoFmt" class="tag">{{result[3].success | isConsistentFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result[3].name | handleName}}</td>
        </tr>
        <tr class="text-left">
          <td>身份证号码</td>
          <td>{{result[3].idNumber | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td>银行卡号</td>
          <td>{{result[3].bankCardNo | handleBankCardNo}}</td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result[3].mobile | handleMobile}}</td>
        </tr>
              </table>

              <table class="table card-text">
                <tr class="text-left">
                <td colspan="2"><el-tag>身份核验-开户行查询</el-tag></td>
              </tr>
             <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result[4].success | isSuccessLogoFmt" class="tag">{{result[4].success | isSuccessFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>银行卡号</td>
          <td>{{result[4].bankCardNo | handleBankCardNo}}</td>
        </tr>
        <tr class="text-left">
          <td>开户银行</td>
          <td>{{result[4].accountBank}}</td>
        </tr>
        <tr class="text-left">
          <td>银行卡类型</td>
          <td>{{result[4].accountType}}</td>
        </tr>
              </table>

<table class="table card-text">
                <tr class="text-left">
                <td colspan="2"><el-tag>运营商验证-运营商二要素认证</el-tag></td>
              </tr>
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result[5].resultType | resultLogoFmt" class="tag">{{result[5].resultType | resultTypeFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result[5].name | handleName}}</td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result[5].mobile | handleMobile}}</td>
        </tr>
        <tr class="text-left">
          <td>手机运营商</td>
          <td>{{result[5].operator}}</td>
        </tr>
              </table>

              <table class="table card-text">
                <tr class="text-left">
                <td colspan="2"><el-tag>运营商验证-运营商三要素认证</el-tag></td>
              </tr>
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result[6].resultType | resultLogoFmt" class="tag">{{result[6].resultType | resultTypeFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result[6].name | handleName}}</td>
        </tr>
        <tr class="text-left">
          <td>手机号码</td>
          <td>{{result[6].mobile | handleMobile}}</td>
        </tr>
        <tr class="text-left">
          <td>身份证号码</td>
          <td>{{result[6].idNumber | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td>手机运营商</td>
          <td>{{result[6].operator}}</td>
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
import { provinceAndCityData, CodeToText } from "element-china-area-data";
export default {
  name: "Person",
  components: {},
  data () {
    var vm = this;
    let sons = [];
    const sourcetArr1 = [
      {
        id: 1,
        name: "身份证二要素",
        params: ["name", "idCard"],
        apiUrl: "api/rip/idCardElements",
        keyMap: {name: 'name', idNumber: 'idCard'},
        callBack: function (res, id) {
            if (res.data.code == '200') {
              if (res.data.data) {
                if (res.data.data.key == "0000") {
                  vm.result[id] = {
                    example: false,
                    success: true,
                    name: vm.inputFrom.name,
                    idNumber: vm.inputFrom.cardNo
                  };
                }
                if (res.data.data.key != "0000") {
                  vm.result[id] = {
                    example: false,
                    success: false,
                    name: vm.inputFrom.name,
                    idNumber: vm.inputFrom.cardNo
                  };
                }
              }
            }
        }
      },
      {
        id: "2",
        name: "失效身份证一致性验证",
        params: ["name", "idCard", "beginDate"],
        apiUrl: "api/rip/invalidIDConsistency",
        keyMap: {name: 'name', idCard: 'idCard'},
        callBack: function (res, id) {
            if (res.data.success && res.data.data) {
                  vm.result[id] = {
                    example: false,
                    resultType: res.data.data.compareStatus,
                    name: res.data.data.name,
                    idCard: res.data.data.identityCard,
                    beginDate: res.data.data.beginDate
                    };
            }
        }
      },
      {
        id: "3",
        name: "银行卡三要素",
        params: ["name", "idCard", "bankCardNo"],
        apiUrl: "api/rip/threeElementsOfBankCard"
      },
      {
        id: "4",
        name: "银行卡四要素",
        params: ["name", "idCard", "beginDate", "mobile"],
        apiUrl: "api/rip/bankCardFourElements"
      },
      {
        id: "5",
        name: "开户行查询",
        params: ["bankCardNo"],
        apiUrl: "api/rip/bankCardBasicInformation"
      }
    ];

    const sourcetArr2 = [
      {
        id: "1",
        name: "运营商二要素认证",
        params: ["name", "mobile"],
        apiUrl: "api/rip/operatorTwoElements"
      },
      {
        id: "2",
        name: "运营商三要素认证",
        params: ["name", "mobile", "idCard"],
        apiUrl: "api/rip/operatorThreeElements"
      },
      {
        id: "3",
        name: "运营商手机位置核验",
        params: ["mobile", "AreaCode"],
        apiUrl: "api/rip/xxxxx"
      },
      {
        id: "4",
        name: "手机在网时长",
        params: ["mobile"],
        apiUrl: "api/rip/xxxxx"
      },
      {
        id: "5",
        name: "手机在网状态",
        params: ["mobile"],
        apiUrl: "api/rip/xxxxx"
      },
      {
        id: "6",
        name: "手机消费档次",
        params: ["mobile"],
        apiUrl: "api/rip/xxxxx"
      }
    ];
    // var params = {
    //   var keys = Object.keys(item.keyMap);
    //           for(key in keys) {
    //           params[key] = vm.inputForm[keyMap[key]]
    //           }
    // };
    return {
      CodeToText,
      options: provinceAndCityData,
      sons: sons,
      sourcetArr1: sourcetArr1,
      sourcetArr2: sourcetArr2,
      selectAll: false,
      inputForm: {
        sourcet: [],
        name: "",
        idCard: "",
        mobile: "",
        bankCardNo: "",
        beginDate: "",
        AreaCode: []
      },
      setApis: new Set(),
      rules: {
        mobile: [
          { validator: this.$validator.mobileValidator, trigger: "blur" }
        ]
      },
      result: [
        {
        success: true,
        name: "赵雷",
        idNumber: "320281199606286770"
        },
        {
        resultType: "SAME",
        name: "赵雷",
        idCard: "320281199606286774",
        beginDate: "2011-06-28"
        },
        {
        success: true,
        name: "赵雷",
        idNumber: "320281199606286770",
        bankCardNo: "6228481111221432430"
        },
        {
        success: true,
        name: "赵雷",
        idNumber: "320281199606286770",
        bankCardNo: "6228481111221432430",
        mobile: "13653576763"
        },
        {
        success: true,
        bankCardNo: '6228481111221432430',
        accountBank: '中国建设银行',
        accountType: '借记卡'
        },
        {
        resultType: '0000',
        name: '赵雷',
        mobile: '13653576763',
        operator: '联通'
        },
        {
        resultType: '0000',
        name: '赵雷',
        mobile: '13653576763',
        idNumber: '320281199606286770',
        operator: '联通'
        }
      ]
    };
  },
  methods: {
    selectAllClick: function () {
      if (this.selectAll) {
        this.inputForm.sourcet = this.sourcetArr.map(n => n.id);
      } else {
        this.inputForm.sourcet = [];
      }
    },
    getInputSet: function () {
      var vm = this;
      var set = new Set();
      vm.inputForm.sourcet.forEach(element => {
        vm.setApis.add(element);
        element.params.forEach(e2 => {
          set.add(e2);
        });
      });
      return set;
    },
    onSubmit: function () {
      var vm = this;
      const loading = vm.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      });
      // console.log(vm.setApis);
      vm.setApis.forEach(item => {
        // console.log(item);
        vm.$refs["inputForm"].validate(valid => {
        if (valid) {
          vm.$http.get(item.apiUrl, {
            params: vm.handleParams(vm.inputForm, item.keyMap),
            headers: {
              authorization: vm.$db.get('authorization')
            }}).then(function (res) {
              item.callBack(res, item.id);
          });
        }
      });
      loading.close();
      });
      // vm.$refs["inputForm"].validate(valid => {
      //   if (valid) {
      //     vm.$http.get('api/rip/multipleLoanQuery', {
      //       params: vm.inputForm,
      //       headers: {
      //         authorization: vm.$db.get('authorization')
      //       }}).then(function (res) {
      //         if (res.data.success) {
      //           vm.result.mobile = res.data.data.phone;
      //           vm.result.creditPlatformRegistrationDetails = res.data.data.creditPlatformRegistrationDetails;
      //           vm.result.loanApplicationDetails = res.data.data.loanApplicationDetails;
      //           vm.result.loanDetails = res.data.data.loanDetails;
      //           vm.result.loanRejectDetails = res.data.data.loanRejectDetails;
      //           vm.result.overduePlatformDetails = res.data.data.overduePlatformDetails;
      //           vm.result.arrearsInquiry = res.data.data.arrearsInquiry;
      //           vm.result.example = false;
      //         } else {
      //           vm.$message({
      //             showClose: true,
      //             message: res.data.errorDesc,
      //             type: 'error',
      //             duration: '5000'
      //           });
      //         }
      //         loading.close();
      //     });
      //   }
      // });
    },
    dataTypeChange (val) {
      if (val == "SXGG") {
        return "失信公告";
      } else if (val == "ZXGG") {
        return "执行公告";
      } else if (val == "CPWS") {
        return "裁判文书";
      } else if (val == "KTGG") {
        return "开庭公告";
      } else if (val == "FYGG") {
        return "法院公告";
      } else if (val == "WDHMD") {
        return "网贷黑名单";
      } else if (val == "AJLC") {
        return "案件流程";
      } else if (val == "BGT") {
        return "曝光台";
      } else {
        return "未知";
      }
    },
    handleParams (input, keymap) {
      /* input = {
        name:1,
        idCard:2
      }
      keymap = {
        name: 'name',
        idCard: 'idNumber'  
      }
      result:
      idNumber: input.idCard 
      */
     var result = {};
      var keys = Object.keys(keymap);
        for (var key in keys) {
          result[key] = input[keymap[key]];
        }
    }
  },
  computed: {
    resultSuccess: function () {
      if (this.result[1].resultType == "SAME") {
        return { name: "一致", logo: "success" };
      }
      if (this.result[1].resultType == "DIFFERENT") {
        return { name: "不一致", logo: "danger" };
      }
      if (this.result[1].resultType == "NO_DATA") {
        return { name: "无数据", logo: "info" };
      }
    }
  }
};
</script>
