<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>通行证一致性验证</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputFrom.name" placeholder="必填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="出生日期" label-width="0" prop="birthday" class="form-item" >
                  <el-col :span="24">
                     <el-date-picker type="date" placeholder="选择日期" v-model="inputFrom.birthday"  format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" style="width: 100%;"></el-date-picker>
                  </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="通行证号码" label-width="0" prop="idNumber" class="form-item">
              <el-input v-model="inputFrom.idNumber" placeholder="必填"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" class="juzhon">
              <el-form-item label="证件有效期截止日期">
                  <el-col :span="24">
                     <el-date-picker type="date" placeholder="选择日期" v-model="inputFrom.expiryDate"  format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" style="width: 100%;"></el-date-picker>
                  </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="9" class="juzhon">
            <el-form-item label="证件标识">
              <el-select v-model="inputFrom.mark" placeholder="请选择证件标识">
                 <el-option label="港澳" value="1"></el-option>
                 <el-option label="台湾" value="2"></el-option>
               </el-select>
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
          <td>{{result.name}}</td>
          <td>通行证号码</td>
          <td>{{result.idNumber}}</td>
        </tr>
        <tr class="text-left">
          <td>出生日期</td>
          <td> {{result.birthday}}</td>
          <td>证件有效期截止日期</td>
          <td>{{result.expiryDate}}</td>
        </tr>
        <tr class="text-left">
          <td>比对结果</td>
          <td>{{result.compareStatus}}</td>
          <td>结果说明</td>
          <td><el-tag v-if='result.compareStatusDesc' :type="result.genderCompared | tagtype" class="tag">{{result.compareStatusDesc}}</el-tag></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PassCheck",
  components: {},
  data () {
    return {
      inputFrom: {
        name: "",
        idNumber: "",
        birthday: "",
        expiryDate: "",
        mark: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idNumber: [
          {
            required: true,
            validator: this.$validator.PassCheck,
            trigger: "blur"
          }
        ],
        birthday: [
          {
            required: true,
            validator: this.$validator.tesTing,
            trigger: "blur"
          }
        ]
      },
      result: {
        example: true,
        success: true,
        name: "赵雷",
        idNumber: "XXX",
        birthday: "XXX",
        expiryDate: "XXX",
        compareStatus: "SAME",
        compareStatusDesc: "一致"
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
            .get("api/rip/passConsistencyVerification", {
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
