<template>
    <div>
        <el-card style="margin-bottom:25px">
            <div slot="header" class="clearfix">
                <span>综合查询（个人）</span>
            </div>
            <el-form :model="inputForm" :rules="rules" ref="inputForm" id="inputForm">
                <el-row>
                    <el-col :span="10" v-if="getInputSet().has('name')">
                        <el-form-item label="姓名" label-width="0" prop="name" class="form-item">
                            <el-input v-model="inputForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" v-if="getInputSet().has('idCard')">
                        <el-form-item label="身份证" label-width="0" prop="idCard" class="form-item">
                            <el-input v-model="inputForm.idCard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" v-if="getInputSet().has('month')">
                        <el-form-item label="查询几月内的数据" label-width="0" prop="month" class="form-item">
                            <el-select v-model="inputForm.month" placeholder="请选择">
                                <el-option label="3个月内" value="3"></el-option>
                                <el-option label="6个月内" value="6"></el-option>
                                <el-option label="12个月内" value="12"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" v-if="getInputSet().has('passportNo')">
                        <el-form-item label="护照号(国际航班需要)" label-width="0" prop="name" class="form-item">
                            <el-input v-model="inputForm.passportNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" v-if="getInputSet().has('beginDate')">
                        <el-form-item label="有效期起始日期" label-width="0" prop="beginDate" class="form-item">
                            <el-date-picker type="date" v-model="inputForm.beginDate"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" v-if="getInputSet().has('bankCardNo')">
                        <el-form-item label="银行卡号" label-width="0" prop="bankCardNo" class="form-item">
                            <el-input v-model="inputForm.bankCardNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" v-if="getInputSet().has('mobile')">
                        <el-form-item label="手机号码" label-width="0" prop="mobile" class="form-item">
                            <el-input v-model="inputForm.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" v-if="getInputSet().has('AreaCode')">
                        <el-form-item label="城市行政编码" label-width="0" prop="AreaCode" class="form-item">
                            <el-cascader size="large" :options="options" change-on-select v-model="inputForm.AreaCode">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label-width="0" prop="flag" label="查询类别" class="form-item" style="margin: 0px;">
                            <el-checkbox-group v-model="sons">
                                <el-checkbox label="sons1">身份核验</el-checkbox>
                                <el-checkbox label="sons2">运营商验证</el-checkbox>
                                <el-checkbox label="sons3">风险提示</el-checkbox>
                                <el-checkbox label="sons4">交易信用信息</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" v-if="sons.includes('sons1')">
                        <el-form-item label-width="0" prop="sourcet" class="form-item">
                            <span style="margin-right:30px;">身份核验</span>
                            <el-checkbox v-model="selectAll.sourcetArr1" class="select-all" name="selectAll" :indeterminate="isIndeterminate.sourcetArr1" @change="handleCheckAllChange('sourcetArr1')">全选</el-checkbox>
                            <el-checkbox-group v-model="inputForm.sourcet.sourcetArr1" @change="handleCheckedCitiesChange('sourcetArr1')">
                                <el-checkbox v-for="(s, index) in sourcetArr1" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" v-if="sons.includes('sons2')">
                        <el-form-item label-width="0" prop="sourcet" class="form-item">
                            <span style="margin-right:30px;">运营商验证</span>
                            <el-checkbox v-model="selectAll.sourcetArr2" class="select-all" name="selectAll" :indeterminate="isIndeterminate.sourcetArr2" @change="handleCheckAllChange('sourcetArr2')">全选</el-checkbox>
                            <el-checkbox-group v-model="inputForm.sourcet.sourcetArr2" @change="handleCheckedCitiesChange('sourcetArr2')">
                                <el-checkbox v-for="(s, index) in sourcetArr2" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" v-if="sons.includes('sons3')">
                        <el-form-item label-width="0" prop="sourcet" class="form-item">
                            <span style="margin-right:30px;">风险提示</span>
                            <el-checkbox v-model="selectAll.sourcetArr3" class="select-all" :indeterminate="isIndeterminate.sourcetArr3" @change="handleCheckAllChange('sourcetArr3')" name="selectAll">全选</el-checkbox>
                            <el-checkbox-group v-model="inputForm.sourcet.sourcetArr3" @change="handleCheckedCitiesChange('sourcetArr3')">
                                <el-checkbox v-for="(s, index) in sourcetArr3" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" v-if="sons.includes('sons4')">
                        <el-form-item label-width="0" prop="sourcet" class="form-item">
                            <span style="margin-right:30px;">交易信用信息</span>
                            <el-checkbox v-model="selectAll.sourcetArr4" class="select-all" :indeterminate="isIndeterminate.sourcetArr4" @change="handleCheckAllChange('sourcetArr4')" name="selectAll">全选</el-checkbox>
                            <el-checkbox-group v-model="inputForm.sourcet.sourcetArr4" @change="handleCheckedCitiesChange('sourcetArr4')">
                                <el-checkbox v-for="(s, index) in sourcetArr4" :key="index" :label="s" name="sourcet">{{s.name}}</el-checkbox>
                            </el-checkbox-group>
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
                    <!-- <el-col :span="22"><span>{{result.example ? '查询样例': '查询结果'}}</span></el-col> -->
                    <el-col :span="2" class="no-print">
                        <el-button type="warning" icon="el-icon-printer" plain class="ext-button" @click="$emit('print', {title: '个人综合查询'})">打印</el-button>
                    </el-col>
                </el-row>
            </div>
            <table class="table card-text">
                <!-- <tr class="text-left">
          <td width="20%">查询结果</td>
          <td><el-tag :type="result.resultType | resultLogoFmt" class="tag">{{result.resultType | resultSuccessFmt}}</el-tag></td>
      </tr> -->
                <!-- <tr class="text-left">
          <td width="20%">手机号码</td>
          <td>{{result.mobile | handleMobile()}}</td>
      </tr> -->
                <tr>
                    <td colspan="2">
                        <table class="table card-text" v-if="exearr.exe1">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>身份核验-身份证二要素</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">匹配结果</td>
                                <td>
                                    <el-tag :type="resultSuccess('sourcetArr1',0).logo" class="tag">{{resultSuccess('sourcetArr1',0).name}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr1[0].name}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr1[0].idNumber}}</td>
                            </tr>
                        </table>

                        <table class="table card-text" v-if="exearr.exe2">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>身份核验-失效身份证一致性验证</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">匹配结果</td>
                                <td>
                                    <el-tag :type="resultSuccess('sourcetArr1',1).logo" class="tag">{{resultSuccess('sourcetArr1',1).name}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr1[1].name}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr1[1].idCard}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>有效期起始日期</td>
                                <td>{{resultData.sourcetArr1[1].beginDate}}</td>
                            </tr>
                        </table>

                        <table class="table card-text" v-if="exearr.exe3">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>身份核验-银行三要素</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">匹配结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr1[2].success | isSuccessLogoFmt" class="tag">{{resultData.sourcetArr1[2].success
                                        | isConsistentFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr1[2].name | handleName}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr1[2].idNumber}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>银行卡号</td>
                                <td>{{resultData.sourcetArr1[2].bankCardNo | handleBankCardNo}}</td>
                            </tr>
                        </table>

                        <table class="table card-text" v-if="exearr.exe4">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>身份核验-银行卡四要素</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">匹配结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr1[3].success | isSuccessLogoFmt" class="tag">{{resultData.sourcetArr1[3].success
                                        | isConsistentFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr1[3].name | handleName}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr1[3].idNumber}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>银行卡号</td>
                                <td>{{resultData.sourcetArr1[3].bankCardNo | handleBankCardNo}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr1[3].mobile | handleMobile}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe5">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>身份核验-开户行查询</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">匹配结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr1[4].success | isSuccessLogoFmt" class="tag">{{resultData.sourcetArr1[4].success
                                        | isSuccessFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>银行卡号</td>
                                <td>{{resultData.sourcetArr1[4].bankCardNo | handleBankCardNo}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>开户银行</td>
                                <td>{{resultData.sourcetArr1[4].accountBank}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>银行卡类型</td>
                                <td>{{resultData.sourcetArr1[4].accountType}}</td>
                            </tr>
                            <tr>

                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe6">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>运营商验证-运营商二要素认证</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">匹配结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr2[0].success | isSuccessLogoFmt" class="tag">{{resultData.sourcetArr1[4].success
                                        | isSuccessFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr2[0].name}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr2[0].mobile}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机运营商</td>
                                <td>{{resultData.sourcetArr2[0].operator}}</td>
                            </tr>
                            <tr>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe7">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>运营商验证-运营商三要素认证</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">匹配结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr2[1].resultType | resultLogoFmt" class="tag">{{resultData.sourcetArr2[1].resultType | resultTypeFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr2[1].name | handleName}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr2[1].mobile | handleMobile}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr2[1].idNumber}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机运营商</td>
                                <td>{{resultData.sourcetArr2[1].operator}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe8">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>运营商手机位置核验</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">查询结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr2[2].resultType | resultLogoFmt" class="tag">{{resultData.sourcetArr2[2].resultType | resultSuccessFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr2[2].Mobile}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>数据是否存在</td>
                                <td>{{resultData.sourcetArr2[2].status}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>地区</td>
                                <td>{{CodeToText[resultData.sourcetArr2[2].AreaCode]}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机运营商位置情况</td>
                                <td>{{handleCheckResult(resultData.sourcetArr2[2].CheckResult)}}</td>
                            </tr>
                            <tr class="text-left" v-if="resultData.sourcetArr2[2].resultType == '3'">
                                <td>报错信息</td>
                                <td>{{resultData.sourcetArr2[2].errorMsg}}</td>
                            </tr>

                        </table>
                        <table class="table card-text" v-if="exearr.exe9">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>手机在网时长</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">查询结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr2[3].resultType | resultLogoFmt" class="tag">{{resultData.sourcetArr2[3].resultType | resultSuccessFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr2[3].mobile | handleMobile}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机在网时长</td>
                                <td>{{resultData.sourcetArr2[3].inNetTime}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe10">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>手机在网状态</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">查询结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr2[4].resultType | resultLogoFmt" class="tag">{{resultData.sourcetArr2[4].resultType | resultSuccessFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr2[4].mobile | handleMobile}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机运营商</td>
                                <td>{{resultData.sourcetArr2[4].operator}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机在网状态</td>
                                <td>{{resultData.sourcetArr2[4].inNetStatus}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe11">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>手机消费档次</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">查询结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr2[5].resultType | resultLogoFmt" class="tag">{{resultData.sourcetArr2[5].resultType | resultSuccessFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr2[5].mobile | handleMobile}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>所属省份</td>
                                <td>{{resultData.sourcetArr2[5].province}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>所属城市</td>
                                <td>{{resultData.sourcetArr2[5].city}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>所属运营商</td>
                                <td>{{resultData.sourcetArr2[5].operator}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>消费档次等级代号</td>
                                <td>{{resultData.sourcetArr2[5].gradeCode}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>消费档次区间</td>
                                <td>{{resultData.sourcetArr2[5].gradeDesc}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>状态</td>
                                <td>{{resultData.sourcetArr2[5].status}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe12">
                            <tr>
                                <td colspan="2">
                                    <el-tag>
                                        综合风险概述
                                    </el-tag>
                                </td>
                            </tr>
                            <tr v-for="list in resultData.sourcetArr3[0].totalCounts" :key="list.blackType">
                                <td>{{list.blackType | blackTypefilters}}</td>
                                <td>{{list.blackCount | blackCountfilters}}</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <el-tag>
                                        明细
                                    </el-tag>
                                </td>
                            </tr>
                            <tr>
                                <td v-for="list in resultArr" :key="list.label">{{list.label}}</td>
                            </tr>
                            <tr v-for="(key,i) in resultData.sourcetArr3[0].Reference" :key="i">
                                <td v-for="(j,index) in resultArr" :key="index">{{key[j.prop]|Refer}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe13">
                            <tr>
                                <td colspan="2">
                                    <el-tag>
                                        不良信息排查
                                    </el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">查询结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr3[1].resultType | resultLogoFmt" class="tag">{{resultData.sourcetArr3[1].resultType | resultSuccessFmt}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr3[1].name | handleName}}</td>
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr3[1].idCard | handleIdCard}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>是否在逃(用户选择)</td>
                                <td>{{resultData.sourcetArr3[1].escape | isOrNoFmt}}</td>
                                <td>比对结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr3[1].escapeCompared | fuckyizhi">{{resultData.sourcetArr3[1].escapeCompared}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>是否有前科(用户选择)</td>
                                <td>{{resultData.sourcetArr3[1].crime | isOrNoFmt}}</td>
                                <td>比对结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr3[1].crimeCompared | fuckyizhi">{{resultData.sourcetArr3[1].crimeCompared}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>是否吸毒(用户选择)</td>
                                <td>{{resultData.sourcetArr3[1].drug | isOrNoFmt}}</td>
                                <td>比对结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr3[1].drugCompared | fuckyizhi">{{resultData.sourcetArr3[1].drugCompared}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>是否涉毒(用户选择)</td>
                                <td>{{resultData.sourcetArr3[1].drugRelated | isOrNoFmt}}</td>
                                <td>比对结果</td>
                                <td>
                                    <el-tag :type="resultData.sourcetArr3[1].drugRelatedCompared | fuckyizhi">{{resultData.sourcetArr3[1].drugRelatedCompared}}</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>前科事件数量</td>
                                <td>{{resultData.sourcetArr3[1].checkCount}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>事件类别</td>
                                <td>{{resultData.sourcetArr3[1].caseType}}</td>
                                <td>案发时间</td>
                                <td> <span v-for="(c, index) in resultData.sourcetArr3[1].caseTime" :key="index">{{c | handleCaseTime}},</span></td>
                            </tr>
                            <tr class="text-left">
                                <td>查询数据状态</td>
                                <td>{{resultData.sourcetArr3[1].status}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe14">
                            <tr>
                                <td colspan="4">
                                    <el-tag>
                                        个人涉诉
                                    </el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="25%">姓名:</td>
                                <td>{{resultData.sourcetArr3[2].name | handleName()}}</td>
                                <td width="25%">身份证号:</td>
                                <td>{{resultData.sourcetArr3[2].idCard | handleIdCard()}}</td>
                            </tr>
                            <tr class="text-left">
                                <td width="25%">开庭公告:</td>
                                <td>{{resultData.sourcetArr3[2].statistic.ktggResultSize}} 条</td>
                                <td width="25%">裁判文书:</td>
                                <td>{{resultData.sourcetArr3[2].statistic.cpwsResultSize}} 条</td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">执行公告</td>
                                <td>{{resultData.sourcetArr3[2].statistic.zxggResultSize}} 条</td>
                                <td width="20%">失信公告</td>
                                <td>{{resultData.sourcetArr3[2].statistic.sxggResultSize}} 条</td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">法院公告</td>
                                <td>{{resultData.sourcetArr3[2].statistic.fyggResultSize}} 条</td>
                                <td width="20%">网贷黑名单</td>
                                <td>{{resultData.sourcetArr3[2].statistic.wdhmdResultSize}} 条</td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">案件流程</td>
                                <td>{{resultData.sourcetArr3[2].statistic.ajlcResultSize}} 条</td>
                                <td width="20%">曝光台</td>
                                <td>{{resultData.sourcetArr3[2].statistic.bgtResultSize}} 条</td>
                            </tr>
                            <tr v-for="(ret, index) in resultData.sourcetArr3[2].result" :key="index">
                                <td colspan="4">
                                    <table class="table card-text">
                                        <tr class="text-left">
                                            <td colspan="2">
                                                <el-tag round size="mini">{{index + 1}}</el-tag> {{dataTypeChange(ret.dataType)}}
                                            </td>
                                        </tr>
                                        <tr class="text-left resultRows" v-for="(v,k) in ret" :key="k" v-if="k != 'id'">
                                            <td class="mytd" width="25%">{{getKeyName(ret.dataType, k)}}</td>
                                            <td class="mytd">{{tuomin((v || '&nbsp;'), k)}}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe15">
                            <tr class="text-left">
                                <td colspan="2">
                                    <el-tag>多重借贷</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">手机号码</td>
                                <td>{{resultData.sourcetArr3[3].mobile }}</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table class="table card-text">
                                        <tr class="text-left">
                                            <td colspan="2">
                                                <span class="color-r">信贷平台注册详情</span>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[3].creditPlatformRegistrationDetails" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">平台代码 ：</td>
                                                <td class="mytd">{{ret.code}}</td>
                                                <td class="mytd" width="25%">注册时间 ：</td>
                                                <td class="mytd">{{ret.time}}</td>
                                            </tr>
                                        </table>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2">
                                    <table class="table card-text">
                                        <tr class="text-left">
                                            <td colspan="2">
                                                <span class="color-r">贷款申请详情</span>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[3].loanApplicationDetails" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">平台代码 ：</td>
                                                <td class="mytd">{{ret.code}}</td>
                                                <td class="mytd" width="25%">申请时间 ：</td>
                                                <td class="mytd">{{ret.time}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">申请金额 ：</td>
                                                <td class="mytd">{{ret.applicationAmountut}}</td>
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
                                        <tr class="text-left">
                                            <td colspan="2">
                                                <span class="color-r">贷款放款详情</span>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[3].loanDetails" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">平台代码 ：</td>
                                                <td class="mytd">{{ret.code}}</td>
                                                <td class="mytd" width="25%">放款时间 ：</td>
                                                <td class="mytd">{{ret.time}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">放款金额 ：</td>
                                                <td class="mytd">{{ret.loanlendersAmount}}</td>
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
                                        <tr class="text-left">
                                            <td colspan="2" width="50%">
                                                <span class="color-r">贷款驳回详情</span>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[3].loanRejectDetails" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">平台代码 ：</td>
                                                <td class="mytd">{{ret.code}}</td>
                                                <td class="mytd" width="25%">驳回时间 ：</td>
                                                <td class="mytd">{{ret.time}}</td>
                                            </tr>
                                        </table>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2">
                                    <table class="table card-text">
                                        <tr class="text-left">
                                            <td colspan="2" width="50%">
                                                <span class="color-r">逾期平台详情</span>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[3].overduePlatformDetails" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">平台代码 ：</td>
                                                <td class="mytd">{{ret.code}}</td>
                                                <td class="mytd" width="25%">逾期次数 ：</td>
                                                <td class="mytd">{{ret.counts}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">逾期/欠款 金额区间 ：</td>
                                                <td class="mytd">{{ret.money}}</td>
                                                <td class="mytd" width="25%">逾期时间 ：</td>
                                                <td class="mytd">{{ret.time}}</td>
                                            </tr>
                                        </table>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2">
                                    <table class="table card-text">
                                        <tr class="text-left">
                                            <td colspan="2" width="50%">
                                                <span class="color-r">欠款查询详情</span>
                                            </td>
                                        </tr>
                                        <tr class="text-left resultRows" v-for="(ret, index) in resultData.sourcetArr3[3].arrearsInquiry" :key="index">
                                            <td class="mytd" width="25%">平台代码 ：</td>
                                            <td class="mytd">{{ret.code}}</td>
                                            <td class="mytd">欠款金额区间 ：</td>
                                            <td class="mytd">{{ret.money}}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe16">
                            <tr class="text-left">
                                <td width="20%">身份证号码</td>
                                <td>{{resultData.sourcetArr3[4].idCard | handleIdCard()}}</td>
                            </tr>
                            <tr class="text-left">
                                <td width="20%">数据是否存在</td>
                                <td>{{resultData.sourcetArr3[4].status}}</td>
                            </tr>

                            <tr>
                                <td colspan="2">
                                    <table class="table card-text">
                                        <tr class="text-left">
                                            <td colspan="2" width="50%">
                                                <el-tag>企业法人信息</el-tag>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[4].corporates" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">查询人姓名 ：</td>
                                                <td class="mytd">{{ret.ryName | handleName()}}</td>
                                                <td class="mytd" width="25%">企业（机构）名称 ：</td>
                                                <td class="mytd">{{ret.entName}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">注册号 ：</td>
                                                <td class="mytd">{{ret.regNo}}</td>
                                                <td class="mytd" width="25%">企业（机构）类型 ：</td>
                                                <td class="mytd">{{ret.entType}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">注册资本（万元） ：</td>
                                                <td class="mytd">{{ret.regCap}}</td>
                                                <td class="mytd" width="25%">注册资本币种 ：</td>
                                                <td class="mytd">{{ret.regCapCur}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">企业状态 ：</td>
                                                <td class="mytd">{{ret.entStatus}}</td>
                                                <td class="mytd" width="25%">统一社会信用代码 ：</td>
                                                <td class="mytd">{{ret.creditNo}}</td>
                                            </tr>
                                        </table>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2">
                                    <table class="table card-text">
                                        <tr class="text-left">
                                            <td colspan="2" width="50%">
                                                <el-tag>企业股东信息</el-tag>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[4].corporateShareholders" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">查询人姓名 ：</td>
                                                <td class="mytd">{{ret.ryName | handleName()}}</td>
                                                <td class="mytd" width="25%">企业（机构）名称 ：</td>
                                                <td class="mytd">{{ret.entName}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">注册号 ：</td>
                                                <td class="mytd">{{ret.regNo}}</td>
                                                <td class="mytd" width="25%">企业（机构）类型 ：</td>
                                                <td class="mytd">{{ret.entType}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">注册资本（万元） ：</td>
                                                <td class="mytd">{{ret.regCap}}</td>
                                                <td class="mytd" width="25%">注册资本币种 ：</td>
                                                <td class="mytd">{{ret.regCapCur}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">企业状态 ：</td>
                                                <td class="mytd">{{ret.entStatus}}</td>
                                                <td class="mytd" width="25%">认缴出资额（万元） ：</td>
                                                <td class="mytd">{{ret.subConam}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">认缴出资币种 ：</td>
                                                <td class="mytd">{{ret.currency}}</td>
                                                <td class="mytd" width="25%">出资比例 ：</td>
                                                <td class="mytd">{{ret.fundedRatio}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">统一社会信用代码 ：</td>
                                                <td class="mytd">{{ret.creditNo}}</td>
                                                <td class="mytd" width="25%"></td>
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
                                            <td colspan="2" width="50%">
                                                <el-tag>企业主要管理人员信息</el-tag>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[4].corporateManagers" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">查询人姓名 ：</td>
                                                <td class="mytd">{{ret.ryName | handleName()}}</td>
                                                <td class="mytd" width="25%">企业（机构）名称 ：</td>
                                                <td class="mytd">{{ret.entName}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">注册号 ：</td>
                                                <td class="mytd">{{ret.regNo}}</td>
                                                <td class="mytd" width="25%">企业（机构）类型 ：</td>
                                                <td class="mytd">{{ret.entType}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">注册资本（万元） ：</td>
                                                <td class="mytd">{{ret.regCap}}</td>
                                                <td class="mytd" width="25%">注册资本币种 ：</td>
                                                <td class="mytd">{{ret.regCapCur}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">企业状态 ：</td>
                                                <td class="mytd">{{ret.entStatus}}</td>
                                                <td class="mytd" width="25%">职务 ：</td>
                                                <td class="mytd">{{ret.position}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">统一社会信用代码 ：</td>
                                                <td class="mytd">{{ret.creditNo}}</td>
                                                <td class="mytd" width="25%"></td>
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
                                            <td colspan="2">
                                                <el-tag>失信被执行人信息</el-tag>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[4].punishBreaks" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">案号 ：</td>
                                                <td class="mytd">{{ret.caseCode}}</td>
                                                <td class="mytd" width="25%">被执行人姓名/名称 ：</td>
                                                <td class="mytd">{{ret.name | handleName()}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">失信人类型 ：</td>
                                                <td class="mytd">{{ret.type}}</td>
                                                <td class="mytd" width="25%">性别 ：</td>
                                                <td class="mytd">{{ret.sex}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">年龄 ：</td>
                                                <td class="mytd">{{ret.age}}</td>
                                                <td class="mytd" width="25%">身份证号码 ：</td>
                                                <td class="mytd">{{ret.cardNum | handleIdCard()}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">身份证原始发证地 ：</td>
                                                <td class="mytd">{{ret.ysfzd}}</td>
                                                <td class="mytd" width="25%">法定代表人/负责人姓名 ：</td>
                                                <td class="mytd">{{ret.businessEntity}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">立案时间 ：</td>
                                                <td class="mytd">{{ret.regDate}}</td>
                                                <td class="mytd" width="25%">公布时间 ：</td>
                                                <td class="mytd">{{ret.publishDate}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">执行法院 ：</td>
                                                <td class="mytd">{{ret.courName}}</td>
                                                <td class="mytd" width="25%">省份 ：</td>
                                                <td class="mytd">{{ret.areaName}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">执行依据文号 ：</td>
                                                <td class="mytd">{{ret.gistId}}</td>
                                                <td class="mytd" width="25%">执行依据单位 ：</td>
                                                <td class="mytd">{{ret.gistUnit}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">法律文书确定的义务 ：</td>
                                                <td class="mytd">{{ret.duty}}</td>
                                                <td class="mytd" width="25%">失信被执行人行为具体情形 ：</td>
                                                <td class="mytd">{{ret.disruptTypeName}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">被执行人的履行情况 ：</td>
                                                <td class="mytd">{{ret.performAnce}}</td>
                                                <td class="mytd" width="25%">已履行 ：</td>
                                                <td class="mytd">{{ret.performedPart}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">未履行 ：</td>
                                                <td class="mytd">{{ret.unPerformPart}}</td>
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
                                        <tr class="text-left">
                                            <td colspan="2">
                                                <el-tag>被执行人信息</el-tag>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[4].punished" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">案号 ：</td>
                                                <td class="mytd">{{ret.caseCode}}</td>
                                                <td class="mytd" width="25%">被执行人姓名/名称 ：</td>
                                                <td class="mytd">{{ret.name | handleName()}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">身份证号码 ：</td>
                                                <td class="mytd">{{ret.cardNum | handleIdCard()}}</td>
                                                <td class="mytd" width="25%">性别 ：</td>
                                                <td class="mytd">{{ret.sex}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">年龄 ：</td>
                                                <td class="mytd">{{ret.age}}</td>
                                                <td class="mytd" width="25%">省份 ：</td>
                                                <td class="mytd">{{ret.areaName}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">身份证原始发证地 ：</td>
                                                <td class="mytd">{{ret.ysfzd}}</td>
                                                <td class="mytd" width="25%">执行法院 ：</td>
                                                <td class="mytd">{{ret.courtName}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">立案时间 ：</td>
                                                <td class="mytd">{{ret.regDate}}</td>
                                                <td class="mytd" width="25%">案件状态 ：</td>
                                                <td class="mytd">{{ret.caseState}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">执行标的（元） ：</td>
                                                <td class="mytd">{{ret.execMoney}}</td>
                                                <td class="mytd" width="25%"></td>
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
                                            <td colspan="2">
                                                <el-tag>行政处罚历史信息</el-tag>
                                            </td>
                                        </tr>
                                        <table class="table card-text" v-for="(ret, index) in resultData.sourcetArr3[4].caseInfos" :key="index">
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">案由 ：</td>
                                                <td class="mytd">{{ret.caseReason}}</td>
                                                <td class="mytd" width="25%">案发时间 ：</td>
                                                <td class="mytd">{{ret.caseTime}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">案值 ：</td>
                                                <td class="mytd">{{ret.caseVal}}</td>
                                                <td class="mytd" width="25%">案件类型 ：</td>
                                                <td class="mytd">{{ret.caseType}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">执行类别 ：</td>
                                                <td class="mytd">{{ret.exeSort}}</td>
                                                <td class="mytd" width="25%">案件结果 ：</td>
                                                <td class="mytd">{{ret.caseResult}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">处罚决定文书 ：</td>
                                                <td class="mytd">{{ret.penDecNo}}</td>
                                                <td class="mytd" width="25%">处罚决定书签发日期 ：</td>
                                                <td class="mytd">{{ret.penDecIssDate}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">做出行政处罚决定机关名 ：</td>
                                                <td class="mytd">{{ret.penAuth}}</td>
                                                <td class="mytd" width="25%">主要违法事实 ：</td>
                                                <td class="mytd">{{ret.illegFact}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">处罚依据 ：</td>
                                                <td class="mytd">{{ret.penBasis}}</td>
                                                <td class="mytd" width="25%">处罚种类 ：</td>
                                                <td class="mytd">{{ret.penType}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">处罚结果 ：</td>
                                                <td class="mytd">{{ret.penResult}}</td>
                                                <td class="mytd" width="25%">处罚金额（万元） ：</td>
                                                <td class="mytd">{{ret.penAm}}</td>
                                            </tr>
                                            <tr class="text-left resultRows">
                                                <td class="mytd" width="25%">处罚执行情况 ：</td>
                                                <td class="mytd">{{ret.penExeSt}}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe18">
                            <tr>
                                <td>
                                    <el-tag>资产令牌</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr4[1].name }}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr4[1].idNumber}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>手机号码</td>
                                <td>{{resultData.sourcetArr4[1].mobile }}</td>
                            </tr>
                            <tr class="text-left">
                                <td>是否有工作</td>
                                <td>{{hasWork1(resultData.sourcetArr4[1].hasWork)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近一年收入等级</td>
                                <td>{{resultData.sourcetArr4[1].oneYearAverageSalaryRange}} 元</td>
                            </tr>
                            <tr class="text-left">
                                <td>近三年收入等级</td>
                                <td>{{resultData.sourcetArr4[1].threeYearsAverageSalaryRange}} 元</td>
                            </tr>
                            <tr class="text-left">
                                <td>近一年收入稳定性（0-1的数值，越低代表越稳定）</td>
                                <td>{{resultData.sourcetArr4[1].oneYearWorkStability}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近三年收入稳定性（0-1的数值，越低代表越稳定）</td>
                                <td>{{resultData.sourcetArr4[1].threeYearsWorkStability}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近一年收入波动（区间）</td>
                                <td>{{resultData.sourcetArr4[1].oneYearSalaryFluctuateRange}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近一年工作月份</td>
                                <td>{{resultData.sourcetArr4[1].oneYearWorkMonths}} 月</td>
                            </tr>
                            <tr class="text-left">
                                <td>是否有房</td>
                                <td>{{hasHouse1(resultData.sourcetArr4[1].hasHouse)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>是否有车</td>
                                <td>{{hasHouse1(resultData.sourcetArr4[1].hasCar)}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe19">
                            <tr>
                                <td>
                                    <el-tag>航旅信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证对比结果</td>
                                <td>{{resultData.sourcetArr4[2].identityValid}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr4[2].name | handleName}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr4[2].idCard | handleIdCard}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>数据是否存在</td>
                                <td>{{resultData.sourcetArr4[2].status}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>头等舱乘机次数</td>
                                <td>{{resultData.sourcetArr4[2].firstTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>商务舱乘机次数</td>
                                <td>{{resultData.sourcetArr4[2].busTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>平均延误分钟数</td>
                                <td>{{resultData.sourcetArr4[2].avgDelayTime}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>经济舱乘机次数</td>
                                <td>{{resultData.sourcetArr4[2].ecoTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>一年内平均折扣</td>
                                <td>{{resultData.sourcetArr4[2].domesticAvgDiscount}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>国内飞行次数</td>
                                <td>{{resultData.sourcetArr4[2].flightDomesticTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>国际飞行次数</td>
                                <td>{{resultData.sourcetArr4[2].flightInterTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>乘机次数</td>
                                <td>{{resultData.sourcetArr4[2].flightTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>平均票价</td>
                                <td>{{resultData.sourcetArr4[2].avgPrice}} 元</td>
                            </tr>
                            <tr class="text-left">
                                <td>最频繁使用航空公司以及乘机次数</td>
                                <td>{{resultData.sourcetArr4[2].favorFlightTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>最频繁乘机出发城市</td>
                                <td>{{resultData.sourcetArr4[2].maxFromCity}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>最繁忙的月份</td>
                                <td>{{resultData.sourcetArr4[2].busyMonth}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>最繁忙的月份乘机次数</td>
                                <td>{{resultData.sourcetArr4[2].busyMonthTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>最频繁乘机到达城市</td>
                                <td>{{resultData.sourcetArr4[2].maxToCity}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>免费次数</td>
                                <td>{{resultData.sourcetArr4[2].freeTimes}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>平均提前多少天出票</td>
                                <td>{{resultData.sourcetArr4[2].avgAdvanceTicketday}} 天</td>
                            </tr>
                            <tr class="text-left">
                                <td>最后飞行时间</td>
                                <td>{{resultData.sourcetArr4[2].lastFlightDate}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>最后起飞城市</td>
                                <td>{{resultData.sourcetArr4[2].lastFromCity}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>最后抵达城市</td>
                                <td>{{resultData.sourcetArr4[2].lastToCity}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>总共飞行里程数（KM）</td>
                                <td>{{resultData.sourcetArr4[2].flyTotalKm}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>总延误分钟数</td>
                                <td>{{resultData.sourcetArr4[2].delayTime}}</td>
                            </tr>
                        </table>
                        <table class="table card-text" v-if="exearr.exe20">
                            <tr class="text-left">
                                <td width="20%">查询结果</td>
                            </tr>
                            <tr class="text-left">
                                <td>姓名</td>
                                <td>{{resultData.sourcetArr4[3].name | handleName}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>身份证号码</td>
                                <td>{{resultData.sourcetArr4[3].idCard | handleIdCard}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>银行卡号码</td>
                                <td>{{resultData.sourcetArr4[3].bankCardNo | handleBankCardNo}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>数据是否存在</td>
                                <td>{{resultData.sourcetArr4[3].status}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>银行卡信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>借贷标记</td>
                                <td width="25%">{{handleLoanMark(resultData.sourcetArr4[3].bankCardInfo.loanMark)}}</td>
                                <td width="25%">卡等级</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].bankCardInfo.cardRank)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>卡名称</td>
                                <td>{{resultData.sourcetArr4[3].bankCardInfo.cardName}}</td>
                                <td>发卡行</td>
                                <td>{{resultData.sourcetArr4[3].bankCardInfo.issuingBank}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>是否银联高端客户</td>
                                <td>{{resultData.sourcetArr4[3].bankCardInfo.isUnionpayVIP}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>交易城市信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>当月活动省市</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.activeProvincesThisM)}}</td>
                                <td>最近一笔交易城市</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.latestTransactionCity)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>最近一笔交易城市名称</td>
                                <td>{{resultData.sourcetArr4[3].transactionCityInfo.latestTransactionCityName}}</td>
                                <td>第一常用城市总金额</td>
                                <td>{{resultData.sourcetArr4[3].transactionCityInfo.cityConsume1st}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>第二常用城市总金额</td>
                                <td>{{resultData.sourcetArr4[3].transactionCityInfo.cityConsume2nd}}</td>
                                <td>第三常用城市总金额</td>
                                <td>{{resultData.sourcetArr4[3].transactionCityInfo.cityConsume3rd}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>第一常用城市名称</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.cityConsumeName1st)}}</td>
                                <td>第二常用城市名称</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.cityConsumeName2nd)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>第三常用城市名称</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.cityConsumeName3rd)}}</td>
                                <td>近 6 个月交易金额排名第一的城市名称</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.rankConsumeCity6M1st)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月交易金额排名第二的城市名称</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.rankConsumeCity6M2nd)}}</td>
                                <td>近 6 个月交易金额排名第三的城市名称</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].transactionCityInfo.rankConsumeCity6M3rd)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>基本消费信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月消费金额</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.consume1M}}</td>
                                <td>近 1 个月消费笔数</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.consumeTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月月均消费金额</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.averageConsume12M}}</td>
                                <td>近 12 个月月均消费笔数</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.averageConsumeTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月消费类交易金额</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.consumeTransaction1M}}</td>
                                <td>近 12 个月消费类交易金额</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.consumeTransaction12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月消费类交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.consumeTransactionTimes1M}}</td>
                                <td>近 12 个月消费类交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].basicConsumptionInfo.consumeTransactionTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>基本交易信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月交易金额</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.transaction1M}}</td>
                                <td>近 1 个月交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.transactionTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月午夜交易金额（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransaction1M}}</td>
                                <td>近 6 个月午夜交易金额（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransaction6M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月午夜交易金额（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransaction12M}}</td>
                                <td>近 1 个月午夜交易笔数（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransactionTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月午夜交易笔数（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransactionTimes6M}}</td>
                                <td>近 12 个月午夜交易笔数（午夜：00：00-06:00</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransactionTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月午夜交易金额占比（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransactionPro1M}}</td>
                                <td>近 12 个月午夜交易金额占比（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransactionPro12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月午夜交易笔数占比（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransactionTimesPro1M}}</td>
                                <td>近 12 个月午夜交易笔数占比（午夜：00：00-06:00）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.nightTransactionTimesPro12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月转出交易金额（仅支持借记卡）</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.outTransaction1M}}</td>
                                <td>近 1 个月转出交易笔数（仅支持借记卡</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.outTransactionTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月交易天数</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.activeDays12M}}</td>
                                <td>最近一笔交易（含转入转出）日期</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.latestTransactionDate}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月有无境外交易</td>
                                <td>{{resultData.sourcetArr4[3].basicTransactionInfo.overseaTrade12M}}</td>
                                <td>近 12 个月跨境交易国家名称列举</td>
                                <td>{{handleNull(resultData.sourcetArr4[3].basicTransactionInfo.overseasTradeCountryList12M)}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>典当拍卖类交易信息</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月典当、拍卖、信托交易金额</td>
                                <td>{{resultData.sourcetArr4[3].pawnAuctionInfo.pawnAuctionTrust1M}}</td>
                                <td>近 6 个月典当、拍卖、信托交易金额</td>
                                <td>{{resultData.sourcetArr4[3].pawnAuctionInfo.pawnAuctionTrust6M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月典当、拍卖、信托交易金额</td>
                                <td>{{resultData.sourcetArr4[3].pawnAuctionInfo.pawnAuctionTrust12M}}</td>
                                <td>近 1 个月典当、拍卖、信托交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].pawnAuctionInfo.pawnAuctionTrustTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月典当、拍卖、信托交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].pawnAuctionInfo.pawnAuctionTrustTimes6M}}</td>
                                <td>近 12 个月典当、拍卖、信托交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].pawnAuctionInfo.pawnAuctionTrustTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>证券保险类交易信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月证券交易金额</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.securityTrading12M}}</td>
                                <td>近 12 个月证券交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.securityTradingTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月保险支出金额</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.insurance1M}}</td>
                                <td>近 6 个月保险支出金额</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.insurance6M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月保险支出金额</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.insurance12M}}</td>
                                <td>近 1 个月保险支出笔数</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.insuranceTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月保险支出笔数</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.insuranceTimes6M}}</td>
                                <td>近 12 个月保险支出笔数</td>
                                <td>{{resultData.sourcetArr4[3].securitiesInsuranceInfo.insuranceTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>博彩罚款类交易信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月博彩交易金额</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.gamingConsume1M}}</td>
                                <td>近 6 个月博彩交易金额</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.gamingConsume6M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月博彩交易金额</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.gamingConsume12M}}</td>
                                <td>近 1 个月博彩交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.gamingConsumeTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月博彩交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.gamingConsumeTimes6M}}</td>
                                <td>近 12 个月博彩交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.gamingConsumeTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月罚款金额</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.fineLast1M}}</td>
                                <td>近 1 个月罚款笔数</td>
                                <td>{{resultData.sourcetArr4[3].gamingFinesInfo.fineLastTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>医疗卫生类交易信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1个月卫生类交易金额</td>
                                <td>{{resultData.sourcetArr4[3].healthCareInfo.healthConsume1M}}</td>
                                <td>近 1个月卫生类交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].healthCareInfo.healthConsumeTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1个月医药和医疗器材专门零售类交易金额</td>
                                <td>{{resultData.sourcetArr4[3].healthCareInfo.medicalApparatusConsume1M}}</td>
                                <td>近 12 个月医药和医疗器材专门零售类交易金额</td>
                                <td>{{resultData.sourcetArr4[3].healthCareInfo.medicalApparatusConsume12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1个月医药和医疗器材专门零售类交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].healthCareInfo.medicalApparatusConsumeTimes1M}}</td>
                                <td>近 12个月医药和医疗器材专门零售类交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].healthCareInfo.medicalApparatusConsumeTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>法律服务类交易信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月法律服务交易金额</td>
                                <td>{{resultData.sourcetArr4[3].legalServiceInfo.legalService1M}}</td>
                                <td>近 12 个月法律服务交易金额</td>
                                <td>{{resultData.sourcetArr4[3].legalServiceInfo.legalService12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月法律服务交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].legalServiceInfo.legalServiceTimes1M}}</td>
                                <td>近 12 个月法律服务交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].legalServiceInfo.legalServiceTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>商户交易类信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月高危商户交易金额</td>
                                <td>{{resultData.sourcetArr4[3].merchantTransactionInfo.highRiskStoreTrading1M}}</td>
                                <td>近 6 个月高危商户交易金额</td>
                                <td>{{resultData.sourcetArr4[3].merchantTransactionInfo.highRiskStoreTrading6M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月高危商户交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].merchantTransactionInfo.highRiskStoreTrading6M}}</td>
                                <td>近 1 个月交易金额最大商户的商户名</td>
                                <td>{{resultData.sourcetArr4[3].merchantTransactionInfo.largestConsumeMerchant1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月最大商户交易金额</td>
                                <td>{{resultData.sourcetArr4[3].merchantTransactionInfo.largestMerchantConsume6M}}</td>
                                <td>近 1 个月交易笔数最大商户的商户名</td>
                                <td>{{resultData.sourcetArr4[3].merchantTransactionInfo.mostFrequentMerchant1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月交易笔数最大商户的商户名</td>
                                <td>{{resultData.sourcetArr4[3].merchantTransactionInfo.mostFrequentMerchant6M}}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>购物类交易信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12个月网购交易金额</td>
                                <td>{{resultData.sourcetArr4[3].shoppingTransactionInfo.onlineTransaction12M}}</td>
                                <td>近 12个月网购交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].shoppingTransactionInfo.onlineTransactionTimes12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月奢侈品交易金额</td>
                                <td>{{resultData.sourcetArr4[3].shoppingTransactionInfo.luxuryConsume1M}}</td>
                                <td>近 12个月奢侈品交易金额</td>
                                <td>{{resultData.sourcetArr4[3].shoppingTransactionInfo.luxuryConsumeTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>
                                    <el-tag>借贷还款类交易信息</el-tag>
                                </td>
                            </tr>
                            <tr class="text-left">
                                <td>近 1 个月信用卡还款金额</td>
                                <td>{{resultData.sourcetArr4[3].loanRepaymentInfo.creditCardPayment1M}}</td>
                                <td>近 12 个月信用卡还款金额</td>
                                <td>{{resultData.sourcetArr4[3].loanRepaymentInfo.creditCardPayment12M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 12 个月信用卡还款笔数</td>
                                <td>{{resultData.sourcetArr4[3].loanRepaymentInfo.creditCardPaymentTimes12M}}</td>
                                <td>近 1 个月借贷交易的交易金额</td>
                                <td>{{resultData.sourcetArr4[3].loanRepaymentInfo.loan1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月借贷交易的交易金额</td>
                                <td>{{resultData.sourcetArr4[3].loanRepaymentInfo.loan6M}}</td>
                                <td>近 1 个月借贷交易的交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].loanRepaymentInfo.loanTimes1M}}</td>
                            </tr>
                            <tr class="text-left">
                                <td>近 6 个月借贷交易的交易笔数</td>
                                <td>{{resultData.sourcetArr4[3].loanRepaymentInfo.loanTimes6M}}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </el-card>
    </div>
</template>

<script>
import { provinceAndCityData, CodeToText } from "element-china-area-data";
export default {
    name: "Person",
    components: {},
    data () {
        var vm = this;
        let sons = [];
        const sourcetArr1 = [
            {
                id: "0",
                name: "身份证二要素",
                params: ["name", "idCard"],
                apiUrl: "api/rip/idCardElements",
                keyMap: {
                    name: "name",
                    idNumber: "idCard"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200") {
                        if (res.data.data) {
                            if (res.data.data.key == "0000") {
                                vm.$set(vm.resultData.sourcetArr1, id, {
                                    resultType: "SAME",
                                    success: true,
                                    name: vm.inputForm.name,
                                    idNumber: vm.inputForm.idCard
                                });
                                vm.exearr.exe1 = true;
                            }
                            if (res.data.data.key != "0000") {
                                vm.$set(vm.resultData.sourcetArr1, id, {
                                    success: true,
                                    name: vm.inputForm.name,
                                    idNumber: vm.inputForm.idCard
                                });
                            }
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "1",
                name: "失效身份证一致性验证",
                params: ["name", "idCard", "beginDate"],
                apiUrl: "api/rip/invalidIDConsistency",
                keyMap: {
                    name: "name",
                    idCard: "idCard",
                    beginDate: "beginDate"
                },
                callBack: function (res, id) {
                    if (res.data.success && res.data.data) {
                        vm.$set(vm.resultData.sourcetArr1, id, {
                            example: false,
                            resultType: "SAME",
                            name: res.data.data.name,
                            idCard: res.data.data.identityCard,
                            beginDate: res.data.data.beginDate
                        });
                        vm.exearr.exe2 = true;
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: 2,
                name: "银行卡三要素",
                params: ["name", "idCard", "bankCardNo"],
                apiUrl: "api/rip/threeElementsOfBankCard",
                keyMap: {
                    name: "name",
                    idNumber: "idCard",
                    bankCard: "bankCardNo"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200") {
                        if (res.data.data) {
                            if (res.data.data.key == "0000") {
                                vm.$set(vm.resultData.sourcetArr1, id, {
                                    example: false,
                                    success: true,
                                    name: vm.inputForm.name,
                                    idNumber: vm.inputForm.idCard,
                                    bankCardNo: vm.inputForm.bankCardNo
                                });
                                vm.exearr.exe3 = true;
                            }
                            if (res.data.data.key != "0000") {
                                vm.$set(vm.resultData.sourcetArr1, id, {
                                    example: false,
                                    success: true,
                                    name: vm.inputForm.name,
                                    idNumber: vm.inputForm.idCard,
                                    bankCardNo: vm.inputForm.bankCardNo
                                });
                            }
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: 3,
                name: "银行卡四要素",
                params: ["name", "idCard", "bankCardNo", "mobile"],
                apiUrl: "api/rip/bankCardFourElements",
                keyMap: {
                    name: "name",
                    idNumber: "idCard",
                    bankCard: "bankCardNo",
                    mobile: "mobile"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200") {
                        if (res.data.data) {
                            if (res.data.data.key == "0000") {
                                vm.$set(vm.resultData.sourcetArr1, id, {
                                    example: false,
                                    success: true,
                                    name: vm.inputForm.name,
                                    idNumber: vm.inputForm.idCard,
                                    bankCardNo: vm.inputForm.bankCardNo,
                                    mobile: vm.inputForm.mobile
                                });
                                vm.exearr.exe4 = true;
                            }
                            if (res.data.data.key != "0000") {
                                vm.$set(vm.resultData.sourcetArr1, id, {
                                    example: false,
                                    success: true,
                                    name: vm.inputForm.name,
                                    idNumber: vm.inputForm.idCard,
                                    bankCardNo: vm.inputForm.bankCardNo,
                                    mobile: vm.inputForm.mobile
                                });
                            }
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: 4,
                name: "开户行查询",
                params: ["bankCardNo"],
                apiUrl: "api/rip/bankCardBasicInformation",
                keyMap: {
                    accountNo: "bankCardNo"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200") {
                        if (res.data.data) {
                            vm.$set(vm.resultData.sourcetArr1, id, {
                                example: false,
                                success: true,
                                bankCardNo: vm.inputForm.bankCardNo,
                                accountBank: res.data.data.accountBank,
                                accountType: res.data.data.accountType
                            });
                            vm.exearr.exe5 = true;
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            }
        ];

        const sourcetArr2 = [
            {
                id: "0",
                name: "运营商二要素认证",
                params: ["name", "mobile"],
                apiUrl: "api/rip/operatorTwoElements",
                keyMap: {
                    name: "name",
                    mobile: "mobile"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200" && res.data.data) {
                        vm.$set(vm.resultData.sourcetArr2, id, {
                            example: false,
                            success: true,
                            resultType: res.data.data.key,
                            name: vm.inputForm.name,
                            mobile: vm.inputForm.mobile,
                            operator: res.data.data.isp
                        });
                        vm.exearr.exe6 = true;
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "1",
                name: "运营商三要素认证",
                params: ["name", "mobile", "idCard"],
                apiUrl: "api/rip/operatorThreeElements",
                keyMap: {
                    name: "name",
                    mobile: "mobile",
                    idNumber: "idCard"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200" && res.data.data) {
                        vm.$set(vm.resultData.sourcetArr2, id, {
                            example: false,
                            resultType: res.data.data.key,
                            name: vm.inputForm.name,
                            mobile: vm.inputForm.mobile,
                            idNumber: vm.inputForm.idCard,
                            operator: res.data.data.isp
                        });
                        vm.exearr.exe7 = true;
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "2",
                name: "运营商手机位置核验",
                params: ["mobile", "AreaCode"],
                apiUrl: "api/rip/mobileAreaCheck",
                keyMap: {
                    Mobile: "mobile",
                    AreaCode: "AreaCode"
                },
                callBack: function (res, id) {
                    if (res.data.error_code == 0) {
                        if (res.data.result) {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                status: "数据存在",
                                Mobile: res.data.result.Mobile,
                                AreaCode: res.data.result.Area,
                                CheckResult: res.data.result.CheckResult
                            });
                            vm.exearr.exe8 = true;
                            // vm.result = {
                            //     example: false,
                            //     resultType: '0000',
                            //     status: '数据存在',
                            //     Mobile: res.data.result.Mobile,
                            //     AreaCode: res.data.result.Area,
                            //     CheckResult: res.data.result.CheckResult
                            //   };
                        } else {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "3",
                                status: "无数据",
                                errorMsg: res.data.reason
                            });
                        }
                    } else {
                        vm.result = {
                            example: false,
                            resultType: "3",
                            status: "无数据",
                            errorMsg: res.data.reason
                        };
                    }
                }
            },
            {
                id: "3",
                name: "手机在网时长",
                params: ["mobile"],
                apiUrl: "api/rip/inTheNetworkTime",
                keyMap: {
                    mobile: "mobile"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200" && res.data.data) {
                        if (res.data.data.OUTPUT1 == "(12,24)") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                inNetTime: " 0 到 6 个月"
                            });
                        } else if (res.data.data.OUTPUT1 == "(24,+)") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                inNetTime: "24 个月以上 "
                            });
                            vm.exearr.exe9 = true;
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "4",
                name: "手机在网状态",
                params: ["mobile"],
                apiUrl: "api/rip/thePhoneIsOnTheInternet",
                keyMap: {
                    phone: "mobile"
                },
                callBack: function (res, id) {
                    if (res.data.code == "200" && res.data.data) {
                        vm.exearr.exe10 = true;
                        if (res.data.data.status == "1") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "在网"
                            });
                        } else if (res.data.data.status == "2") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "停机"
                            });
                        } else if (res.data.data.status == "3") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "销号"
                            });
                        } else if (res.data.data.status == "4") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "在网但不可用"
                            });
                        } else if (res.data.data.status == "5") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "空号"
                            });
                        } else if (res.data.data.status == "6") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "不在网"
                            });
                        } else if (res.data.data.status == "7") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "未启用"
                            });
                        } else if (res.data.data.status == "8") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                operator: res.data.data.operators,
                                inNetStatus: "无法查询"
                            });
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "5",
                name: "手机消费档次",
                params: ["mobile"],
                apiUrl: "api/rip/mobileConsumptionLevel",
                keyMap: {
                    mobile: "mobile"
                },
                callBack: function (res, id) {
                    if (res.data.success && res.data.data) {
                        if (res.data.data.status == "EXIST") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                province: res.data.data.province,
                                city: res.data.data.city,
                                operator: res.data.data.operator,
                                gradeCode: res.data.data.gradeCode,
                                gradeDesc: res.data.data.gradeDesc,
                                status: "数据存在"
                            });
                            vm.exearr.exe11 = true;
                        } else if (res.data.data.status == "NO_DATA") {
                            vm.$set(vm.resultData.sourcetArr2, id, {
                                example: false,
                                resultType: "0000",
                                mobile: vm.inputForm.mobile,
                                province: res.data.data.province,
                                city: res.data.data.city,
                                operator: res.data.data.operator,
                                gradeCode: res.data.data.gradeCode,
                                gradeDesc: res.data.data.gradeDesc,
                                status: "无数据"
                            });
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            }
        ];

        const sourcetArr3 = [
            {
                id: "0",
                name: "综合风险报告",
                params: ["name", "mobile", "idCard"],
                apiUrl: "api/rip/personalRiskInformation",
                keyMap: {
                    name: "name",
                    mobile: "mobile",
                    idCard: "idCard"
                },
                callBack: function (res, id) {
                    if (res.status == 200 && res.data.rc == "0000") {
                        vm.$set(vm.resultData.sourcetArr3, id, {
                            example: false,
                            resultType: res.data.rc,
                            name: vm.inputForm.name,
                            idCard: vm.inputForm.idCard,
                            mobile: vm.inputForm.mobile,
                            orderNo: res.data.orderNo,
                            totalCounts: res.data.data.totalCounts,
                            Reference: res.data.data.list
                        });
                        vm.exearr.exe12 = true;
                    } else {
                        vm.$message({
                            showClose: true,
                            message: "未查询到，请重试",
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "1",
                name: "不良信息排查",
                params: ["name", "idCard"],
                apiUrl: "api/rip/negativeInformationVerify",
                keyMap: {
                    name: "name",
                    idCard: "idCard",
                    escape: "escape",
                    crime: "crime",
                    drug: "drug",
                    drugRelated: "drugRelated"
                },
                callBack: function (res, id) {
                    if (res.data.success && res.data.data) {
                        if (res.data.data.status == "EXIST") {
                            vm.$set(vm.resultData.sourcetArr3, id, {
                                example: false,
                                resultType: "0000",
                                name: vm.inputForm.name,
                                idCard: vm.inputForm.idCard,
                                escape: res.data.data.escape,
                                crime: res.data.data.crime,
                                drug: res.data.data.drug,
                                drugRelated: res.data.data.drugRelated,
                                escapeCompared: res.data.data.escapeCompared,
                                crimeCompared: res.data.data.crimeCompared,
                                drugCompared: res.data.data.drugCompared,
                                drugRelatedCompared:
                                    res.data.data.drugRelatedCompared,
                                checkCount: res.data.data.checkCount,
                                caseTime: res.data.data.caseTime,
                                caseType: res.data.data.caseType,
                                status: "数据存在"
                            });
                            vm.exearr.exe13 = true;
                        } else if (res.data.data.status == "NO_DATA") {
                            vm.$set(vm.resultData.sourcetArr3, id, {
                                example: false,
                                resultType: "0000",
                                name: vm.inputForm.name,
                                idCard: vm.inputForm.idCard,
                                escape: res.data.data.escape,
                                crime: res.data.data.crime,
                                drug: res.data.data.drug,
                                drugRelated: res.data.data.drugRelated,
                                escapeCompared: res.data.data.escapeCompared,
                                crimeCompared: res.data.data.crimeCompared,
                                drugCompared: res.data.data.drugCompared,
                                drugRelatedCompared:
                                    res.data.data.drugRelatedCompared,
                                checkCount: res.data.data.checkCount,
                                caseTime: res.data.data.caseTime,
                                caseType: res.data.data.caseType,
                                status: "无数据"
                            });
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "2",
                name: "个人涉诉",
                params: ["name", "idCard"],
                apiUrl: "api/rip/personalComplaintInquiry",
                keyMap: {
                    name: "name",
                    idCard: "idCard",
                    pageIndex: "pageIndex"
                },
                callBack: function (res, id) {
                    if (res.data.success) {
                        vm.$set(vm.resultData.sourcetArr3, id, {
                            name: res.data.data.name,
                            idCard: res.data.data.identityCard,
                            result: res.data.data.pageData,
                            statistic: res.data.data.statistic,
                            example: false
                        });
                        vm.exearr.exe14 = true;
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "3",
                name: "多重借贷",
                params: ["mobile"],
                apiUrl: "api/rip/multipleLoanQuery",
                keyMap: {
                    mobile: "mobile"
                },
                callBack: function (res, id) {
                    if (res.data.success) {
                        vm.$set(vm.resultData.sourcetArr3, id, {
                            mobile: res.data.data.phone,
                            creditPlatformRegistrationDetails:
                                res.data.data.creditPlatformRegistrationDetails,
                            loanApplicationDetails:
                                res.data.data.loanApplicationDetails,
                            loanDetails: res.data.data.loanDetails,
                            loanRejectDetails: res.data.data.loanRejectDetails,
                            overduePlatformDetails:
                                res.data.data.overduePlatformDetails,
                            arrearsInquiry: res.data.data.arrearsInquiry,
                            example: false
                        });
                        vm.exearr.exe15 = true;
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "4",
                name: "名下关联企业",
                params: ["idCard"],
                apiUrl: "api/rip/personalEnterprise",
                keyMap: {
                    key: "idCard"
                },
                callBack: function (res, id) {
                    if (res.data.success) {
                        if (res.data.data.status == "EXIST") {
                            vm.$set(vm.resultData.sourcetArr3, id, {
                                idCard: res.data.data.key,
                                status: "数据存在",
                                punishBreaks: res.data.data.punishBreaks,
                                punished: res.data.data.punished,
                                caseInfos: res.data.data.caseInfos,
                                corporates: res.data.data.corporates,
                                corporateManagers:
                                    res.data.data.corporateManagers,
                                corporateShareholders:
                                    res.data.data.corporateShareholders,
                                example: false
                            });
                            vm.exearr.exe16 = true;
                        } else {
                            vm.$set(vm.resultData.sourcetArr3, id, {
                                idCard: res.data.data.key,
                                status: "数据不存在",
                                punishBreaks: res.data.data.punishBreaks,
                                punished: res.data.data.punished,
                                caseInfos: res.data.data.caseInfos,
                                corporates: res.data.data.corporates,
                                corporateManagers:
                                    res.data.data.corporateManagers,
                                corporateShareholders:
                                    res.data.data.corporateShareholders,
                                example: false
                            });
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            }
        ];

        const sourcetArr4 = [
            {
                id: "1",
                name: "资产令牌",
                params: ["name", "mobile", "idCard"],
                apiUrl: "api/rip/assetQuery",
                keyMap: {
                    realname: "name",
                    cardno: "idCard",
                    mobile: "mobile"
                },
                callBack: function (res, id) {
                    if (res.data.code == "0") {
                        vm.$set(vm.resultData.sourcetArr4, id, {
                            example: false,
                            resultType: "0000",
                            name: vm.inputForm.name,
                            idNumber: vm.inputForm.cardNo,
                            mobile: vm.inputForm.mobile,
                            hasWork: res.data.data.hasWork,
                            oneYearWorkStability:
                                res.data.data.oneYearWorkStability,
                            threeYearsWorkStability:
                                res.data.data.threeYearsWorkStability,
                            oneYearWorkMonths: res.data.data.oneYearWorkMonths,
                            hasHouse: res.data.data.hasHouse,
                            threeYearsAverageSalaryRange:
                                res.data.data.threeYearsAverageSalaryRange,
                            oneYearAverageSalaryRange:
                                res.data.data.oneYearAverageSalaryRange,
                            oneYearSalaryFluctuateRange:
                                res.data.data.oneYearSalaryFluctuateRange,
                            hasCar: res.data.data.hasCar
                        });
                        vm.exearr.exe18 = true;
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "2",
                name: "航旅信息",
                params: ["month", "idCard", "name", "passportNo"],
                apiUrl: "api/rip/airTravelinformationQuery",
                keyMap: {
                    name: "name",
                    idCard: "idCard",
                    month: "month",
                    passportNo: "passportNo"
                },
                callBack: function (res, id) {
                    if (res.data.success) {
                        vm.exearr.exe19 = true;
                        if (res.data.data.status == "EXSIT") {
                            vm.$set(vm.resultData.sourcetArr4, id, {
                                example: false,
                                resultType: "0000",
                                status: "数据存在",
                                identityValid: res.data.data.idCardValidator,
                                name: res.data.data.name,
                                idCard: res.data.data.idcard,
                                firstTimes:
                                    res.data.data.flightInfoDetail.firstTimes,
                                busTimes:
                                    res.data.data.flightInfoDetail.busTimes,
                                avgDelayTime:
                                    res.data.data.flightInfoDetail.avgDelayTime,
                                delayTime:
                                    res.data.data.flightInfoDetail.delayTime,
                                ecoTimes:
                                    res.data.data.flightInfoDetail.ecoTimes,
                                domesticAvgDiscount:
                                    res.data.data.flightInfoDetail
                                        .domesticAvgDiscount,
                                flightDomesticTimes:
                                    res.data.data.flightInfoDetail
                                        .flightDomesticTimes,
                                flightInterTimes:
                                    res.data.data.flightInfoDetail
                                        .flightInterTimes,
                                flightTimes:
                                    res.data.data.flightInfoDetail.flightTimes,
                                avgPrice:
                                    res.data.data.flightInfoDetail.avgPrice,
                                favorFlightTimes:
                                    res.data.data.flightInfoDetail
                                        .favorFlightTimes,
                                maxFromCity:
                                    res.data.data.flightInfoDetail.maxFromCity,
                                busyMonth:
                                    res.data.data.flightInfoDetail.busyMonth,
                                busyMonthTimes:
                                    res.data.data.flightInfoDetail
                                        .busyMonthTimes,
                                maxToCity:
                                    res.data.data.flightInfoDetail.maxToCity,
                                freeTimes:
                                    res.data.data.flightInfoDetail.freeTimes,
                                avgAdvanceTicketday:
                                    res.data.data.flightInfoDetail
                                        .avgAdvanceTicketday,
                                lastFlightDate:
                                    res.data.data.flightInfoDetail
                                        .lastFlightDate,
                                lastFromCity:
                                    res.data.data.flightInfoDetail.lastFromCity,
                                lastToCity:
                                    res.data.data.flightInfoDetail.lastToCity,
                                flyTotalKm:
                                    res.data.data.flightInfoDetail.flyTotalKm
                            });
                        } else if (res.data.data.status == "NO_DATA") {
                             vm.$set(vm.resultData.sourcetArr4, id, {
                                example: false,
                                resultType: "0000",
                                status: "无数据",
                                identityValid: res.data.data.idCardValidator,
                                name: res.data.data.name,
                                idCard: res.data.data.idcard
                            });
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            },
            {
                id: "3",
                name: "银行卡交易信息",
                params: ["name", "idCard", "bankCardNo"],
                apiUrl: "api/rip/bankCardTransactionInformationQuery",
                keyMap: {
                    name: "name",
                    idCard: "idCard",
                    accountNO: "bankCardNo"
                },
                callBack: function (res, id) {
                    if (res.data.success) {
                        if (res.data.data.status == "EXIST") {
                            vm.$set(vm.resultData.sourcetArr4, id, {
                                example: false,
                                resultType: "0000",
                                name: res.data.data.name,
                                idCard: res.data.data.idCard,
                                bankCardNo: vm.inputForm.bankCardNo,
                                status: "数据存在",
                                bankCardInfo: res.data.data.bankCardInfo,
                                transactionCityInfo:
                                    res.data.data.transactionCityInfo,
                                basicConsumptionInfo:
                                    res.data.data.basicConsumptionInfo,
                                basicTransactionInfo:
                                    res.data.data.basicTransactionInfo,
                                pawnAuctionInfo: res.data.data.pawnAuctionInfo,
                                securitiesInsuranceInfo:
                                    res.data.data.securitiesInsuranceInfo,
                                gamingFinesInfo: res.data.data.gamingFinesInfo,
                                healthCareInfo: res.data.data.healthCareInfo,
                                legalServiceInfo:
                                    res.data.data.legalServiceInfo,
                                merchantTransactionInfo:
                                    res.data.data.merchantTransactionInfo,
                                shoppingTransactionInfo:
                                    res.data.data.shoppingTransactionInfo,
                                loanRepaymentInfo:
                                    res.data.data.loanRepaymentInfo
                            });
                            vm.exearr.exe20 = true;
                        } else {
                            vm.$set(vm.resultData.sourcetArr4, id, {
                                example: false,
                                resultType: "0000",
                                name: vm.inputForm.name,
                                idCard: vm.inputForm.idCard,
                                bankCardNo: vm.inputForm.bankCardNo,
                                status: "数据不存在"
                            });
                        }
                    } else {
                        vm.$message({
                            showClose: true,
                            message: res.data.errorDesc,
                            type: "error",
                            duration: "5000"
                        });
                    }
                }
            }
        ];
        const sourcetArrjson = [
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

        // var params = {
        //   var keys = Object.keys(item.keyMap);
        //           for(key in keys) {
        //           params[key] = vm.inputForm[keyMap[key]]
        //           }
        // };
        return {
            CodeToText,
            options: provinceAndCityData,
            sons: sons,
            sourcetArrjson: sourcetArrjson,
            sourcetArr1: sourcetArr1,
            sourcetArr2: sourcetArr2,
            sourcetArr3: sourcetArr3,
            sourcetArr4: sourcetArr4,
            selectAll: {
                sourcetArr1: false,
                sourcetArr2: false,
                sourcetArr3: false,
                sourcetArr4: false
            },
            isIndeterminate: {
                sourcetArr1: false,
                sourcetArr2: false,
                sourcetArr3: false,
                sourcetArr4: false
            },
            inputForm: {
                sourcet: {
                    sourcetArr1: [],
                    sourcetArr2: [],
                    sourcetArr3: [],
                    sourcetArr4: []
                },
                name: "",
                idCard: "",
                mobile: "",
                bankCardNo: "",
                beginDate: "",
                AreaCode: [],
                escape: "false",
                crime: "false",
                drug: "false",
                drugRelated: "false",
                pageIndex: "1",
                month: "请选择",
                passportNo: ""
            },
            setApis: new Set(),
            rules: {
                mobile: [
                    {
                        validator: this.$validator.mobileValidator,
                        trigger: "blur"
                    }
                ]
            },
            resultArr: [
                { label: "所属风险类型", prop: "blackRiskType" },
                { label: "所属事实类型", prop: "blackFactsType" },
                { label: "命中事件", prop: "blackFacts" },
                { label: "实际金额", prop: "blackAmt" },
                { label: "发生日期", prop: "blackHappenDate" },
                {
                    label: "持续时长(天)",
                    prop: "blackDurationTime"
                },
                { label: "信息来源", prop: "blackPublishSource" }
            ],
            resultData: {
                sourcetArr1: [
                    {
                        resultType: "SAME",
                        success: true,
                        name: "赵雷",
                        idNumber: "320281199606286770"
                    },
                    {
                        resultType: "SAME",
                        name: "赵雷",
                        idCard: "320281199606286774",
                        beginDate: "2011-06-28"
                    },
                    {
                        resultType: "SAME",
                        name: "赵雷",
                        idNumber: "320281199606286770",
                        bankCardNo: "6228481111221432430"
                    },
                    {
                        resultType: "SAME",
                        success: true,
                        name: "赵雷",
                        idNumber: "320281199606286770",
                        bankCardNo: "6228481111221432430",
                        mobile: "13653576763"
                    },
                    {
                        resultType: "SAME",
                        success: true,
                        bankCardNo: "6228481111221432430",
                        accountBank: "中国建设银行",
                        accountType: "借记卡"
                    }
                ],
                sourcetArr2: [
                    {
                        success: true,
                        resultType: "0000",
                        name: "赵雷",
                        mobile: "13653576763",
                        operator: "联通"
                    },
                    {
                        success: true,
                        resultType: "0000",
                        name: "赵雷",
                        mobile: "13653576763",
                        operator: "联通"
                    },
                    {
                        success: true,
                        example: true,
                        resultType: "0000",
                        Mobile: "15201204367",
                        status: "数据存在",
                        AreaCode: "110000",
                        CheckResult: "0",
                        errorMsg: "系统错误"
                    },
                    {
                        example: true,
                        resultType: "0000",
                        mobile: "13653576763",
                        inNetTime: " 0 到 6 个月"
                    },
                    {
                        example: true,
                        resultType: "0000",
                        mobile: "13653576763",
                        operator: "联通",
                        inNetStatus: "停机"
                    },
                    {
                        example: true,
                        resultType: "0000",
                        mobile: "13653576763",
                        province: "山西省",
                        city: "运城市",
                        operator: "电信",
                        gradeCode: "CTC04",
                        gradeDesc: "(100,200]",
                        status: "数据存在"
                    }
                ],
                sourcetArr3: [
                    {
                        example: true,
                        resultType: "0000",
                        name: "吴磊",
                        idCard: "320281199606286770",
                        orderNo: "201811142311039474356",
                        mobile: "15169693586",
                        totalCounts: [
                            {
                                blackType: "A",
                                blackCount: 0
                            },
                            {
                                blackType: "B",
                                blackCount: 2
                            },
                            {
                                blackType: "C",
                                blackCount: 1
                            },
                            {
                                blackType: "D",
                                blackCount: 0
                            },
                            {
                                blackType: "E",
                                blackCount: 0
                            }
                        ],
                        Reference: [
                            {
                                blackRiskType: "信款逾期",
                                blackFactsType: "贷款不良(逾期90天以上未还)",
                                blackFacts: "身份证命中信贷逾期名单",
                                blackAmt: "1000,5000",
                                blackHappenDate: "2017-03",
                                blackDurationTime: "(90,180]",
                                blackPublishSource: " "
                            },
                            {
                                blackRiskType: "信款逾期",
                                blackFactsType: "短时逾期",
                                blackFacts:
                                    "通过身份证号查得该用户非银(含全部非银类型)短期逾期",
                                blackAmt: " ",
                                blackHappenDate: " ",
                                blackDurationTime: " ",
                                blackPublishSource: " "
                            },
                            {
                                blackRiskType: "法院失信",
                                blackFactsType: "被执行人",
                                blackFacts: "(2018)苏0812执03267号，执行中",
                                blackAmt: "355645",
                                blackHappenDate: "2018-09-20",
                                blackDurationTime: " ",
                                blackPublishSource: "淮安市清江浦区人民法院"
                            }
                        ]
                    },
                    {
                        example: true,
                        resultType: "0000",
                        name: "吴磊",
                        idCard: "320281199606286770",
                        escape: "true",
                        crime: "true",
                        drug: "false",
                        drugRelated: "false",
                        escapeCompared: "一致",
                        crimeCompared: "不一致",
                        drugCompared: "一致",
                        drugRelatedCompared: "不一致",
                        checkCount: "2",
                        caseTime: ["[5,10)", "[2,8]"],
                        caseType: "侵犯人身权利案",
                        status: "数据存在"
                    },
                    {
                        example: true,
                        resultType: "000000",
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
                        result: [
                            {
                                name: "喻海云",
                                gender: "女性",
                                implementationStatus: "全部未履行",
                                evidenceCode: "(2017)沪0112民初34494号",
                                identificationNO: "3101121962****0021",
                                executableUnit: "上海市闵行区人民法院",
                                specificCircumstances:
                                    "有履行能力而拒不履行生效法律文书确定义务",
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
                    },
                    {
                        example: true,
                        resultType: "000000",
                        mobile: "13653576763",
                        creditPlatformRegistrationDetails: [
                            {
                                code: "TX_AAAABICGID",
                                time: "2017--10 10:17:58"
                            }
                        ],
                        loanApplicationDetails: [
                            {
                                code: "TX_AAAABICGID",
                                time: "2017--02 10:17:58",
                                applicationAmountut: "0W～0.2W"
                            },
                            {
                                code: "TX_AAAABICGID",
                                time: "2017--02 10:17:58",
                                applicationAmountut: "0W～0.2W"
                            }
                        ],
                        loanDetails: [
                            {
                                code: "TX_AAAABICGID",
                                time: "2017--02 10:17:58",
                                loanlendersAmount: "0W～0.2W"
                            }
                        ],
                        loanRejectDetails: [
                            {
                                code: "TX_BAAACJ",
                                time: "2017-06-23"
                            },
                            {
                                code: "TX_BAAFCD ",
                                time: "2016-09-26"
                            }
                        ],
                        overduePlatformDetails: [
                            {
                                code: "TX_AAAABICGID",
                                counts: "1",
                                money: "0W～0.2W",
                                time: "2017-04-09 10:17:58"
                            }
                        ],
                        arrearsInquiry: [
                            {
                                code: "TX_AAAABICGID",
                                money: "0W～0.2W"
                            }
                        ]
                    },
                    {
                        example: true,
                        resultType: "000000",
                        idCard: "320281199606286770",
                        status: "数据存在",
                        punishBreaks: [
                            {
                                caseCode: " XXX",
                                name: " 刘**",
                                type: " 自然人",
                                sex: " 男",
                                age: " 49",
                                cardNum: " 3210811972*****3656",
                                ysfzd: " 江西省**地区**市",
                                businessEntity: "",
                                regDate: " 20**-03-07",
                                publishDate: " 20**-11-24",
                                courName: " **市人民法院",
                                areaName: "江西",
                                gistId: " XXXX",
                                gistUnit: " 江西省**市人民法院",
                                duty: " XXX",
                                disruptTypeName:
                                    "其他有履行能力而拒不履行生效法律文书确定义务",
                                performAnce: "全部未履行",
                                performedPart: "",
                                unPerformPart: ""
                            }
                        ],
                        punished: [
                            {
                                caseCode: "XXX",
                                name: "刘**",
                                cardNum: "XXX",
                                sex: "男",
                                age: "45",
                                areaName: "",
                                ysfzd: "江苏省**市",
                                courtName: "**市人民法院",
                                regDate: "20**-10-22",
                                caseState:
                                    "已结案且全国法院被执行人查询平台已不披露",
                                execMoney: "94**.24"
                            }
                        ],
                        caseInfos: [
                            {
                                caseTime: "20**-06-30",
                                caseReason: "XXX",
                                caseVal: "0",
                                caseType: "其他案件",
                                exeSort: "已执行",
                                caseResult: "已处罚",
                                penDecNo: "XXX",
                                penDecIssDate: "20**-07-27",
                                penAuth: "XXX",
                                illegFact: "虚假出资",
                                penBasis: "《公司法》第二百条",
                                penType: "罚款",
                                penResult: "",
                                penAm: "1",
                                penExeSt: ""
                            }
                        ],
                        corporates: [
                            {
                                ryName: "刘**",
                                entName: "**市**包装印刷厂",
                                regNo: "321081**0010",
                                entType: "个人独资企业",
                                regCap: "40.000000",
                                regCapCur: "人民币元",
                                entStatus: "吊销",
                                creditNo: "XXX"
                            }
                        ],
                        corporateManagers: [
                            {
                                ryName: "刘**",
                                entName: "**市**包装有限公司",
                                regNo: "32108**00066265",
                                entType: "有限责任公司（自然人投资或控股）",
                                regCap: "50.000000",
                                regCapCur: "人民币元",
                                entStatus: "在营（开业）",
                                position: "总经理",
                                creditNo: "XXX"
                            },
                            {
                                ryName: "刘**",
                                entName: "**市**包装印刷厂",
                                regNo: "32108**00010",
                                entType: "个人独资企业",
                                regCap: "40.000000",
                                regCapCur: "人民币元",
                                entStatus: "吊销",
                                position: "",
                                creditNo: "XXX"
                            }
                        ],
                        corporateShareholders: [
                            {
                                ryName: "刘**",
                                entName: "**市**包装印刷厂",
                                regNo: "32108**00010",
                                entType: "个人独资企业",
                                regCap: "40.000000",
                                regCapCur: "人民币元",
                                entStatus: "吊销",
                                subConam: "40.000000",
                                currency: "人民币元",
                                fundedRatio: "100.00%",
                                creditNo: "XXX"
                            }
                        ]
                    }
                ],
                sourcetArr4: [
                    {
                        example: true,
                        resultType: "0000",
                        name: "赵雷",
                        idNumber: "320281199606286770",
                        consumptionGrade: "D",
                        consumptionInterval: "[7000,9000)"
                    },
                    {
                        example: true,
                        resultType: "0000",
                        name: "赵雷",
                        idNumber: "320281199606286770",
                        mobile: "13653576763",
                        hasWork: 1,
                        oneYearWorkStability: 0.0,
                        threeYearsWorkStability: 0.0,
                        oneYearWorkMonths: 0,
                        hasHouse: null,
                        threeYearsAverageSalaryRange: "5500-6000",
                        oneYearAverageSalaryRange: "6500-7000",
                        oneYearSalaryFluctuateRange: "7500-8000",
                        hasCar: null
                    },
                    {
                        example: true,
                        resultType: "0000",
                        identityValid: "一致",
                        name: "赵雷",
                        idCard: "320281199606286770",
                        status: "数据存在",
                        firstTimes: "0",
                        busTimes: "0",
                        avgDelayTime: "19",
                        delayTime: "57",
                        ecoTimes: "3",
                        domesticAvgDiscount: "59",
                        flightDomesticTimes: "3",
                        flightInterTimes: "0",
                        flightTimes: "3",
                        avgPrice: "1090",
                        favorFlightTimes: "深航,1 次",
                        maxFromCity: "北京 2 次,深圳 1 次",
                        busyMonth: "201711",
                        busyMonthTimes: "1",
                        maxToCity: "石家庄 1 次,深圳 1 次,重庆 1 次",
                        freeTimes: "0",
                        avgAdvanceTicketday: "2.67",
                        lastFlightDate: "20171103",
                        lastFromCity: "深圳",
                        lastToCity: "石家庄",
                        flyTotalKm: "5490"
                    },
                    {
                        example: true,
                        resultType: "0000",
                        name: "赵雷",
                        idCard: "320281199606286770",
                        bankCardNo: "3415432543254325432",
                        status: "数据存在",
                        bankCardInfo: {
                            loanMark: "debit",
                            cardRank: '"null"',
                            cardName: "金穗通宝卡(银联卡)",
                            issuingBank: "中国农业银行",
                            isUnionpayVIP: "非银联高端客户"
                        },
                        transactionCityInfo: {
                            activeProvincesThisM: "null",
                            latestTransactionCity: "null",
                            latestTransactionCityName: "苏州市",
                            cityConsume1st: "0",
                            cityConsume2nd: "0",
                            cityConsume3rd: "0",
                            cityConsumeName1st: '"null"',
                            cityConsumeName2nd: '"null"',
                            cityConsumeName3rd: '"null"',
                            rankConsumeCity6M1st: '"null"',
                            rankConsumeCity6M2nd: '"null"',
                            rankConsumeCity6M3rd: '"null"'
                        },
                        basicConsumptionInfo: {
                            consume1M: "20",
                            consumeTimes1M: "1",
                            averageConsume12M: "25.95",
                            averageConsumeTimes12M: "0.9167",
                            consumeTransaction1M: "20",
                            consumeTransaction12M: "311.45",
                            consumeTransactionTimes1M: "1",
                            consumeTransactionTimes12M: "11"
                        },
                        basicTransactionInfo: {
                            transaction1M: "20",
                            transactionTimes1M: "1",
                            nightTransaction1M: "0",
                            nightTransaction6M: "0",
                            nightTransaction12M: "0",
                            nightTransactionTimes1M: "0",
                            nightTransactionTimes6M: "0",
                            nightTransactionTimes12M: "0",
                            nightTransactionPro1M: "0.00",
                            nightTransactionPro12M: "0.00",
                            nightTransactionTimesPro1M: "0.00",
                            nightTransactionTimesPro12M: "0.00",
                            outTransaction1M: "0",
                            outTransactionTimes1M: "0",
                            activeDays12M: "11",
                            latestTransactionDate: "20180914",
                            overseaTrade12M: "未发生过境外交易",
                            overseasTradeCountryList12M: '"null"'
                        },
                        pawnAuctionInfo: {
                            pawnAuctionTrust1M: "0",
                            pawnAuctionTrust6M: "0",
                            pawnAuctionTrust12M: "0",
                            pawnAuctionTrustTimes1M: "0",
                            pawnAuctionTrustTimes6M: "0",
                            pawnAuctionTrustTimes12M: "0"
                        },
                        securitiesInsuranceInfo: {
                            securityTrading12M: "0",
                            securityTradingTimes12M: "0",
                            insurance1M: "0",
                            insurance6M: "0",
                            insurance12M: "0",
                            insuranceTimes1M: "0",
                            insuranceTimes6M: "0",
                            insuranceTimes12M: "0"
                        },
                        gamingFinesInfo: {
                            gamingConsume1M: "0",
                            gamingConsume6M: "0",
                            gamingConsume12M: "0",
                            gamingConsumeTimes1M: "0",
                            gamingConsumeTimes6M: "0",
                            gamingConsumeTimes12M: "0",
                            fineLast1M: "0",
                            fineLastTimes1M: "0"
                        },
                        healthCareInfo: {
                            healthConsume1M: "0",
                            healthConsumeTimes1M: "0",
                            medicalApparatusConsume1M: "0",
                            medicalApparatusConsume12M: "0",
                            medicalApparatusConsumeTimes1M: "0",
                            medicalApparatusConsumeTimes12M: "0"
                        },
                        legalServiceInfo: {
                            legalService1M: "0",
                            legalService12M: "0",
                            legalServiceTimes1M: "0",
                            legalServiceTimes12M: "0"
                        },
                        merchantTransactionInfo: {
                            highRiskStoreTrading1M: "0",
                            highRiskStoreTrading6M: "0",
                            highRiskStoreTradingTimes1M: "0",
                            largestConsumeMerchant1M: "（特约）小米支付",
                            largestMerchantConsume6M: "195",
                            mostFrequentMerchant1M: "（特约）小米支付",
                            mostFrequentMerchant6M: "（特约）小米支付"
                        },
                        shoppingTransactionInfo: {
                            onlineTransaction12M: "224.85",
                            onlineTransactionTimes12M: "10",
                            luxuryConsume1M: "0",
                            luxuryConsumeTimes1M: "0"
                        },
                        loanRepaymentInfo: {
                            creditCardPayment1M: "0",
                            creditCardPayment12M: "0",
                            creditCardPaymentTimes12M: "0",
                            loan1M: "0",
                            loan6M: "0",
                            loanTimes1M: "0",
                            loanTimes6M: "0"
                        }
                    }
                ]
            },
            exearr: {
                exe1: false,
                exe2: false,
                exe3: false,
                exe4: false,
                exe5: false,
                exe6: false,
                exe7: false,
                exe8: false,
                exe9: false,
                exe10: false,
                exe11: false,
                exe12: false,
                exe13: false,
                exe14: false,
                exe15: false,
                exe16: false,
                exe18: false,
                exe19: false,
                exe20: false
            }
        };
    },
    watch: {
        sons: function (val) {
           if (val.includes('sons1') == false) {
               this.inputForm.sourcet.sourcetArr1 = [];
           }
           if (val.includes('sons2') == false) {
               this.inputForm.sourcet.sourcetArr2 = [];
           }
           if (val.includes('sons3') == false) {
               this.inputForm.sourcet.sourcetArr3 = [];
           }
           if (val.includes('sons3') == false) {
               this.inputForm.sourcet.sourcetArr3 = [];
           }
        },
        pokerHistory: function (val) {
            this.exearr = {
                exe1: false,
                exe2: false,
                exe3: false,
                exe4: false,
                exe5: false,
                exe6: false,
                exe7: false,
                exe8: false,
                exe9: false,
                exe10: false,
                exe11: false,
                exe12: false,
                exe13: false,
                exe14: false,
                exe15: false,
                exe16: false,
                exe17: false,
                exe18: false,
                exe19: false,
                exe20: false
            };
        },
        pokerHistory2: function (val) {
           this.exearr = {
                exe1: false,
                exe2: false,
                exe3: false,
                exe4: false,
                exe5: false,
                exe6: false,
                exe7: false,
                exe8: false,
                exe9: false,
                exe10: false,
                exe11: false,
                exe12: false,
                exe13: false,
                exe14: false,
                exe15: false,
                exe16: false,
                exe17: false,
                exe18: false,
                exe19: false,
                exe20: false
            };
        },
        pokerHistory3: function (val) {
            this.exearr = {
                exe1: false,
                exe2: false,
                exe3: false,
                exe4: false,
                exe5: false,
                exe6: false,
                exe7: false,
                exe8: false,
                exe9: false,
                exe10: false,
                exe11: false,
                exe12: false,
                exe13: false,
                exe14: false,
                exe15: false,
                exe16: false,
                exe17: false,
                exe18: false,
                exe19: false,
                exe20: false
            };
        },
        pokerHistory4: function (val) {
          this.exearr = {
                exe1: false,
                exe2: false,
                exe3: false,
                exe4: false,
                exe5: false,
                exe6: false,
                exe7: false,
                exe8: false,
                exe9: false,
                exe10: false,
                exe11: false,
                exe12: false,
                exe13: false,
                exe14: false,
                exe15: false,
                exe16: false,
                exe17: false,
                exe18: false,
                exe19: false,
                exe20: false
            };
        }
    },
    methods: {
        handleCheckedCitiesChange (value) {
            let checkedCount = this.inputForm.sourcet[value].length;
            this.selectAll[value] = checkedCount === this[value].length;
            this.isIndeterminate[value] =
                checkedCount > 0 && checkedCount < this[value].length;
        },
        handleCheckAllChange: function (val) {
            if (this.selectAll[val]) {
                this.inputForm.sourcet[val] = this[val];
                this.isIndeterminate[val] = false;
            } else {
                this.inputForm.sourcet[val] = [];
                this.isIndeterminate[val] = false;
            }
        },
        getInputSet: function () {
            var vm = this;
            var set = new Set();
            vm.setApis.clear();
            for (let x in vm.inputForm.sourcet) {
                vm.inputForm.sourcet[x].forEach(e => {
                    // set.add(e2);
                    vm.setApis.add(e);
                    e.params.forEach(e2 => {
                        set.add(e2);
                    });
                });
            }
            return set;
        },
        onSubmit: function () {
            var vm = this;
            const loading = vm.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.2)"
            });

            // console.log(vm.setApis);
            vm.setApis.forEach(item => {
                // console.log(item);
                vm.$refs["inputForm"].validate(valid => {
                    if (valid) {
                        vm.$http
                            .get(item.apiUrl, {
                                params: vm.handleParams(
                                    vm.inputForm,
                                    item.keyMap
                                ),
                                headers: {
                                    authorization: vm.$db.get("authorization")
                                }
                            })
                            .then(function (res) {
                                item.callBack(res, item.id);
                                loading.close();
                            });
                    }
                });
            });
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
        handleParams (input, keymap) {
            var result = {};
            var keys = Object.keys(keymap);
            for (var key in keys) {
                if (keys[key] == "AreaCode") {
                    result[keys[key]] = input[keys[key]][1];
                    return result;
                }
                result[keys[key]] = input[keymap[keys[key]]];
            }
            return result;
        },
        resultSuccess: function (key, index) {
            if (this.resultData[key][index].resultType == "SAME") {
                return {
                    name: "一致",
                    logo: "success"
                };
            }
            if (this.resultData[key][index].resultType == "DIFFERENT") {
                return {
                    name: "不一致",
                    logo: "danger"
                };
            }
            if (this.resultData[key][index].resultType == "NO_DATA") {
                return {
                    name: "无数据",
                    logo: "info"
                };
            }
        },
        handleCheckResult (value) {
            if (value == "0") {
                return "验证一致";
            } else if (value == "1") {
                return "省份一致，城市不一致";
            } else if (value == "2") {
                return "不一致";
            } else {
                return "未知";
            }
        },
        getKeyName (sourcet, name) {
            var i = this.sourcetArrjson.find(n => n.id == sourcet);
            return i.kvs[name] || "";
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
        hasWork1 (val) {
            if (val == 0) {
                return "可能有";
            } else if (val == "1") {
                return "有工作";
            } else if (val == -1) {
                return "没有工作";
            } else {
                return "未知";
            }
        },
        hasHouse1 (val) {
            if (val == 0) {
                return "没有";
            } else if (val == 1) {
                return "有";
            } else if (val == null) {
                return "不确定";
            } else {
                return "未知";
            }
        },
        handleLoanMark (val) {
            if (val == "debit") {
                return "借记卡";
            } else if (val == "credit") {
                return "信用卡";
            } else {
                return "未知";
            }
        },
        handleNull (val) {
            if (val == '"null"') {
                return "空";
            } else if (val == "null") {
                return "空";
            } else {
                return val;
            }
        }
    },
    computed: {
        pokerHistory () {
            return this.inputForm.sourcet.sourcetArr1;
        },
        pokerHistory2 () {
            return this.inputForm.sourcet.sourcetArr2;
        },
        pokerHistory3 () {
            return this.inputForm.sourcet.sourcetArr3;
        },
        pokerHistory4 () {
            return this.inputForm.sourcet.sourcetArr4;
        }
    }
};
</script>
