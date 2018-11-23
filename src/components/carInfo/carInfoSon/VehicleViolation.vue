<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>车辆违章信息查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="车牌号" label-width="0" prop="plateNumber" class="form-item">
              <el-input v-model="inputFrom.plateNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="车架号" label-width="0" prop="vin" class="form-item">
              <el-input v-model="inputFrom.vin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发动机号" label-width="0" prop="engineNo" class="form-item">
              <el-input v-model="inputFrom.engineNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="车辆类型" label-width="0" class="form-item">
              <el-select v-model="inputFrom.carType" placeholder="请选择车辆类型">
                <el-option label="大车" value="01"></el-option>
                <el-option label="小车" value="02"></el-option>
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
          <el-col :span="2" class="no-print">
            <el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '行驶证信息查询'})">打印</el-button>
          </el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td width="30%">
            <el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag>
          </td>
        </tr>
        <tr class="text-left">
          <td>未处理违章总扣分</td>
          <td>{{result.data.totalPoints}}</td>
          <td>未处理违章条数</td>
          <td>{{result.data.untreated}}</td>
        </tr>
        <tr class="text-left">
          <td>未处理违章总罚款</td>
          <td>{{result.data.totalFine}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4">
            <table class="table card-text">
              <tr>
                <td>违章编码</td>
                <td>违章时间</td>
                <td>罚款金额</td>
                <td>违章地址</td>
                <td>违章处理原因</td>
                <td>违章扣分</td>
                <td>违章发生城市</td>
                <td>省份</td>
                <td>城市</td>
                <td>违章官方编码</td>
                <td>违章缴费状态</td>
              </tr>
              <tr v-for="rest in result.data.violations" :key="rest.code">
                <td>{{rest.code}}</td>
                <td>{{rest.time}}</td>
                <td>{{rest.fine}}</td>
                <td>{{rest.address}}</td>
                <td>{{rest.reason}}</td>
                <td>{{rest.point}}</td>
                <td>{{rest.violationCity}}</td>
                <td>{{rest.province}}</td>
                <td>{{rest.city}}</td>
                <td>{{rest.violationNum}}</td>
                <td>{{filter(rest.paymentStatus)}}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>违章总条数</td>
          <td colspan="4">{{result.data.amount}}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
export default {
    name: "VehicleLicenseInfo",
    components: {},
    data () {
        return {
            inputFrom: {
                plateNumber: "",
                vin: "",
                engineNo: "",
                carType: "02"
            },
            rules: {
                plateNumber: [
                    { required: true, message: "请输入车牌号", trigger: "blur" }
                ],
                vin: [
                    { required: true, message: "请输入车架号", trigger: "blur" }
                ],
                engineNo: [
                    {
                        required: true,
                        message: "请输入发动机号",
                        trigger: "blur"
                    }
                ]
            },
            result: {
                example: true,
                resultType: '0000',
                success: true,
                data: {
                    token: "8045402120367843",
                    totalFine: "200",
                    totalPoints: 6,
                    untreated: 1,
                    violations: [
                        {
                            code: "1232-D1",
                            time: "2016-06-06 12:32:38",
                            fine: "200.00",
                            address: "文二西路口",
                            reason: "您在 xx 路违反了交通规则",
                            point: 6,
                            violationCity: "",
                            province: "浙江省",
                            city: "杭州市",
                            violationNum: "1019",
                            paymentStatus: 1
                        }
                    ],
                    amount: 1
                }
            }
        };
    },
    methods: {
        filter (val) {
          if (val == 1) {
            return '未缴费';
          }
          if (val == 2) {
            return '已缴';
          }
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
                        .get("api/rip/vehicleViolationEnquiry", {
                            params: {
                              jsonParam: vm.inputFrom
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            console.log(res);
                            if (res.data.success) {
                                vm.result = {
                                  example: false,
                                  resultType: '0000',
                                  data: res.data.data
                                };
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
