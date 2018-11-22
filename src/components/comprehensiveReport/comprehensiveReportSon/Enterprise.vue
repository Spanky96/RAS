<template>
  <div id="Enterprise">
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>企业综合报告</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="查询主体名称（企业名称）" label-width="0" prop="c" class="form-item">
              <el-input v-model="inputFrom.entname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="统一社会信用代码" label-width="0" prop="creditCode" class="form-item">
              <el-input v-model="inputFrom.creditCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label-width="0" prop="flag" class="form-item" style="margin: 0px;">
              <span style="margin-right:30px;">查询选项</span>
              <el-checkbox :indeterminate="isIndeterminate" class="select-all" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="sons" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(res, index) in setArray" :label="res.label" :key="index">{{res.name}}</el-checkbox>
              </el-checkbox-group>
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
          <!-- <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col> -->
          <el-col :span="2" class="no-print">
            <el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {dom:'resultTable', title: '企业综合报告'})">打印</el-button>
          </el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">匹配结果</td>
          <!-- <td><el-tag :type="result.success | isSuccessLogoFmt" class="tag">{{result.success | isConsistentFmt}}</el-tag></td> -->
        </tr>
        <tr v-if="exearr.get1">
          <td colspan="4">
            <table class="table card-text" v-for="ret in result.retData" :key="ret.entName">
              <tr class="text-left">
                <td colspan="2" width="50%">
                  <el-tag>统一代码信息</el-tag>
                </td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">主体名称 ：</td>
                <td class="mytd">{{ret.entName}}</td>
                <td class="mytd" width="25%">统一社会信用代码 ：</td>
                <td class="mytd">{{ret.credCode}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">工商注册码 ：</td>
                <td class="mytd">{{ret.regCode}}</td>
                <td class="mytd" width="25%">组织机构代码 ：</td>
                <td class="mytd">{{ret.orgCode}}</td>
              </tr>
              <tr class="text-left resultRows">
                <td class="mytd" width="25%">税务代码 ：</td>
                <td class="mytd">{{ret.taxCode}}</td>
                <td class="mytd" width="25%"></td>
                <td class="mytd"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr v-if="exearr.get2">
          <td colspan="4">
            <table class="table card-text">
              <tr>
                <td colspan="4">
                  <table class="table card-text">
                    <tr class="text-left">
                      <td colspan="4">
                        <el-tag>企业工商数据查询</el-tag>
                      </td>
                    </tr>
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">基本信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.data" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">企业名称 ：</td>
                        <td class="mytd">{{ret.entName}}</td>
                        <td class="mytd" width="20%">注册号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">原注册号 ：</td>
                        <td class="mytd">{{ret.oRigegNo}}</td>
                        <td class="mytd" width="20%">法定代表人姓名 : </td>
                        <td class="mytd">{{ret.fName}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册资本(万元) ：</td>
                        <td class="mytd">{{ret.regCap}}</td>
                        <td class="mytd" width="20%">实收资本(万元) : </td>
                        <td class="mytd">{{ret.recCap}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册资本币种 ：</td>
                        <td class="mytd">{{ret.regCapCur}}</td>
                        <td class="mytd" width="20%">经营状态（在营、吊销、注销、其他）:</td>
                        <td class="mytd">{{ret.entStatus}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">企业(机构)类型 ：</td>
                        <td class="mytd">{{ret.entType}}</td>
                        <td class="mytd" width="20%">开业日期 : </td>
                        <td class="mytd">{{ret.esDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">经营期限自 ：</td>
                        <td class="mytd">{{ret.opFrom}}</td>
                        <td class="mytd" width="20%">经营期限至 : </td>
                        <td class="mytd">{{ret.opTo}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">住址 ：</td>
                        <td class="mytd">{{ret.dom}}</td>
                        <td class="mytd" width="20%">登记机关 : </td>
                        <td class="mytd">{{ret.regorg}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">许可经营项目 ：</td>
                        <td class="mytd">{{ret.abuItem}}</td>
                        <td class="mytd" width="20%">一般经营项目 : </td>
                        <td class="mytd">{{ret.cbuItem}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">经营(业务)范围 ：</td>
                        <td class="mytd">{{ret.opScope}}</td>
                        <td class="mytd" width="20%">经营(业务)范围及方式 ：</td>
                        <td class="mytd">{{ret.opScoandForm}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">最后年检年度 ：</td>
                        <td class="mytd">{{ret.anCheYear}}</td>
                        <td class="mytd" width="20%">变更日期 : </td>
                        <td class="mytd">{{ret.changDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注销日期 ：</td>
                        <td class="mytd">{{ret.canDate}}</td>
                        <td class="mytd" width="20%">吊销日期 :</td>
                        <td class="mytd">{{ret.revDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">最后年检日期 ：</td>
                        <td class="mytd">{{ret.anCheDate}}</td>
                        <td class="mytd" width="20%">行业门类代码 : </td>
                        <td class="mytd">{{ret.induStryphyCode}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">行业门类名称 ：</td>
                        <td class="mytd">{{ret.induStryphyName}}</td>
                        <td class="mytd" width="20%">国民经济行业代码 : </td>
                        <td class="mytd">{{ret.induStryCoCode}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">国民经济行业名称 ：</td>
                        <td class="mytd">{{ret.induStryCoName}}</td>
                        <td class="mytd" width="20%">统一社会信用代码 : </td>
                        <td class="mytd">{{ret.creditNo}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">行业门类代码及名称 ：</td>
                        <td class="mytd">{{ret.industryPhyAll}}</td>
                        <td class="mytd" width="20%">注册地址行政区编号 : </td>
                        <td class="mytd">{{ret.regOrgCode}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">企业英文名称 ：</td>
                        <td class="mytd">{{ret.entNameEng}}</td>
                        <td class="mytd" width="20%">经营业务范围 :</td>
                        <td class="mytd">{{ret.zsOpScope}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">住所所在行政区划 ：</td>
                        <td class="mytd">{{ret.domDistrict}}</td>
                        <td class="mytd" width="20%">联系电话：</td>
                        <td class="mytd">{{ret.tel}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">国民经济行业代码及名称 ：</td>
                        <td class="mytd">{{ret.industryCoAll}}</td>
                        <td class="mytd" width="20%">员工人数 ：</td>
                        <td class="mytd">{{ret.empNum}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">所在省份 ：</td>
                        <td class="mytd">{{ret.regOrgProvince}}</td>
                        <td class="mytd" width="20%">省节点编号 ：</td>
                        <td class="mytd">{{ret.sextNodeNum}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">经营场所 ：</td>
                        <td class="mytd">{{ret.opLoc}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">股东信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.shareholder" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">股东名称 ：</td>
                        <td class="mytd">{{ret.shaName}}</td>
                        <td class="mytd" width="20%">认缴出资额(万元) ：</td>
                        <td class="mytd">{{ret.subConAm}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">认缴出资币种 ：</td>
                        <td class="mytd">{{ret.regCapCur}}</td>
                        <td class="mytd" width="20%">出资方式 : </td>
                        <td class="mytd">{{ret.conForm}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">出资比例 ：</td>
                        <td class="mytd">{{ret.fundedRatio}}</td>
                        <td class="mytd" width="20%">出资日期 : </td>
                        <td class="mytd">{{ret.conDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">国别 ：</td>
                        <td class="mytd">{{ret.country}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">高管信息</span>
                      </td>
                    </tr>
                    <tr class="text-left resultRows" v-if="resultArr.shareholderPersons.length != 0">
                      <td class="mytd" width="20%">姓名 ：</td>
                      <td class="mytd" width="20%">性别 ：</td>
                      <td class="mytd" width="20%">职位 ：</td>
                    </tr>
                    <tr class="text-left resultRows" v-for="(ret, index) in resultArr.shareholderPersons" :key="index">
                      <td class="mytd">{{ret.name}}</td>
                      <td class="mytd">{{ret.sex}}</td>
                      <td class="mytd">{{ret.position}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">法人对外投资信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.legalPersonInvests" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">姓名 ：</td>
                        <td class="mytd">{{ret.name}}</td>
                        <td class="mytd" width="20%">企业(机构)名称 ：</td>
                        <td class="mytd">{{ret.entName}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                        <td class="mytd" width="20%">企业(机构)类型 : </td>
                        <td class="mytd">{{ret.entType}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册资本(万元) ：</td>
                        <td class="mytd">{{ret.regCap}}</td>
                        <td class="mytd" width="20%">注册资本币种 : </td>
                        <td class="mytd">{{ret.regCapCur}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">经营状态（在营、吊销、注销、其他） ：</td>
                        <td class="mytd">{{ret.entStatus}}</td>
                        <td class="mytd" width="20%">注销日期 : </td>
                        <td class="mytd">{{ret.canDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">吊销日期 ：</td>
                        <td class="mytd">{{ret.revDate}}</td>
                        <td class="mytd" width="20%">登记机关 : </td>
                        <td class="mytd">{{ret.regOrg}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">认缴出资额(万元) ：</td>
                        <td class="mytd">{{ret.subConAm}}</td>
                        <td class="mytd" width="20%">认缴出资币种 : </td>
                        <td class="mytd">{{ret.curRenCy}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">出资方式 ：</td>
                        <td class="mytd">{{ret.conForm}}</td>
                        <td class="mytd" width="20%">出资比例 : </td>
                        <td class="mytd">{{ret.fundedRatio}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">开业日期 ：</td>
                        <td class="mytd">{{ret.esDate}}</td>
                        <td class="mytd" width="20%">注册地址行政区编号 : </td>
                        <td class="mytd">{{ret.postCode}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">法人其他任职信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.legalPersonPostions" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">姓名 ：</td>
                        <td class="mytd">{{ret.name}}</td>
                        <td class="mytd" width="20%">企业(机构)名称 ：</td>
                        <td class="mytd">{{ret.entName}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                        <td class="mytd" width="20%">企业(机构)类型 : </td>
                        <td class="mytd">{{ret.entType}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册资本(万元) ：</td>
                        <td class="mytd">{{ret.regCap}}</td>
                        <td class="mytd" width="20%">注册资本币种 : </td>
                        <td class="mytd">{{ret.regCapCur}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">经营状态（在营、吊销、注销、其他） ：</td>
                        <td class="mytd">{{ret.entStatus}}</td>
                        <td class="mytd" width="20%">注销日期 : </td>
                        <td class="mytd">{{ret.canDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">吊销日期 ：</td>
                        <td class="mytd">{{ret.revDate}}</td>
                        <td class="mytd" width="20%">登记机关 : </td>
                        <td class="mytd">{{ret.regOrg}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">职务 ：</td>
                        <td class="mytd">{{ret.position}}</td>
                        <td class="mytd" width="20%">是否法定代表人 : </td>
                        <td class="mytd">{{ret.lerepSign}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">开业日期 ：</td>
                        <td class="mytd">{{ret.esDate}}</td>
                        <td class="mytd" width="20%">注册地址行政区编号 : </td>
                        <td class="mytd">{{ret.postCode}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">企业对外投资信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.enterpriseInvests" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">企业(机构)名称 ：</td>
                        <td class="mytd">{{ret.entName}}</td>
                        <td class="mytd" width="20%">统一社会信用代码 ：</td>
                        <td class="mytd">{{ret.creditCode}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                        <td class="mytd" width="20%">企业(机构)类型 : </td>
                        <td class="mytd">{{ret.entType}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册资本(万元) ：</td>
                        <td class="mytd">{{ret.regCap}}</td>
                        <td class="mytd" width="20%">注册资本币种 : </td>
                        <td class="mytd">{{ret.regCapCur}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">经营状态（在营、吊销、注销、其他） ：</td>
                        <td class="mytd">{{ret.entStatus}}</td>
                        <td class="mytd" width="20%">注销日期 : </td>
                        <td class="mytd">{{ret.canDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">吊销日期 ：</td>
                        <td class="mytd">{{ret.revDate}}</td>
                        <td class="mytd" width="20%">登记机关 : </td>
                        <td class="mytd">{{ret.regOrg}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">认缴出资额(万元) ：</td>
                        <td class="mytd">{{ret.subConAm}}</td>
                        <td class="mytd" width="20%">认缴出资币种 : </td>
                        <td class="mytd">{{ret.conGroCur}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">出资方式 ：</td>
                        <td class="mytd">{{ret.conFrom}}</td>
                        <td class="mytd" width="20%">出资比例 : </td>
                        <td class="mytd">{{ret.fundedRation}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册地址行政区编号 ：</td>
                        <td class="mytd">{{ret.postCode}}</td>
                        <td class="mytd" width="20%">开业时间 : </td>
                        <td class="mytd">{{ret.openingDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">法定代表人姓名 : </td>
                        <td class="mytd">{{ret.name}}</td>
                        <td></td>
                        <td></td>
                      </tr>

                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">变更信息</span>
                      </td>
                    </tr>
                    <tr class="text-left resultRows">
                      <td class="mytd" width="20%">变更日期 ：</td>
                      <td class="mytd" width="20%">变更事项 ：</td>
                      <td class="mytd" width="20%">变更前内容 ：</td>
                      <td class="mytd" width="20%">变更后内容 : </td>
                    </tr>
                    <tr class="text-left resultRows" v-for="(ret, index) in resultArr.alterInfos" :key="index">
                      <td class="mytd">{{ret.altDate}}</td>
                      <td class="mytd">{{ret.altItem}}</td>
                      <td class="mytd">{{ret.altBe}}</td>
                      <td class="mytd">{{ret.altAf}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">分支机构信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.filiations" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">分支机构名称 ：</td>
                        <td class="mytd">{{ret.brName}}</td>
                        <td class="mytd" width="20%">分支机构企业注册号 ：</td>
                        <td class="mytd">{{ret.brRegNo}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">分支机构负责人 ：</td>
                        <td class="mytd">{{ret.brPrincipal}}</td>
                        <td class="mytd" width="20%">一般经营项目 : </td>
                        <td class="mytd">{{ret.cbuItme}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">分支机构地址 ：</td>
                        <td class="mytd">{{ret.brAddr}}</td>
                        <td class="mytd" width="20%">分支机构统一社会信用代码 : </td>
                        <td class="mytd">{{ret.brnCreditCode}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">分支机构登记机关 ：</td>
                        <td class="mytd">{{ret.brnRegOrg}}</td>
                        <td class="mytd" width="20%">分支机构主体身份代码 : </td>
                        <td class="mytd">{{ret.brpripId}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">动产抵押物信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.morguaInfos" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">综合信息（数量、质量、状况、所在地等情况） ：</td>
                        <td class="mytd">{{ret.comprehensiveDetail}}</td>
                        <td class="mytd" width="20%">抵押物名称 ：</td>
                        <td class="mytd">{{ret.guaName}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">备注 ：</td>
                        <td class="mytd">{{ret.remark}}</td>
                        <td class="mytd" width="20%">登记编号 : </td>
                        <td class="mytd">{{ret.regNo}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">所有权或使用权归属 ：</td>
                        <td class="mytd">{{ret.owner}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">失信被执行人信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.punishBreaks" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">案号 ：</td>
                        <td class="mytd">{{ret.caseCode}}</td>
                        <td class="mytd" width="20%">案件状态 ：</td>
                        <td class="mytd">{{ret.caseState}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">被执行人姓名/名称 ：</td>
                        <td class="mytd">{{ret.name}}</td>
                        <td class="mytd" width="20%">失信人类型 : </td>
                        <td class="mytd">{{ret.type}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">性别 ：</td>
                        <td class="mytd">{{ret.sex}}</td>
                        <td class="mytd" width="20%">年龄 ：</td>
                        <td class="mytd">{{ret.age}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">身份证号码 ：</td>
                        <td class="mytd">{{ret.cardNum}}</td>
                        <td class="mytd" width="20%">身份证原始发证地 ：</td>
                        <td class="mytd">{{ret.ysfzd}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">法定代表人/负责人姓名 ：</td>
                        <td class="mytd">{{ret.businessEntity}}</td>
                        <td class="mytd" width="20%">立案时间 ：</td>
                        <td class="mytd">{{ret.regDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">公布时间 ：</td>
                        <td class="mytd">{{ret.publishDate}}</td>
                        <td class="mytd" width="20%">执行法院 ：</td>
                        <td class="mytd">{{ret.courName}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">省份 ：</td>
                        <td class="mytd">{{ret.areaName}}</td>
                        <td class="mytd" width="20%">执行依据文号 ：</td>
                        <td class="mytd">{{ret.gistId}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">执行依据单位 ：</td>
                        <td class="mytd">{{ret.gistUnit}}</td>
                        <td class="mytd" width="20%">法律文书确定的义务 ：</td>
                        <td class="mytd">{{ret.duty}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">失信被执行人行为具体情形 ：</td>
                        <td class="mytd">{{ret.disruptTypeName}}</td>
                        <td class="mytd" width="20%">被执行人的履行情况 ：</td>
                        <td class="mytd">{{ret.performAnce}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">已履行 ：</td>
                        <td class="mytd">{{ret.performedPart}}</td>
                        <td class="mytd" width="20%">未履行 ：</td>
                        <td class="mytd">{{ret.unPerformPart}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">退出日期 ：</td>
                        <td class="mytd">{{ret.exitDate}}</td>
                        <td class="mytd" width="20%">关注次数 ：</td>
                        <td class="mytd">{{ret.focusNumber}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">被执行人信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.punished" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">案号 ：</td>
                        <td class="mytd">{{ret.caseCode}}</td>
                        <td class="mytd" width="20%">案件状态 ：</td>
                        <td class="mytd">{{ret.caseState}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">被执行人姓名/名称 ：</td>
                        <td class="mytd">{{ret.name}}</td>
                        <td class="mytd" width="20%">身份证号码 : </td>
                        <td class="mytd">{{ret.cardNum}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">性别 ：</td>
                        <td class="mytd">{{ret.sex}}</td>
                        <td class="mytd" width="20%">年龄 ：</td>
                        <td class="mytd">{{ret.age}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">省份 ：</td>
                        <td class="mytd">{{ret.areaName}}</td>
                        <td class="mytd" width="20%">身份证原始发证地 ：</td>
                        <td class="mytd">{{ret.ysfzd}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">执行法院 ：</td>
                        <td class="mytd">{{ret.courtName}}</td>
                        <td class="mytd" width="20%">立案时间 ：</td>
                        <td class="mytd">{{ret.regDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">执行标的（元） ：</td>
                        <td class="mytd">{{ret.execMoney}}</td>
                        <td class="mytd" width="20%">关注次数 ：</td>
                        <td class="mytd">{{ret.focusNum}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">股权冻结历史信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.sharesFrosts" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">冻结文号 ：</td>
                        <td class="mytd">{{ret.froDocNo}}</td>
                        <td class="mytd" width="20%">冻结机关 ：</td>
                        <td class="mytd">{{ret.froAuth}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">冻结起始日期 ：</td>
                        <td class="mytd">{{ret.froFrom}}</td>
                        <td class="mytd" width="20%">冻结截至日期 : </td>
                        <td class="mytd">{{ret.froTo}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">冻结金额（万元） ：</td>
                        <td class="mytd">{{ret.froAm}}</td>
                        <td class="mytd" width="20%">解冻机关 ：</td>
                        <td class="mytd">{{ret.thawAuth}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">解冻文号 ：</td>
                        <td class="mytd">{{ret.thawDocNo}}</td>
                        <td class="mytd" width="20%">解冻日期 ：</td>
                        <td class="mytd">{{ret.thawDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">解冻说明 ：</td>
                        <td class="mytd">{{ret.thawComment}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">清算信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.liquidations" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">清算责任人 ：</td>
                        <td class="mytd">{{ret.ligEntity}}</td>
                        <td class="mytd" width="20%">清算负责人 ：</td>
                        <td class="mytd">{{ret.ligPrincipal}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">清算组成员 ：</td>
                        <td class="mytd">{{ret.liQMen}}</td>
                        <td class="mytd" width="20%">清算完结情况 : </td>
                        <td class="mytd">{{ret.liGSt}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">清算完结日期 ：</td>
                        <td class="mytd">{{ret.ligEndDate}}</td>
                        <td class="mytd" width="20%">债务承接人 ：</td>
                        <td class="mytd">{{ret.debtTranee}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">债权承接人 ：</td>
                        <td class="mytd">{{ret.claimTranee}}</td>
                        <td class="mytd" width="20%">电话 ：</td>
                        <td class="mytd">{{ret.mobile}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">地址 ：</td>
                        <td class="mytd">{{ret.address}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">行政处罚历史信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.caseInfos" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">处罚决定文书 ：</td>
                        <td class="mytd">{{ret.penDecNo}}</td>
                        <td class="mytd" width="20%">处罚决定书签发日期 ：</td>
                        <td class="mytd">{{ret.penDecIssDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">处罚机关 ：</td>
                        <td class="mytd">{{ret.penAuth}}</td>
                        <td class="mytd" width="20%">处罚种类 : </td>
                        <td class="mytd">{{ret.penType}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">动产抵押-变更信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.mortgageAlter" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">变更日期 ：</td>
                        <td class="mytd">{{ret.alterDate}}</td>
                        <td class="mytd" width="20%">变更内容 ：</td>
                        <td class="mytd">{{ret.alterDetail}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">登记编号 ：</td>
                        <td class="mytd">{{ret.RegNo}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">动产抵押-注销信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.mortgageCancels" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注销日期 ：</td>
                        <td class="mytd">{{ret.cancelDate}}</td>
                        <td class="mytd" width="20%">注销原因 ：</td>
                        <td class="mytd">{{ret.cancelReason}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">登记编号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">动产抵押-被担保主债权信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.mortgageDebtors" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">履行债务开始日期 ：</td>
                        <td class="mytd">{{ret.startDate}}</td>
                        <td class="mytd" width="20%">履行债务结束日期 ：</td>
                        <td class="mytd">{{ret.endtDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">数额 ：</td>
                        <td class="mytd">{{ret.amount}}</td>
                        <td class="mytd" width="20%">担保范围 ：</td>
                        <td class="mytd">{{ret.range}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">备注 ：</td>
                        <td class="mytd">{{ret.remark}}</td>
                        <td class="mytd" width="20%">种类 ：</td>
                        <td class="mytd">{{ret.type}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">编号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">动产抵押-抵押权人信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.mortgagePersons" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">抵押权人证照/证件号码 ：</td>
                        <td class="mytd">{{ret.credentialNo}}</td>
                        <td class="mytd" width="20%">抵押权人证照/证件类型 ：</td>
                        <td class="mytd">{{ret.credentialType}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">所在地 ：</td>
                        <td class="mytd">{{ret.domain}}</td>
                        <td class="mytd" width="20%">抵押权人名称 ：</td>
                        <td class="mytd">{{ret.name}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">登记编号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">动产抵押-登记信息节</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.mortgageRegisters" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">履行债务开始日期 ：</td>
                        <td class="mytd">{{ret.startDate}}</td>
                        <td class="mytd" width="20%">履行债务结束日期 ：</td>
                        <td class="mytd">{{ret.endDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">被担保债权数额 ：</td>
                        <td class="mytd">{{ret.amount}}</td>
                        <td class="mytd" width="20%">担保范围 ：</td>
                        <td class="mytd">{{ret.range}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">被担保债券种类 ：</td>
                        <td class="mytd">{{ret.type}}</td>
                        <td class="mytd" width="20%">登记编号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">登记日期 ：</td>
                        <td class="mytd">{{ret.registerDate}}</td>
                        <td class="mytd" width="20%">登记机关 ：</td>
                        <td class="mytd">{{ret.registerOrg}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">省份代码 ：</td>
                        <td class="mytd">{{ret.provinceNo}}</td>
                        <td class="mytd" width="20%">状态 ：</td>
                        <td class="mytd">{{ret.status}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">严重违法信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.breakLaw" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">列入日期 ：</td>
                        <td class="mytd">{{ret.inDate}}</td>
                        <td class="mytd" width="20%">列入原因 ：</td>
                        <td class="mytd">{{ret.inReason}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">列入作出决定机关 ：</td>
                        <td class="mytd">{{ret.inRegOrg}}</td>
                        <td class="mytd" width="20%">列入作出决定文号 ：</td>
                        <td class="mytd">{{ret.inSn}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">移出日期 ：</td>
                        <td class="mytd">{{ret.outDate}}</td>
                        <td class="mytd" width="20%">移出原因 ：</td>
                        <td class="mytd">{{ret.outReason}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">移出作出决定机关 ：</td>
                        <td class="mytd">{{ret.outRegOrg}}</td>
                        <td class="mytd" width="20%">移出作出决定文号 ：</td>
                        <td class="mytd">{{ret.outSn}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">企业异常名录</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.exceptionLists" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">企业名称 ：</td>
                        <td class="mytd">{{ret.name}}</td>
                        <td class="mytd" width="20%">企业类型 ：</td>
                        <td class="mytd">{{ret.type}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">列入日期 ：</td>
                        <td class="mytd">{{ret.inDate}}</td>
                        <td class="mytd" width="20%">列入原因 ：</td>
                        <td class="mytd">{{ret.inReason}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">移出日期 ：</td>
                        <td class="mytd">{{ret.outDate}}</td>
                        <td class="mytd" width="20%">退出异常名录原因 ：</td>
                        <td class="mytd">{{ret.outReason}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册号 ：</td>
                        <td class="mytd">{{ret.regNo}}</td>
                        <td class="mytd" width="20%">统一社会信用代码 ：</td>
                        <td class="mytd">{{ret.shxydm}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">列入机关名称 ：</td>
                        <td class="mytd">{{ret.inOrg}}</td>
                        <td class="mytd" width="20%">移出机关名称 ：</td>
                        <td class="mytd">{{ret.outOrg}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">组织机构代码</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.orgBasics" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">组织机构代码 ：</td>
                        <td class="mytd">{{ret.jgdm}}</td>
                        <td class="mytd" width="20%">机构地址 ：</td>
                        <td class="mytd">{{ret.jgdz}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">组织机构名称 ：</td>
                        <td class="mytd">{{ret.jgmc}}</td>
                        <td class="mytd" width="20%">质疑标志 ：</td>
                        <td class="mytd">{{ret.zybz}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">股权出质信息详细</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.orgDetails" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">办证机构 ：</td>
                        <td class="mytd">{{ret.bzjg}}</td>
                        <td class="mytd" width="20%">代码证办证日期 ：</td>
                        <td class="mytd">{{ret.bzrq}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">法人代表姓名 ：</td>
                        <td class="mytd">{{ret.fddbr}}</td>
                        <td class="mytd" width="20%">组织机构代码 ：</td>
                        <td class="mytd">{{ret.jgdm}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">机构地址 ：</td>
                        <td class="mytd">{{ret.jgdz}}</td>
                        <td class="mytd" width="20%">机构类型 ：</td>
                        <td class="mytd">{{ret.jglx}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">组织机构名称 ：</td>
                        <td class="mytd">{{ret.jgmc}}</td>
                        <td class="mytd" width="20%">行政区划 ：</td>
                        <td class="mytd">{{ret.xzqh}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册日期 ：</td>
                        <td class="mytd">{{ret.zcrq}}</td>
                        <td class="mytd" width="20%">代码证作废日期 ：</td>
                        <td class="mytd">{{ret.zfrq}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">质疑标志 ：</td>
                        <td class="mytd">{{ret.zybz}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">股权出质信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.equityInfos" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">出质股权数额 ：</td>
                        <td class="mytd">{{ret.stkPawnCzamt}}</td>
                        <td class="mytd" width="20%">出质人证件/证件号 ：</td>
                        <td class="mytd">{{ret.stkPawnCzcerno}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">出质人 ：</td>
                        <td class="mytd">{{ret.stkPawnCzper}}</td>
                        <td class="mytd" width="20%">公示日期 ：</td>
                        <td class="mytd">{{ret.stkPawnDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">质权出质设立登记日期 ：</td>
                        <td class="mytd">{{ret.stkPawnRegdate}}</td>
                        <td class="mytd" width="20%">登记编号 ：</td>
                        <td class="mytd">{{ret.stkPawnRegno}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">状态 ：</td>
                        <td class="mytd">{{ret.stkPawnStatus}}</td>
                        <td class="mytd" width="20%">质权人证件/证件号 ：</td>
                        <td class="mytd">{{ret.stkPawnZqcerno}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">质权人姓名 ：</td>
                        <td class="mytd">{{ret.stkPawnZqper}}</td>
                        <td class="mytd" width="20%">关联内容 ：</td>
                        <td class="mytd">{{ret.content}}</td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">股权出质信息-变更信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.equityChangeInfos" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">变更内容 ：</td>
                        <td class="mytd">{{ret.stkPawnBgnr}}</td>
                        <td class="mytd" width="20%">变更日期 ：</td>
                        <td class="mytd">{{ret.stkPawnBgrq}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">关联内容 ：</td>
                        <td class="mytd">{{ret.content}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">股权出质信息-注销信息</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.cancellationOfInfos" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注销日期 ：</td>
                        <td class="mytd">{{ret.stkPawnDate}}</td>
                        <td class="mytd" width="20%">注销原因 ：</td>
                        <td class="mytd">{{ret.stkPawnRes}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">关联内容 ：</td>
                        <td class="mytd">{{ret.content}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text">
                    <tr class="text-left resultRows">
                      <td>
                        <span class="color-r">注册商标</span>
                      </td>
                    </tr>
                    <table class="table card-text" v-for="(ret, index) in resultArr.tradeMarks" :key="index">
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">申请日期 ：</td>
                        <td class="mytd">{{ret.appDate}}</td>
                        <td class="mytd" width="20%">专用期（起始日期） ：</td>
                        <td class="mytd">{{ret.beginDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">初审公告期 ：</td>
                        <td class="mytd">{{ret.checkDate}}</td>
                        <td class="mytd" width="20%">专用期（到期日期) ：</td>
                        <td class="mytd">{{ret.endDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">注册码解密 ：</td>
                        <td class="mytd">{{ret.markCodeKey}}</td>
                        <td class="mytd" width="20%">商标名称 ：</td>
                        <td class="mytd">{{ret.markName}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">商标类型 ：</td>
                        <td class="mytd">{{ret.markTypeNew}}</td>
                        <td class="mytd" width="20%">注册公告期 ：</td>
                        <td class="mytd">{{ret.regDate}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">商标/服务 ：</td>
                        <td class="mytd">{{ret.typeDetailDes}}</td>
                        <td class="mytd" width="20%">流程 ：</td>
                        <td class="mytd">{{ret.xianGmuNew}}</td>
                      </tr>
                      <tr class="text-left resultRows">
                        <td class="mytd" width="20%">商标图片 ：</td>
                        <td class="mytd">{{ret.markImage}}</td>
                        <td class="mytd" width="20%"></td>
                        <td class="mytd"></td>
                      </tr>
                    </table>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr v-if="exearr.get3">
          <td colspan="4">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2" width="50%">
                  <el-tag>行政经营许可信息</el-tag>
                </td>
                <td v-if='result.retData2.length == 0'>
                  无返回数据
                </td>
              </tr>
              <table class="table card-text" v-for="ret in result.retData2" :key="ret.ck_wsh">
                <tr class="text-left resultRows">
                  <td class="mytd" width="25%">文书号 ：</td>
                  <td class="mytd">{{ret.cf_wsh}}</td>
                  <td class="mytd" width="25%">项目名称 ：</td>
                  <td class="mytd">{{ret.cf_xmmc}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="25%">审批类别 ：</td>
                  <td class="mytd">{{ret.cf_splb}}</td>
                  <td class="mytd" width="25%">许可内容 ：</td>
                  <td class="mytd">{{ret.cf_nr}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="25%">行政相对人名称 ：</td>
                  <td class="mytd">{{ret.cf_xdr}}</td>
                  <td class="mytd" width="25%">行政相对人代码_1 ：</td>
                  <td class="mytd">{{ret.cf_xdr_shxym}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="25%">行政相对人代码_2 ：</td>
                  <td class="mytd">{{ret.cf_xdr_zdm}}</td>
                  <td class="mytd" width="25%">行政相对人代码_3 ：</td>
                  <td class="mytd">{{ret.cf_xdr_gsdj}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="25%">行政相对人代码_4 ：</td>
                  <td class="mytd">{{ret.cf_xdr_swdj}}</td>
                  <td class="mytd" width="25%">法定代表人姓名 ：</td>
                  <td class="mytd">{{ret.cf_fr}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="25%">许可决定日期 ：</td>
                  <td class="mytd">{{ret.cf_jdrq}}</td>
                  <td class="mytd" width="25%">许可截止期 ：</td>
                  <td class="mytd">{{ret.cf_jzq}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="25%">许可机构 ：</td>
                  <td class="mytd">{{ret.cf_xzjg}}</td>
                  <td class="mytd" width="25%">当前状态 ：</td>
                  <td class="mytd">{{ret.cf_zt}}</td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if="exearr.get4">
          <td colspan="2" width="50%">
            <table class="table card-text">
              <tr>
                <td>
                  <el-tag>企业异常经营名录</el-tag>
                </td>
                <td v-if="result.retData3.length == 0">
                  无返回数据
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <table class="table card-text" v-for="ret in result.retData3" :key="ret.content">
                    <tr class="text-left resultRows" v-for="(v,k) in JSON.parse(ret.content)" :key="k">
                      <td class="mytd" width="25%">{{k}} ：</td>
                      <td class="mytd">{{v}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table class="table card-text" v-if='exearr.get5'>
              <tr class="text-left">
                <td colspan="4">
                  <el-tag>个人涉诉-A</el-tag>
                </td>
              </tr>
              <tr class="text-left">
                <td width="25%">企业名称:</td>
                <td>{{result.retData4.name}}</td>
                <td width="25%"></td>
                <td></td>
              </tr>
              <tr class="text-left">
                <td width="25%">开庭公告:</td>
                <td>{{result.retData4.statistic.ktggResultSize}} 条</td>
                <td width="25%">裁判文书:</td>
                <td>{{result.retData4.statistic.cpwsResultSize}} 条</td>
              </tr>
              <tr class="text-left">
                <td width="20%">执行公告</td>
                <td>{{result.retData4.statistic.zxggResultSize}} 条</td>
                <td width="20%">失信公告</td>
                <td>{{result.retData4.statistic.sxggResultSize}} 条</td>
              </tr>
              <tr class="text-left">
                <td width="20%">法院公告</td>
                <td>{{result.retData4.statistic.fyggResultSize}} 条</td>
                <td width="20%">网贷黑名单</td>
                <td>{{result.retData4.statistic.wdhmdResultSize}} 条</td>
              </tr>
              <tr class="text-left">
                <td width="20%">案件流程</td>
                <td>{{result.retData4.statistic.ajlcResultSize}} 条</td>
                <td width="20%">曝光台</td>
                <td>{{result.retData4.statistic.bgtResultSize}} 条</td>
              </tr>
              <tr v-for="(ret, index) in result.retData4.result" :key="index">
                <td colspan="4">
                  <table class="table card-text">
                    <tr class="text-left">
                      <td colspan="2"><span class="color-r">{{dataTypeChange(ret.dataType)}}</span></td>
                    </tr>
                    <tr class="text-left resultRows" v-for="(v,k) in ret" :key="k" v-if="k != 'id'">
                      <td class="mytd" width="25%">{{getKeyName(sourcetArr,ret.dataType, k)}}</td>
                      <td class="mytd">{{tuomin((v || '&nbsp;'), k)}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <table class="table card-text" v-if='exearr.get6'>
          <tr class="text-left">
            <td colspan="4">
              <el-tag>个人涉诉-C</el-tag>
            </td>
          </tr>
          <tr class="text-left">
            <td width="25%">企业名称:</td>
            <td>{{result.retData5.name}}</td>
            <td width="25%"></td>
            <td></td>
          </tr>
          <tr class="text-left">
            <td width="25%">开庭公告:</td>
            <td>{{result.retData5.statistic.ktggResultSize}} 条</td>
            <td width="25%">裁判文书:</td>
            <td>{{result.retData5.statistic.cpwsResultSize}} 条</td>
          </tr>
          <tr class="text-left">
            <td width="20%">执行公告</td>
            <td>{{result.retData5.statistic.zxggResultSize}} 条</td>
            <td width="20%">失信公告</td>
            <td>{{result.retData5.statistic.sxggResultSize}} 条</td>
          </tr>
          <tr class="text-left">
            <td width="20%">法院公告</td>
            <td>{{result.retData5.statistic.fyggResultSize}} 条</td>
            <td width="20%">网贷黑名单</td>
            <td>{{result.retData5.statistic.wdhmdResultSize}} 条</td>
          </tr>
          <tr class="text-left">
            <td width="20%">案件流程</td>
            <td>{{result.retData5.statistic.ajlcResultSize}} 条</td>
            <td width="20%">曝光台</td>
            <td>{{result.retData5.statistic.bgtResultSize}} 条</td>
          </tr>
          <tr v-for="(ret, index) in result.retData5.result" :key="index">
            <td colspan="4">
              <table class="table card-text">
                <tr class="text-left">
                  <td colspan="2"><span class="color-r">{{dataTypeChange(ret.dataType)}}</span></td>
                </tr>
                <tr class="text-left resultRows" v-for="(v,k) in ret" :key="k" v-if="k != 'id'">
                  <td class="mytd" width="25%">{{getKeyName(sourcetArr2,ret.dataType, k)}}</td>
                  <td class="mytd">{{tuomin((v || '&nbsp;'), k)}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <tr v-if='exearr.get7'>
          <td colspan="2">
            <table class="table card-text">
              <tr v-if="result.retData6.retData.length == 0">
                <td>
                  <el-tag>重大税收违法案件警示</el-tag>
                </td>
                <td>无返回数据</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.retData6.retData" :key="index">
                <tr class="text-left">
                  <td colspan="2" width="50%">
                    <el-tag>重大税收违法案件警示</el-tag>
                  </td>
                </tr>
                <tr class="text-left resultRows" v-for="(v,k) in JSON.parse(ret.content)" :key="k">
                  <td class="mytd" width="25%">{{k}} ：</td>
                  <td class="mytd">{{v}}</td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if='exearr.get8'>
          <td colspan="2">
            <table class="table card-text">
              <tr v-if="result.retData7.retData.length == 0">
                <td>
                  <el-tag>政府采购严重违法失信名单</el-tag>
                </td>
                <td>无数据返回</td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in result.retData7.retData" :key="index">
                <tr class="text-left">
                  <td colspan="2" width="50%">
                    <el-tag>政府采购严重违法失信名单</el-tag>
                  </td>
                </tr>
                <tr class="text-left resultRows" v-for="(v,k) in JSON.parse(ret.content)" :key="k">
                  <td class="mytd" width="25%">{{k}} ：</td>
                  <td class="mytd">{{v}}</td>
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
export default {
    name: "Enterprise",
    data () {
        return {
            setArray: [
                {
                    name: "统一社会信用代码信息",
                    label: {
                        get2: true,
                        id: 2
                    }
                },
                {
                    name: "企业工商数据查询",
                    label: {
                        get1: true,
                        id: 1
                    }
                },
                {
                    name: "行政经营许可信息",
                    label: {
                        get3: true,
                        id: 3
                    }
                },
                {
                    name: "企业经营异常名录",
                    label: {
                        get4: true,
                        id: 4
                    }
                },
                {
                    name: "企业涉诉查询-A",
                    label: {
                        get5: true,
                        id: 5
                    }
                },
                {
                    name: "企业涉诉查询-C",
                    label: {
                        get6: true,
                        id: 6
                    }
                },
                {
                    name: "重大税收违法案件警示",
                    label: {
                        get7: true,
                        id: 7
                    }
                },
                {
                    name: "政府采购严重违法失信名单",
                    label: {
                        get8: true,
                        id: 8
                    }
                }
            ],
            sourcetArr: [
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
            ],
            sourcetArr2: [
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
            ],
            checkAll: false,
            isIndeterminate: true,
            rules: {
                mobile: [
                    {
                        validator: this.$validator.mobileValidator,
                        trigger: "blur"
                    }
                ]
            },
            inputFrom: {
                entname: "",
                creditCode: "",
                keyType: "1"
            },
            sons: [],
            resultArr: {
                data: [
                    {
                        entName: "XXX",
                        regNo: "XXX",
                        oRigegNo: "",
                        fName: "张 XX",
                        regCap: "1334.000000",
                        recCap: "",
                        regCapCur: "人民币元",
                        entStatus: "在营（开业）",
                        entType: "有限责任公司",
                        esDate: "2005-05-25",
                        opFrom: "2005-05-25",
                        opTo: "2025-05-24",
                        apprdate: "2016-05-18",
                        dom: "XXX",
                        regorg: "XXX",
                        abuItem: "XXX",
                        cbuItem: "",
                        opScope: "XXX",
                        opScoandForm: "",
                        anCheYear: "2015",
                        changDate: "",
                        canDate: "",
                        revDate: "",
                        anCheDate: "",
                        induStryphyCode: "",
                        induStryphyName: "",
                        induStryCoCode: "652",
                        induStryCoName: "",
                        opLoc: "",
                        sextNodeNum: "",
                        regOrgProvince: "",
                        empNum: "",
                        industryCoAll: "信息系统集成服务",
                        domDistrict: "",
                        tel: "",
                        zsOpScope: "XXX",
                        entNameEng: "",
                        regOrgCode: "",
                        industryPhyAll: "",
                        creditNo: "XXX"
                    }
                ],
                shareholder: [
                    {
                        shaName: "XXX",
                        subConAm: "1334.000000",
                        regCapCur: "人民币元",
                        conForm: "货币",
                        fundedRatio: "100.00%",
                        conDate: "2016-09-14",
                        country: "中国",
                        invaMount: "1"
                    }
                ],
                shareholderPersons: [
                    {
                        name: "XXX",
                        position: "执行董事",
                        sex: "男",
                        personAmount: "3"
                    }
                ],
                legalPersonInvests: [
                    {
                        name: "XX",
                        entName: "XXX",
                        regNo: " XXX",
                        entType: "XXX",
                        regCap: "10.000000",
                        regCapCur: "人民币元",
                        entStatus: "在营（开业）",
                        canDate: "",
                        revDate: "",
                        regOrg: "XXX",
                        subConAm: "9.333000",
                        curRenCy: "人民币元",
                        conForm: "货币",
                        fundedRatio: "93.33%",
                        esDate: "2009-12-24",
                        postCode: "110105",
                        entAmount: "2"
                    }
                ],
                legalPersonPostions: [
                    {
                        name: "XXX",
                        entName: "XXX",
                        regNo: "XXX",
                        entType: "有限责任公司(自然人投资或控股)",
                        regCap: "10.000000",
                        regCapCur: "人民币元",
                        entStatus: "在营（开业）",
                        canDate: "",
                        revDate: "",
                        regOrg: "北京市朝阳区工商行政管理局",
                        position: "经理",
                        lerepSign: "是",
                        esDate: "2009-12-24",
                        postCode: "110105",
                        entAmount: "19"
                    }
                ],
                enterpriseInvests: [
                    {
                        entName: "XXX",
                        regNo: "XXX",
                        entType: "有限责任公司(自然人投资或控股的法人独资)",
                        regCap: "5500.000000",
                        regCapCur: "人民币元",
                        entStatus: "注销",
                        canDate: "2018-01-17",
                        revDate: "",
                        regOrg: "XXX",
                        subConAm: "5500.000000",
                        conGroCur: "",
                        conFrom: "货币",
                        fundedRation: "100.00%",
                        binvvAmount: "2",
                        name: "XXX",
                        postCode: "XXX",
                        openingDate: "2016-10-27",
                        creditCode: "XXX"
                    }
                ],
                alterInfos: [
                    {
                        altDate: "2016-05-18",
                        altItem: "住所变更",
                        altBe: "XXX",
                        altAf: "XXX"
                    }
                ],
                filiations: [
                    {
                        brName: "XXX 分公司",
                        brRegNo: "XXX",
                        brPrincipal: "",
                        brAddr: "",
                        brnCreditCode: "",
                        brnRegOrg: "福建省福州市台江区市场监督管理局",
                        brpripId: "XXX"
                    }
                ],
                morguaInfos: [
                    {
                        guaName: "XXX",
                        comprehensiveDetail: "XX",
                        owner: "XXX",
                        remark: "XXX",
                        regNo: "XXX"
                    }
                ],
                punishBreaks: [
                    {
                        caseCode: "XXX",
                        caseState: "XXX",
                        name: "XXX",
                        type: "XXX",
                        sex: "",
                        age: "",
                        cardNum: "XXX",
                        ysfzd: "",
                        businessEntity: "XXX",
                        regDate: "2015-09-17",
                        publishDate: "2015-11-10",
                        courName: "XXX",
                        areaName: "XXX",
                        gistId: "XXX",
                        gistUnit: "XXX",
                        duty: "XXX",
                        disruptTypeName: "XXX",
                        performAnce: "XXX",
                        performedPart: "",
                        unPerformPart: "",
                        exitDate: "2016-08-16",
                        focusNumber: ""
                    }
                ],
                punished: [
                    {
                        caseCode: "XXX",
                        name: "XXX",
                        cardNum: "XXX",
                        sex: "",
                        age: "",
                        areaName: "",
                        ysfzd: "",
                        courtName: "XXX",
                        regDate: "2013-12-27",
                        caseState: "XXX",
                        execMoney: "4600"
                    }
                ],
                sharesFrosts: [
                    {
                        froDocNo: "XXX",
                        froAuth: "XXX",
                        froFrom: "XXX",
                        froTo: "XXX",
                        froAm: "XXX",
                        thawAuth: "XXX",
                        thawDocNo: "XXX",
                        thawDate: "XXX",
                        thawComment: "XXX"
                    }
                ],
                liquidations: [
                    {
                        ligEntity: "XXX",
                        ligPrincipal: "XXX",
                        liQMen: "XXX",
                        liGSt: "XXX",
                        ligEndDate: "XXX",
                        debtTranee: "XXX",
                        claimTranee: "XXX",
                        mobile: "XXX",
                        address: "XXX"
                    }
                ],
                caseInfos: [
                    {
                        penDecNo: "榕公(网)行罚决 201424",
                        penDecIssDate: "2014-12-05",
                        penAuth: "",
                        penType: ""
                    }
                ],
                mortgageAlter: [
                    {
                        alterDate: "XXX",
                        alterDetail: "XXX",
                        RegNo: "XXX"
                    }
                ],
                mortgageCancels: [
                    {
                        cancelDate: "XXX",
                        cancelReason: "XXX",
                        regNo: "XXX"
                    }
                ],
                mortgageDebtors: [
                    {
                        startDate: "XXX",
                        endtDate: "XXX",
                        amount: "XXX",
                        range: "XXX",
                        remark: "XXX",
                        type: "XXX",
                        regNo: "XXX"
                    }
                ],
                mortgagePersons: [
                    {
                        credentialNo: "XXX",
                        credentialType: "XXX",
                        domain: "XXX",
                        name: "XXX",
                        regNo: "XXX"
                    }
                ],
                mortgageRegisters: [
                    {
                        startDate: "XXX",
                        endDate: "XXX",
                        amount: "XXX",
                        range: "XXX",
                        type: "XXX",
                        regNo: "XXX",
                        registerDate: "XXX",
                        registerOrg: "XXX",
                        provinceNo: "XXX",
                        status: "XXX"
                    }
                ],
                breakLaw: [
                    {
                        inDate: "",
                        inReason: "",
                        inRegOrg: "",
                        inSn: "",
                        outDate: "",
                        outReason: "",
                        outRegOrg: "",
                        outSn: ""
                    }
                ],
                exceptionLists: [
                    {
                        name: "XXX",
                        type: "XXX",
                        inDate: "XXX",
                        inReason: "XXX",
                        outDate: "XXX",
                        outReason: "XXX",
                        regNo: "XXX",
                        shxydm: "XXX",
                        inOrg: "XXX",
                        outOrg: "XXX"
                    }
                ],
                orgBasics: [
                    {
                        jgdm: "XXX",
                        jgdz: "XXX",
                        jgmc: "XXX",
                        zybz: "XXX"
                    }
                ],
                orgDetails: [
                    {
                        bzjg: "",
                        bzrq: "",
                        fddbr: "",
                        jgdm: "",
                        jgdz: "",
                        jglx: "",
                        jgmc: "",
                        xzqh: "",
                        zcrq: "",
                        zfrq: "",
                        zybz: ""
                    }
                ],
                equityInfos: [
                    {
                        stkPawnCzamt: "150.0 万元",
                        stkPawnCzcerno: "非公示项",
                        stkPawnCzper: "XXX",
                        stkPawnDate: "2012-11-14",
                        stkPawnRegno: "XXX",
                        stkPawnStatus: "无效",
                        stkPawnZqcerno: "XXX",
                        stkPawnZqper: "XXX",
                        content: "XXX"
                    }
                ],
                equityChangeInfos: [
                    {
                        stkPawnBgnr: "",
                        stkPawnBgrq: "2012-11-14",
                        content: "XXX"
                    }
                ],
                cancellationOfInfos: [
                    {
                        stkPawnDate: "2012-11-14",
                        stkPawnRes: "质权人放弃质权",
                        content: "XXX"
                    }
                ],
                tradeMarks: [
                    {
                        appDate: "2014-12-26",
                        beginDate: "2016-04-28",
                        checkDate: "2016-01-27",
                        endDate: "2026-04-27",
                        markCodeKey: "16024230",
                        markImage: "",
                        markName: "乐蜜",
                        markTypeNew: "未知",
                        regDate: "2016-04-28",
                        typeDetailDes: "放映设备；眼镜",
                        xianGmuNew: ""
                    }
                ]
            },
            result: {
                example: true,
                resultType: "0000",
                status: "数据存在",
                retData: [
                    {
                        regCode: "33***********90",
                        credCode: "913*******06",
                        orgCode: "1********0",
                        entName: "浙江省*****公司",
                        taxCode: ""
                    }
                ],
                retData2: [
                    {
                        regCode: "33***********90",
                        credCode: "913*******06",
                        orgCode: "1********0",
                        entName: "浙江省*****公司",
                        taxCode: ""
                    }
                ],
                retData3: [
                    {
                        content:
                            '{"经营异常名录ID":"400000087863278995","主体身份代码":"340000000033896348","企业名称":"安徽双语学习报社","统一社会信用代码":"913400005957472253","注册号":"340000000056535","法定代表人":"陈万瑞","证件类型":"","列入经营异常名录原因类型":"1","列入经营异常名录原因类型名称":"未依照《企业信息公示暂行条例》第八条规定的期限公示年度报告的","设立日期":"2018/07/03","列入决定机关":"340000","列入决定机关名称":"安徽省工商行政管理局","最新更新日期":"2018/08/05"}'
                    }
                ],
                retData4: {
                    example: true,
                    resultType: "000000",
                    name: "乐视网信息技术(北京)股份有限公司",
                    statistic: {
                        ktggResultSize: 757,
                        cpwsResultSize: 2584,
                        zxggResultSize: 88,
                        sxggResultSize: 9,
                        fyggResultSize: 23,
                        wdhmdResultSize: 0,
                        ajlcResultSize: 740,
                        bgtResultSize: 5
                    },
                    result: [
                        {
                            title: "乐视网信息技术（北京）股份有限公司",
                            name: "乐视网信息技术（北京）股份有限公司",
                            caseStatus: "0",
                            identificationNO: "76938905-1",
                            executionTarget: 97209,
                            id:
                                "c2018110108zhi16681_t20181022_plswxxjsbjgfyxgs@cG5hbWU65LmQ6KeG572R5L%2Bh5oGv5oqA5pyv77yI5YyX5Lqs77yJ6IKh5Lu95pyJ6ZmQ5YWs5Y%2B4",
                            recordTime: 1540137600000,
                            content:
                                "资金 乐视网信息技术（北京）股份有限公司 d 7693...",
                            caseNO: "（2018）京0108执16681号",
                            court: "北京市海淀区人民法院",
                            dataType: "ZXGG",
                            time: "2018年10月22日"
                        },
                        {
                            title: "乐视网信息技术（北京）股份有限公司",
                            name: "乐视网信息技术（北京）股份有限公司",
                            caseStatus: "0",
                            identificationNO: "76938905-1",
                            executionTarget: 150160,
                            id:
                                "c2018110108zhi16682_t20181022_plswxxjsbjgfyxgs@cG5hbWU65LmQ6KeG572R5L%2Bh5oGv5oqA5pyv77yI5YyX5Lqs77yJ6IKh5Lu95pyJ6ZmQ5YWs5Y%2B4",
                            recordTime: 1540137600000,
                            content:
                                "资金 乐视网信息技术（北京）股份有限公司 d 7693...",
                            caseNO: "（2018）京0108执16682号",
                            court: "北京市海淀区人民法院",
                            dataType: "ZXGG",
                            time: "2018年10月22日"
                        }
                    ],
                    pagination: {
                        pageIndex: "1",
                        totalPage: "211",
                        resultSize: "4206",
                        pageSize: "20"
                    }
                },
                retData5: {
                    example: true,
                    resultType: "000000",
                    name: "乐视网信息技术(北京)股份有限公司",
                    statistic: {
                        ktggResultSize: 757,
                        cpwsResultSize: 2584,
                        zxggResultSize: 88,
                        sxggResultSize: 9,
                        fyggResultSize: 23,
                        wdhmdResultSize: 0,
                        ajlcResultSize: 740,
                        bgtResultSize: 5
                    },
                    result: [
                        {
                            title: "乐视网信息技术（北京）股份有限公司",
                            name: "乐视网信息技术（北京）股份有限公司",
                            caseStatus: "0",
                            identificationNO: "76938905-1",
                            executionTarget: 97209,
                            id:
                                "c2018110108zhi16681_t20181022_plswxxjsbjgfyxgs@cG5hbWU65LmQ6KeG572R5L%2Bh5oGv5oqA5pyv77yI5YyX5Lqs77yJ6IKh5Lu95pyJ6ZmQ5YWs5Y%2B4",
                            recordTime: 1540137600000,
                            content:
                                "资金 乐视网信息技术（北京）股份有限公司 d 7693...",
                            caseNO: "（2018）京0108执16681号",
                            court: "北京市海淀区人民法院",
                            dataType: "ZXGG",
                            time: "2018年10月22日"
                        },
                        {
                            title: "乐视网信息技术（北京）股份有限公司",
                            name: "乐视网信息技术（北京）股份有限公司",
                            caseStatus: "0",
                            identificationNO: "76938905-1",
                            executionTarget: 150160,
                            id:
                                "c2018110108zhi16682_t20181022_plswxxjsbjgfyxgs@cG5hbWU65LmQ6KeG572R5L%2Bh5oGv5oqA5pyv77yI5YyX5Lqs77yJ6IKh5Lu95pyJ6ZmQ5YWs5Y%2B4",
                            recordTime: 1540137600000,
                            content:
                                "资金 乐视网信息技术（北京）股份有限公司 d 7693...",
                            caseNO: "（2018）京0108执16682号",
                            court: "北京市海淀区人民法院",
                            dataType: "ZXGG",
                            time: "2018年10月22日"
                        }
                    ],
                    pagination: {
                        pageIndex: "1",
                        totalPage: "211",
                        resultSize: "4206",
                        pageSize: "20"
                    }
                },
                retData6: {
                    example: true,
                    resultType: "0000",
                    status: "数据存在",
                    retData: [
                        {
                            content:
                                '{"案件上报期":"","纳税人名称":"安徽天鹰实业有限公司","纳税人识别码":"341124559237375","组织机构代码":"559237375","注册地址":"全椒县经济开发区纬三路","法定代表人或者负责人姓名":"周建伟","法定代表人或者负责人性别":"男","法定代表人或者负责人证件名称":"","负有直接责任的财务负责人姓名":"","负有直接责任的财务负责人性别":"","负有直接责任的财务负责人证件名称":"","负有直接责任的财务负责人证件号码":"","负有直接责任的中介机构信息及其从业人员信息":"","案件性质":"偷税","主要违法事实":"经全椒县地方税务局稽查局检查,发现其在2013年01月01日至2015年12月31日期间,主要存在以下问题:采取偷税手段,不缴或者少缴应纳税款377.14万元。","相关法律依据及税务处理处罚情况":"依照《中华人民共和国税收征收管理法》等相关法律法规的有关规定,对其处以追缴税款377.14万元的行政处理、处以罚款377.14万元的行政处罚,并依法移送司法机关。","最新更新日期":"2018/08/01 17:05:24.625"}'
                        }
                    ]
                },
                retData7: {
                    example: true,
                    resultType: "0000",
                    status: "数据存在",
                    retData: [
                        {
                            content:
                                '{"编号":"948","统一社会信用代码或组织机构代码":"91320200339140889D","地址":"无锡市梁溪区飞宏路58号309（通信地址：无锡市锡山区八士南庄桥90号）"}'
                        }
                    ]
                }
            },
            exearr: {
                get1: false,
                get2: false,
                get3: false,
                get4: false,
                get5: false,
                get6: false,
                get7: false,
                get8: false
            }
        };
    },
    watch: {
        sons (val) {
            this.exearr = {
                get1: false,
                get2: false,
                get3: false,
                get4: false,
                get5: false,
                get6: false,
                get7: false,
                get8: false
            };
        }
    },
    methods: {
        limitarr: function (val) {
            let newarr = val.slice(0, 9);
            return newarr;
        },
        arrjson: function (val) {
            let newarr = [];
            newarr.push(val);
            return newarr;
        },
        handleCheckAllChange (val) {
            this.sons = val
                ? this.setArray.map(v => {
                      return v.label;
                  })
                : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange (value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.setArray.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.setArray.length;
        },
        getone: function () {
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
                        .get("api/rip/businessData", {
                            params: {
                                key: vm.inputFrom.entname,
                                keyType: vm.inputFrom.keyType
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.status && res.data) {
                                vm.resultArr = res.data.data;
                                vm.resultArr.exe = true;
                                vm.resultArr.basic = vm.arrjson(
                                    res.data.data.basic
                                );
                                vm.resultArr.orgDetails = vm.arrjson(
                                    res.data.data.orgDetails
                                );
                                vm.resultArr.tradeMarks = vm.limitarr(
                                    res.data.data.tradeMarks
                                );
                                vm.exearr.get2 = true;
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error",
                                    duration: "5000"
                                });
                            }
                            loading.close();
                        });
                }
            });
        },
        gettow: function () {
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
                        .get("api/rip/uniformCreditCode", {
                            params: {
                                entname: vm.inputFrom.entname,
                                creditCode: vm.inputFrom.creditCode
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.data.code == "000000") {
                                if (res.data.retData) {
                                    vm.result.retData = res.data.retData;
                                    vm.exearr.get1 = true;
                                } else {
                                    vm.result.retData = res.data.retData;
                                }
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error",
                                    duration: "5000"
                                });
                            }
                            loading.close();
                        });
                }
            });
        },
        getThree: function () {
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
                        .get("api/rip/administrativeLicensing", {
                            params: {
                                entname: vm.inputFrom.entname,
                                creditCode: vm.inputFrom.creditCode
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.data.code == "000000") {
                                vm.exearr.get3 = true;
                                if (res.data.retData) {
                                    console.log(res.data.retData);
                                    vm.result.retData2 = res.data.retData;
                                } else {
                                    vm.result.retData2 = {
                                        example: false,
                                        status: "数据不存在",
                                        data: res.data.retData
                                    };
                                }
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error",
                                    duration: "5000"
                                });
                            }
                            loading.close();
                        });
                }
            });
        },
        getFour: function () {
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
                        .get("api/rip/enterpriseRecord", {
                            params: {
                                entname: vm.inputFrom.entname,
                                creditCode: vm.inputFrom.creditCode,
                                dataType: "5"
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.data.code == "000000") {
                                vm.exearr.get4 = true;
                                if (res.data.retData) {
                                    vm.result.retData3 = res.data.retData;
                                } else {
                                    vm.result = {
                                        example: false,
                                        resultType: "0000",
                                        status: "数据不存在"
                                    };
                                    vm.result.retData3 = res.data.retData;
                                }
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error",
                                    duration: "5000"
                                });
                            }
                            loading.close();
                        });
                }
            });
        },
        getFive: function () {
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
                        .get("api/rip/enterpriseLitigationInquiry", {
                            params: {
                                name: vm.inputFrom.entname,
                                pageIndex: 1
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.data.success) {
                                vm.result.retData4.name = res.data.data.name;
                                vm.result.retData4.idCard =
                                    res.data.data.identityCard;
                                vm.result.retData4.result =
                                    res.data.data.pageData;
                                vm.result.retData4.statistic =
                                    res.data.data.statistic;
                                vm.result.retData4.example = false;
                                vm.exearr.get5 = true;
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
        },
        getSix: function () {
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
                        .get("api/rip/enterpriseLitigationInquiryC", {
                            params: {
                                name: vm.inputFrom.entname,
                                pageIndex: 1
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.data.success) {
                                vm.result.retData5.name = res.data.data.name;
                                vm.result.retData5.statistic =
                                    res.data.data.statistic;
                                vm.result.retData5.result =
                                    res.data.data.pageData;
                                vm.exearr.get6 = true;
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
        },
        getseven: function () {
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
                        .get("api/rip/enterpriseRecord", {
                            params: {
                                entname: vm.inputFrom.entname,
                                creditCode: vm.inputFrom.creditCode,
                                dataType: "6"
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.data.code == "000000") {
                                vm.exearr.get7 = true;
                                if (res.data.retData) {
                                    vm.result.retData6 = {
                                        example: false,
                                        resultType: "0000",
                                        status: "数据存在",
                                        retData: res.data.retData
                                    };
                                } else {
                                    vm.result6.retData = {
                                        example: false,
                                        resultType: "0000",
                                        status: "数据不存在",
                                        retData: res.data.retData
                                    };
                                }
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error",
                                    duration: "5000"
                                });
                            }
                            loading.close();
                        });
                }
            });
        },
        getEight: function () {
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
                        .get("api/rip/enterpriseRecord", {
                            params: {
                                entname: vm.inputFrom.entname,
                                creditCode: vm.inputFrom.creditCode,
                                dataType: "7"
                            },
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.data.code == "000000") {
                                vm.exearr.get8 = true;
                                if (res.data.retData) {
                                    vm.result.retData7 = {
                                        example: false,
                                        resultType: "0000",
                                        status: "数据存在",
                                        retData: res.data.retData
                                    };
                                } else {
                                    vm.result.retData7 = {
                                        example: false,
                                        resultType: "0000",
                                        status: "数据不存在",
                                        retData: res.data.retData
                                    };
                                }
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error",
                                    duration: "5000"
                                });
                            }
                            loading.close();
                        });
                }
            });
        },
        onSubmit: function () {
            for (let i = 0; i < this.sons.length; i++) {
                if (this.sons[i].get1) {
                    this.getone();
                }
                if (this.sons[i].get2) {
                    this.gettow();
                }
                if (this.sons[i].get3) {
                    this.getThree();
                }
                if (this.sons[i].get4) {
                    this.getFour();
                }
                if (this.sons[i].get5) {
                    this.getFive();
                }
                if (this.sons[i].get6) {
                    this.getSix();
                }
                if (this.sons[i].get7) {
                    this.getseven();
                }
                if (this.sons[i].get8) {
                    this.getEight();
                }
            }
        },
        getKeyName (sourcetarr, sourcet, name) {
            var i = sourcetarr.find(n => n.id == sourcet);
            return i.kvs[name] || "";
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
                return v;
            } else if (["caseStatus"].includes(keyName)) {
                if (v == "1") {
                    return "结案";
                } else {
                    return "执行中";
                }
            } else {
                return v;
            }
        }
    }
};
</script>

<style>
.mar-left {
    margin-left: 2%;
}

.el-select {
    display: block;
}
</style>
