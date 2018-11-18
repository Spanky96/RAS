<template>
  <div id="HoneyPot">
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>综合风险高级报告</span>
      </div>
      <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm">
        <el-row>
         <el-col :span="10">
            <el-form-item label="真实姓名" label-width="0" prop="name" class="form-item">
              <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号码" label-width="0" prop="idCard" class="form-item">
              <el-input v-model="inputForm.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机号码" label-width="0" prop="phone" class="form-item">
              <el-input v-model="inputForm.phone"></el-input>
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
          <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col>
          <el-col :span="2" class="no-print"><el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '多重借贷查询'})">打印</el-button></el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
        </tr>
        <!-- 基本信息模块 -->
        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="4"><el-tag>基本信息</el-tag></td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" colspan="1">姓名 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_name | handleName}}</td>
              </tr>
              <tr>
                <td class="mytd" colspan="1">身份证号码 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_idcard | handleIdCard}}</td>
              </tr>
              <tr>
                <td class="mytd" colspan="1">年龄 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_age}}</td>
              </tr>
               <tr class="text-left resultRows">
                <td class="mytd" colspan="1">性别 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_gender}}</td>
              </tr>
              <tr>
                <td class="mytd" colspan="1">出生省份 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_province}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" colspan="1">出生城市 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_region}}</td>
              </tr>
              <tr>
                <td class="mytd" colspan="1">身份证是否有效 ：</td>
                <td class="mytd" colspan="3">{{panduanwz(result.data.user_basic.user_idcard_valid,{tru:'有效', fals:'无效'})}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" colspan="1">现居城市 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_city}}</td>
              </tr>
              <tr>
                <td class="mytd" colspan="1">手机号码 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_phone |handleMobile}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" colspan="1">运营商 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_basic.user_phone_operator}}</td>
              </tr>
              <tr>
                <td class="mytd" width="13%">手机号归属地 ：</td>
                <td class="mytd">{{result.data.user_basic.user_phone_province}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd">手机号城市 ：</td>
                <td class="mytd">{{result.data.user_basic.user_phone_city}}</td>
              </tr>
            </table>
          </td>
        </tr>
         <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="4" ><el-tag>用户注册信息情况</el-tag></td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">手机号 ：</td>
                <td class="mytd">{{result.data.user_register_orgs.phone_num |handleMobile}}</td>
                <td class="mytd"  width="25%">计数 ：</td>
                <td class="mytd">{{result.data.user_register_orgs.register_cnt}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">注册机构 ：</td>
                <td class="mytd" colspan="3">{{result.data.user_register_orgs.register_orgs.join()}}</td>
              </tr>
              <tr>
                  <td class="text-left" colspan="2" width="50%">
                     注册类型
                  </td>
                  <td class="text-left" colspan="2" width="50%">
                      统计
                  </td>
              </tr>
              <tr v-for="(ret, index) in result.data.user_register_orgs.register_orgs_statistics" :key="index">
                <td class="mytd" colspan="2">{{ret.label}}</td>
                <td class="mytd" colspan="2">{{ret.count}}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2" width="50%"><el-tag>用户被机构查询历史</el-tag></td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.data.user_searched_history_by_orgs" :key="index">
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">主动查询用户信息的机构类型  ：</td>
                <td class="mytd">{{ret.searched_org}}</td>
                <td class="mytd" width="25%">是否是本机构查询 ：</td>
                <td class="mytd">{{panduanwz(ret.org_self,{tru:'是', fals:'否'})}}</td>
              </tr>
              <tr class="text-left resultRows" >
                <td class="mytd" width="25%">查询时间  ：</td>
                <td class="mytd">{{ret.searched_date}}</td>
                <td class="mytd" width="25%"> </td>
                <td class="mytd"></td>
              </tr>
              </table>
            </table>
          </td>
        </tr>
         <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="4"><el-tag>手机号码存疑</el-tag></td>
              </tr>
              <tr>
                  <td class="text-left" colspan="4">
                      用这个手机号码绑定的其他身份证
                  </td>
              </tr>
              <tr>
                  <td class="mytd">序号</td>
                  <td class="mytd">绑定的身份证</td>
                  <td class="mytd" colspan="2">更新时间</td>
              </tr>
              <tr class="text-left resultRows" v-for="(ret, index) in result.data.user_phone_suspicion.phone_with_other_idcards" :key="index">
                <td class="mytd">{{index+1}}</td>
                <td class="mytd">{{ret.susp_idcard | handleIdCard}}</td>
                <td class="mytd" colspan="2">{{ret.susp_updt}}</td>
              </tr>
               <tr>
                  <td class="text-left" colspan="4">
                      用这个手机号码绑定的其他姓名
                  </td>
              </tr>
              <tr>
                  <td class="mytd">序号</td>
                  <td class="mytd">绑定姓名</td>
                  <td class="mytd" colspan="2">更新时间</td>
              </tr>
              <tr class="text-left resultRows" v-for="(ret, index) in result.data.user_phone_suspicion.phone_with_other_names" :key="ret.susp_name">
                <td class="mytd">{{index+1}}</td>
                <td class="mytd">{{ret.susp_name | handleName}}</td>
                <td class="mytd">{{ret.susp_updt}}</td>
              </tr>
              <tr>
                  <td class="text-left" colspan="4">
                      电话号码在那些类型的机构中使用过 
                  </td>
              </tr>
              <tr>
                  <td class="mytd">序号</td>
                  <td class="mytd">机构所属分类</td>
                  <td class="mytd" colspan="2">更新时间</td>
              </tr>
              <tr class="text-left resultRows" v-for="(ret, index) in result.data.user_phone_suspicion.phone_applied_in_orgs" :key="ret.susp_org_type">
                <td class="mytd">{{index+1}}</td>
                <td class="mytd">{{ret.susp_org_type}}</td>
                <td class="mytd">{{ret.susp_updt}}</td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- 黑名单信息 -->
         <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="5" ><el-tag>黑名单信息</el-tag></td>
              </tr>
              <tr>
                <td class="mytd" colspan="2">身份证和姓名是否在黑名单 ：</td>
                <td class="mytd">{{panduanwz(result.data.user_blacklist.blacklist_name_with_idcard,{tru:'是', fals:'否'})}}</td>
                <td class="mytd" width="25%">更新时间 ：</td>
                <td class="mytd">{{result.data.user_blacklist.blacklist_update_time_name_idcard}}</td>
              </tr>
              <tr>
                <td class="mytd" colspan="2">手机号和姓名是否在黑名单 ：</td>
                <td class="mytd">{{panduanwz(result.data.user_blacklist.blacklist_name_with_phone,{tru:'是', fals:'否'})}}</td>
                <td class="mytd" width="25%">更新时间 ：</td>
                <td class="mytd">{{result.data.user_blacklist.blacklist_update_time_name_phone}}</td>
              </tr>
              <tr>
                  <td class="text-left" colspan="5">
                      黑名单详情
                  </td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd">黑名单类型</td>
                <td class="mytd"  v-for="(ret, index) in result.data.user_blacklist.blacklist_details" :key="index" >{{ret.details_key}}</td>
              </tr>
              <tr>
                  <td class="mytd">{{result.data.user_blacklist.blacklist_category.join()}}</td>
                  <td class="mytd" v-for="(ret, index) in result.data.user_blacklist.blacklist_details" :key="index" >{{ret.details_value}}</td>
              </tr>
            </table>
          </td>
         </tr>
         <tr>
          <td colspan="4">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2"><el-tag>灰度分数据</el-tag></td>
              </tr>
              <table class="table card-text">
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">手机号 ：</td>
                <td class="mytd">{{result.data.user_gray.user_phone |handleMobile}}</td>
                <td class="mytd" width="25%">直接联系人在黑名单的数量 ：</td>
                <td class="mytd">{{result.data.user_gray.contacts_class1_blacklist_cnt}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">间接联系人在黑名单的数量 ：</td>
                <td class="mytd">{{result.data.user_gray.contacts_class2_blacklist_cnt}}</td>
                <td class="mytd" width="25%">灰度分 ：</td>
                <td class="mytd">{{result.data.user_gray.phone_gray_score}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">一阶联系人总数 ：</td>
                <td class="mytd">{{result.data.user_gray.contacts_class1_cnt}}</td>
                <td class="mytd" width="25%">引起二阶黑名单人数 ：</td>
                <td class="mytd">{{result.data.user_gray.contacts_router_cnt}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" colspan="2">引起占比=引起二阶黑名单人数/一阶联系人总数 ：</td>
                <td class="mytd" colspan="2">{{result.data.user_gray.contacts_router_ratio}}</td>
              </tr>
              </table>
            </table>
          </td>
         </tr>
         <tr>
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="4"><el-tag>身份证存疑</el-tag></td>
              </tr>
              <tr>
                  <td class="text-left" colspan="4">
                      用这个身份证号码绑定的其他姓名
                  </td>
              </tr>
              <tr>
                  <td class="mytd" colspan="2">绑定姓名 </td>
                  <td class="mytd" colspan="2">更新时间 </td>
              </tr>

              <tr class="text-left resultRows" v-for="(ret, index) in result.data.user_idcard_suspicion.idcard_with_other_names    " :key="index">
                <td class="mytd" colspan="2">{{ret.susp_name | handleName}}</td>
                <td class="mytd" colspan="2">{{ret.susp_updt}}</td>
              </tr>
               <tr>
                  <td class="text-left" colspan="4">
                      用这个身份证绑定的其他手机号码
                  </td>
              </tr>
              <tr>
                  <td colspan="4">
                      <table class="table-pan card-text" v-for="(ret, index) in result.data.user_idcard_suspicion.idcard_with_other_phones" :key="index" >
                        <tr class="text-left resultRows" >
                             <td class="mytd" width="25%">手机号 ：</td>
                             <td class="mytd">{{ret.susp_phone | handleMobile}}</td>
                             <td class="mytd" width="25%">运营商 ：</td>
                             <td class="mytd">{{ret.susp_phone_operator}}</td>
                        </tr>
                        <tr class="text-left resultRows">
                             <td class="mytd" width="25%">手机号归属地 ：</td>
                             <td class="mytd" width="25%" >{{ret.susp_phone_province}}</td>
                             <td class="mytd" width="25%">手机号城市 ：</td>
                             <td class="mytd">{{ret.susp_phone_city}}</td>
                        </tr>
                        <tr class="text-left resultRows">
                             <td class="mytd" width="25%">更新时间 ：</td>
                             <td class="mytd">{{ret.susp_updt}}</td>
                             <td class="mytd" width="25%"></td>
                             <td class="mytd"></td>
                        </tr>
                     </table>
                  </td>
              </tr>
              
              <tr>
                  <td class="text-left" colspan="4">
                      身份证在那些类型的机构中使用过
                  </td>
              </tr>
              <tr class="text-left resultRows"  v-for="ret in result.data.user_idcard_suspicion.idcard_applied_in_orgs" :key="ret.susp_org_type">
                <td class="mytd" width="25%">机构所属分类 ：</td>
                <td class="mytd">{{ret.susp_org_type}}</td>
                <td class="mytd" width="25%">更新时间 ：</td>
                <td class="mytd">{{ret.susp_updt}}</td>
              </tr>
              <tr>
                <td colspan="1">被机构查询数量 :</td>
                <td colspan="3">{{result.data.user_searched_statistic.searched_org_cnt}}</td>
              </tr>
              <tr class="text-left">
                <td colspan="4"><el-tag>个人涉诉</el-tag></td>
              </tr>
        <tr class="text-left">
          <td width="25%">姓名:</td>
          <td>{{resultz.name | handleName}}</td>
          <td width="25%">身份证号:</td>
          <td>{{resultz.idCard | handleIdCard}}</td>
        </tr>
        <tr class="text-left">
          <td width="25%">开庭公告:</td>
          <td>{{resultz.statistic.ktggResultSize}} 条</td>
          <td width="25%">裁判文书:</td>
          <td>{{resultz.statistic.cpwsResultSize}} 条</td>
        </tr>
        <tr class="text-left">
          <td width="20%">执行公告</td>
          <td>{{resultz.statistic.zxggResultSize}} 条</td>
          <td width="20%">失信公告</td>
          <td>{{resultz.statistic.sxggResultSize}} 条</td>
        </tr>
        <tr class="text-left">
          <td width="20%">法院公告</td>
          <td>{{resultz.statistic.fyggResultSize}} 条</td>
          <td width="20%">网贷黑名单</td>
          <td>{{resultz.statistic.wdhmdResultSize}} 条</td>
        </tr>
        <tr class="text-left">
          <td width="20%">案件流程</td>
          <td>{{resultz.statistic.ajlcResultSize}} 条</td>
          <td width="20%">曝光台</td>
          <td>{{resultz.statistic.bgtResultSize}} 条</td>
        </tr>
            </table>
          </td>
        </tr>
        
        <tr v-for="(ret, index) in resultz.Data" :key="index">
          <td colspan="4">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                    <el-tag round size="mini">{{dataTypeChange(ret.dataType)}}</el-tag>
                    </td>
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
  </div>
</template>
<style lang="scss">
.text-center {
  text-align: center;
}
</style>

<script>
export default {
  name: "HoneyPot",
  components: {},
  data () {
    const sourcetArr = [
      {
        id: "SXGG",
        name: "失信公告",
        kvs: {
          name: "被执行人姓名",
          gender: "性别",
          implementationStatus: "履行情况",
          evidenceCode: "依据案号",
          identificationNO: "身份证/组织机构代码",
          executableUnit: "做出执行依据单位",
          specificCircumstances: "失信被执行人行为具体情形",
          obligations: "生效法律文书确定的义务",
          age: "年龄",
          province: "省份",
          postTime: "发布时间",
          id: "失信公告 ID（唯一的标识）",
          recordTime: "立案时间（时间戳）",
          content: "内容",
          caseNO: "案号",
          court: "执行法院名称",
          dataType: "类别",
          time: "立案时间（年月日格式）"
        }
      },
      {
        id: "ZXGG",
        name: "执行公告",
        kvs: {
          title: "标题",
          name: "被执行人姓名",
          caseStatus: "案件状态",
          identificationNO: "身份证/组织机构代码",
          executionTarget: "执行标的",
          id: "执行公告 ID",
          recordTime: "立案时间（时间戳）",
          content: "内容",
          caseNO: "案号",
          court: "执行法院名称",
          dataType: "类别",
          time: "立案时间（年月日格式）"
        }
      },
      {
        id: "CPWS",
        name: "裁判文书",
        kvs: {
          caseType: "案件类型",
          title: "标题",
          litigants: "法官陪审员",
          id: "裁判文书 ID",
          recordTime: "审结时间（时间戳）",
          content: "内容",
          caseNO: "案号",
          court: "法院名称",
          dataType: "类别",
          time: "审结时间（年月日格式）"
        }
      },
      {
        id: "KTGG",
        name: "开庭公告",
        kvs: {
          party: "当事人",
          title: "标题",
          caseCause: "案由",
          courtroom: "法庭",
          id: "开庭公告 ID",
          content: "内容",
          recordTime: "开庭时间（时间戳）",
          caseNO: "案号",
          court: "法院名称",
          dataType: "类别",
          time: "开庭时间（年月日格式）"
        }
      },
      {
        id: "FYGG",
        name: "法院公告",
        kvs: {
          layout: "版面",
          name: "当事人",
          announcementType: "公告类型",
          id: "法院公告 ID",
          recordTime: "发布时间（时间戳）",
          content: "公告内容",
          court: "法院名称",
          time: "发布时间（年月日格式）",
          dataType: "类别"
        }
      },
      {
        id: "WDHMD",
        name: "网贷黑名单",
        kvs: {
          identificationNO: "身份证/组织机构代码",
          sex: "性别",
          address: "地址",
          email: "邮箱",
          name: "姓名",
          phone: "手机号",
          sourceName: "数据来源单位名称",
          principal: "本金/本息",
          penalty: "未还/罚息",
          mobile: "手机号",
          recordTime: "贷款时间",
          content: "内容",
          court: "法院名称",
          time: "贷款时间（年月日格式）",
          dataType: "类别",
          id: "网贷黑名单 ID"
        }
      },
      {
        id: "AJLC",
        name: "案件流程",
        kvs: {
          caseType: "案件类别",
          caseCause: "案由",
          status: "流程状态",
          name: "当事人",
          id: "案件流程 ID",
          recordTime: "立案时间（时间戳）",
          content: "内容",
          caseNO: "案号",
          court: "法院名称",
          dataType: "类型",
          time: "立案时间（年月日格式）"
        }
      },
      {
        id: "BGT",
        name: "曝光台",
        kvs: {
          name: "当事人",
          proposer: "提案人",
          id: "曝光台 ID",
          recordTime: "立案时间（时间戳）",
          content: "内容",
          caseNO: "案号",
          court: "法院名称",
          dataType: "类型",
          time: "立案时间（年月日格式）"
        }
      }
    ];
    return {
      sourcetArr: sourcetArr,
      inputForm: {
        name: "",
        idCard: "",
        phone: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [
          {
            required: true,
            validator: this.$validator.idCardValidator,
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: this.$validator.mobileValidator,
            trigger: "blur"
          }
        ]
      },
      result: {
        example: true,
        resultType: "000000",
        mobile: "13653576763",
        data: {
          user_gray: {
            user_phone: "18229967576",
            contacts_class1_blacklist_cnt: 0,
            contacts_class2_blacklist_cnt: 123,
            phone_gray_score: 1,
            contacts_class1_cnt: 30,
            contacts_router_cnt: 5,
            contacts_router_ratio: 0.167
          },
          user_phone_suspicion: {
            phone_with_other_idcards: [
              {
                susp_updt: "2015-10-23 21:33:17",
                susp_idcard: "32052***0408"
              }
            ],
            phone_with_other_names: [
              {
                susp_name: "测**",
                susp_updt: "2015-04-07 15:00:31"
              }
            ],
            phone_applied_in_orgs: [
              {
                susp_org_type: "线上信用卡代还",
                susp_updt: "2015-10-23 16:31:00"
              }
            ]
          },
          update_time: 1446702659106,
          user_idcard_suspicion: {
            idcard_with_other_names: [
              {
                susp_name: "吴**",
                susp_updt: "2015-11-09 19:25:04"
              }
            ],
            idcard_with_other_phones: [
              {
                susp_phone_province: "江苏",
                susp_phone_operator: "中国移动",
                susp_updt: "2015-11-02 10:31:39",
                susp_phone: "137***730",
                susp_phone_city: "苏州"
              }
            ],
            idcard_applied_in_orgs: [
              {
                susp_org_type: "线上信用卡代还",
                susp_updt: "2015-10-23 16:31:00"
              }
            ]
          },
          user_searched_history_by_orgs: [
            {
              searched_org: "其他",
              org_self: true,
              searched_date: "2015-11-05"
            }
          ],
          user_searched_statistic: {
            searched_org_cnt: 6
          },
          user_blacklist: {
            blacklist_name_with_idcard: true,
            blacklist_update_time_name_idcard: "2015-07-31 02:54:22",
            blacklist_name_with_phone: false,
            blacklist_update_time_name_phone: "2015-07-31 02:54:22",
            blacklist_category: ["网贷"],
            blacklist_details: [
              {
                details_key: "地址",
                details_value: "北京"
              },
              {
                details_key: "累计借入本金",
                details_value: "¥293,500.00"
              },
              {
                details_key: "累计已还金额",
                details_value: "¥181,110.25"
              },
              {
                details_key: "最大逾期天数",
                details_value: "246 天"
              }
            ]
          },
          user_basic: {
            user_province: "湖南省",
            user_city: "衡阳市",
            user_region: "耒阳市",
            user_idcard: "4304811991********",
            user_age: 24,
            user_gender: "女",
            user_phone: "188********",
            user_idcard_valid: true,
            user_name: "喻海云",
            user_phone_city: "长沙",
            user_phone_province: "湖南",
            user_phone_operator: "中国移动"
          },
          user_register_orgs: {
            phone_num: "137********",
            register_cnt: 4,
            register_orgs: [],
            register_orgs_statistics: [
              {
                count: 1,
                label: "理财"
              },
              {
                count: 1,
                label: "贷款"
              },
              {
                count: 2,
                label: "理财/贷款"
              }
            ]
          },
          auth_org: "jcloud",
          user_grid_id: "306bd17e-8381-11e5-8598-525400dd3e99-6224"
        }
      },
      resultz: {
        name: "喻海云",
        idCard: "3101121962****0021",
        statistic: {
          ktggResultSize: 0,
          cpwsResultSize: 0,
          zxggResultSize: 3,
          sxggResultSize: 2,
          fyggResultSize: 0,
          wdhmdResultSize: 0,
          ajlcResultSize: 0,
          bgtResultSize: 0
        },
        Data: [
          {
            name: "喻海云",
            gender: "女性",
            implementationStatus: "全部未履行",
            evidenceCode: "(2017)沪0112民初34494号",
            identificationNO: "3101121962****0021",
            executableUnit: "上海市闵行区人民法院",
            specificCircumstances: "有履行能力而拒不履行生效法律文书确定义务",
            obligations: "详见判决书主文",
            age: 56,
            province: "上海市",
            postTime: 1541606400000,
            id:
              "c2018310112zhi10132_t20181024_pyuhaiyun@cG5hbWU65Za75rW35LqRQGlkY2FyZE5vOjMxMDExMjE5NjIxMDI2MDAyMQ==",
            recordTime: 1540310400000,
            content: "...海市闵行区人民法院 喻海云...",
            caseNO: "（2018）沪0112执10132号",
            court: "上海市闵行区人民法院",
            dataType: "SXGG",
            time: "2018年10月24日"
          },
          {
            title: "喻海云",
            name: "喻海云",
            caseStatus: "0",
            identificationNO: "31011219621****0021",
            executionTarget: 804520,
            id:
              "c2018310112zhi10132_t20181024_pyuhaiyun@cG5hbWU65Za75rW35LqRQGlkY2FyZE5vOjMxMDExMjE5NjIxMDI2MDAyMQ==",
            recordTime: 1540310400000,
            content: "...0021 -2 0 喻海云...",
            caseNO: "（2018）沪0112执10132号",
            court: "上海市闵行区人民法院",
            dataType: "ZXGG",
            time: "2018年10月24日"
          }
        ],
        pagination: {
          pageIndex: 1,
          totalPage: 1000,
          resultSize: 105,
          pageSize: 20,
          officialAccountAmount: 0,
          testAccountAmount: 0,
          totalAccountAmount: 0
        }
      }
    };
  },
  methods: {
    getKeyName (sourcet, name) {
      var i = this.sourcetArr.find(n => n.id == sourcet);
      return i.kvs[name] || "";
    },
    panduanwz: function (boolean, val) {
      if (boolean) {
        return val.tru;
      } else {
        return val.fals;
      }
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
    tuomin (v, keyName) {
      if (["name", "title", "party", "proposer"].includes(keyName)) {
        return new Array(v.length).join("*") + v.slice(-1);
      } else if (["caseStatus"].includes(keyName)) {
        if (v == "1") {
          return "结案";
        } else {
          return "执行中";
        }
      } else {
        return v;
      }
    },
    getUserAccount: function () {
      return this.$http.get("api/rip/honeyportData", {
        params: this.inputForm,
        headers: {
          authorization: this.$db.get("authorization")
        }
      });
    },
    getUserMacount: function () {
      return this.$http.get("api/rip/personalComplaintInquiry", {
        params: {
          name: this.inputForm.name,
          idCard: this.inputForm.idCard
        },
        headers: {
          authorization: this.$db.get("authorization")
        }
      });
    },
    arrfl: function (dataarr, name) {
      var newarr = dataarr.find(n => n.data[name]);
      return newarr;
    },
    onSubmit: function () {
      var vm = this;
      vm.$refs["inputForm"].validate(valid => {
        if (valid) {
          const loading = vm.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.2)"
          });
          vm.$http
            .all([vm.getUserAccount(), vm.getUserMacount()])
            .then(function (res) {
              let resone = vm.arrfl(res, "result");
              let restow = vm.arrfl(res, "data");
              console.log(restow.data.data.name);
              if (resone.data.result.success) {
                vm.result.data = resone.data.result.data;
                vm.result.example = false;
              } else {
                vm.$message({
                  showClose: true,
                  message: "请检查信息是否填写有误",
                  type: "error",
                  duration: "5000"
                });
              }

              if (restow.data.success) {
                vm.resultz.name = restow.data.data.name;
                vm.resultz.idCard = restow.data.data.identityCard;
                vm.resultz.Data = restow.data.data.pageData;
                vm.resultz.statistic = restow.data.data.statistic;
              } else {
                vm.$message({
                  showClose: true,
                  message: "请检查信息是否填写有误",
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
