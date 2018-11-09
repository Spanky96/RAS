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
  debugger;
  if (val) {
    var arr = val.split(/[[\](),]/);
    return '案发距今' + arr[1] + '-' + arr[2] + ' 年（含' + arr[1] + '不含' + arr[2] + '）';
  }
}
function isConsistentFmt (val) {
  return val ? '一致' : '不一致';
}
const RESULT_LOGO = {
  '0000': 'success',
  '9998': 'danger',
  '3': 'info'
};
const RESULT_SUCCESS = {
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
  handleCaseTime: handleCaseTime,
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
