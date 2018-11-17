<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>车辆详情核验</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
        <el-col :span="3">
        <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
            <el-input v-model="inputFrom.name"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="5">
        <el-form-item label="车牌号" label-width="0" prop="licensePlate" class="form-item">
            <el-input v-model="inputFrom.licensePlate"></el-input>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '车辆详情核验'})">打印</el-button></el-col>
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
          <td>拥有人</td>
          <td>{{result.owner | handleName}}</td>
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
          <td>车辆型号</td>
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
        name: '',
        licensePlate: '',
        licensePlateType: '02'
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        licensePlate: [{ required: true, message: '请输入车牌号', trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        owner: '*某',
        brandName: '北京现代',
        bodyColor: '白',
        useType: '非营运',
        vehicleType: '小型轿车',
        vehicleModelc: '',
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
          vm.$http.get('api/rip/vehicleDetailsEnquiry', {
            params: vm.inputFrom,
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.success && res.data.data) {
              if (res.data.data.status == 'EXIST') {
                vm.result = {
                  example: false,
                  resultType: '0000',
                  owner: res.data.data.owner,
                  brandName: res.data.data.brands,
                  bodyColor: res.data.data.vehicleColor,
                  useType: res.data.data.usingCharacter,
                  vehicleModelc: res.data.data.vehicleModel,
                  vehicleType: res.data.data.vehicleType,
                  engineNumber: res.data.data.engineNo,
                  engineModel: res.data.data.engineType,
                  vin: res.data.data.VIN,
                  firstIssueDate: res.data.data.registerDate,
                  validityDayEnd: res.data.data.validTo,
                  vehicleStatus: res.data.data.vehicleStatus,
                  passengers: res.data.data.passengersVerification,
                  retirementDate: res.data.data.scrapTo,
                  fuelType: res.data.data.fuelType,
                  cc: res.data.data.emissions,
                  ppsDate: res.data.data.productionDate,
                  maxJourney: res.data.data.maximumPower,
                  shaft: res.data.data.numberAxles,
                  wheelBase: res.data.data.wheelBase,
                  frontTread: res.data.data.frontTread,
                  rearTread: res.data.data.rearTread,
                  crossWeight: res.data.data.totalMass,
                  curbWeight: res.data.data.voidWeight,
                  plateType: res.data.data.licensePlateType,
                  plateNumber: res.data.data.licensePlate,
                  status: '查得数据'
                };
              } else if (res.data.data.status == 'NO_DATA') {
                vm.result = {
                  example: false,
                  resultType: '0000',
                  owner: res.data.data.owner,
                  brandName: res.data.data.brands,
                  bodyColor: res.data.data.vehicleColor,
                  useType: res.data.data.usingCharacter,
                  vehicleModelc: res.data.data.vehicleModel,
                  vehicleType: res.data.data.vehicleType,
                  engineNumber: res.data.data.engineNo,
                  engineModel: res.data.data.engineType,
                  vin: res.data.data.VIN,
                  firstIssueDate: res.data.data.registerDate,
                  validityDayEnd: res.data.data.validTo,
                  vehicleStatus: res.data.data.vehicleStatus,
                  passengers: res.data.data.passengersVerification,
                  retirementDate: res.data.data.scrapTo,
                  fuelType: res.data.data.fuelType,
                  cc: res.data.data.emissions,
                  ppsDate: res.data.data.productionDate,
                  maxJourney: res.data.data.maximumPower,
                  shaft: res.data.data.numberAxles,
                  wheelBase: res.data.data.wheelBase,
                  frontTread: res.data.data.frontTread,
                  rearTread: res.data.data.rearTread,
                  crossWeight: res.data.data.totalMass,
                  curbWeight: res.data.data.voidWeight,
                  plateType: res.data.data.licensePlateType,
                  plateNumber: res.data.data.licensePlate,
                  status: '未查得数据'
                };
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
    }
  }
};
</script>
