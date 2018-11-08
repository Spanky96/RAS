function isSuccessFmt (val) {
  return val ? '成功' : '失败';
}
function isOrNoFmt (val) {
  return val ? '是' : '否';
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
  isSuccessFmt: isSuccessFmt,
  isOrNoFmt: isOrNoFmt,
  isConsistentFmt: isConsistentFmt,
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
