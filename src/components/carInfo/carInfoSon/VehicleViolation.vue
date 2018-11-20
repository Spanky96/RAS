<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>车辆违章信息查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
         <el-col :span="5">
            <el-form-item label="手机号或者身份证" label-width="0" prop="partner_user_id" class="form-item">
              <el-input v-model="inputFrom.partner_user_id"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '行驶证信息查询'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td width="30%"><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
          <td width="20%"></td>
          <td></td>
        </tr>
          <tr class="text-left">
          <td>车辆状态</td>
          <td>{{result.vehicleStatus}}</td>
          <td>车牌号</td>
          <td>{{result.plateNumber}}</td>
        </tr>
        <tr class="text-left">
          <td>查询数据状态</td>
          <td>{{result.status}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'VehicleLicenseInfo',
  components: {
  },
  data () {
    return {
      inputFrom: {
        organization_type: 'PECC',
        partner_user_id: ''
      },
      rules: {
        // plateNumber: [{ required: true, message: '请输入车牌号', trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        status: '数据存在'
      }
    };
  },
  methods: {
    onSubmit: function () {
      var vm = this;
      vm.$refs['inputFrom'].validate((valid) => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)'
          });
          vm.$http.get('api/rip/vehicleViolation', {
            params: vm.inputFrom,
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.return_code == '0' && res.data.url) {
              if (res.data.data.resultCode == '1001') {
                vm.result = {
                  example: false,
                  resultType: '0000',
                  status: '查得数据'
                };
              } else if (res.data.data.resultCode == '2001') {
                vm.result = {
                  example: false,
                  resultType: '0000',
                  brandName: res.data.data.resultInfo.brandName,
                  bodyColor: res.data.data.resultInfo.bodyColor,
                  useType: res.data.data.resultInfo.useType,
                  vehicleModelc: res.data.data.resultInfo.vehicleModelc,
                  vehicleType: res.data.data.resultInfo.vehicleType,
                  engineNumber: res.data.data.resultInfo.engineNumber,
                  engineModel: res.data.data.resultInfo.engineModel,
                  vin: res.data.data.resultInfo.vin,
                  firstIssueDate: res.data.data.resultInfo.firstIssueDate,
                  validityDayEnd: res.data.data.resultInfo.validityDayEnd,
                  vehicleStatus: res.data.data.resultInfo.vehicleStatus,
                  passengers: res.data.data.resultInfo.passengers,
                  retirementDate: res.data.data.resultInfo.retirementDate,
                  fuelType: res.data.data.resultInfo.fuelType,
                  cc: res.data.data.resultInfo.cc,
                  ppsDate: res.data.data.resultInfo.ppsDate,
                  maxJourney: res.data.data.resultInfo.maxJourney,
                  shaft: res.data.data.resultInfo.shaft,
                  wheelBase: res.data.data.resultInfo.wheelBase,
                  frontTread: res.data.data.resultInfo.frontTread,
                  rearTread: res.data.data.resultInfo.rearTread,
                  crossWeight: res.data.data.resultInfo.crossWeight,
                  curbWeight: res.data.data.resultInfo.curbWeight,
                  loadWeight: res.data.data.resultInfo.loadWeight,
                  plateType: res.data.data.resultInfo.plateType,
                  plateNumber: res.data.data.resultInfo.plateNumber,
                  pageNum: res.data.pageNum,
                  pageSize: res.data.pageSize,
                  status: '未查得数据'
                };
              }
            } else {
              vm.$message({
                showClose: true,
                message: res.data.message,
                type: 'error',
                duration: '5000'
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
