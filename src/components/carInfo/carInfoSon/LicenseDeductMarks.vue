<template>
  <div>
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>驾照扣分查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="驾驶证号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputFrom.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="档案编号" label-width="0" prop="fileNO" class="form-item">
              <el-input v-model="inputFrom.fileNO"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="省份及城市" label-width="0" prop="province" class="form-item">
             <el-cascader
              placeholder="请选择"
              :options="options"
              v-model="inputFrom.province"
              @change="handleChange">
            </el-cascader>
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
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '驾照扣分查询'})">打印</el-button></el-col>
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
          <td>驾驶证号码</td>
          <td>{{result.idCard}}</td>
          <td>档案编号</td>
          <td>{{result.fileNO}}</td>
        </tr>
        <tr class="text-left">
          <td>省份及城市</td>
          <td>{{result.province}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr class="text-left">
          <td>分数</td>
          <td>{{result.marks}}</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'LicenseDeductMarks',
  components: {
  },
  data () {
    return {
      options: [{
        value: '北京',
        label: '北京',
        children: [{
            value: '北京',
            label: '北京'
          }]
      }, {
        value: '天津',
        label: '天津',
        children: [{
            value: '天津',
            label: '天津'
          }]
      }, {
        value: '上海',
        label: '上海',
        children: [{
            value: '上海',
            label: '上海'
          }]
      }, {
        value: '重庆',
        label: '重庆',
        children: [{
            value: '重庆',
            label: '重庆'
          }]
      }, {
        value: '辽宁',
        label: '辽宁',
        children: [{
            value: '辽宁',
            label: '辽宁'
          }]
      }, {
        value: '吉林',
        label: '吉林',
        children: [{
            value: '吉林',
            label: '吉林'
          }]
      }, {
        value: '黑龙江',
        label: '黑龙江',
        children: [{
            value: '黑龙江',
            label: '黑龙江'
          }]
      }, {
        value: '河北',
        label: '河北',
        children: [{
            value: '河北',
            label: '河北'
          }]
      }, {
        value: '山西',
        label: '山西',
        children: [{
            value: '山西',
            label: '山西'
          }]
      }, {
        value: '陕西',
        label: '陕西',
        children: [{
            value: '陕西',
            label: '陕西'
          }]
      }, {
        value: '山东',
        label: '山东',
        children: [{
            value: '山东',
            label: '山东'
          }]
      }, {
        value: '江苏',
        label: '江苏',
        children: [{
            value: '徐州',
            label: '徐州'
          }, {
            value: '连云港',
            label: '连云港'
          }, {
            value: '宿迁',
            label: '宿迁'
          }, {
            value: '盐城',
            label: '盐城'
          }, {
            value: '淮安',
            label: '淮安'
          }, {
            value: '扬州',
            label: '扬州'
          }, {
            value: '泰州',
            label: '泰州'
          }, {
            value: '南通',
            label: '南通'
          }, {
            value: '镇江',
            label: '镇江'
          }, {
            value: '南京',
            label: '南京'
          }, {
            value: '常州',
            label: '常州'
          }, {
            value: '无锡',
            label: '无锡'
          }, {
            value: '苏州',
            label: '苏州'
          }]
      }, {
        value: '浙江',
        label: '浙江',
        children: [{
            value: '湖州',
            label: '湖州'
          }, {
            value: '嘉兴',
            label: '嘉兴'
          }, {
            value: '杭州',
            label: '杭州'
          }, {
            value: '绍兴',
            label: '绍兴'
          }, {
            value: '宁波',
            label: '宁波'
          }, {
            value: '舟山',
            label: '舟山'
          }, {
            value: '金华',
            label: '金华'
          }, {
            value: '衢州',
            label: '衢州'
          }, {
            value: '丽水',
            label: '丽水'
          }, {
            value: '台州',
            label: '台州'
          }, {
            value: '温州',
            label: '温州'
          }]
      }, {
        value: '安徽',
        label: '安徽',
        children: [{
            value: '安徽',
            label: '安徽'
          }]
      }, {
        value: '河南',
        label: '河南',
        children: [{
            value: '河南',
            label: '河南'
          }]
      }, {
        value: '湖北',
        label: '湖北',
        children: [{
            value: '湖北',
            label: '湖北'
          }]
      }, {
        value: '湖南',
        label: '湖南',
        children: [{
            value: '湖南',
            label: '湖南'
          }]
      }, {
        value: '江西',
        label: '江西',
        children: [{
            value: '江西',
            label: '江西'
          }]
      }, {
        value: '福建',
        label: '福建',
        children: [{
            value: '福建',
            label: '福建'
          }]
      }, {
        value: '福建',
        label: '云南',
        children: [{
            value: '云南',
            label: '云南'
          }]
      }, {
        value: '海南',
        label: '海南',
        children: [{
            value: '海南',
            label: '海南'
          }]
      }, {
        value: '四川',
        label: '四川',
        children: [{
            value: '四川',
            label: '四川'
          }]
      }, {
        value: '贵州',
        label: '贵州',
        children: [{
            value: '贵州',
            label: '贵州'
          }]
      }, {
        value: '广东',
        label: '广东',
        children: [{
            value: '广东',
            label: '广东'
          }]
      }, {
        value: '甘肃',
        label: '甘肃',
        children: [{
            value: '甘肃',
            label: '甘肃'
          }]
      }, {
        value: '青海',
        label: '青海',
        children: [{
            value: '青海',
            label: '青海'
          }]
      }, {
        value: '西藏',
        label: '西藏',
        children: [{
            value: '西藏',
            label: '西藏'
          }]
      }, {
        value: '新疆',
        label: '新疆',
        children: [{
            value: '新疆',
            label: '新疆'
          }]
      }, {
        value: '广西',
        label: '广西',
        children: [{
            value: '广西',
            label: '广西'
          }]
      }, {
        value: '内蒙古',
        label: '内蒙古',
        children: [{
            value: '内蒙古',
            label: '内蒙古'
          }]
      }, {
        value: '宁夏',
        label: '宁夏',
        children: [{
            value: '宁夏',
            label: '宁夏'
          }]
      }, {
        value: '甘肃',
        label: '甘肃',
        children: [{
            value: '甘肃',
            label: '甘肃'
          }]
      }],
      inputFrom: {
        idCard: '',
        fileNO: '',
        province: ''
      },
      rules: {
        idCard: [{ required: true, message: '请输入驾驶证号码', trigger: 'blur' }],
        fileNO: [{ required: true, message: '请输入档案编号', trigger: 'blur' }],
        province: [{ required: true, message: '请输入省份及城市', trigger: 'blur' }]
      },
      result: {
        example: true,
        resultType: '0000',
        idCard: '43214321421',
        fileNO: '43214321',
        province: '北京',
        marks: '10',
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
          vm.$http.get('api/rip/drivingLicensedeductMarksQuery', {
            params: {
              idCard: vm.inputFrom.idCard,
              fileNO: vm.inputFrom.fileNO,
              province: vm.inputFrom.province[1]
            },
            headers: {
              authorization: vm.$db.get('authorization')
            }
            }).then(function (res) {
            if (res.data.success && res.data.data) {
              if (res.data.data.status == 'SUCCESS') {
                vm.result = {
                  example: false,
                  resultType: '0000',
                  idCard: res.data.data.idCard,
                  fileNO: res.data.data.fileNO,
                  province: res.data.data.province,
                  marks: res.data.data.result,
                  status: '查得数据'
                };
              } else if (res.data.data.status == 'FAIL') {
                vm.result = {
                  example: false,
                  resultType: '0000',
                  idCard: res.data.data.idCard,
                  fileNO: res.data.data.fileNO,
                  province: res.data.data.province,
                  marks: res.data.data.result,
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
