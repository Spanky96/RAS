<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>户籍信息验证</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name" placeholder="必填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputFrom.idCard" placeholder="必填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="所属省市县（区）" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.belong" placeholder="选填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="住址" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.address" placeholder="选填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="曾用名" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.preName" placeholder="选填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" class="juzhon">
            <el-form-item label="性别">
              <el-select v-model="inputFrom.gender" placeholder="请选择性别">
                 <el-option label="男" value="1"></el-option>
                 <el-option label="女" value="2"></el-option>
               </el-select>
             </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="民族" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.nation" placeholder="选填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" class="juzhon">
              <el-form-item label="婚姻状况">
              <el-select v-model="inputFrom.marriage" placeholder="请选择婚姻状况">
                 <el-option label="未婚" value="1"></el-option>
                 <el-option label="已婚(初婚,再婚,复婚)" value="2"></el-option>
                 <el-option label="离异" value="3"></el-option>
                 <el-option label="丧偶" value="4"></el-option>
               </el-select>
             </el-form-item>
          </el-col>
          <el-col :span="9" class="juzhon">
              <el-form-item label="出生日期">
                  <el-col :span="24">
                     <el-date-picker type="date" placeholder="选择日期" v-model="inputFrom.birthday" style="width: 100%;"></el-date-picker>
                  </el-col>
            </el-form-item>
          </el-col>
          <el-col  class="juzhon" :span="10">
            <el-form-item label="出生地省市县（区）" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.birthCity" placeholder="选填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="服务处所" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.service" placeholder="选填"></el-input>
            </el-form-item>
          </el-col>
           <el-col  :span="9" class="juzhon">
              <el-form-item label="文化程度">
              <el-select v-model="inputFrom.eduction" placeholder="请选择文化程度">
                 <el-option label="研究生(研究生及以上)" value="1"></el-option>
                 <el-option label="本科" value="2"></el-option>
                 <el-option label="专科" value="3"></el-option>
                 <el-option label="高中(中专)" value="4"></el-option>
                 <el-option label="初中" value="5"></el-option>
                 <el-option label="小学" value="6"></el-option>
               </el-select>
             </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="籍贯省市县（区）" label-width="0" prop="cardNo" class="form-item">
              <el-input v-model="inputFrom.nativeCity" placeholder="选填"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '身份证一致性验证'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <td><el-tag :type="result.success | isSuccessLogoFmt" class="tag">{{result.success | isConsistentFmt}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>姓名</td>
          <td>{{result.name | handleName}}</td>
          <td>身份证号码</td>
          <td>{{result.identityCard | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td>身份一致性</td>
          <td> <el-tag v-if='result.compareStatus' :type="result.compareStatus | tagtype" class="tag">{{result.compareStatus}}</el-tag></td>
          <td>身份一致性说明</td>
          <td><el-tag v-if='result.compareStatusDesc' :type="result.compareStatusDesc | tagtype" class="tag">{{result.compareStatusDesc}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>曾用名比对结果</td>
          <td><el-tag v-if='result.preNameCompared' :type="result.preNameCompared | tagtype" class="tag">{{result.preNameCompared}}</el-tag></td>
          <td>性别比对结果</td>
          <td><el-tag v-if='result.genderCompared' :type="result.genderCompared | tagtype" class="tag">{{result.genderCompared}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>民族比对结果</td>
          <td><el-tag v-if='result.nationCompared' :type="result.nationCompared | tagtype" class="tag">{{result.nationCompared}}</el-tag></td>
          <td>出生日期比对结果</td>
          <td><el-tag v-if='result.birthdayCompared' :type="result.birthdayCompared | tagtype" class="tag">{{result.birthdayCompared}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>文化程度比对结果</td>
          <td>{{result.eductionCompared}}</td>
          <td>婚姻状况比对结果</td>
          <td><el-tag v-if='result.marriageCompared' :type="result.marriageCompared | tagtype" class="tag">{{result.marriageCompared}}</el-tag></td>
        </tr>
        <tr class="text-left">
          <td>服务处所比对结果</td>
          <td><el-tag v-if='result.serviceCompared' :type="result.serviceCompared | tagtype" class="tag">{{result.serviceCompared}}</el-tag></td>
          <td>出生地省市县（区）</td>
          <td>{{result.birthCityCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>籍贯省市县（区）</td>
          <td>{{result.nativeCityCompared}}</td>
          <td>所属省市县（区）</td>
          <td>{{result.belongCompared}}</td>
        </tr>
        <tr class="text-left">
          <td>住址比对结果</td>
          <td><el-tag v-if='result.addressCompared' :type="result.addressCompared | tagtype" class="tag">{{result.addressCompared}}</el-tag></td>
          <td></td>
          <td></td>
        </tr>        
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data () {
    return {
      inputFrom: {
        name: "",
        idCard: "",
        belong: "",
        address: "",
        preName: "",
        gender: "",
        nation: "",
        birthday: "",
        eduction: "",
        marriage: "",
        service: "",
        birthCity: "",
        nativeCity: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [
          {
            required: true,
            validator: this.$validator.idCardValidator,
            trigger: "blur"
          }
        ]
      },
      result: {
        example: true,
        success: true,
        name: "赵雷",
        identityCard: "320281199606286770",
        compareStatus: "SAME",
        compareStatusDesc: "无数据",
        preNameCompared: "一致",
        genderCompared: "此项无记录",
        nationCompared: "一致",
        birthdayCompared: "一致",
        eductionCompared: "不一致（低于库中级别）",
        marriageCompared: "一致",
        serviceCompared: "不一致",
        birthCityCompared: "省一致/市一致/县（区）一致",
        nativeCityCompared: "省一致/市一致/县（区）一致",
        belongCompared: "省一致/市一致/县（区）一致",
        addressCompared: "不一致",
        photo: "XXX"
      }
    };
  },
  methods: {
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
            .get("api/rip/censusRegisterMessage", {
              params: vm.inputFrom,
              headers: {
                authorization: vm.$db.get("authorization")
              }
            })
            .then(function (res) {
                if (res.data.success) {
                  if (res.data.data != " ") {
                   vm.result = res.data.data;
                   vm.result.example = false;
                   vm.result.success = true;
                  }
                } else {
                  vm.$message({
                    showClose: true,
                    message: res.data.errorDesc,
                    type: "error",
                    duration: "5000"
                  });
                }
              loading.close();
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.juzhon {
  margin-left: 2.16667%;
  .el-select {
    display: block;
  }
}
</style>
