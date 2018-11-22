<template>
  <div id="BusinessData">
    <el-card style="margin-bottom:25px">
      <div slot="header" class="clearfix">
        <span>企业工商数据查询</span>
      </div>
      <el-form :model="inputFrom" :rules="rules" ref="inputFrom" id="inputForm">
        <el-row>

          <el-col :span="10">
            <el-form-item label="关键字(输入企业名称或工商注册号，统一社会信用代码)" label-width="0" prop="key" class="form-item">
              <el-input v-model="inputFrom.key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="3" :span="4">
            <el-form-item label="关键字类型">
              <el-select v-model="inputFrom.keyType" placeholder="请选择关键字类型">
                <el-option label="企业名称" value="1"></el-option>
                <el-option label="工商注册号" value="2">工商注册号</el-option>
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
            <el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '企业工商数据查询'})">打印</el-button>
          </el-col>
        </el-row>
      </div>
      <table class="table card-text">
        <tr class="text-left">
          <td width="20%">查询结果</td>
          <td>
            <el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag>
          </td>
        </tr>

        <tr v-if="resultArr.data">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>基本信息</el-tag>
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
        <tr v-if="resultArr.shareholder.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>股东信息</el-tag>
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
              <table class="table card-text" v-if="resultArr.shareholder.length != 0">
                <tr class="text-left">
                  <td class="mytd" width="20%">股东总数量 : </td>
                  <td class="mytd">{{resultArr.shareholder[0].invaMount}}</td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if="resultArr.shareholderPersons.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>高管信息</el-tag>
                </td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in resultArr.shareholderPersons" :key="index">
                <tr class="text-left resultRows">
                  <td class="mytd" width="20%">姓名 ：</td>
                  <td class="mytd">{{ret.name}}</td>
                  <td class="mytd" width="20%">性别 ：</td>
                  <td class="mytd">{{ret.sex}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="20%">职位 ：</td>
                  <td class="mytd">{{ret.position}}</td>
                  <td class="mytd" width="20%"></td>
                  <td class="mytd"></td>
                </tr>
              </table>
              <table class="table card-text" v-if="resultArr.shareholderPersons.length != 0">
                <tr class="text-left">
                  <td class="mytd" width="20%">总人数 : </td>
                  <td class="mytd">{{resultArr.shareholderPersons[0].personAmount}}</td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if="resultArr.legalPersonInvests.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>法人对外投资信息</el-tag>
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
              <table class="table card-text" v-if="resultArr.legalPersonInvests.length != 0">
                <tr class="text-left">
                  <td class="mytd" width="20%">企业总数量 ：</td>
                  <td class="mytd">{{resultArr.legalPersonInvests[0].entAmount}}</td>
                  <td class="mytd" width="20%"></td>
                  <td class="mytd"></td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if="resultArr.legalPersonPostions.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>法人其他任职信息</el-tag>
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
              <table class="table card-text" v-if="resultArr.legalPersonPostions.length != 0">
                <tr class="text-left">
                  <td class="mytd" width="20%">企业总数量 ：</td>
                  <td class="mytd">{{resultArr.legalPersonPostions[0].entAmount}}</td>
                  <td class="mytd" width="20%"></td>
                  <td class="mytd"></td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if="resultArr.enterpriseInvests.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>企业对外投资信息</el-tag>
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
              <table class="table card-text" v-if="resultArr.enterpriseInvests.length != 0">
                <tr class="text-left">
                  <td class="mytd" width="20%">企业总数量 ：</td>
                  <td class="mytd">{{resultArr.enterpriseInvests[0].binvvAmount}}</td>
                  <td class="mytd" width="20%"></td>
                  <td class="mytd"></td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if="resultArr.alterInfos.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>变更信息</el-tag>
                </td>
              </tr>
              <table class="table card-text" v-for="(ret, index) in resultArr.alterInfos" :key="index">
                <tr class="text-left resultRows">
                  <td class="mytd" width="20%">变更日期 ：</td>
                  <td class="mytd">{{ret.altDate}}</td>
                  <td class="mytd" width="20%">变更事项 ：</td>
                  <td class="mytd">{{ret.altItem}}</td>
                </tr>
                <tr class="text-left resultRows">
                  <td class="mytd" width="20%">变更前内容 ：</td>
                  <td class="mytd">{{ret.altBe}}</td>
                  <td class="mytd" width="20%">变更后内容 : </td>
                  <td class="mytd">{{ret.altAf}}</td>
                </tr>
              </table>
            </table>
          </td>
        </tr>
        <tr v-if="resultArr.filiations.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>分支机构信息</el-tag>
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
        <tr v-if="resultArr.morguaInfos.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>动产抵押物信息</el-tag>
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
        <tr v-if="resultArr.punishBreaks.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>失信被执行人信息</el-tag>
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
        <tr v-if="resultArr.punished.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>被执行人信息</el-tag>
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
        <tr v-if="resultArr.sharesFrosts.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>股权冻结历史信息</el-tag>
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
        <tr v-if="resultArr.liquidations.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>清算信息</el-tag>
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
        <tr v-if="resultArr.caseInfos.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>行政处罚历史信息</el-tag>
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
        <tr v-if="resultArr.mortgageAlter.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>动产抵押-变更信息</el-tag>
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
        <tr v-if="resultArr.mortgageCancels.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>动产抵押-注销信息</el-tag>
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
        <tr v-if="resultArr.mortgageDebtors.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>动产抵押-被担保主债权信息</el-tag>
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
        <tr v-if="resultArr.mortgagePersons.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>动产抵押-抵押权人信息</el-tag>
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
        <tr v-if="resultArr.mortgageRegisters.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>动产抵押-登记信息节</el-tag>
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
        <tr v-if="resultArr.breakLaw.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>严重违法信息</el-tag>
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
        <tr v-if="resultArr.exceptionLists.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>企业异常名录</el-tag>
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
        <tr v-if="resultArr.orgBasics.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>组织机构代码</el-tag>
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
        <tr v-if="resultArr.orgDetails.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>股权出质信息详细</el-tag>
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
        <tr v-if="resultArr.equityInfos.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>股权出质信息</el-tag>
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
        <tr v-if="resultArr.equityChangeInfos.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>股权出质信息-变更信息</el-tag>
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
        <tr v-if="resultArr.cancellationOfInfos.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>股权出质信息-注销信息</el-tag>
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
        <tr v-if="resultArr.tradeMarks.length != 0">
          <td colspan="2">
            <table class="table card-text">
              <tr class="text-left">
                <td colspan="2">
                  <el-tag>注册商标</el-tag>
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
    </el-card>
  </div>
</template>

<script>
export default {
    name: "BusinessData",
    components: {},
    data () {
        return {
            inputFrom: {
                key: "",
                keyType: "1"
            },
            result: {
                example: true,
                resultType: "0000"
            },
            rules: {
                key: [
                    {
                        required: true,
                        message: "请输入企业名称或统一社会信用代码",
                        trigger: "blur"
                    }
                ],
                keyType: [
                    {
                        required: true,
                        message: "请选择查询类型",
                        trigger: "blur"
                    }
                ]
            },
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
            resultArrlist: [],
            Reference: []
        };
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
                        .get("api/rip/businessData", {
                            params: vm.inputFrom,
                            headers: {
                                authorization: vm.$db.get("authorization")
                            }
                        })
                        .then(function (res) {
                            if (res.status && res.data) {
                                vm.result.example = false;
                                vm.resultArr = res.data.data;
                                vm.resultArr.basic = vm.arrjson(
                                    res.data.data.basic
                                );
                                vm.resultArr.orgDetails = vm.arrjson(
                                    res.data.data.orgDetails
                                );
                                vm.resultArr.tradeMarks = vm.limitarr(
                                    res.data.data.tradeMarks
                                );
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message:
                                        "请检查关键字与关键字类型是否填写正确",
                                    type: "error",
                                    duration: "5000"
                                });
                            }
                            loading.close();
                        });
                }
            });
        }
    },
    mounted () {}
};
</script>
