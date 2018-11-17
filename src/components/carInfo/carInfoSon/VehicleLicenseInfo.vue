<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>行驶证信息查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
         <el-col :span="5">
            <el-form-item label="车牌号" label-width="0" prop="plateNumber" class="form-item">
              <el-input v-model="inputFrom.plateNumber"></el-input>
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
          <td>号牌种类</td>
          <td>{{result.plateType}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr class="text-left">
          <td>品牌名称</td>
          <td>{{result.brandName}}</td>
          <td>车身颜色</td>
          <td>{{result.bodyColor}}</td>
        </tr>
        <tr class="text-left">
          <td>使用性质</td>
          <td>{{result.useType}}</td>
          <td>车牌型号</td>
          <td>{{result.vehicleModelc}}</td>
        </tr>
        <tr class="text-left">
          <td>车辆类型</td>
          <td>{{result.vehicleType}}</td>
          <td>发动机号</td>
          <td>{{result.engineNumber}}</td>
        </tr>
        <tr class="text-left">
          <td>发动机型号</td>
          <td>{{result.engineModel}}</td>
          <td>车架号</td>
          <td>{{result.vin}}</td>
        </tr>
        <tr class="text-left">
          <td>初次登记日期</td>
          <td>{{result.firstIssueDate}}</td>
          <td>检验有效期止</td>
          <td>{{result.validityDayEnd}}</td>
        </tr>
        <tr class="text-left">
          <td>核定载客数</td>
          <td>{{result.passengers}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr class="text-left">
          <td>强制报废期止</td>
          <td>{{result.retirementDate}}</td>
          <td>燃料种类</td>
          <td>{{result.fuelType | handleFuelTypee}}</td>
        </tr>
        <tr class="text-left">
          <td>排量</td>
          <td>{{result.cc}}</td>
          <td>出厂日期</td>
          <td>{{result.ppsDate}}</td>
        </tr>
        <tr class="text-left">
          <td>最大功率（KW）</td>
          <td>{{result.maxJourney}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr class="text-left">
          <td>轴数</td>
          <td>{{result.shaft}}</td>
          <td>轴距</td>
          <td>{{result.wheelBase}}</td>
        </tr>
        <tr class="text-left">
          <td>前轮距</td>
          <td>{{result.frontTread}}</td>
          <td>后轮距</td>
          <td>{{result.rearTread}}</td>
        </tr>
        <tr class="text-left">
          <td>总质量</td>
          <td>{{result.crossWeight}}</td>
          <td>整备质量</td>
          <td>{{result.curbWeight}}</td>
        </tr>
        <tr class="text-left">
          <td>核定载质量</td>
          <td>{{result.loadWeight}}</td>
          <td></td>
          <td></td>
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
        plateNumber: '',
        plateType: '02'
      },
      rules: {
        plateNumber: [{ required: true, message: '请输入车牌号', trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        brandName: '北京现代',
        bodyColor: '白',
        useType: '非营运',
        vehicleModelc: 'BH****PAV',
        vehicleType: '小型轿车',
        engineNumber: 'GW6***99',
        engineModel: 'G4NB',
        vin: 'LVGB********18391',
        firstIssueDate: '2016-05-17 00:00:00',
        validityDayEnd: '2018-05-31 00:00:00',
        vehicleStatus: '正常',
        passengers: '5',
        retirementDate: '2099-12-31 00:00:00',
        fuelType: 'A',
        cc: '1797',
        ppsDate: '2016-04-27 00:00:00',
        maxJourney: '105',
        shaft: '2',
        wheelBase: '2770',
        frontTread: '1567',
        rearTread: '1577',
        crossWeight: '1860',
        curbWeight: '1441',
        loadWeight: '',
        plateType: '小型汽车',
        plateNumber: '粤 P8J665',
        pageNum: '',
        pageSize: '',
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
          vm.$http.get('api/rip/vehicleLicenseInformationHJ', {
            params: vm.inputFrom,
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.code == '200' && res.data.data) {
              if (res.data.data.resultCode == '1001') {
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
