// 脱敏
function handleName (val) {
  return (new Array(val.length)).join("*") + val.slice(-1);
}
function handleIdCard (val) {
  return val.slice(0, 3) + '***********' + val.slice(-4);
}
function handleBankCardNo (val) {
  return val.slice(0, 3) + '*********' + val.slice(-4);
}
function handleMobile (val) {
  return val.slice(0, 3) + '****' + val.slice(-4);
}
function isSuccessFmt (val) {
  return val ? '成功' : '失败';
}
function isOrNoFmt (val) {
  if (val == 'true') {
    return '是';
  } else if (val == 'false') {
    return '否';
  } else {
    return '未知';
  }
}
function handleCaseTime (val) {
  if (val) {
    var arr = val.split(/[[\](),]/);
    return '案发距今' + arr[1] + '-' + arr[2] + ' 年（含' + arr[1] + '不含' + arr[2] + '）';
  }
}
function isConsistentFmt (val) {
  return val ? '一致' : '不一致';
}
function fuckyizhi (val) {
  if (val == '一致') {
    return 'info';
  } else if (val == '不一致') {
    return 'danger';
  } else {
    return 'info';
  }
}
function handlePlateType (val) {
  if (val == '01') {
    return '大型汽车';
  } else if (val == '02') {
    return '小型汽车';
  } else if (val == '03') {
    return '使馆汽车';
  } else if (val == '04') {
    return '领馆汽车';
  } else if (val == '05') {
    return '境外汽车';
  } else if (val == '06') {
    return '外籍汽车';
  } else if (val == '07') {
    return '普通摩托车';
  } else if (val == '08') {
    return '轻便摩托车';
  } else if (val == '09') {
    return '使馆摩托车';
  } else if (val == '10') {
    return '领馆摩托车';
  } else if (val == '11') {
    return '境外摩托车';
  } else if (val == '12') {
    return '外籍摩托车';
  } else if (val == '13') {
    return '低速车';
  } else if (val == '14') {
    return '拖拉机';
  } else if (val == '15') {
    return '挂车';
  } else if (val == '16') {
    return '教练汽车';
  } else if (val == '17') {
    return '教练摩托车';
  } else if (val == '20') {
    return '临时入境汽车';
  } else if (val == '21') {
    return '临时入境摩托车';
  } else if (val == '22') {
    return '临时行驶车';
  } else if (val == '23') {
    return '警用汽车';
  } else if (val == '24') {
    return '警用摩托';
  } else if (val == '51') {
    return '新能源大型车';
  } else if (val == '52') {
    return '新能源小型车';
  } else {
    return '未知';
  }
}
function handleFuelTypee (val) {
  if (val == 'A') {
    return '汽油';
  } else if (val == 'B') {
    return '柴油';
  } else if (val == 'C') {
    return '电驱动（电能驱动汽车）';
  } else if (val == 'D') {
    return '混合油';
  } else if (val == 'E') {
    return '天然气';
  } else if (val == 'F') {
    return '液化石油气';
  } else if (val == 'L') {
    return '甲醇';
  } else if (val == 'M') {
    return '乙醇';
  } else if (val == 'N') {
    return '太阳能';
  } else if (val == 'O') {
    return '混合动力';
  } else if (val == 'Y') {
    return '无（仅限全挂车等无动力的）';
  } else if (val == 'Z') {
    return '其他';
  } else if (val == 'P') {
    return '插电式混合动力';
  } else if (val == 'Q') {
    return '氢气';
  } else {
    return '未知';
  }
}
const RESULT_LOGO = {
  '0': 'success',
  '000000': 'success',
  '0000': 'success',
  '9998': 'danger',
  '3': 'info'
};
const RESULT_SUCCESS = {
  '0': '成功',
  '000000': '成功',
  '0000': '成功',
  '9998': '失败',
  '3': '无数据'
};
const RESULT_CONSISIT = {
  '0000': '一致',
  '9998': '不一致',
  '3': '无数据'
};

export default {
  handleName: handleName,
  handleIdCard: handleIdCard,
  handleBankCardNo: handleBankCardNo,
  handleMobile: handleMobile,
  isSuccessFmt: isSuccessFmt,
  isOrNoFmt: isOrNoFmt,
  isConsistentFmt: isConsistentFmt,
  fuckyizhi: fuckyizhi,
  handleCaseTime: handleCaseTime,
  handlePlateType: handlePlateType,
  handleFuelTypee: handleFuelTypee,
  isSuccessLogoFmt: function (val) {
    return val ? 'success' : 'danger';
  },
  resultLogoFmt: function (val) {
    return RESULT_LOGO[val] || '';
  },
  resultTypeFmt: function (val) {
    return RESULT_CONSISIT[val];
  },
  resultSuccessFmt: function (val) {
    return RESULT_SUCCESS[val];
  }
};
